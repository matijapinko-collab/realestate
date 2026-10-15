import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ClosingContact } from "@/components/sections/ClosingContact";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { bioLong, principles } from "@/content/copy";
import { career, careerDisclaimer, experienceAreas } from "@/content/career";

const crumbs = [
  { name: "Naslovnica", path: "/" },
  { name: "O meni", path: "/o-meni" },
];

export const metadata: Metadata = {
  title: "O meni — Matija Pinko",
  description:
    "Matija Pinko: razvoj webova, webshopova i aplikacija, sadržaj i marketing te poslovni razvoj. Iskustvo, način rada i s čime vam mogu pomoći.",
  alternates: { canonical: "/o-meni" },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />

      <PageHeader
        eyebrow="O meni"
        title="Bok, ja sam Matija. Volim kad stvari imaju smisla."
        lead={<p>{bioLong[0]}</p>}
        cta={{ href: "/kontakt", label: "Upoznajmo vaš projekt" }}
        breadcrumbs={crumbs}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="measure-wide space-y-5 text-(length:--text-lead)">
            {bioLong.slice(1).map((paragraph) => (
              <p key={paragraph} className="text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="grid gap-px self-start overflow-hidden rounded-(--radius-card) border border-rule bg-rule">
            {principles.map((principle) => (
              <li key={principle.title} className="bg-surface p-6">
                <h2 className="text-lg font-extrabold">{principle.title}</h2>
                <p className="mt-2 text-ink-soft">{principle.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        tone="surface"
        eyebrow="Iskustvo"
        index="01"
        title="Što dosadašnji rad znači vama"
        lead="Vlasnik webshopa obično ne dolazi s potrebom za „SSR-om”. Dolazi jer je kupnja spora, administracija komplicirana ili zaposlenici ručno prenose podatke."
      >
        <ul className="grid gap-px overflow-hidden rounded-(--radius-card) border border-rule bg-rule md:grid-cols-2">
          {experienceAreas.map((item) => (
            <li key={item.area} className="bg-paper p-6">
              <h3 className="font-extrabold">{item.area}</h3>
              <p className="mt-2 text-ink-soft">{item.meaning}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="Profesionalna biografija"
        index="02"
        title="Odakle dolazi iskustvo"
        lead={careerDisclaimer}
      >
        <ul className="border-t border-rule">
          {career.map((entry) => (
            <li
              key={`${entry.organisation}-${entry.engagement}`}
              className="grid gap-2 border-b border-rule py-6 md:grid-cols-[1fr_1fr_1.4fr] md:items-baseline md:gap-8"
            >
              <h3 className="text-lg font-extrabold">{entry.organisation}</h3>
              <p className="text-sm font-semibold text-accent-ink">
                {entry.engagement}
              </p>
              <p className="text-ink-soft">{entry.what}</p>
            </li>
          ))}
        </ul>
      </Section>

      <ClosingContact />
    </>
  );
}
