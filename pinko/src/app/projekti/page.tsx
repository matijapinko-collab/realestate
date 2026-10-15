import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ClosingContact } from "@/components/sections/ClosingContact";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import {
  getPublishedProjects,
  relationshipLabels,
  statusLabels,
} from "@/content/projects";

const crumbs = [
  { name: "Naslovnica", path: "/" },
  { name: "Projekti", path: "/projekti" },
];

export const metadata: Metadata = {
  title: "Projekti — što sam radio i kakav je bio doprinos",
  description:
    "Odobreni projekti s točnim opisom doprinosa i statusa. Bez izmišljenih rezultata, logotipa i izjava.",
  alternates: { canonical: "/projekti" },
};

export default function ProjectsPage() {
  const projects = getPublishedProjects();

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />

      <PageHeader
        eyebrow="Projekti"
        title="Konkretan rad, s konkretnim doprinosom."
        lead={
          <p>
            Uz svaki projekt piše kakav je bio odnos, što sam točno radio i u
            kojem je statusu. Bez postotaka rasta koje nitko nije provjerio i
            bez tuđih logotipa dok ih nisam dobio i smio objaviti.
          </p>
        }
        breadcrumbs={crumbs}
      />

      <Section>
        {projects.length === 0 ? (
          <div className="measure-wide rounded-(--radius-card) border border-dashed border-rule bg-surface p-7 md:p-10">
            <h2 className="text-(length:--text-title) font-extrabold">
              Projektne priče čekaju potvrdu.
            </h2>
            <p className="mt-4 text-(length:--text-lead) text-ink-soft">
              Sadržaj je napisan, ali svaki projekt prije objave treba potvrdu
              statusa, opsega doprinosa i prava objave. Dok to ne bude gotovo,
              ovdje radije ne stoji ništa nego nešto neprovjereno.
            </p>
            <p className="mt-4 text-ink-soft">
              Ako vas zanima primjer iz vašeg područja, pitajte me izravno —
              reći ću vam što sam radio i što od toga smijem pokazati.
            </p>
            <ButtonLink href="/kontakt" className="mt-7">
              Pitajte za primjer
            </ButtonLink>
          </div>
        ) : (
          <ul className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/projekti/${project.slug}`}
                  className="group flex h-full flex-col rounded-(--radius-card) border border-rule bg-surface p-7 transition-colors hover:border-ink"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-(--radius-pill) bg-accent-wash px-2.5 py-1 text-xs font-semibold text-accent-ink">
                      {relationshipLabels[project.relationshipType]}
                    </span>
                    <span className="rounded-(--radius-pill) border border-rule px-2.5 py-1 text-xs font-semibold text-ink-soft">
                      {statusLabels[project.status]}
                    </span>
                  </div>
                  <h2 className="mt-5 text-(length:--text-title) font-extrabold group-hover:text-accent-ink">
                    {project.projectName}
                  </h2>
                  <p className="mt-2 text-sm font-semibold text-ink-soft">
                    {project.contributionLabel}
                  </p>
                  <p className="mt-4 text-ink-soft">{project.summary}</p>
                  <span className="mt-auto pt-6 text-sm font-semibold text-accent-ink">
                    Pogledajte projekt{" "}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <ClosingContact />
    </>
  );
}
