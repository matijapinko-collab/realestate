import Link from "next/link";

/**
 * The wordmark "pinko." — the "o" is pink and the dot is the personal motif
 * (brief 9.1). This is a proposed wordmark, not an approved existing logo.
 *
 * The pink is a token with a value per scheme, because one shade cannot sit
 * on both papers: #ff6bb3 reads at 7.46:1 on the dark one, #c2185b at 5.16:1
 * on the light one. The word stays one accessible name for screen readers;
 * only the letter is coloured.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-baseline text-2xl font-extrabold tracking-tight ${className}`}
      aria-label="Pinko — naslovnica"
    >
      <span aria-hidden="true">
        pink<span className="text-(--color-brand-pink)">o</span>
      </span>
      <span
        aria-hidden="true"
        className="ml-px text-accent transition-transform duration-200 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:translate-y-px"
      >
        .
      </span>
    </Link>
  );
}
