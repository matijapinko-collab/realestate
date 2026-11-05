import type { ServiceItem } from "@/content/services";

export function ServiceList({ items }: { items: ServiceItem[] }) {
  // The hairline grid is drawn with a 1px gap over a ruled background. With an
  // odd number of items the last cell would stay empty and show as a grey
  // block, so it is filled with a blank surface tile.
  const needsFiller = items.length % 2 === 1;

  return (
    <ol className="grid gap-px overflow-hidden rounded-(--radius-card) border border-rule bg-rule md:grid-cols-2">
      {items.map((item, i) => (
        <li key={item.title} className="flex flex-col bg-surface p-6 md:p-7">
          <span className="text-sm font-bold text-accent">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 text-xl font-extrabold">{item.title}</h3>
          <p className="mt-3 text-ink-soft">{item.body}</p>
        </li>
      ))}
      {needsFiller ? (
        <li aria-hidden="true" className="hidden bg-surface md:block" />
      ) : null}
    </ol>
  );
}

export function Boundaries({
  items,
  title = "Što ovdje ne obećavam",
}: {
  items: string[];
  title?: string;
}) {
  return (
    <div className="rounded-(--radius-card) border border-rule bg-accent-wash p-7 md:p-9">
      <h3 className="text-(length:--text-title) font-extrabold">{title}</h3>
      <ul className="mt-5 space-y-3.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-ink-soft">
            <span aria-hidden="true" className="mt-0.5 shrink-0 text-accent-ink">
              ·
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
