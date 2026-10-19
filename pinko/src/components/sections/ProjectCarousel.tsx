import type { Project } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";

/**
 * Projects drifting slowly past, in a loop.
 *
 * The list is written twice so the track can return to its start without a
 * visible jump; the second copy is hidden from assistive technology, which
 * reads the first one as an ordinary list of links.
 *
 * It is CSS only — no scroll handler, no timer, no JavaScript at all. It
 * pauses when the pointer is over it and when anything inside it takes
 * keyboard focus, so a visitor can actually reach a card that is moving.
 * Under `prefers-reduced-motion` it does not move; the cards simply sit
 * there and the strip scrolls by hand.
 */
export function ProjectCarousel({ projects }: { projects: Project[] }) {
  // With only a couple of projects the loop would be mostly empty space, so
  // the copies repeat until the track is wide enough to look continuous.
  const copies = projects.length >= 4 ? 2 : projects.length >= 2 ? 3 : 4;

  return (
    <div className="project-carousel" data-reveal>
      <div
        className="project-carousel-track"
        style={
          {
            "--carousel-copies": copies,
            "--carousel-cards": projects.length,
          } as React.CSSProperties
        }
      >
        {Array.from({ length: copies }).map((_, copy) => (
          <ul
            key={copy}
            aria-hidden={copy > 0 || undefined}
            className="project-carousel-set"
          >
            {projects.map((project) => (
              <li key={`${copy}-${project.slug}`}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
