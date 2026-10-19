import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileMenu } from "@/components/layout/MobileMenu";

/**
 * The light world's navigation.
 *
 * Its own labels and its own composition: a hairline bar on the paper
 * colour, the wordmark set in the editorial face, and one filled pill for
 * the only action that matters. The terminal clock and the monospace
 * chrome stay in the dark world, where they mean something.
 *
 * Croatian for everything a visitor has to act on, English only where an
 * editorial label genuinely reads better — the brief's rule, and the
 * reason the links are not "Work / Expertise / About".
 */

const LINKS = [
  { href: "/projekti", label: "Projekti" },
  { href: "/usluge", label: "Usluge" },
  { href: "/o-meni", label: "O meni" },
  { href: "/kako-radim", label: "Pristup" },
];

export function LightNavigation() {
  return (
    <header className="light-world sticky top-0 z-40 border-b border-[color-mix(in_srgb,var(--lw-ink)_14%,transparent)] bg-[var(--lw-paper)]/90 backdrop-blur-md">
      <div className="lw-wrap flex h-16 items-center justify-between gap-6 md:h-20">
        <Link href="/" className="text-2xl font-semibold tracking-tight">
          pink<span className="text-[#c2185b]">o</span>.
        </Link>

        <nav aria-label="Glavna navigacija" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="lw-navlink text-[0.9375rem] font-medium"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle className="hidden sm:inline-flex" />
          <Link href="/kontakt" className="lw-pill hidden sm:inline-flex">
            Razgovarajmo <span aria-hidden="true">↗</span>
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
