import type { ReactNode } from "react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export function PageHeader({
  eyebrow,
  index,
  title,
  lead,
  cta,
  breadcrumbs,
  titleClassName,
}: {
  eyebrow: string;
  index?: string;
  title: string;
  /** Extra classes on the h1, for a per-page motif. */
  titleClassName?: string;
  lead: ReactNode;
  cta?: { href: string; label: string };
  breadcrumbs?: { name: string; path: string }[];
}) {
  return (
    <header className="border-b border-rule bg-surface">
      <div className="wrap pt-10 pb-14 md:pt-14 md:pb-20">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav aria-label="Putanja" className="mb-8">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-soft">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.path} className="flex items-center gap-2">
                  {i > 0 ? (
                    <span aria-hidden="true" className="text-rule">
                      /
                    </span>
                  ) : null}
                  {i === breadcrumbs.length - 1 ? (
                    <span aria-current="page" className="font-semibold text-ink">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.path}
                      className="hover:text-accent-ink hover:underline underline-offset-4"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <p className="flex items-baseline gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
          {index ? <span className="text-accent">{index}</span> : null}
          <span>{eyebrow}</span>
        </p>

        <h1
          className={`mt-5 max-w-[18ch] text-(length:--text-hero) font-extrabold${
            titleClassName ? ` ${titleClassName}` : ""
          }`}
          data-text={title}
        >
          {title}
        </h1>

        <div className="measure-wide mt-7 text-(length:--text-lead) text-ink-soft">
          {lead}
        </div>

        {cta ? (
          <ButtonLink href={cta.href} size="lg" className="mt-9">
            {cta.label}
          </ButtonLink>
        ) : null}
      </div>
    </header>
  );
}
