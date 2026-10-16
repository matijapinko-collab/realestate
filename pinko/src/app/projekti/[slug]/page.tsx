import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ClosingContact } from "@/components/sections/ClosingContact";
import Image from "next/image";
import { LiveScroll } from "@/components/sections/LiveScroll";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import {
  getProjectBySlug,
  getPublishedProjects,
  relationshipLabels,
  statusLabels,
} from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

/** Only approved projects get a route; everything else 404s. */
export function generateStaticParams() {
  return getPublishedProjects().map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.projectName} — ${project.contributionLabel}`,
    description: project.summary,
    alternates: { canonical: `/projekti/${project.slug}` },
    openGraph: {
      title: `${project.projectName} · Pinko`,
      description: project.summary,
      url: `/projekti/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const crumbs = [
    { name: "Naslovnica", path: "/" },
    { name: "Projekti", path: "/projekti" },
    { name: project.projectName, path: `/projekti/${project.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />

      <PageHeader
        eyebrow={relationshipLabels[project.relationshipType]}
        title={project.projectName}
        lead={
          <>
            <p>{project.summary}</p>
            <dl className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em]">
                  Moja uloga
                </dt>
                <dd className="mt-1.5 text-base">{project.role}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em]">
                  Status
                </dt>
                <dd className="mt-1.5 text-base">
                  {statusLabels[project.status]}
                </dd>
              </div>
            </dl>
          </>
        }
        breadcrumbs={crumbs}
      />

      {project.featuredImage ? (
        <Section tight>
          <figure data-reveal className="overflow-hidden rounded-(--radius-card) border border-rule bg-surface">
            <Image
              src={project.featuredImage.src}
              alt={project.featuredImage.alt}
              width={project.featuredImage.width}
              height={project.featuredImage.height}
              priority
              sizes="(min-width: 1280px) 76rem, 100vw"
              className="h-auto w-full"
            />
          </figure>
        </Section>
      ) : null}

      {project.liveScreens && project.liveScreens.length > 0 ? (
        <Section
          tone="surface"
          eyebrow="Uživo"
          index="01"
          title="Prošetajte se kroz web"
          lead="Snimke cijelih stranica — pomičite ih unutar okvira. Nisu ugrađene kroz iframe jer web s dobrim razlogom ne dopušta da ga tuđa stranica uokviri."
        >
          <LiveScroll screens={project.liveScreens} />
        </Section>
      ) : null}

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="space-y-10">
            <Block title="Kontekst" body={project.context} />
            <Block title="Izazov" body={project.challenge} />
            <ListBlock title="Odluke" items={project.decisions} />
          </div>
          <div className="space-y-10">
            <ListBlock title="Isporučeno" items={project.deliverables} />
            <ListBlock
              title={project.outcomesLabel ?? "Rezultat"}
              items={project.outcomes}
            />
            {project.roadmap && project.roadmap.length > 0 ? (
              <ListBlock title="U planu" items={project.roadmap} />
            ) : null}
            {project.evidenceLinks.length > 0 ? (
              <div>
                <h2 className="text-(length:--text-title) font-extrabold">
                  Poveznice
                </h2>
                <ul className="mt-4 space-y-2">
                  {project.evidenceLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="font-medium text-accent underline underline-offset-4"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </Section>

      <Section tone="surface" tight>
        <h2 className="max-w-[22ch] text-(length:--text-display) font-extrabold">
          {project.nextStep}
        </h2>
      </Section>

      <ClosingContact />
    </>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="text-(length:--text-title) font-extrabold">{title}</h2>
      <p className="mt-3 text-ink-soft">{body}</p>
    </div>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h2 className="text-(length:--text-title) font-extrabold">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-ink-soft">
            <span aria-hidden="true" className="shrink-0 text-accent">
              —
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
