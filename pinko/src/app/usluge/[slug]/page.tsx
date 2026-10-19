import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ServiceList, Boundaries } from "@/components/sections/ServiceList";
import { PackageTable } from "@/components/sections/PackageTable";
import { DevPackageCard } from "@/components/sections/DevPackageCard";
import { ClosingContact } from "@/components/sections/ClosingContact";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";
import { services, getServiceBySlug } from "@/content/services";
import {
  devPackages,
  discoveryNote,
  hostingPlans,
  hostingTerms,
  smallEngagements,
  timelineNote,
  warrantyNote,
} from "@/config/pricing";

/**
 * One page per service.
 *
 * The four services replaced the three discipline pages with the brief of
 * 19 Oct 2026. The old addresses still resolve: `next.config.ts` redirects
 * them here permanently, so existing links and anything already indexed
 * follow through instead of landing on a 404.
 *
 * The packages, hosting table and small engagements appear on the two
 * development-side services, because that is where their prices actually
 * apply — not on every page for the sake of symmetry.
 */

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.name} — ${service.headline}`,
    // `body` is never empty, but the index signature is checked, so the
    // headline stands in rather than leaving the description undefined.
    description: service.body[0] ?? service.headline,
    alternates: { canonical: `/usluge/${service.slug}` },
  };
}

const WITH_PACKAGES = new Set(["web-stranice-i-aplikacije", "webshopovi"]);

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const crumbs = [
    { name: "Naslovnica", path: "/" },
    { name: "Usluge", path: "/usluge" },
    { name: service.name, path: `/usluge/${service.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <ServiceJsonLd
        name={service.name}
        description={service.body[0] ?? service.headline}
        path={`/usluge/${service.slug}`}
      />

      <PageHeader
        eyebrow={service.name}
        index={service.index}
        title={service.headline}
        lead={
          <>
            {service.body.map((paragraph, i) => (
              <p key={paragraph} className={i > 0 ? "mt-4" : undefined}>
                {paragraph}
              </p>
            ))}
          </>
        }
        cta={{ href: "/kontakt", label: service.cta }}
        breadcrumbs={crumbs}
      />

      <Section title="Što radim">
        <ServiceList items={service.items} />
      </Section>

      {WITH_PACKAGES.has(service.slug) ? (
        <>
          <Section
            id="paketi"
            tone="surface"
            eyebrow="Paketi"
            title="Paketi i okvirne cijene"
            lead={timelineNote}
          >
            <div className="grid gap-5 lg:grid-cols-2">
              {devPackages.map((pkg) => (
                <DevPackageCard key={pkg.slug} pkg={pkg} />
              ))}
            </div>
            <p className="measure-wide mt-8 text-sm text-ink-soft">
              {warrantyNote}
            </p>
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
                  .map((p) => ({
                    name: p.name,
                    price: p.price,
                    detail: p.limit,
                  }))}
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
        </>
      ) : null}

      <Section tight>
        <Boundaries items={service.boundaries} />
      </Section>

      <ClosingContact />
    </>
  );
}
