import { Section } from "@/components/ui/Section";
import { faq } from "@/content/copy";

/**
 * FAQ built on <details>/<summary>: it works with the keyboard, works with no
 * JavaScript at all, and the answers stay in the HTML for crawlers.
 *
 * No FAQPage structured data here: the brief says to write the answers for
 * usefulness without promising any particular appearance in search results.
 */
export function Faq({
  tone = "paper",
  title = "Pitanja koja biste me ionako pitali.",
}: {
  tone?: "paper" | "surface";
  title?: string;
}) {
  return (
    <Section eyebrow="FAQ" title={title} tone={tone}>
      <ul className="border-t border-rule">
        {faq.map((item) => (
          <li key={item.question} className="border-b border-rule">
            <details className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-(length:--text-lead) font-semibold marker:content-none hover:text-accent-ink">
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-accent transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="measure-wide pb-6 text-ink-soft">{item.answer}</p>
            </details>
          </li>
        ))}
      </ul>
    </Section>
  );
}
