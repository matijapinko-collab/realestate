import Link from "next/link";
import { getPublishedProjects } from "@/content/projects";
import { LightProjectGrid } from "./LightProjectGrid";

/**
 * The light world's portfolio page.
 *
 * An editorial index rather than a uniform grid: a quiet header on paper,
 * the filter row, then a grid whose first two entries run full width. The
 * professional register of the light world — no jokes about previous
 * contractors, because the work is supposed to do the arguing here.
 */
export function LightProjects() {
  const projects = getPublishedProjects();

  return (
    <div className="light-world">
      <section className="lw-section lw-paper">
        <div className="lw-wrap">
          <p className="lw-eyebrow">Selected work / 2020—2026</p>
          <h1 className="lw-display mt-6">Rad, a ne popis vještina.</h1>
          <p className="lw-lead mt-8">
            Od webova i webshopova do sadržajnih projekata s međunarodnom
            publikom, ERP sustava i prodajnih kanala. Uz svaki projekt piše
            kakav je bio odnos, u kojem je statusu i što sam točno radio ja.
          </p>
        </div>
      </section>

      <section className="lw-section lw-paper pt-0">
        <LightProjectGrid projects={projects} />
      </section>

      <section className="lw-section lw-blue">
        <div className="lw-wrap">
          <h2 className="lw-h2">
            Imate projekt koji bi se dobro uklopio u ovaj popis?
          </h2>
          <Link href="/kontakt" className="lw-pill mt-8">
            Započnimo razgovor <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
