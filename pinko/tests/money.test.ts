import { strict as assert } from "node:assert";
import test from "node:test";
import {
  buildInstalmentPlan,
  buildPhasePlan,
  describeInstalments,
  formatEur,
  formatEurFromCents,
  fromCents,
  grossAmount,
  vatAmount,
} from "../src/lib/money.ts";

/* The brief (section 7.2) gives three worked examples for 11.500 € net. */

test("phase model: 40/30/30 of 11.500 € gives 4.600 + 3.450 + 3.450", () => {
  const phases = buildPhasePlan(11500, [0.4, 0.3, 0.3]);
  assert.deepEqual(phases.map(fromCents), [4600, 3450, 3450]);
  assert.equal(
    phases.reduce((a, b) => a + b, 0),
    1150000
  );
});

test("six instalments: 30% deposit leaves 5 × 1.341,67 € and a final 1.341,65 €", () => {
  const plan = buildInstalmentPlan(11500, 0.3, 6);
  assert.equal(fromCents(plan.depositCents), 3450);
  assert.equal(fromCents(plan.remainderCents), 8050);
  assert.deepEqual(plan.instalmentsCents.map(fromCents), [
    1341.67, 1341.67, 1341.67, 1341.67, 1341.67, 1341.65,
  ]);

  const described = describeInstalments(plan);
  assert.deepEqual(described.repeated, { count: 5, cents: 134167 });
  assert.equal(described.last, 134165);

  // The brief's note: the last instalment is corrected by 0,02 €.
  assert.equal(fromCents(134167 - described.last), 0.02);
});

test("twelve instalments: 40% deposit leaves 12 × 575 € exactly", () => {
  const plan = buildInstalmentPlan(11500, 0.4, 12);
  assert.equal(fromCents(plan.depositCents), 4600);
  assert.deepEqual(
    plan.instalmentsCents.map(fromCents),
    Array.from({ length: 12 }, () => 575)
  );
});

test("every schedule sums back to the contracted price", () => {
  const amounts = [6500, 11500, 14500, 22500, 9200, 2750, 1333.33, 10000.01];
  const shares = [0, 0.3, 0.4, 0.5];
  const counts = [1, 2, 3, 6, 9, 12];

  for (const amount of amounts) {
    for (const share of shares) {
      for (const count of counts) {
        const plan = buildInstalmentPlan(amount, share, count);
        const sum =
          plan.depositCents +
          plan.instalmentsCents.reduce((a, b) => a + b, 0);
        assert.equal(
          sum,
          plan.totalCents,
          `amount=${amount} share=${share} count=${count}`
        );
      }
    }
  }
});

test("no instalment is larger than the first, and the last is never larger", () => {
  for (const count of [2, 5, 6, 7, 11, 12]) {
    const plan = buildInstalmentPlan(7777.77, 0.3, count);
    const first = plan.instalmentsCents[0] as number;
    for (const cents of plan.instalmentsCents) {
      assert.ok(cents <= first);
      assert.ok(cents > 0, "an instalment must be positive");
    }
  }
});

test("phase plan shares must add up to 100 percent", () => {
  assert.throws(() => buildPhasePlan(11500, [0.4, 0.3]), RangeError);
  assert.throws(() => buildPhasePlan(11500, []), RangeError);
});

test("instalment inputs are validated", () => {
  assert.throws(() => buildInstalmentPlan(0, 0.3, 6), RangeError);
  assert.throws(() => buildInstalmentPlan(-100, 0.3, 6), RangeError);
  assert.throws(() => buildInstalmentPlan(11500, 1, 6), RangeError);
  assert.throws(() => buildInstalmentPlan(11500, -0.1, 6), RangeError);
  assert.throws(() => buildInstalmentPlan(11500, 0.3, 0), RangeError);
  assert.throws(() => buildInstalmentPlan(11500, 0.3, 2.5), RangeError);
});

test("Croatian formatting: thousands separator, decimals only when needed", () => {
  assert.equal(formatEur(11500), "11.500 €");
  assert.equal(formatEur(1341.67), "1.341,67 €");
  assert.equal(formatEur(50), "50 €");
  assert.equal(formatEurFromCents(134165), "1.341,65 €");
});

test("VAT is computed on the net amount at 25 percent", () => {
  assert.equal(vatAmount(11500, 0.25), 2875);
  assert.equal(grossAmount(11500, 0.25), 14375);
  assert.equal(vatAmount(1341.67, 0.25), 335.42);
});
