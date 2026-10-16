import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
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

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <Hero />
      <CapabilityMarquee />
      <ProofOfWork />
      <Disciplines />
      <AboutMatija />
      <Process />
      <PricingPreview />
      <Infrastructure />
      <Faq />
      <ClosingContact />
    </>
  );
}
