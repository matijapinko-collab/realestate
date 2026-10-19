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

/**
 * The two worlds get different titles. The light one follows its own
 * punctuation rule, which forbids the em dash in anything a visitor reads,
 * and a page title is read in the tab and in search results. A crawler
 * arrives without the cookie and therefore sees the dark world's title,
 * which is the default world.
 */
export async function generateMetadata(): Promise<Metadata> {
  if ((await getTheme()) === "light") {
    return {
      title: "Matija Pinko, digitalni razvoj, marketing i poslovni sustavi",
      description:
        "Razvoj webova, webshopova i aplikacija, digitalni marketing i poslovni procesi. Projekti, pristup i način suradnje.",
      alternates: { canonical: "/" },
    };
  }

  return {
    title: "Pinko — Razvoj. Marketing. Posao koji ide dalje.",
    description:
      "Matija Pinko razvija Next.js webove, webshopove i aplikacije te povezuje sadržaj, automatizacije i poslovne procese. Projekti najčešće 5.000–15.000 € + PDV.",
    alternates: { canonical: "/" },
  };
}

export default async function HomePage() {
  // One URL, two worlds. The server renders the chosen one; rendering both
  // and hiding one would put every sentence in the page twice.
  if ((await getTheme()) === "light") {
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
