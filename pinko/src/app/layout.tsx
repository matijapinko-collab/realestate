import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionLayer } from "@/components/ui/MotionLayer";

/**
 * Manrope, served from our own origin. Both files are variable (400–800) and
 * `latin-ext` carries the Croatian diacritics (č ć đ š ž).
 */
const manrope = localFont({
  src: [
    {
      path: "./fonts/manrope-latin.woff2",
      weight: "400 800",
      style: "normal",
    },
    {
      path: "./fonts/manrope-latin-ext.woff2",
      weight: "400 800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-manrope",
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.person }],
  creator: site.person,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "hr_HR",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  // Staging must stay out of the index until the canonical domain is decided.
  robots: site.allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  themeColor: "#fafaf7",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={site.lang} className={manrope.variable}>
      <body className="font-sans">
        <a
          href="#sadrzaj"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-on-accent"
        >
          Preskoči na sadržaj
        </a>
        <MotionLayer />
        <Header />
        <main id="sadrzaj">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
