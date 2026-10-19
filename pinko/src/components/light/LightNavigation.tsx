import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { lightFooter } from "@/content/light-copy";

/**
 * The light world's navigation: a hairline bar on the paper colour, the
 * wordmark in the editorial face, and one filled action. No terminal
 * clock, no monospace chrome; those belong to the dark world.
 */
export function LightNavigation() {
  const links = lightFooter.links.filter((l) => l.href !== "/kontakt");

  return (
    <header className="pl sticky top-0 z-40 border-b border-[var(--pl-rule)] bg-[var(--pl-paper)]/92 backdrop-blur-md">
      <div className="pl-wrap flex h-16 items-center justify-between gap-6 md:h-20">
        <Link href="/" className="text-2xl font-semibold tracking-tight">
          pink<span className="text-[#c2185b]">o</span>.
        </Link>

        <nav aria-label="Glavna navigacija" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {links.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[0.9375rem] font-medium">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle className="hidden sm:inline-flex" />
          <Link href="/kontakt" className="pl-btn hidden sm:inline-flex">
            Razgovarajmo
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
