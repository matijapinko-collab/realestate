import { Section } from "@/components/ui/Section";
import { processSteps } from "@/content/copy";

/** Brief 11.6 — each phase states what the client actually receives. */
export function Process() {
  return (
    <Section
      index="04"
      eyebrow="Proces"
      title="Od prve kave do prve verzije. I dalje."
      lead="Kava je dobrodošla. Prezentacija od 87 slajdova nije obavezna."
    >
      <ol className="grid gap-5 md:grid-cols-2">
        {processSteps.map((step) => (
          <li
            key={step.index}
            className="flex flex-col rounded-(--radius-card) border border-rule bg-surface p-6"
          >
            <span className="text-sm font-bold text-accent">{step.index}</span>
            <h3 className="mt-3 text-(length:--text-title) font-extrabold">
              {step.title}
            </h3>
            <p className="mt-3 text-ink-soft">{step.body}</p>
            <p className="mt-auto pt-6 text-sm">
              <span className="font-semibold">Dobivate: </span>
              <span className="text-ink-soft">{step.output}</span>
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
