import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/config/site";
import { ProblemPicker } from "./ProblemPicker";

/**
 * Homepage hero (brief 11.2).
 *
 * The right-hand side shows Matija's portrait once `site.portrait` is set.
 * Until then it is the problem picker alone — never a stock person or an
 * AI-generated face standing in for a real one.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-rule">
      {/* Decorative accent wash, kept well away from the text contrast. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-32 h-[34rem] w-[34rem] rounded-full bg-accent-wash blur-3xl"
      />

      <div className="wrap relative pt-14 pb-16 md:pt-20 md:pb-24">
        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">
              <span className="text-ink">Matija Pinko</span>
              <span aria-hidden="true" className="text-rule">
                ·
              </span>
              <span>Development</span>
              <span aria-hidden="true" className="text-accent">
                /
              </span>
              <span>Marketing</span>
              <span aria-hidden="true" className="text-accent">
                /
              </span>
              <span>Business Development</span>
            </p>

            <h1 className="mt-6 text-(length:--text-hero) font-extrabold">
              Vaš sljedeći veliki korak zaslužuje dobar razvoj.
            </h1>

            <p className="measure-wide mt-7 text-(length:--text-lead) text-ink-soft">
              Razvijam Next.js webove, webshopove i aplikacije. Povezujem ih sa
              sadržajem, automatizacijama i poslovnim procesima koji vam pomažu
              prodavati i raditi jednostavnije.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/kontakt" size="lg">
                Razgovarajmo o projektu
              </ButtonLink>
              <ButtonLink href="/projekti" variant="secondary" size="lg">
                Pogledajte projekte
              </ButtonLink>
            </div>

            <p className="mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-ink-soft">
              <span>Projekti najčešće 5.000–15.000 € + PDV</span>
              <span aria-hidden="true" className="text-rule">
                ·
              </span>
              <span>Moguće plaćanje na rate</span>
            </p>
          </div>

          <div className="lg:pt-6">
            {site.portrait ? (
              <Image
                src={site.portrait.src}
                alt={site.portrait.alt}
                width={site.portrait.width}
                height={site.portrait.height}
                priority
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="mb-6 aspect-4/5 w-full rounded-(--radius-card) object-cover"
              />
            ) : null}
            <ProblemPicker />
          </div>
        </div>
      </div>
    </section>
  );
}
