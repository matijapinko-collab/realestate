import Link from "next/link";
import { site } from "@/config/site";
import { lightFooter } from "@/content/light-copy";

/**
 * The light world's footer. Business details come from the shared config,
 * so the legal name, address and identifiers are never maintained twice.
 */
export function LightFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="pl border-t border-[var(--pl-rule)]">
      <div className="pl-wrap py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.9fr] lg:gap-16">
          <div>
            <p className="text-2xl font-semibold tracking-tight">
              {lightFooter.name}
            </p>
            <p className="pl-body mt-4 max-w-[36ch]">{lightFooter.tagline}</p>
          </div>

          <nav aria-label="Stranice">
            <ul className="space-y-3">
              {lightFooter.links.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-medium">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-semibold">{lightFooter.prompt}</p>
            <p className="pl-body mt-2">{lightFooter.promptBody}</p>
            <Link href={lightFooter.cta.href} className="pl-btn mt-6">
              {lightFooter.cta.label}
            </Link>
          </div>
        </div>

        <div className="pl-rule mt-14 grid gap-4 pt-8 text-sm md:grid-cols-2">
          <div className="space-y-1 text-[var(--pl-soft)]">
            {site.contact.legalName ? <p>{site.contact.legalName}</p> : null}
            {site.contact.address ? <p>{site.contact.address}</p> : null}
            <p className="flex flex-wrap gap-x-4">
              {site.contact.oib ? <span>OIB {site.contact.oib}</span> : null}
              {site.contact.mbs ? <span>MBS {site.contact.mbs}</span> : null}
            </p>
          </div>
          <div className="space-y-1 text-[var(--pl-soft)] md:text-right">
            <p>
              <a href={`mailto:${site.contact.email}`} className="pl-link">
                {site.contact.email}
              </a>
            </p>
            <p>Sve cijene na webu su bez PDV-a.</p>
            <p>
              {year} {site.person}
            </p>
            <p>
              <Link href="/privatnost">Pravila privatnosti</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
