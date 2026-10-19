import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import {
  categoryLabels,
  relationshipLabels,
  statusLabels,
} from "@/content/projects";

/**
 * The light world's case study.
 *
 * Same record, different argument. The dark world opens with the problem
 * and keeps the terminal register; this one opens with the work itself —
 * the featured image full width — and then runs the eleven things the
 * brief asks a case study to answer, in an editorial rhythm rather than a
 * stack of equal boxes.
 *
 * Nothing is invented for the sake of the layout: a project with no
 * figures simply has no figures section, and the reason a record has no
 * public link is printed rather than hidden.
 */
export function LightCaseStudy({
  project,
  related,
}: {
  project: Project;
  related: Project[];
}) {
  const image = project.featuredImage ?? project.liveScreens?.[0]?.image;

  return (
    <div className="light-world">
      <section className="lw-section lw-paper pb-0">
        <div className="lw-wrap">
          <nav aria-label="Putanja" className="lw-eyebrow">
            <Link href="/" className="lw-underline">
              Naslovnica
            </Link>
            <span aria-hidden="true" className="mx-2 opacity-40">
              /
            </span>
            <Link href="/projekti" className="lw-underline">
              Projekti
            </Link>
          </nav>

          <h1 className="lw-display mt-8">{project.projectName}</h1>
          {project.tagline ? (
            <p className="lw-lead mt-7 font-medium">{project.tagline}</p>
          ) : null}
          <p className="lw-body mt-5">{project.summary}</p>

          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-5">
            <div>
              <dt className="lw-eyebrow opacity-70">Vrsta angažmana</dt>
              <dd className="mt-1 font-medium">
                {relationshipLabels[project.relationshipType]}
              </dd>
            </div>
            <div>
              <dt className="lw-eyebrow opacity-70">Status</dt>
              <dd className="mt-1 font-medium">
                {statusLabels[project.status]}
              </dd>
            </div>
            <div>
              <dt className="lw-eyebrow opacity-70">Područje</dt>
              <dd className="mt-1 font-medium">
                {project.categories.map((c) => categoryLabels[c]).join(" · ")}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {image ? (
        <section className="lw-section lw-paper">
          <div className="lw-wrap">
            <figure className="overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 1280px) 86rem, 94vw"
                className="h-auto w-full"
              />
            </figure>
          </div>
        </section>
      ) : null}

      {project.metrics && project.metrics.length > 0 ? (
        <section className="lw-section lw-blue">
          <div className="lw-wrap">
            <h2 className="lw-h2">Rezultati</h2>
            <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {project.metrics.map((metric) => (
                <li key={metric.label}>
                  <p className="lw-figure">{metric.value}</p>
                  <p className="mt-4 font-semibold">{metric.label}</p>
                  <p className="mt-2 text-sm opacity-80">{metric.basis}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="lw-section lw-paper">
        <div className="lw-wrap grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <h2 className="lw-h2">Problem</h2>
            <p className="lw-body mt-6">{project.challenge}</p>
            <p className="lw-body mt-4 opacity-75">{project.context}</p>
          </div>

          <div>
            <h2 className="lw-h2">Moj doprinos</h2>
            <p className="lw-body mt-6">{project.role}</p>
            {project.complications && project.complications.length > 0 ? (
              <>
                <p className="lw-eyebrow mt-10">Što je bilo teže nego što je izgledalo</p>
                <ul className="mt-4 space-y-3">
                  {project.complications.map((item) => (
                    <li key={item} className="lw-rule pt-3 text-[0.9375rem]">
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>
      </section>

      {project.story ? (
        <section className="lw-section lw-paper pt-0">
          <div className="lw-wrap">
            {project.story.map((part, i) => (
              <article
                key={part.heading}
                data-reveal
                className={`lw-rule grid gap-6 py-12 lg:grid-cols-[6rem_1fr_1fr] lg:gap-14 ${
                  i === 0 ? "" : ""
                }`}
              >
                <p className="lw-eyebrow lg:pt-3">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="lw-h3">{part.heading}</h2>
                <div className="lw-body space-y-4 lg:pt-1">
                  {part.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="lw-section lw-mint">
        <div className="lw-wrap grid gap-12 lg:grid-cols-3 lg:gap-14">
          <div>
            <h2 className="lw-h3">Odluke</h2>
            <ul className="mt-5 space-y-3">
              {project.decisions.map((item) => (
                <li key={item} className="lw-rule pt-3 text-[0.9375rem]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="lw-h3">Isporučeno</h2>
            <ul className="mt-5 space-y-3">
              {project.deliverables.map((item) => (
                <li key={item} className="lw-rule pt-3 text-[0.9375rem]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="lw-h3">{project.outcomesLabel ?? "Rezultat"}</h2>
            <ul className="mt-5 space-y-3">
              {project.outcomes.map((item) => (
                <li key={item} className="lw-rule pt-3 text-[0.9375rem]">
                  {item}
                </li>
              ))}
            </ul>

            {project.evidenceLinks.length > 0 ? (
              <ul className="mt-8 space-y-2">
                {project.evidenceLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="lw-underline font-medium"
                    >
                      {link.label} <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : project.noPublicEvidence ? (
              <div className="mt-8">
                <p className="lw-eyebrow">Zašto nema poveznice</p>
                <p className="lw-body mt-2 text-[0.9375rem]">
                  {project.noPublicEvidence}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="lw-section lw-paper">
          <div className="lw-wrap">
            <h2 className="lw-h2">Povezani projekti</h2>
            <ul className="mt-10 grid gap-10 md:grid-cols-3">
              {related.map((other) => (
                <li key={other.slug}>
                  <Link href={`/projekti/${other.slug}`} className="group block">
                    <p className="lw-eyebrow opacity-70">
                      {other.categories
                        .map((c) => categoryLabels[c])
                        .join(" · ")}
                    </p>
                    <h3 className="lw-h3 mt-2">{other.projectName}</h3>
                    <p className="lw-body mt-3 text-[0.9375rem]">
                      {other.summary}
                    </p>
                    <span className="lw-underline mt-4 inline-block font-medium">
                      Pogledajte projekt <span aria-hidden="true">↗</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="lw-section lw-blue">
        <div className="lw-wrap">
          <p className="lw-eyebrow">Let&rsquo;s make it work.</p>
          <h2 className="lw-h2 mt-6">{project.nextStep}</h2>
          <Link href="/kontakt" className="lw-pill mt-9">
            Započnimo razgovor <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
