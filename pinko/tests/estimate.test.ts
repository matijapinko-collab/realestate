import { strict as assert } from "node:assert";
import test from "node:test";
import {
  addOns,
  buildEstimate,
  estimatorPackages,
  sizeOptions,
} from "../src/lib/estimate.ts";
import { devPackages, paymentModels } from "../src/config/pricing.ts";
import { fromCents } from "../src/lib/money.ts";

test("the estimator offers exactly the published packages", () => {
  assert.deepEqual(
    estimatorPackages.map((p) => p.slug),
    devPackages.map((p) => p.slug)
  );
});

test("the base scope never quotes below the published starting price", () => {
  for (const pkg of devPackages) {
    const estimate = buildEstimate({
      packageSlug: pkg.slug,
      size: "osnovni",
      addOnKeys: [],
      paymentModelSlug: null,
    });
    assert.ok(estimate);
    assert.equal(
      estimate.projectFrom,
      pkg.price.amount,
      `${pkg.slug}: estimator lower bound drifted from the price list`
    );
    assert.ok(estimate.projectTo >= estimate.projectFrom);
  }
});

test("larger scopes only ever increase the estimate", () => {
  for (const pkg of devPackages) {
    let previous = 0;
    for (const size of sizeOptions) {
      const estimate = buildEstimate({
        packageSlug: pkg.slug,
        size: size.key,
        addOnKeys: [],
        paymentModelSlug: null,
      });
      assert.ok(estimate);
      assert.ok(
        estimate.projectFrom >= previous,
        `${pkg.slug}/${size.key} went down`
      );
      previous = estimate.projectFrom;
    }
  }
});

test("an add-on without a defined price is never counted into the total", () => {
  const withoutPrice = addOns.find((a) => a.quoted);
  assert.ok(withoutPrice, "fixture expects one quoted-only add-on");

  const base = buildEstimate({
    packageSlug: "web-koji-radi-posao",
    size: "osnovni",
    addOnKeys: [],
    paymentModelSlug: null,
  });
  const withQuoted = buildEstimate({
    packageSlug: "web-koji-radi-posao",
    size: "osnovni",
    addOnKeys: [withoutPrice.key],
    paymentModelSlug: null,
  });

  assert.ok(base && withQuoted);
  assert.equal(withQuoted.projectFrom, base.projectFrom);
  assert.equal(withQuoted.projectTo, base.projectTo);
  assert.equal(withQuoted.quotedAddOns.length, 1);
  assert.ok(
    withQuoted.assumptions.some((a) => a.includes("Nije uračunato")),
    "the result must say what was left out"
  );
});

test("a monthly add-on is kept out of the one-off project price", () => {
  const monthlyAddOn = addOns.find((a) => a.monthly !== null);
  assert.ok(monthlyAddOn);

  const base = buildEstimate({
    packageSlug: "shop-s-planom",
    size: "osnovni",
    addOnKeys: [],
    paymentModelSlug: null,
  });
  const withMonthly = buildEstimate({
    packageSlug: "shop-s-planom",
    size: "osnovni",
    addOnKeys: [monthlyAddOn.key],
    paymentModelSlug: null,
  });

  assert.ok(base && withMonthly);
  assert.equal(
    withMonthly.projectFrom,
    base.projectFrom,
    "a recurring cost must not be folded into the project price"
  );
  assert.equal(withMonthly.monthly, monthlyAddOn.monthly);
});

test("a one-off add-on is added at its published price", () => {
  const oneOff = addOns.find((a) => a.oneOff !== null);
  assert.ok(oneOff);

  const base = buildEstimate({
    packageSlug: "web-koji-radi-posao",
    size: "osnovni",
    addOnKeys: [],
    paymentModelSlug: null,
  });
  const withAddOn = buildEstimate({
    packageSlug: "web-koji-radi-posao",
    size: "osnovni",
    addOnKeys: [oneOff.key],
    paymentModelSlug: null,
  });

  assert.ok(base && withAddOn);
  assert.equal(withAddOn.projectFrom - base.projectFrom, oneOff.oneOff);
});

test("the schedule always sums back to the quoted lower bound", () => {
  for (const pkg of devPackages) {
    for (const model of paymentModels) {
      const estimate = buildEstimate({
        packageSlug: pkg.slug,
        size: "osnovni",
        addOnKeys: [],
        paymentModelSlug: model.slug,
      });
      assert.ok(estimate?.schedule);
      const schedule = estimate.schedule;

      if (schedule.kind === "unavailable") continue;

      const total =
        schedule.kind === "phases"
          ? schedule.phasesCents.reduce((a, b) => a + b, 0)
          : schedule.plan.depositCents +
            schedule.plan.instalmentsCents.reduce((a, b) => a + b, 0);

      assert.equal(
        fromCents(total),
        estimate.projectFrom,
        `${pkg.slug}/${model.slug}: schedule does not sum to the quote`
      );
    }
  }
});

test("the 12-instalment model is withheld below its stated minimum", () => {
  const model = paymentModels.find((m) => m.slug === "do-12-rata");
  assert.ok(model?.minAmount);

  const estimate = buildEstimate({
    packageSlug: "web-koji-radi-posao", // 6.500 €, below the 10.000 € minimum
    size: "osnovni",
    addOnKeys: [],
    paymentModelSlug: "do-12-rata",
  });

  assert.equal(estimate?.schedule?.kind, "unavailable");
});

test("an unknown package or size yields no estimate rather than a guess", () => {
  assert.equal(
    buildEstimate({
      packageSlug: "ne-postoji",
      size: "osnovni",
      addOnKeys: [],
      paymentModelSlug: null,
    }),
    null
  );
});

test("every estimate states that it is not a binding offer", () => {
  const estimate = buildEstimate({
    packageSlug: "aplikacija-po-mjeri",
    size: "slozen",
    addOnKeys: [],
    paymentModelSlug: null,
  });
  assert.ok(estimate);
  assert.ok(
    estimate.assumptions.some((a) => a.includes("nije obvezujuća ponuda")),
    "the estimator must never read as a binding quote"
  );
  assert.ok(
    estimate.assumptions.some((a) => a.includes("bez PDV-a")),
    "the estimator must state that amounts exclude VAT"
  );
});
