import Link from "next/link";
import { nav } from "@/config/site";
import { Wordmark } from "./Wordmark";
import { MobileMenu } from "./MobileMenu";

/**
 * Sticky header. It keeps a constant height so it never jumps or covers
 * focused content; only the background gains a hairline once it sticks.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule/70 bg-paper/85 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-6 md:h-18">
        <Wordmark />

        <nav aria-label="Glavna navigacija" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.primary.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-[0.9375rem] font-semibold text-ink-soft transition-colors hover:bg-accent-wash hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={nav.cta.href}
            className="hidden min-h-11 items-center rounded-full bg-accent px-5 text-[0.9375rem] font-semibold text-on-accent transition-colors hover:bg-accent-ink sm:inline-flex"
          >
            {nav.cta.label}
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
