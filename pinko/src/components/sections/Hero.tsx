import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/config/site";
import { careerFacts } from "@/content/career";
import { CountUp } from "@/components/ui/CountUp";
import { ProblemPicker } from "./ProblemPicker";
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
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
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
              Vaš sljedeći veliki korak{" "}
              <span className="text-accent">zaslužuje dobar razvoj.</span>
            </h1>

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

          <div className="flex justify-center lg:justify-end">
            {site.portrait ? (
              <div className="relative aspect-square w-full max-w-sm">
                <div
                  aria-hidden="true"
                  className="portrait-ring absolute inset-0 rounded-full p-1.5 [mask:radial-gradient(farthest-side,transparent_calc(100%-6px),#000_calc(100%-6px))]"
                />
                <Image
                  src={site.portrait.src}
                  alt={site.portrait.alt}
                  width={site.portrait.width}
                  height={site.portrait.height}
                  priority
                  sizes="(min-width: 1024px) 32vw, 90vw"
                  className="absolute inset-3 h-auto w-[calc(100%-1.5rem)] rounded-full object-cover"
                  style={{ aspectRatio: "1 / 1" }}
                />
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
