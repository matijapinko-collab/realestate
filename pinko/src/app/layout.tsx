import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { LightNavigation } from "@/components/light/LightNavigation";
import { getTheme } from "@/lib/theme";
import { Footer } from "@/components/layout/Footer";
import { MotionLayer } from "@/components/ui/MotionLayer";
import { Intro } from "@/components/ui/Intro";
import { PillChoice } from "@/components/ui/PillChoice";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Wormhole } from "@/components/ui/Wormhole";

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
  themeColor: "#0a0c11",
  colorScheme: "dark light",
};

/**
 * Keeps the client in step with the world the server already rendered.
 *
 * This script used to read localStorage and set `data-theme` from it. That
 * was fine while both worlds were one markup tree in two skins. It stopped
 * being fine the moment they became different trees: the server picks the
 * tree from the COOKIE, and a visitor whose localStorage disagreed got one
 * world's markup wearing the other world's tokens. That is exactly how the
 * dark site broke on 19 Oct 2026.
 *
 * So there is now one source of truth, the cookie, and this script never
 * contradicts it. If a cookie exists the server already used it and there
 * is nothing to do. If it does not but localStorage remembers a choice,
 * the choice is written to the cookie and the attribute is left alone, so
 * markup and tokens stay in agreement; the chosen world arrives on the
 * next navigation rather than as a broken hybrid on this one.
 */
const themeScript = `try{var m=document.cookie.match(/(?:^|; )pinko-theme=(dark|light)/);if(!m){var t=localStorage.getItem("pinko-theme");if(t==="light"||t==="dark"){document.cookie="pinko-theme="+t+"; path=/; max-age=31536000; SameSite=Lax"+(location.protocol==="https:"?"; Secure":"")}}}catch(e){}`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The two worlds have different navigation and footers, so the layout
  // has to know which it is rendering. The cookie makes pages render per
  // request; with no database behind them that costs a few milliseconds
  // and buys the right world in the first byte, with no flash.
  const theme = await getTheme();

  return (
    <html
      lang={site.lang}
      className={manrope.variable}
      data-theme={theme}
      // The inline script below rewrites this before React hydrates; that is
      // the point of it, so the difference is expected rather than a bug.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Plausible: cookie-free and aggregate-only, which is why it loads
            unconditionally instead of behind a consent banner. It is omitted
            entirely while no domain is configured, so development and
            preview builds never report into the real figures. */}
        {site.analytics.domain ? (
          <script
            defer
            data-domain={site.analytics.domain}
            src={site.analytics.src}
          />
        ) : null}
      </head>
      <body className="font-sans">
        <a
          href="#sadrzaj"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-on-accent"
        >
          Preskoči na sadržaj
        </a>
        <PillChoice />
        <Intro />
        <Wormhole />
        <MotionLayer />
        <SmoothScroll />
        {/* Decorative rail down the left edge; light mode only. */}
        <div aria-hidden="true" className="side-rail" />
        <div aria-hidden="true" className="rail-dot" />
        {theme === "light" ? <LightNavigation /> : <Header />}
        <main id="sadrzaj">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
