import { careerFacts } from "@/content/career";
import { CountUp } from "@/components/ui/CountUp";

/**
 * The four career numbers.
 *
 * They used to sit inside the hero. The brief of 19 Oct 2026 reserves the
 * hero for its three lines and two buttons, so the numbers moved out and
 * became the first thing under it — still high on the page, where proof
 * belongs, but no longer competing with the opening line.
 */
export function FactsStrip() {
  return (
    <section className="wrap pt-12 md:pt-16">
      <ul className="grid gap-px overflow-hidden rounded-(--radius-card) border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
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
    </section>
  );
}
