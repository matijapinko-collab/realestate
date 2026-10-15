import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ServiceList, Boundaries } from "@/components/sections/ServiceList";
import { PackageTable } from "@/components/sections/PackageTable";
import { DevPackageCard } from "@/components/sections/DevPackageCard";
import { ClosingContact } from "@/components/sections/ClosingContact";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import { developmentServices, developmentBoundaries } from "@/content/services";
import {
  devPackages,
  discoveryNote,
  hostingPlans,
  hostingTerms,
  smallEngagements,
  timelineNote,
  warrantyNote,
} from "@/config/pricing";

const crumbs = [
  { name: "Naslovnica", path: "/" },
  { name: "Usluge", path: "/usluge" },
  { name: "Development", path: "/usluge/development" },
];

export const metadata: Metadata = {
  title: "Development — Next.js webovi, webshopovi i aplikacije",
  description:
    "Next.js webovi, webshopovi i web aplikacije, API integracije i automatizacije, arhitektura sustava te hosting i održavanje. Paketi od 6.500 € + PDV.",
  alternates: { canonical: "/usluge/development" },
};

export default function DevelopmentPage() {
  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <ServiceJsonLd
        name="Razvoj webova, webshopova i web aplikacija"
        description="Next.js razvoj, API integracije i automatizacije, arhitektura sustava te hosting i tehničko održavanje."
        path="/usluge/development"
      />

      <PageHeader
        eyebrow="Development"
        index="01"
        title="Napravimo da radi. I da lijepo izgleda dok radi."
        lead={
          <p>
            Razvijam Next.js webove, webshopove i web aplikacije te ih povezujem
            s katalogom, narudžbama, zalihama i sustavima koje već koristite.
            Hosting i tehničko održavanje dio su ovog područja, ne zasebna
            kategorija.
          </p>
        }
        cta={{ href: "/kontakt", label: "Opišite što trebate razviti" }}
        breadcrumbs={crumbs}
      />

      <Section title="Što radim">
        <ServiceList items={developmentServices} />
      </Section>

      <Section
        id="paketi"
        tone="surface"
        eyebrow="Paketi"
        title="Development paketi"
        lead={timelineNote}
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {devPackages.map((pkg) => (
            <DevPackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>
        <p className="measure-wide mt-8 text-sm text-ink-soft">{warrantyNote}</p>
      </Section>

      <Section
        eyebrow="Manji angažmani"
        title="Kad ne treba cijeli projekt"
        lead={discoveryNote}
      >
        <PackageTable
          rows={smallEngagements.map((item) => ({
            name: item.name,
            price: item.price,
            detail: item.limit,
          }))}
        />
      </Section>

      <Section
        id="hosting"
        tone="surface"
        eyebrow="Infrastruktura"
        title="Hosting i tehničko održavanje"
        lead="Hosting i održavanje dvije su različite stavke. Ovdje vidite obje."
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <PackageTable
            caption="Hosting i upravljano okruženje"
            rows={hostingPlans
              .filter((p) => p.group === "hosting")
              .map((p) => ({
                name: p.name,
                price: p.price,
                detail: p.limit,
                extra: p.infraNote,
              }))}
          />
          <PackageTable
            caption="Održavanje (Care paketi)"
            rows={hostingPlans
              .filter((p) => p.group === "care")
              .map((p) => ({ name: p.name, price: p.price, detail: p.limit }))}
          />
        </div>

        <ul className="measure-wide mt-10 space-y-3 text-sm text-ink-soft">
          {hostingTerms.map((term) => (
            <li key={term} className="flex gap-3">
              <span aria-hidden="true" className="shrink-0 text-accent">
                ·
              </span>
              <span>{term}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tight>
        <Boundaries items={developmentBoundaries} />
      </Section>

      <ClosingContact />
    </>
  );
}
