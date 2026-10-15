import { formatEur } from "@/lib/money";
import type { Price as PriceValue } from "@/config/pricing";

/**
 * Renders a published price. Every price on the site carries "+ PDV" next to
 * it or next to its group — the brief requires it and it must survive at
 * 360px, so the VAT marker never floats away from the number.
 */
export function PriceTag({
  price,
  size = "md",
  showVat = true,
}: {
  price: PriceValue;
  size?: "sm" | "md" | "lg";
  showVat?: boolean;
}) {
  const sizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-(length:--text-title)",
  } as const;

  const unit =
    price.unit === "mj" ? "/mj." : price.unit === "h" ? "/h" : null;

  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
      {price.from ? (
        <span className="text-sm font-medium text-ink-soft">od</span>
      ) : null}
      <span className={`${sizes[size]} font-extrabold tracking-tight`}>
        {formatEur(price.amount)}
        {unit ? (
          <span className="text-[0.6em] font-bold text-ink-soft">{unit}</span>
        ) : null}
      </span>
      {showVat ? (
        <span className="text-sm font-medium text-ink-soft">+ PDV</span>
      ) : null}
    </span>
  );
}

export function QuotedTag({ label }: { label: string }) {
  return (
    <span className="text-lg font-bold text-ink-soft">{label}</span>
  );
}
