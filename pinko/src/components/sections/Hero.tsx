import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/config/site";
import { careerFacts } from "@/content/career";
import { CountUp } from "@/components/ui/CountUp";
import { SplitLines } from "@/components/ui/SplitLines";
import { ProblemPicker } from "./ProblemPicker";
import { PortraitBio } from "./PortraitBio";
import { TypedDisciplines } from "./TypedDisciplines";

/**
 * Homepage hero.
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
            <p className="mono-label flex flex-wrap items-center gap-x-2 gap-y-1 font-semibold text-ink-soft">
              <span className="text-ink">Matija Pinko</span>
              <span aria-hidden="true" className="text-control">
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
              <SplitLines
                lines={["Vaš sljedeći veliki korak", "zaslužuje dobar razvoj."]}
              />
            </h1>

            {/* The reference crosses out the word it is rejecting. Here the
                rejected word is true: this is a one-person trade, not an
                agency, and the page says so before anyone has to ask. */}
            <p className="hero-strike mt-5 text-(length:--text-title) font-extrabold">
              <SplitLines
                lines={["Ne agencija.", "Jedan čovjek koji isporuči."]}
                strike="agencija."
              />
            </p>

            <p className="measure-wide mt-7 text-(length:--text-lead) text-ink-soft">
              Razvijam Next.js webove, webshopove i aplikacije. Povezujem ih sa
              sadržajem, automatizacijama i poslovnim procesima koji vam pomažu
              prodavati i raditi jednostavnije.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/kontakt" size="lg">
                Razgovarajmo o projektu{" "}
                <span aria-hidden="true">&rarr;</span>
              </ButtonLink>
              <ButtonLink href="/projekti" variant="secondary" size="lg">
                Pogledajte projekte
              </ButtonLink>
            </div>

            <p className="mono-label mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-ink-soft">
              <span>Projekti najčešće 5.000–15.000 € + PDV</span>
              <span aria-hidden="true" className="text-control">
                ·
              </span>
              <span>Moguće plaćanje na rate</span>
            </p>
          </div>

          <div className="hero-aside flex justify-center lg:justify-end">
            {site.portrait ? (
              <div className="flex w-full max-w-sm flex-col items-center">
                <PortraitBio />
                {/* The terminal line survives the arrival of the photograph;
                    it moved from the card the portrait replaced. */}
                <TypedDisciplines compact className="mt-16" />
              </div>
            ) : (
              /* Placeholder while the photograph is not in the repository. */
              <div
                data-reveal
                className="spotlight w-full max-w-sm rounded-(--radius-card) border border-rule bg-surface p-7"
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

        <ul className="mt-14 grid gap-px overflow-hidden rounded-(--radius-card) border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {careerFacts.map((fact, i) => (
            <li
              key={fact.label}
              data-reveal
              data-reveal-delay={i}
              className="spotlight bg-surface p-6"
            >
              <p className="font-mono text-4xl font-extrabold text-accent">
                <CountUp value={fact.value} />
              </p>
              <p className="mt-1.5 text-sm text-ink-soft">{fact.label}</p>
            </li>
          ))}
        </ul>

        <div className="mt-14" data-reveal>
          <ProblemPicker />
        </div>
      </div>
    </section>
  );
}
