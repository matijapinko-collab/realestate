import type { ReactNode } from "react";

/**
 * A page section with the shared vertical rhythm.
 * `eyebrow` is rendered above the heading and is purely decorative text.
 */
export function Section({
  id,
  eyebrow,
  index,
  title,
  lead,
  children,
  tone = "paper",
  tight = false,
  ruled = false,
}: {
  id?: string;
  eyebrow?: string;
  index?: string;
  title?: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  tone?: "paper" | "surface" | "ink";
  tight?: boolean;
  ruled?: boolean;
}) {
  const tones = {
    paper: "",
    surface: "bg-surface",
    ink: "bg-accent-wash",
  } as const;

  return (
    <section
      id={id}
      className={`${tones[tone]} ${tight ? "section-tight" : "section"}`}
    >
      <div className="wrap">
        {ruled ? <hr className="mb-12 border-0 hairline" /> : null}
        <div className="section-head">
        {(eyebrow || index) && (
          <p className="mono-label mb-5 flex items-baseline gap-3 font-semibold text-ink-soft">
            {index ? <span className="text-accent">{index}</span> : null}
            {eyebrow ? <span>{eyebrow}</span> : null}
          </p>
        )}
        {title ? (
          <h2
            data-reveal
            className="max-w-[22ch] text-(length:--text-display) font-extrabold"
          >
            {title}
          </h2>
        ) : null}
        {lead ? (
          <div
            data-reveal
            data-reveal-delay="1"
            className="measure-wide mt-5 text-(length:--text-lead) text-ink-soft"
          >
            {lead}
          </div>
        ) : null}
        </div>
        {children ? <div className={title || lead ? "mt-12" : ""}>{children}</div> : null}
      </div>
    </section>
  );
}
