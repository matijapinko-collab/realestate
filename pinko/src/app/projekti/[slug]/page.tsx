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
        titleClassName={project.motif === "glitch" ? "glitch-title" : undefined}
        lead={
          <>
            {project.tagline ? (
              <p className="mb-3 text-(length:--text-title) font-extrabold">
                {project.tagline}
              </p>
            ) : null}
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

      {/* A project with the long form written out reads as one column, with
          the lists gathered underneath. Without it, the old two-column pair
          of context and challenge still applies. */}
      {/* The five parts every case study owes the reader, from the brief of
          19 Oct 2026: the problem, what turned out to be harder than it
          looked, what was actually built, what came of it and — kept
          separate on purpose — which part of it was Matija's own work.
          Nothing is restated that the record does not already contain;
          "Komplikacije" simply disappears where a project had none. */}
      <Section tight>
        <dl
          data-reveal
          className="grid gap-px overflow-hidden rounded-(--radius-card) border border-rule bg-rule md:grid-cols-2"
        >
          <FivePart title="Problem">{project.challenge}</FivePart>

          {project.complications && project.complications.length > 0 ? (
            <FivePart title="Komplikacije">
              <ul className="space-y-2">
                {project.complications.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span aria-hidden="true" className="shrink-0 text-accent">
                      ·
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </FivePart>
          ) : null}

          <FivePart title="Rješenje">
            <ul className="space-y-2">
              {project.deliverables.slice(0, 4).map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span aria-hidden="true" className="shrink-0 text-accent">
                    ·
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </FivePart>

          <FivePart title={project.outcomesLabel ?? "Rezultat"}>
            <ul className="space-y-2">
              {project.outcomes.slice(0, 4).map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span aria-hidden="true" className="shrink-0 text-accent">
                    ·
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </FivePart>

          <FivePart title="Moj doprinos">{project.role}</FivePart>
        </dl>
      </Section>

      {project.metrics && project.metrics.length > 0 ? (
        <Section tight>
          {/* A figure is published only with the basis it was measured on.
              The basis is not a footnote here; it sits under the number. */}
          <ul className="grid gap-px overflow-hidden rounded-(--radius-card) border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {project.metrics.map((metric, i) => (
              <li
                key={metric.label}
                data-reveal
                data-reveal-delay={i}
                className="spotlight bg-surface p-6"
              >
                <p className="font-mono text-(length:--text-display) font-extrabold text-accent">
                  {metric.value}
                </p>
                <p className="mt-2 font-semibold">{metric.label}</p>
                <p className="mt-2 text-sm text-ink-soft">{metric.basis}</p>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {project.story ? (
        <>
          <Section>
            <div className="measure-wide space-y-12">
              {project.story.map((part) => (
                <section key={part.heading} data-reveal>
                  <h2 className="text-(length:--text-title) font-extrabold">
                    {part.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-ink-soft">
                    {part.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </Section>

          <Section tone="surface" tight>
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <ListBlock title="Odluke" items={project.decisions} />
              <ListBlock title="Isporučeno" items={project.deliverables} />
              <div className="space-y-10">
                <ListBlock
                  title={project.outcomesLabel ?? "Rezultat"}
                  items={project.outcomes}
                />
            {project.evidenceLinks.length === 0 && project.noPublicEvidence ? (
              <div>
                <h2 className="text-(length:--text-title) font-extrabold">
                  Zašto nema poveznice
                </h2>
                <p className="measure-wide mt-4 text-ink-soft">
                  {project.noPublicEvidence}
                </p>
              </div>
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
        </>
      ) : (
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
            {project.evidenceLinks.length === 0 && project.noPublicEvidence ? (
              <div>
                <h2 className="text-(length:--text-title) font-extrabold">
                  Zašto nema poveznice
                </h2>
                <p className="measure-wide mt-4 text-ink-soft">
                  {project.noPublicEvidence}
                </p>
              </div>
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
      )}

      <Section tight>
        <p
          data-reveal
          className="measure-wide text-(length:--text-display) font-extrabold"
        >
          {project.nextStep}
        </p>
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

/**
 * One cell of the five-part summary. A description list is the right element
 * here: each heading labels the block under it, and that relationship is in
 * the markup rather than only in the layout.
 */
function FivePart({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface p-6 md:p-7">
      <dt className="mono-label font-semibold text-accent">{title}</dt>
      <dd className="measure-wide mt-3 text-ink-soft">{children}</dd>
    </div>
  );
}
