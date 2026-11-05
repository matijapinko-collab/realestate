import { PriceTag, QuotedTag } from "@/components/ui/Price";
import { isQuoted, type MaybePrice } from "@/config/pricing";

export type PackageRow = {
  name: string;
  price: MaybePrice;
  detail: string;
  extra?: string;
};

/**
 * Price list rendered as a definition-style stack rather than a data table.
 *
 * The brief requires the price, the "+ PDV" marker and the scope limit to stay
 * readable at 360px; a wide table would either overflow or shrink the figures,
 * so the same markup is used at every width and simply gains columns.
 */
export function PackageTable({
  rows,
  caption,
}: {
  rows: PackageRow[];
  caption?: string;
}) {
  return (
    <div>
      {caption ? (
        <p className="mb-5 text-sm text-ink-soft">{caption}</p>
      ) : null}
      <ul className="overflow-hidden rounded-(--radius-card) border border-rule">
        {rows.map((row, i) => (
          <li
            key={row.name}
            className={`bg-surface p-6 md:p-7 ${
              i > 0 ? "border-t border-rule" : ""
            }`}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
              <h3 className="text-lg font-extrabold sm:text-xl">{row.name}</h3>
              <div className="shrink-0">
                {isQuoted(row.price) ? (
                  <QuotedTag label={row.price.quoted} />
                ) : (
                  <PriceTag price={row.price} />
                )}
              </div>
            </div>
            <p className="mt-3 text-ink-soft">{row.detail}</p>
            {row.extra ? (
              <p className="mt-2 text-sm text-ink-soft">{row.extra}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
