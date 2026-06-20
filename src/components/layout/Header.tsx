"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  const otherLocale = locale === "hr" ? "en" : "hr";
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    {
      href: `/${locale}/${locale === "hr" ? "o-meni" : "about-me"}`,
      label: t("about"),
    },
    {
      href: `/${locale}/${locale === "hr" ? "nekretnine" : "properties"}`,
      label: t("properties"),
    },
    { href: `/${locale}/blog`, label: t("blog") },
    {
      href: `/${locale}/${locale === "hr" ? "kako-radim" : "how-i-work"}`,
      label: t("howIWork"),
    },
    {
      href: `/${locale}/${locale === "hr" ? "kontakt" : "contact"}`,
      label: t("contact"),
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <span className="font-playfair text-xl font-bold text-[#1A1A1A]">
              Matija Pinko
            </span>
            <span className="hidden sm:block text-xs text-[#D4AF37] font-medium uppercase tracking-widest">
              Nekretnine
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[#D4AF37]",
                  pathname === link.href
                    ? "text-[#D4AF37]"
                    : "text-[#1A1A1A]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <Link
              href={switchPath}
              className="text-xs font-semibold uppercase tracking-widest text-[#1A1A1A] hover:text-[#D4AF37] transition-colors"
            >
              {otherLocale.toUpperCase()}
            </Link>
            <Link
              href={`/${locale}/${locale === "hr" ? "kontakt" : "contact"}`}
              className="hidden lg:inline-flex items-center px-5 py-2.5 bg-[#D4AF37] text-white text-sm font-semibold rounded-none hover:bg-[#B8972E] transition-colors"
            >
              {locale === "hr" ? "Kontakt" : "Contact"}
            </Link>
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "py-3 text-sm font-medium border-b border-gray-50 transition-colors hover:text-[#D4AF37]",
                  pathname === link.href
                    ? "text-[#D4AF37]"
                    : "text-[#1A1A1A]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
