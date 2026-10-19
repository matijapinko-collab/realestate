import Link from "next/link";
import { devPackages, paymentModels, paymentTerms } from "@/config/pricing";
import { formatEur } from "@/lib/money";

/**
 * The light world's pricing page.
 *
 * Same numbers as the dark world — they come from the same config and are
 * not editable here — presented as a professional rate card: the starting
 * price large, the scope under it, and what is explicitly not included
 * beside it, so nobody has to find that out later.
 *
 * "+ PDV" is set once per price, at a size that does not compete with the
 * figure. The old presentation ran them together.
 */
export function LightPricing() {
  return (
    <div className="light-world">
      <section className="lw-section lw-paper">
        <div className="lw-wrap">
          <p className="lw-eyebrow">Cjenik</p>
          <h1 className="lw-display mt-6">
            Početne cijene su javne. Ponuda je na mjeru.
          </h1>
          <p className="lw-lead mt-8">
            „Od” označava navedeni početni opseg. Konačna ponuda slijedi nakon
            što definiramo zahtjeve, a troškovi platformi, licenci, domena i
            vanjskih servisa uvijek se navode zasebno.
          </p>
        </div>
      </section>

      {devPackages.map((pkg, i) => (
        <section
          key={pkg.slug}
          className={`lw-section ${
            ["lw-lavender", "lw-yellow", "lw-mint"][i % 3]
          }`}
          aria-labelledby={`pkg-${pkg.slug}`}
        >
          <div className="lw-wrap grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <h2 id={`pkg-${pkg.slug}`} className="lw-h2">
                {pkg.name}
              </h2>
              <p className="lw-figure mt-8">
                {formatEur(pkg.price.amount)}
                <span className="ml-3 align-middle text-base font-medium opacity-70">
                  od · + PDV
                </span>
              </p>
              <p className="lw-body mt-6">{pkg.summary}</p>
              <p className="lw-eyebrow mt-6 opacity-70">
                Opseg: {pkg.scope} · {pkg.timeline}
              </p>
              <Link href="/kontakt" className="lw-pill mt-9">
                Zatražite ponudu <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <div className="grid gap-8">
              <div>
                <p className="lw-eyebrow">Uključeno</p>
                <ul className="mt-4 space-y-3">
                  {pkg.includes.map((item) => (
                    <li key={item} className="lw-rule pt-3 text-[0.9375rem]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="lw-eyebrow">Nije uključeno</p>
                <ul className="mt-4 space-y-3">
                  {pkg.excludes.map((item) => (
                    <li
                      key={item}
                      className="lw-rule pt-3 text-[0.9375rem] opacity-75"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="lw-section lw-paper">
        <div className="lw-wrap">
          <h2 className="lw-h2">Plaćanje</h2>
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {paymentModels.map((model) => (
              <li key={model.slug} className="lw-rule pt-5">
                <h3 className="lw-h3">{model.name}</h3>
                <p className="lw-body mt-3">{model.rule}</p>
              </li>
            ))}
          </ul>
          <ul className="lw-body mt-12 space-y-3">
            {paymentTerms.map((term) => (
              <li key={term} className="lw-rule pt-3">
                {term}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="lw-section lw-blue">
        <div className="lw-wrap">
          <h2 className="lw-h2">
            Trebate nešto manje od cijelog paketa? I to je u redu.
          </h2>
          <p className="lw-lead mt-7 opacity-90">
            Audit, discovery ili pojedinačni zahvat mogu stajati sami za sebe.
            Opišite što vam treba pa ćemo odrediti opseg koji ima smisla.
          </p>
          <Link href="/kontakt" className="lw-pill mt-9">
            Zatražite procjenu <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
