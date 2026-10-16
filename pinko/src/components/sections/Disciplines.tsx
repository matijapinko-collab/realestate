import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { disciplines } from "@/config/site";

/**
 * "Tri discipline" (brief 11.4) — a large typographic list with open detail,
 * deliberately not three generic icons in cards.
 */
export function Disciplines() {
  return (
    <Section
      index="02"
      eyebrow="Usluge"
      marker="Usluge"
      title="Tri područja. Jedan povezan plan."
      lead="Isti čovjek povezuje područja, a svaki angažman ima zaseban opseg. Ne morate uzeti sve."
    >
      <ul className="border-t border-rule">
        {disciplines.map((discipline) => (
          <li key={discipline.slug} data-reveal className="discipline-item border-b border-rule">
            <Link
              href={discipline.href}
              className="group grid gap-5 py-9 transition-colors md:grid-cols-[auto_1fr_auto] md:items-start md:gap-10"
            >
              <span className="text-sm font-bold text-accent md:pt-2">
                {discipline.index}
              </span>

              <div>
                <h3 className="text-(length:--text-display) font-extrabold group-hover:text-accent-ink">
                  {discipline.title}
                </h3>
                <p className="measure-wide mt-3 text-(length:--text-lead) text-ink-soft">
                  {discipline.claim}
                </p>
                <ul className="mt-6 flex flex-col gap-2">
                  {discipline.highlights.map((item) => (
                    <li key={item} className="flex gap-2.5 text-ink-soft">
                      <span aria-hidden="true" className="text-accent">
                        —
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <span className="discipline-cta self-end text-sm font-semibold text-accent md:self-start md:pt-3">
                {discipline.cta}{" "}
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
