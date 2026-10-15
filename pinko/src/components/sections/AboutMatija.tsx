import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { bioShort, principles } from "@/content/copy";

/** Brief 11.5. */
export function AboutMatija() {
  return (
    <Section
      index="03"
      eyebrow="O meni"
      title="Bok, ja sam Matija. Volim kad stvari imaju smisla."
      tone="surface"
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <p className="text-(length:--text-lead)">{bioShort}</p>
          <ButtonLink href="/kako-radim" variant="secondary" className="mt-8">
            Upoznajte način rada
          </ButtonLink>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-(--radius-card) border border-rule bg-rule">
          {principles.map((principle) => (
            <li key={principle.title} className="bg-paper p-6">
              <h3 className="text-lg font-extrabold">{principle.title}</h3>
              <p className="mt-2 text-ink-soft">{principle.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
