import { Section } from "@/components/ui/Section";
import { processSteps } from "@/content/copy";

/** Brief 11.6 — each phase states what the client actually receives. */
export function Process() {
  return (
    <Section
      index="04"
      eyebrow="Bez misterija"
      title="Od prve kave do gotovog projekta. Bez nepotrebne drame."
      lead={
        <>
          <p>
            Ne trebate doći s tehničkom specifikacijom od 80 stranica.
            Dovoljno je da znate što Vas muči i što želite postići.
          </p>
          <p className="mt-4">Ostalo ćemo razraditi zajedno.</p>
        </>
      }
    >
      {/* The cards stack and pin as you scroll, each one coming to rest on
          the one before it. Pure `position: sticky` — no scroll handler, so
          it costs nothing and degrades to a plain list on older browsers. */}
      <ol className="process-stack grid gap-5 md:grid-cols-2">
        {processSteps.map((step, i) => (
          <li
            key={step.index}
            data-reveal
            data-reveal-delay={i}
            style={{ "--step": i } as React.CSSProperties}
            className="spotlight flex flex-col rounded-(--radius-card) border border-rule bg-surface p-6 transition-colors duration-300 hover:border-accent"
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
