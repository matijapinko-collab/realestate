import type { ReactNode } from "react";

/**
 * A headline whose words rise into place from behind a mask.
 *
 * The split happens on the server, so the text is in the HTML as text — a
 * crawler and a screen reader see one ordinary heading. The animation is
 * only the transform the stylesheet puts on each word, and it only applies
 * once motion is allowed.
 *
 * Pass `strike` to have one word struck through after the line lands, the
 * way the reference crosses out the word it is rejecting.
 */
export function SplitLines({
  lines,
  strike,
  className,
  as: Tag = "span",
}: {
  lines: string[];
  strike?: string;
  className?: string;
  as?: "span" | "div";
}) {
  let index = 0;

  return (
    <Tag data-reveal data-split className={className}>
      {lines.map((line, lineIndex) => (
        <span key={line} className="split-line">
          {/* A line break is visual only; without this space the heading's
              text reads as one run-together word to a screen reader and to
              a crawler — "korakzaslužuje" rather than "korak zaslužuje". */}
          {lineIndex > 0 ? " " : null}
          {line.split(" ").map((word, wordIndex) => {
            const i = index++;
            return (
              <span
                key={`${word}-${wordIndex}`}
                className="split-word"
                style={{ "--word-index": i } as React.CSSProperties}
              >
                <span className={word === strike ? "struck" : undefined}>
                  {word}
                </span>
                {wordIndex < line.split(" ").length - 1 ? " " : null}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

/** Same treatment for arbitrary children that are already one line. */
export function SplitLine({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span data-reveal data-split className={className}>
      <span className="split-line">
        <span className="split-word">{children}</span>
      </span>
    </span>
  );
}
