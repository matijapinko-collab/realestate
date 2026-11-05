import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { bioShort, principles } from "@/content/copy";

/**
 * The "about" section on the homepage.
 *
 * Copy from the brief of 19 Oct 2026, word for word, Kajkavian spelling
 * included ("nekaj", "kak spada", "ak"). The three principles grew from one
 * line each into short numbered pieces, so they are laid out as a list of
 * blocks rather than a tight grid of cards.
 */
export function AboutMatija() {
  return (
    <Section
      index="03"
      eyebrow="O meni"
      title="Bok! Ja sam Matija. Profesionalno se bavim tuđim problemima."
      tone="surface"
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <div className="space-y-4 text-(length:--text-lead)">
            {bioShort.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ButtonLink href="/kako-radim" variant="secondary" className="mt-8">
            Upoznajte čovjeka koji očito nema pametnijeg posla{" "}
            <span aria-hidden="true">&rarr;</span>
          </ButtonLink>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-(--radius-card) border border-rule bg-rule">
          {principles.map((principle) => (
            <li key={principle.title} className="bg-paper p-6 md:p-7">
              <p className="mono-label font-semibold text-accent">
                {principle.index}
              </p>
              <h3 className="mt-2 text-lg font-extrabold">{principle.title}</h3>
              <div className="mt-3 space-y-2.5 text-ink-soft">
                {principle.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
