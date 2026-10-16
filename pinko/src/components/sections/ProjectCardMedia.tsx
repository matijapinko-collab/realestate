import Image from "next/image";
import type { Project } from "@/content/projects";

/**
 * The picture on a project card.
 *
 * Uses the top of the live capture we already have, cropped — it is the
 * real site, not a mockup. A project without a capture gets a typographic
 * tile rather than a stock image or an empty grey box.
 */
export function ProjectCardMedia({ project }: { project: Project }) {
  const screen = project.liveScreens?.[0];

  if (!screen) {
    return (
      <div className="flex aspect-16/10 items-center justify-center overflow-hidden rounded-[0.75rem] border border-rule bg-accent-wash">
        <span className="mono-label px-6 text-center text-ink-soft">
          {project.contributionLabel}
        </span>
      </div>
    );
  }

  return (
    <div className="aspect-16/10 overflow-hidden rounded-[0.75rem] border border-rule bg-surface">
      <Image
        src={screen.image.src}
        alt=""
        width={screen.image.width}
        height={screen.image.height}
        sizes="(min-width: 1024px) 30vw, 100vw"
        className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.03]"
      />
    </div>
  );
}
