import type { Metadata } from "next";
import { getTheme } from "@/lib/theme";
import { LightHome } from "@/components/light/LightHome";
import { Hero } from "@/components/sections/Hero";
import { FactsStrip } from "@/components/sections/FactsStrip";
import { CapabilityMarquee } from "@/components/sections/CapabilityMarquee";
import { ProofOfWork } from "@/components/sections/ProofOfWork";
import { Disciplines } from "@/components/sections/Disciplines";
import { AboutMatija } from "@/components/sections/AboutMatija";
import { Process } from "@/components/sections/Process";
import { PricingPreview } from "@/components/sections/PricingPreview";
import { Infrastructure } from "@/components/sections/Infrastructure";
import { Faq } from "@/components/sections/Faq";
import { ClosingContact } from "@/components/sections/ClosingContact";
import { PersonJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Pinko — Razvoj. Marketing. Posao koji ide dalje.",
  description:
    "Matija Pinko razvija Next.js webove, webshopove i aplikacije te povezuje sadržaj, automatizacije i poslovne procese. Projekti najčešće 5.000–15.000 € + PDV.",
  alternates: { canonical: "/" },
};

/**
 * One URL, two worlds.
 *
 * The server reads the theme cookie and renders that world's tree — not
 * both with one hidden, which would put every sentence in the page twice.
 * Someone who has never chosen gets the dark world, which is also what the
 * pill chooser opens over.
 */
export default async function HomePage() {
  const theme = await getTheme();

  if (theme === "light") {
    return (
      <>
        <PersonJsonLd />
        <LightHome />
      </>
    );
  }

  return (
    <>
      <PersonJsonLd />
      <Hero />
      <FactsStrip />
      <CapabilityMarquee />
      <Disciplines />
      <ProofOfWork />
      <AboutMatija />
      <Process />
      <PricingPreview />
      <Infrastructure />
      <Faq />
      <ClosingContact />
    </>
  );
}
