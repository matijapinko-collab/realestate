"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/content/projects";
import { categoryLabels, statusLabels, relationshipLabels } from "@/content/projects";

/**
 * The light portfolio, filtered in place.
 *
 * No reload and no URL churn: the filter is component state, the list is
 * re-rendered from the same data. Filters are real radio buttons in a
 * fieldset, so the keyboard works without a single key handler and a screen
 * reader announces the group and the chosen option.
 *
 * The count is announced politely when it changes, because a visitor who
 * cannot see the grid shorten still needs to know the filter did something.
 */

type Filter = "sve" | ProjectCategory;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "sve", label: "Svi projekti" },
  { value: "development", label: categoryLabels.development },
  { value: "marketing", label: categoryLabels.marketing },
  { value: "ecommerce", label: categoryLabels.ecommerce },
  { value: "business", label: categoryLabels.business },
  { value: "leadership", label: categoryLabels.leadership },
];

export function LightProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("sve");

  const shown = useMemo(
    () =>
      filter === "sve"
        ? projects
        : projects.filter((p) => p.categories.includes(filter)),
    [filter, projects],
  );

  // A filter with nothing behind it is worse than no filter, so only the
  // ones that would actually return something are offered.
  const available = useMemo(
    () =>
      FILTERS.filter(
        (f) =>
          f.value === "sve" ||
          projects.some((p) => p.categories.includes(f.value as ProjectCategory)),
      ),
    [projects],
  );

  return (
    <>
      <fieldset className="lw-wrap">
        <legend className="lw-eyebrow">Filtriraj po vrsti rada</legend>
        <div className="mt-5 flex flex-wrap gap-2">
          {available.map((f) => (
            <label key={f.value} className="lw-filter">
              <input
                type="radio"
                name="filter-projekata"
                value={f.value}
                checked={filter === f.value}
                onChange={() => setFilter(f.value)}
                className="sr-only"
              />
              <span>{f.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <p aria-live="polite" className="lw-wrap lw-eyebrow mt-6 opacity-70">
        {shown.length === projects.length
          ? `${projects.length} projekata`
          : `${shown.length} od ${projects.length} projekata`}
      </p>

      <ul className="lw-wrap mt-10 grid gap-x-8 gap-y-16 md:grid-cols-2">
        {shown.map((project, i) => {
          const image = project.featuredImage ?? project.liveScreens?.[0]?.image;
          // The first two run wide, the rest in pairs: an editorial grid
          // rather than a uniform one.
          const wide = i < 2;

          return (
            <li
              key={project.slug}
              data-reveal
              className={wide ? "md:col-span-2" : undefined}
            >
              <Link href={`/projekti/${project.slug}`} className="lw-card group">
                <div className="overflow-hidden bg-[color-mix(in_srgb,var(--lw-ink)_6%,transparent)]">
                  {image ? (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes={wide ? "(min-width: 768px) 84rem, 92vw" : "(min-width: 768px) 42rem, 92vw"}
                      className="h-auto w-full transition-transform duration-500 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.015]"
                    />
                  ) : (
                    <div className="lw-dots flex aspect-16/10 items-center justify-center">
                      <span className="lw-eyebrow">
                        {project.contributionLabel}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="lw-eyebrow">
                    {relationshipLabels[project.relationshipType]}
                  </span>
                  <span aria-hidden="true" className="opacity-40">
                    ·
                  </span>
                  <span className="lw-eyebrow opacity-70">
                    {statusLabels[project.status]}
                  </span>
                </div>

                <h2 className={`mt-3 ${wide ? "lw-h3" : "text-2xl font-medium tracking-tight"}`}>
                  {project.projectName}
                </h2>
                <p className="lw-body mt-3">{project.summary}</p>
                <span className="lw-underline mt-5 inline-block font-medium">
                  Pogledajte projekt <span aria-hidden="true">↗</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
