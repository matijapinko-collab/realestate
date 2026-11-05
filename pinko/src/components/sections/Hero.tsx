import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/config/site";
import { SplitLines } from "@/components/ui/SplitLines";
import { PortraitBio } from "./PortraitBio";
import { TypedDisciplines } from "./TypedDisciplines";

/**
 * Homepage hero.
 *
 * The copy is fixed by the Light Mode 2.0 brief (19 Oct 2026) and is
 * reproduced as written, colloquial spelling included — with one deliberate
 * exception: the brief reverted "žmuklera" to "žmuhlera", and Matija had
 * corrected that spelling himself earlier the same day. The later
 * correction wins; it is flagged in the reply rather than silently applied.
 *
 * The right-hand side is the one place the two worlds genuinely diverge.
 * The terminal scheme keeps the portrait inside its turning ring with the
 * typed line underneath. The studio scheme shows the same photograph as a
 * still editorial crop with a caption and no motion at all — Matija asked
 * for the ring and the typing to stay out of the light world, and this
 * brief asks for a large photograph in it. Both are satisfied without a
 * second copy of the markup: the difference is entirely in the stylesheet.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-rule">
      {/* Decorative: the technical grid and a soft accent glow behind it. */}
      <div
        aria-hidden="true"
        className="grid-field pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 -right-40 h-[38rem] w-[38rem] rounded-full bg-accent/10 blur-3xl"
      />

      <div className="wrap relative pt-12 pb-14 md:pt-16 md:pb-20">
        <div className="hero-grid grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="hero-copy">
            <p className="mono-label font-semibold text-ink-soft">
              Development <span className="text-accent">/</span> Marketing{" "}
              <span className="text-accent">/</span> Business Development
            </p>

            <h1 className="mt-5 text-(length:--text-hero) font-extrabold">
              <SplitLines
                lines={[
                  "Dosta Vam je žmuklera",
                  "koji Vam samo uzimaju novce?",
                ]}
              />
            </h1>

            {/* The rejected word is struck through: this is a one-person
                trade, not an agency, and the page says so before anyone has
                to ask. */}
            <p className="hero-strike mt-5 text-(length:--text-title) font-extrabold">
              <SplitLines
                lines={[
                  "Spas je ovdje. Ne agencija.",
                  "Jedan čovek koji uvijek isporuči!",
                ]}
                strike="agencija."
              />
            </p>

            <div className="measure-wide mt-6 space-y-3.5 text-(length:--text-lead) text-ink-soft">
              <p>
                Bok! Ja sam Matija i ja rješavam probleme. Ponekad čak i one
                koje nisam sam napravio!
              </p>
              <p>
                Radim webove, webshopove i aplikacije, razvijam prodajne kanale
                i povezujem tehnologiju s poslovanjem.
              </p>
              <p>
                Jer kaj Vam vrijedi najljepši web na svijetu ako ne donosi
                kupce? Ili webshop koji prodaje, ali nitko u skladištu nema
                pojma kaj je naručeno?
              </p>
              <p>
                Meni je najdraži onaj trenutak kad sve konačno počne raditi kak
                spada.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/kontakt" size="lg">
                Imam problem. Naravno da imam.{" "}
                <span aria-hidden="true">&rarr;</span>
              </ButtonLink>
              <ButtonLink href="/projekti" variant="secondary" size="lg">
                Daj da vidim kaj si napravio{" "}
                <span aria-hidden="true">&rarr;</span>
              </ButtonLink>
            </div>

            <p className="mono-label mt-6 text-ink-soft">
              Bez prodajnog monologa. Bez misterioznih konzultantskih naknada.
              Samo normalan razgovor.
            </p>
          </div>

          <div className="hero-aside flex justify-center lg:justify-end">
            {site.portrait ? (
              <div className="flex w-full max-w-sm flex-col items-center">
                <PortraitBio />
                {/* Terminal motifs. Both are hidden in the studio scheme. */}
                <TypedDisciplines compact className="hero-typed mt-16" />
              </div>
            ) : (
              /* Placeholder while the photograph is not in the repository. */
              <div
                data-reveal
                className="hero-fallback spotlight w-full max-w-sm rounded-(--radius-card) border border-rule bg-surface p-7"
              >
                <p className="mono-label text-accent">~/pinko</p>
                <TypedDisciplines />
                <p className="mt-6 border-t border-rule pt-5 text-sm text-ink-soft">
                  Jedna osoba, tri discipline. Bez prepucavanja između agencija.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
