import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { PriceTag } from "@/components/ui/Price";
import { devPackages, homepagePackageSlugs } from "@/config/pricing";

/**
 * Brief 11.7 — the three development packages, read from the same config the
 * pricing page and the estimator use, so the numbers cannot drift apart.
 */
export function PricingPreview() {
  const packages = homepagePackageSlugs
    .map((slug) => devPackages.find((p) => p.slug === slug))
    .filter((p): p is (typeof devPackages)[number] => Boolean(p));

  return (
    <Section
      index="05"
      eyebrow="Novci, novci"
      title="Koliko to košta? Ajmo odmah riješiti najvažnije pitanje."
      lead={
        <>
          <p>
            Ne volim kad morate ispuniti tri formulara i dogovoriti dva
            sastanka samo da saznate okvirnu cijenu. Zato su početne cijene
            javne.
          </p>
          <p className="mt-4">
            A konačna ponuda ovisi o tome što stvarno trebate. Sve cijene su
            bez PDV-a.
          </p>
        </>
      }
      tone="surface"
    >
      <ul className="grid gap-5 md:grid-cols-3">
        {packages.map((pkg) => (
          <li
            key={pkg.slug}
            className="flex flex-col rounded-(--radius-card) border border-rule bg-paper p-6"
          >
            {pkg.badge ? (
              <span className="mb-4 inline-flex w-fit rounded-(--radius-pill) bg-accent-wash px-2.5 py-1 text-xs font-semibold text-accent-ink">
                {pkg.badge}
              </span>
            ) : null}
            <h3 className="text-(length:--text-title) font-extrabold">
              {pkg.name}
            </h3>
            <div className="mt-4">
              <PriceTag price={pkg.price} size="lg" />
            </div>
            <p className="mt-5 text-ink-soft">{pkg.summary}</p>
            <p className="mt-5 text-sm text-ink-soft">
              <span className="font-semibold text-ink">Početni opseg: </span>
              {pkg.scope}
            </p>
            <p className="mt-3 text-sm text-ink-soft">
              <span className="font-semibold text-ink">Orijentacijski rok: </span>
              {pkg.timeline}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-(length:--text-lead)">
          Treba vam nešto između? Opseg slažemo prema stvarnom poslu.
        </p>
        <ButtonLink href="/cjenik" className="shrink-0">
          Pogledajte cijeli cjenik
        </ButtonLink>
      </div>
    </Section>
  );
}
