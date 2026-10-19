import type { Metadata } from "next";
import { getTheme } from "@/lib/theme";
import { LightProjects } from "@/components/light/LightProjects";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ClosingContact } from "@/components/sections/ClosingContact";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { getPublishedProjects } from "@/content/projects";

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

export default async function ProjectsPage() {
  // One URL, two worlds. The server renders the chosen one; see
  // src/lib/theme.ts for why this is a cookie and not CSS.
  if ((await getTheme()) === "light") return <LightProjects />;


  const projects = getPublishedProjects();

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />

      <PageHeader
        eyebrow="Projekti"
        title="Nisam rekao da znam ovaj posao. Dobro, jesam. Al evo dokaza."
        lead={
          <>
            <p>
              Od webova i webshopova do milijunskih content projekata, ERP
              sustava i međunarodnih prodajnih kanala. Ovo su projekti na
              kojima sam radio, problemi koje smo rješavali i moj stvarni
              doprinos.
            </p>
            <p className="mt-4">
              Uz svaki projekt piše kakav je bio odnos, što sam točno radio i u
              kojem je statusu. Bez postotaka rasta koje nitko nije provjerio i
              bez tuđih logotipa dok ih nisam dobio i smio objaviti.
            </p>
          </>
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
            {projects.map((project, index) => (
              <li key={project.slug} data-reveal data-reveal-delay={index}>
                <ProjectCard project={project} tone="surface" />
              </li>
            ))}
          </ul>
        )}
      </Section>

      <ClosingContact />
    </>
  );
}
