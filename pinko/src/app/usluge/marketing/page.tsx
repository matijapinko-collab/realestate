import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ServiceList, Boundaries } from "@/components/sections/ServiceList";
import { PackageTable } from "@/components/sections/PackageTable";
import { ClosingContact } from "@/components/sections/ClosingContact";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import { marketingServices, marketingBoundaries } from "@/content/services";
import {
  marketingAddOns,
  marketingPackages,
  marketingTerms,
} from "@/config/pricing";

const crumbs = [
  { name: "Naslovnica", path: "/" },
  { name: "Usluge", path: "/usluge" },
  { name: "Marketing", path: "/usluge/marketing" },
];

export const metadata: Metadata = {
  title: "Marketing — SEO, sadržaj, email, Amazon i Temu",
  description:
    "SEO strategija i sadržaj, email marketing i automatizirani tokovi te Amazon i Temu kao prodajni kanali. Paketi od 950 € + PDV.",
  alternates: { canonical: "/usluge/marketing" },
};

export default function MarketingPage() {
  const oneOff = marketingPackages.filter((p) => p.price.unit !== "mj");
  const monthly = marketingPackages.filter((p) => p.price.unit === "mj");

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <ServiceJsonLd
        name="SEO, sadržaj, email marketing i prodajni kanali"
        description="SEO strategija i sadržaj, email marketing i automatizacije te Amazon i Temu kao prodajni kanali."
        path="/usluge/marketing"
      />

      <PageHeader
        eyebrow="Marketing"
        index="02"
        title="Dobar proizvod zaslužuje da ga netko i pronađe."
        lead={
          <p>
            Vaši proizvodi imaju što reći. Posložimo im nastup: strukturu koju
            tražilice razumiju, sadržaj koji objašnjava ponudu jezikom kupca i
            email tokove koji rade i kad vi ne radite.
          </p>
        }
        cta={{ href: "/kontakt", label: "Posložimo sljedeći korak" }}
        breadcrumbs={crumbs}
      />

      <Section title="Što radim">
        <ServiceList items={marketingServices} />
      </Section>

      <Section
        id="paketi"
        tone="surface"
        eyebrow="Paketi"
        title="Marketing paketi"
        lead="Sve cijene su bez PDV-a. Svaki paket ima jasno naveden početni opseg — sve iznad toga procjenjujemo prije rada."
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <PackageTable
            caption="Jednokratno i projektno"
            rows={oneOff.map((p) => ({
              name: p.name,
              price: p.price,
              detail: p.scope,
            }))}
          />
          <div className="space-y-10">
            <PackageTable
              caption="Mjesečna suradnja"
              rows={monthly.map((p) => ({
                name: p.name,
                price: p.price,
                detail: p.scope,
              }))}
            />
            <PackageTable
              caption="Dodaci"
              rows={marketingAddOns.map((p) => ({
                name: p.name,
                price: p.price,
                detail: p.scope,
              }))}
            />
          </div>
        </div>

        <ul className="measure-wide mt-10 space-y-3 text-sm text-ink-soft">
          {marketingTerms.map((term) => (
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
        <Boundaries items={marketingBoundaries} />
      </Section>

      <ClosingContact />
    </>
  );
}
