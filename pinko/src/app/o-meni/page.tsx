import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ClosingContact } from "@/components/sections/ClosingContact";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { bioLong, principles } from "@/content/copy";
import {
  additionalWork,
  career,
  careerDisclaimer,
  experienceAreas,
} from "@/content/career";

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
        <ol className="relative space-y-px border-l border-rule pl-6 md:pl-10">
          {career.map((entry) => (
            <li
              key={`${entry.organisation}-${entry.period}`}
              className="relative pb-10"
            >
              {/* Marker on the timeline; current roles get the accent. */}
              <span
                aria-hidden="true"
                className={`absolute top-2 -left-[1.8125rem] size-2.5 rounded-full md:-left-[2.8125rem] ${
                  entry.highlight ? "bg-accent" : "bg-control"
                }`}
              />
              <p className="mono-label text-ink-soft">{entry.period}</p>
              <h3 className="mt-2 text-(length:--text-title) font-extrabold">
                {entry.role}
              </h3>
              <p className="mt-1 font-semibold text-accent">
                {entry.organisation}
              </p>
              <p className="measure-wide mt-3 text-ink-soft">{entry.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <li
                    key={tag}
                    className="mono-label rounded-(--radius-pill) border border-rule px-2.5 py-1 text-ink-soft"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div className="mt-4 rounded-(--radius-card) border border-rule bg-surface p-6 md:p-8">
          <h3 className="text-lg font-extrabold">Još rada uz navedeno</h3>
          <p className="measure-wide mt-2 text-ink-soft">
            Bez datuma, jer ih nikad nismo potvrdili — stoje ovdje da se ne
            izgube, a ne kao zaokružena priča.
          </p>
          <ul className="mt-5 grid gap-px overflow-hidden rounded-(--radius-card) border border-rule bg-rule md:grid-cols-2">
            {additionalWork.map((item) => (
              <li key={item.organisation} className="bg-raised p-5">
                <h4 className="font-extrabold">{item.organisation}</h4>
                <p className="mt-1.5 text-sm text-ink-soft">{item.what}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <ClosingContact />
    </>
  );
}
