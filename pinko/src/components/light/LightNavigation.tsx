import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileMenu } from "@/components/layout/MobileMenu";

/**
 * The light world's navigation.
 *
 * The reference keeps this very quiet: a wordmark on the left, the links
 * set small and unobtrusive, and one dark pill on the right. No terminal
 * clock and no monospace chrome; those belong to the dark world and are
 * part of what makes the two read as different places.
 *
 * The theme switch stays in the bar from the small breakpoint up and moves
 * into the menu panel on phones, where there is no room for it.
 */

const LINKS = [
  { href: "/projekti", label: "Projekti" },
  { href: "/usluge", label: "Usluge" },
  { href: "/o-meni", label: "O meni" },
  { href: "/kako-radim", label: "Kako radim" },
  { href: "/cjenik", label: "Cjenik" },
];

export function LightNavigation() {
  return (
    <header className="lx lx-nav">
      <div className="lx-wrap flex h-18 items-center justify-between gap-8 md:h-22">
        <Link href="/" className="text-[1.6rem] font-semibold tracking-tight">
          pink<span className="text-[#c2185b]">o</span>.
        </Link>

        <nav aria-label="Glavna navigacija" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="lx-nav-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle className="hidden sm:inline-flex" />
          <Link href="/kontakt" className="lx-btn hidden sm:inline-flex">
            Razgovarajmo
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
