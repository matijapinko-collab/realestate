import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ServiceList, Boundaries } from "@/components/sections/ServiceList";
import { PriceTag } from "@/components/ui/Price";
import { ClosingContact } from "@/components/sections/ClosingContact";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import { bizDevServices, bizDevBoundaries } from "@/content/services";
import { bizDevPackages } from "@/config/pricing";

const crumbs = [
  { name: "Naslovnica", path: "/" },
  { name: "Usluge", path: "/usluge" },
  { name: "Business Development", path: "/usluge/business-development" },
];

export const metadata: Metadata = {
  title: "Business Development — audit, plan rasta i vođenje razvoja",
  description:
    "Digitalni poslovni audit, plan rasta za 90 dana, ekonomika e-commercea, ERP/CRM blueprint i vanjski voditelj digitalnog razvoja. Od 1.500 € + PDV.",
  alternates: { canonical: "/usluge/business-development" },
};

export default function BusinessDevelopmentPage() {
  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <ServiceJsonLd
        name="Digitalni poslovni audit, plan rasta i vođenje razvoja"
        description="Audit, prioriteti, ekonomika kanala, specifikacija ERP/CRM integracija i vođenje digitalnog razvoja."
        path="/usluge/business-development"
      />

      <PageHeader
        eyebrow="Business Development"
        index="03"
        title="Prvo posložimo što ima smisla razvijati."
        lead={
          <p>
            Krenimo s onim što vam sada radi najveću gužvu. Prije nego krenemo
            trošiti vrijeme i budžet, treba znati što razvijati, kojim redom i s
            kojom ekonomikom.
          </p>
        }
        cta={{ href: "/kontakt", label: "Pogledajmo širu sliku" }}
        breadcrumbs={crumbs}
      />

      <Section title="Što radim">
        <ServiceList items={bizDevServices} />
      </Section>

      <Section
        id="paketi"
        tone="surface"
        eyebrow="Paketi"
        title="Business Development paketi"
        lead="Sve cijene su bez PDV-a. Cijena paketa nije obećanje određenog prometa ili povrata ulaganja."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {bizDevPackages.map((pkg) => (
            <article
              key={pkg.slug}
              className="flex flex-col rounded-(--radius-card) border border-rule bg-paper p-7"
            >
              <h3 className="text-(length:--text-title) font-extrabold">
                {pkg.name}
              </h3>
              <div className="mt-4">
                <PriceTag price={pkg.price} />
              </div>

              <dl className="mt-6 space-y-4 border-t border-rule pt-6 text-sm">
                <div>
                  <dt className="font-semibold">Za koga je</dt>
                  <dd className="mt-1 text-ink-soft">{pkg.forWhom}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Što se isporučuje</dt>
                  <dd className="mt-1 text-ink-soft">{pkg.delivers}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Što slijedi</dt>
                  <dd className="mt-1 text-ink-soft">{pkg.next}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </Section>

      <Section tight>
        <Boundaries items={bizDevBoundaries} />
      </Section>

      <ClosingContact />
    </>
  );
}
