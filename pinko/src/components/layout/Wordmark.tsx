import Link from "next/link";

/**
 * The wordmark "pinko." — the dot is the personal motif (brief 9.1).
 * This is a proposed new wordmark, not an approved existing logo.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-baseline text-2xl font-extrabold tracking-tight ${className}`}
      aria-label="Pinko — naslovnica"
    >
      <span>pinko</span>
      <span
        aria-hidden="true"
        className="ml-px text-accent transition-transform duration-200 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:translate-y-px"
      >
        .
      </span>
    </Link>
  );
}
