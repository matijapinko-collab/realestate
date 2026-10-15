"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  addOns,
  buildEstimate,
  estimatorPackages,
  sizeOptions,
  type AddOnKey,
  type SizeKey,
} from "@/lib/estimate";
import { paymentModels } from "@/config/pricing";
import { describeInstalments, formatEur, formatEurFromCents } from "@/lib/money";

/**
 * Optional estimator (brief 13). Every number comes from `buildEstimate`,
 * which reads the same config as the price list — there is no AI guessing and
 * no second set of rules.
 */
export function Estimator() {
  const [packageSlug, setPackageSlug] = useState(
    estimatorPackages[0]?.slug ?? ""
  );
  const [size, setSize] = useState<SizeKey>("osnovni");
  const [addOnKeys, setAddOnKeys] = useState<AddOnKey[]>([]);
  const [paymentModelSlug, setPaymentModelSlug] = useState<string | null>(null);

  const estimate = useMemo(
    () => buildEstimate({ packageSlug, size, addOnKeys, paymentModelSlug }),
    [packageSlug, size, addOnKeys, paymentModelSlug]
  );

  function toggleAddOn(key: AddOnKey) {
    setAddOnKeys((keys) =>
      keys.includes(key) ? keys.filter((k) => k !== key) : [...keys, key]
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-12">
      <div className="space-y-9">
        <Fieldset legend="1. Kakav je projekt?">
          <div className="grid gap-2.5 sm:grid-cols-2">
            {estimatorPackages.map((pkg) => (
              <Choice
                key={pkg.slug}
                name="paket"
                checked={packageSlug === pkg.slug}
                onChange={() => setPackageSlug(pkg.slug)}
                title={pkg.name}
                note={`od ${formatEur(pkg.price.amount)} + PDV`}
              />
            ))}
          </div>
        </Fieldset>

        <Fieldset legend="2. Koliki je opseg?">
          <div className="grid gap-2.5">
            {sizeOptions.map((option) => (
              <Choice
                key={option.key}
                name="opseg"
                checked={size === option.key}
                onChange={() => setSize(option.key)}
                title={option.label}
                note={option.note}
              />
            ))}
          </div>
        </Fieldset>

        <Fieldset legend="3. Trebate li nešto od ovoga?">
          <div className="grid gap-2.5">
            {addOns.map((addOn) => (
              <Choice
                key={addOn.key}
                type="checkbox"
                name={`dodatak-${addOn.key}`}
                checked={addOnKeys.includes(addOn.key)}
                onChange={() => toggleAddOn(addOn.key)}
                title={addOn.label}
                note={
                  addOn.quoted
                    ? `${addOn.description} (${addOn.quoted})`
                    : addOn.description
                }
              />
            ))}
          </div>
        </Fieldset>

        <Fieldset legend="4. Kako biste plaćali?">
          <div className="grid gap-2.5">
            <Choice
              name="placanje"
              checked={paymentModelSlug === null}
              onChange={() => setPaymentModelSlug(null)}
              title="Još ne znam"
              note="Model dogovaramo u ponudi, prije početka rada."
            />
            {paymentModels.map((model) => (
              <Choice
                key={model.slug}
                name="placanje"
                checked={paymentModelSlug === model.slug}
                onChange={() => setPaymentModelSlug(model.slug)}
                title={model.name}
                note={model.rule}
              />
            ))}
          </div>
        </Fieldset>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div
          aria-live="polite"
          className="rounded-(--radius-card) border border-rule bg-surface p-6 md:p-7"
        >
          {estimate ? (
            <>
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-soft">
                Orijentacijski raspon
              </h3>
              <p className="mt-3 text-(length:--text-title) font-extrabold">
                {formatEur(estimate.projectFrom)} – {formatEur(estimate.projectTo)}
                <span className="ml-2 text-sm font-medium text-ink-soft">
                  + PDV
                </span>
              </p>
              <p className="mt-1.5 text-sm text-ink-soft">
                Jednokratna cijena projekta.
              </p>

              {estimate.monthly > 0 ? (
                <div className="mt-5 rounded-xl bg-accent-wash p-4">
                  <p className="text-sm font-semibold">
                    Mjesečno, odvojeno od projekta
                  </p>
                  <p className="mt-1 text-xl font-extrabold">
                    {formatEur(estimate.monthly)}
                    <span className="text-sm font-bold text-ink-soft">/mj.</span>
                    <span className="ml-2 text-sm font-medium text-ink-soft">
                      + PDV
                    </span>
                  </p>
                </div>
              ) : null}

              {estimate.schedule ? (
                <div className="mt-6 border-t border-rule pt-6">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-soft">
                    Raspored plaćanja
                  </h4>
                  <Schedule schedule={estimate.schedule} />
                  <p className="mt-3 text-xs text-ink-soft">
                    Računato na donju granicu raspona (
                    {formatEur(estimate.projectFrom)} + PDV). Odabir ne znači
                    automatsko odobrenje obročne suradnje.
                  </p>
                </div>
              ) : null}

              <div className="mt-6 border-t border-rule pt-6">
                <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-soft">
                  Pretpostavke
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {estimate.assumptions.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-ink-soft">
                      <span aria-hidden="true" className="shrink-0 text-accent">
                        ·
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/kontakt"
                className="mt-7 flex min-h-12 w-full items-center justify-center rounded-full bg-accent px-6 font-semibold text-white transition-colors hover:bg-accent-ink"
              >
                Zatražite procjenu
              </Link>
            </>
          ) : (
            <p className="text-ink-soft">Odaberite vrstu projekta.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Schedule({
  schedule,
}: {
  schedule: NonNullable<ReturnType<typeof buildEstimate>>["schedule"];
}) {
  if (!schedule) return null;

  if (schedule.kind === "unavailable") {
    return <p className="mt-3 text-sm text-ink-soft">{schedule.reason}</p>;
  }

  if (schedule.kind === "phases") {
    return (
      <ol className="mt-3 space-y-2">
        {schedule.phasesCents.map((cents, i) => (
          <li
            key={i}
            className="flex items-baseline justify-between gap-4 text-sm"
          >
            <span className="text-ink-soft">{i + 1}. faza</span>
            <span className="font-bold">{formatEurFromCents(cents)}</span>
          </li>
        ))}
      </ol>
    );
  }

  const { repeated, last } = describeInstalments(schedule.plan);
  return (
    <ul className="mt-3 space-y-2 text-sm">
      <li className="flex items-baseline justify-between gap-4">
        <span className="text-ink-soft">Predujam</span>
        <span className="font-bold">
          {formatEurFromCents(schedule.plan.depositCents)}
        </span>
      </li>
      {repeated ? (
        <li className="flex items-baseline justify-between gap-4">
          <span className="text-ink-soft">
            {repeated.count} × mjesečna rata
          </span>
          <span className="font-bold">{formatEurFromCents(repeated.cents)}</span>
        </li>
      ) : null}
      <li className="flex items-baseline justify-between gap-4">
        <span className="text-ink-soft">Zadnja rata</span>
        <span className="font-bold">{formatEurFromCents(last)}</span>
      </li>
    </ul>
  );
}

function Fieldset({
  legend,
  children,
}: {
  legend: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="mb-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-ink-soft">
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}

/**
 * A real radio or checkbox with a visible label, so the keyboard, screen
 * readers and form semantics all work. The input is visually hidden but kept
 * in the layout, and the selected state is drawn on the label.
 */
function Choice({
  type = "radio",
  name,
  checked,
  onChange,
  title,
  note,
}: {
  type?: "radio" | "checkbox";
  name: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  note: string;
}) {
  return (
    <label
      className={[
        "flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors",
        "has-[:focus-visible]:outline has-[:focus-visible]:outline-3",
        "has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent",
        checked
          ? "border-accent bg-accent-wash"
          : "border-control bg-surface hover:border-ink",
      ].join(" ")}
    >
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
        className="mt-1 size-4 shrink-0 accent-[var(--color-accent)]"
      />
      <span>
        <span className="block font-semibold">{title}</span>
        <span className="mt-1 block text-sm text-ink-soft">{note}</span>
      </span>
    </label>
  );
}
