import { PriceTag } from "@/components/ui/Price";
import type { DevPackage } from "@/config/pricing";

export function DevPackageCard({ pkg }: { pkg: DevPackage }) {
  return (
    <article className="flex flex-col rounded-(--radius-card) border border-rule bg-paper p-7">
      {pkg.badge ? (
        <span className="mb-4 inline-flex w-fit rounded-(--radius-pill) bg-accent-wash px-2.5 py-1 text-xs font-semibold text-accent-ink">
          {pkg.badge}
        </span>
      ) : null}

      <h3 className="text-(length:--text-title) font-extrabold">{pkg.name}</h3>
      {pkg.quip ? (
        <p className="mt-3 font-semibold text-accent-ink">{pkg.quip}</p>
      ) : null}
      <p className="mt-3 text-ink-soft">{pkg.summary}</p>

      <div className="mt-6 border-t border-rule pt-6">
        <PriceTag price={pkg.price} size="lg" />
      </div>

      <p className="mt-5 text-sm text-ink-soft">
        <span className="font-semibold text-ink">Početni opseg: </span>
        {pkg.scope}
      </p>
      <p className="mt-2 text-sm text-ink-soft">
        <span className="font-semibold text-ink">Orijentacijski rok: </span>
        {pkg.timeline}
      </p>

      <h4 className="mt-7 text-sm font-semibold uppercase tracking-[0.14em] text-ink-soft">
        Uključeno
      </h4>
      <ul className="mt-3 space-y-2.5">
        {pkg.includes.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm text-ink-soft">
            <span aria-hidden="true" className="shrink-0 text-accent">
              +
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <h4 className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-ink-soft">
        Dodatno se procjenjuje
      </h4>
      <ul className="mt-3 space-y-2.5">
        {pkg.excludes.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm text-ink-soft">
            <span aria-hidden="true" className="shrink-0">
              –
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
