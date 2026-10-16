import Link from "next/link";
import { disciplines, nav, site } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule bg-surface">
      <div className="wrap section-tight">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <span className="text-3xl font-extrabold tracking-tight">
              pinko<span className="text-accent">.</span>
            </span>
            <p className="measure mt-4 text-ink-soft">{site.description}</p>
            <p className="mt-6 text-sm font-semibold">{site.promise}</p>
          </div>

          <nav aria-label="Usluge">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
              Usluge
            </h2>
            <ul className="mt-4 space-y-2.5">
              {disciplines.map((d) => (
                <li key={d.href}>
                  <Link
                    href={d.href}
                    className="font-medium hover:text-accent-ink hover:underline underline-offset-4"
                  >
                    {d.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
              Kontakt
            </h2>
            <ul className="mt-4 space-y-2.5">
              {site.contact.email ? (
                <li>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="font-medium hover:text-accent-ink hover:underline underline-offset-4"
                  >
                    {site.contact.email}
                  </a>
                </li>
              ) : null}
              {site.contact.phone ? (
                <li>
                  <a
                    href={`tel:${site.contact.phoneHref}`}
                    className="font-medium hover:text-accent-ink hover:underline underline-offset-4"
                  >
                    {site.contact.phone}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <nav aria-label="Stranice">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
              Stranice
            </h2>
            <ul className="mt-4 space-y-2.5">
              {[...nav.primary, ...nav.secondary].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-medium hover:text-accent-ink hover:underline underline-offset-4"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={nav.cta.href}
                  className="font-medium hover:text-accent-ink hover:underline underline-offset-4"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-rule pt-7 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.person}
            {site.contact.legalName ? ` · ${site.contact.legalName}` : ""}
            {site.contact.oib ? ` · OIB ${site.contact.oib}` : ""}
          </p>
          <p>Sve cijene na webu su bez PDV-a.</p>
        </div>
      </div>
    </footer>
  );
}
