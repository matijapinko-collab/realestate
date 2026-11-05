/**
 * A slow strip of what the work actually touches.
 *
 * Pure CSS: the list is written twice so the loop has no seam, and the
 * duplicate is hidden from assistive technology. It pauses on hover, and
 * stops entirely for a visitor who asked for reduced motion.
 */
const CAPABILITIES = [
  "Next.js",
  "Webshopovi",
  "WordPress kao backend",
  "Plaćanja",
  "Dostava i paketomati",
  "Integracije",
  "Automatizacije",
  "Google Merchant",
  "GA4 i GTM",
  "Sadržaj koji prodaje",
  "Poslužitelji i deployment",
  "Brzina i Core Web Vitals",
];

function Strip({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {CAPABILITIES.map((item) => (
        <li
          key={item}
          className="mono-label flex items-center gap-8 px-8 py-4 text-ink-soft"
        >
          {item}
          <span aria-hidden="true" className="text-accent">
            /
          </span>
        </li>
      ))}
    </ul>
  );
}

export function CapabilityMarquee() {
  return (
    <div className="marquee border-y border-rule bg-surface">
      <div>
        <Strip />
        <Strip hidden />
      </div>
    </div>
  );
}
