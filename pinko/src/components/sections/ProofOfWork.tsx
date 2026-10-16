import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import {
  getPublishedProjects,
  relationshipLabels,
  statusLabels,
} from "@/content/projects";

/**
 * "Dokaz kroz rad" (brief 11.3).
 *
 * Shows 2–3 approved projects. When nothing is approved for publication yet
 * the section says so plainly instead of rendering placeholder cards, invented
 * logos or empty statistics.
 */
export function ProofOfWork() {
  const projects = getPublishedProjects().slice(0, 3);

  return (
    <Section
      index="01"
      eyebrow="Projekti"
      title="Nekoliko konkretnih stvari na kojima radim."
      tone="surface"
    >
      {projects.length === 0 ? (
        <div className="rounded-(--radius-card) border border-dashed border-rule bg-paper p-7 md:p-10">
          <p className="measure-wide text-(length:--text-lead)">
            Projektne priče su napisane, ali čekaju potvrdu statusa i doprinosa
            prije objave.
          </p>
          <p className="measure-wide mt-4 text-ink-soft">
            Radije ću vam o konkretnim projektima reći u razgovoru nego ovdje
            objaviti nešto što nije provjereno. Pitajte me za primjer iz vašeg
            područja.
          </p>
          <ButtonLink href="/kontakt" className="mt-7">
            Pitajte za primjer
          </ButtonLink>
        </div>
      ) : (
        <>
          {/* Two approved projects would leave a visibly empty third column,
              so the third column only appears once there are three cards. */}
          <ul
            className={`grid gap-5 md:grid-cols-2${
              projects.length >= 3 ? " lg:grid-cols-3" : ""
            }`}
          >
            {projects.map((project, index) => (
              <li key={project.slug} data-reveal data-reveal-delay={index}>
                <Link
                  href={`/projekti/${project.slug}`}
                  className={`spotlight group flex h-full flex-col rounded-(--radius-card) border border-rule bg-paper p-6 transition-[border-color,transform] duration-300 ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-1 hover:border-accent`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-(--radius-pill) bg-accent-wash px-2.5 py-1 text-xs font-semibold text-accent-ink">
                      {relationshipLabels[project.relationshipType]}
                    </span>
                    <span className="rounded-(--radius-pill) border border-rule px-2.5 py-1 text-xs font-semibold text-ink-soft">
                      {statusLabels[project.status]}
                    </span>
                  </div>

                  <h3 className="mt-5 text-(length:--text-title) font-extrabold group-hover:text-accent-ink">
                    {project.projectName}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-ink-soft">
                    {project.contributionLabel}
                  </p>
                  <p className="mt-4 text-ink-soft">{project.summary}</p>
                  <span className="mt-auto pt-6 text-sm font-semibold text-accent-ink">
                    Pogledajte projekt{" "}
                    <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <ButtonLink href="/projekti" variant="secondary" className="mt-10">
            Svi projekti
          </ButtonLink>
        </>
      )}
    </Section>
  );
}
