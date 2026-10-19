import { Section } from "@/components/ui/Section";

/**
 * The trust section (Light Mode 2.0 brief, section 02).
 *
 * Every figure here carries the context that makes it true. 75+ is the size
 * of an organisation whose HR function Matija ran — not his headcount. The
 * two Vehicle Freak numbers are the portal's historical peak, achieved by a
 * team, in a period that has passed. The brief is explicit that if there is
 * no room for the explanation, fewer figures should be shown; so the
 * explanation is not a tooltip or a footnote, it sits under the number and
 * is part of the card.
 */

const PROOF = [
  {
    value: "2018.",
    label: "Pinko radi od",
    note: "Godina osnivanja obrta.",
  },
  {
    value: "75+",
    label: "ljudi u organizaciji",
    note: "Veličina organizacije čijom sam HR funkcijom upravljao — ne broj mojih zaposlenika.",
  },
  {
    value: "1M+",
    label: "posjetitelja mjesečno",
    note: "Vehicle Freak u povijesnom vrhuncu projekta. Rezultat portala i cijelog tima, ne moj samostalni.",
  },
  {
    value: "60K+ USD",
    label: "mjesečnog prihoda od oglašavanja",
    note: "Vehicle Freak u najuspješnijem razdoblju. Prihod projekta, ne moja zarada.",
  },
];

export function FactsStrip() {
  return (
    <Section
      tone="surface"
      title="Nisam jučer otkrio internet."
      lead={
        <>
          <p>
            Iza mene su godine rada na digitalnim proizvodima, međunarodnim
            prodajnim kanalima, sadržajnim projektima i poslovnim sustavima.
          </p>
          <p className="mt-4">
            Nekad sam pisao sadržaj koji su čitali milijuni ljudi. Nekad vodio
            timove. Nekad razvijao webshopove i integracije.
          </p>
          <p className="mt-4">
            A nekad objašnjavao ljudima da problem možda ipak nije u
            marketingu.
          </p>
        </>
      }
    >
      <ul className="grid gap-px overflow-hidden rounded-(--radius-card) border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
        {PROOF.map((fact, i) => (
          <li
            key={fact.label}
            data-reveal
            data-reveal-delay={i}
            className="spotlight bg-paper p-6"
          >
            <p className="metric-value font-mono font-extrabold text-accent">
              {fact.value}
            </p>
            <p className="mt-2 font-semibold">{fact.label}</p>
            <p className="mt-2 text-sm text-ink-soft">{fact.note}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
