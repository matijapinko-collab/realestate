import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { services } from "@/content/services";

/**
 * The four services, as a large typographic list with the detail open —
 * deliberately not four generic icons in cards. The heading and the line
 * under it are fixed by the brief of 19 Oct 2026.
 */
export function Disciplines() {
  return (
    <Section
      index="02"
      eyebrow="Usluge"
      marker="Usluge"
      title="Kaj treba popraviti? Osim raspoloženja ponedjeljkom."
      lead="Od webova i webshopova do automatizacija i marketinga. Radim stvari koje trebaju raditi. Revolucionaran koncept, znam."
    >
      <ul className="border-t border-rule">
        {services.map((discipline) => (
          <li key={discipline.slug} data-reveal className="discipline-item border-b border-rule">
            <Link
              href={`/usluge/${discipline.slug}`}
              className="group grid gap-5 py-9 transition-colors md:grid-cols-[auto_1fr_auto] md:items-start md:gap-10"
            >
              <span className="text-sm font-bold text-accent md:pt-2">
                {discipline.index}
              </span>

              <div>
                <h3 className="text-(length:--text-display) font-extrabold group-hover:text-accent-ink">
                  {discipline.name}
                </h3>
                <p className="measure-wide mt-3 text-(length:--text-lead) font-semibold">
                  {discipline.headline}
                </p>
                <p className="measure-wide mt-3 text-ink-soft">
                  {discipline.body[0]}
                </p>
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
