import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/config/site";
import { SplitLines } from "@/components/ui/SplitLines";
import { PortraitBio } from "./PortraitBio";
import { TypedDisciplines } from "./TypedDisciplines";

/**
 * Homepage hero.
 *
 * The three lines of copy are fixed by the brief of 19 Oct 2026 and are
 * reproduced word for word, colloquial spelling included ("čovek",
 * "riješavam"). Nothing else may live in this section: no eyebrow naming the
 * disciplines, no price range, no second slogan — the brief is explicit that
 * the hero carries this text and the two buttons and nothing more. The
 * numbers and the problem picker that used to sit here moved down the page.
 *
 * The right-hand side shows Matija's portrait inside the accent ring once
 * `site.portrait` is set. Until then it is a monospaced card naming the three
 * disciplines — never a stock person or an AI-generated face standing in for
 * a real one.
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

      <div className="wrap relative pt-14 pb-16 md:pt-20 md:pb-24">
        <div className="hero-grid grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="hero-copy">
            <h1 className="text-(length:--text-hero) font-extrabold">
              <SplitLines
                lines={[
                  "Dosta Vam je žmuhlera",
                  "koji Vam samo uzimaju novce?",
                ]}
              />
            </h1>

            {/* The rejected word is struck through, as the brief asks. It is
                also true: this is a one-person trade, not an agency. */}
            <p className="hero-strike mt-5 text-(length:--text-title) font-extrabold">
              <SplitLines
                lines={[
                  "Spas je ovdje. Ne agencija.",
                  "Jedan čovek koji uvijek isporuči!",
                ]}
                strike="agencija."
              />
            </p>

            <p className="measure-wide mt-7 text-(length:--text-lead) text-ink-soft">
              Bok! Ja sam Matija i ja riješavam probleme. Ponekad čak i one koje
              nisam ja napravio!
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/projekti" size="lg">
                Daj da vidim kaj si napravio{" "}
                <span aria-hidden="true">&rarr;</span>
              </ButtonLink>
              <ButtonLink href="/kontakt" variant="secondary" size="lg">
                Imam problem. Naravno da imam.
              </ButtonLink>
            </div>
          </div>

          <div className="hero-aside flex justify-center lg:justify-end">
            {site.portrait ? (
              <div className="flex w-full max-w-sm flex-col items-center">
                <PortraitBio />
                {/* The terminal line survives the arrival of the photograph;
                    it moved from the card the portrait replaced. */}
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
