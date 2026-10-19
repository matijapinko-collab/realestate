import Link from "next/link";
import {
  relationshipLabels,
  statusLabels,
  type Project,
} from "@/content/projects";
import { ProjectCardMedia } from "./ProjectCardMedia";

/**
 * One project card. Shared by the carousel on the home page and the grid on
 * `/projekti`, so the two never drift apart.
 */
export function ProjectCard({
  project,
  tone = "paper",
}: {
  project: Project;
  /** Which surface the card sits on, so it stays distinguishable from it. */
  tone?: "paper" | "surface";
}) {
  return (
    <Link
      href={`/projekti/${project.slug}`}
      className={`spotlight group flex h-full flex-col rounded-(--radius-card) border border-rule ${
        tone === "paper" ? "bg-paper" : "bg-surface"
      } p-6 transition-[border-color,transform] duration-300 ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-1 hover:border-accent`}
    >
      <ProjectCardMedia project={project} />

      <div className="mt-5 flex flex-wrap items-center gap-2">
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
        <span
          aria-hidden="true"
          className="inline-block transition-transform group-hover:translate-x-0.5"
        >
          →
        </span>
      </span>
    </Link>
  );
}
