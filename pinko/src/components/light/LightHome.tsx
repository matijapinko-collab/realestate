import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug } from "@/content/projects";
import { experience } from "@/content/cv";
import { lightMosaics } from "@/content/light-mosaics";
import {
  lightAbout,
  lightContact,
  lightHero,
  lightServices as servicesCopy,
} from "@/content/light-copy";
import { LightMosaic } from "./LightMosaic";
import { LightServices } from "./LightServices";
import { LightStatement } from "./LightStatement";
import { LightReferences } from "./LightReferences";

/**
 * The light world's homepage, rebuilt against the reference recording.
 *
 * Section order from the brief: hero with featured previews, editorial
 * statement, services accordion, selected work, references, experience
 * grid, contact. Dark is a different tree entirely and is untouched.
 *
 * Copy is the approved light copy; the only new sentences are the mosaic
 * captions, which describe what each capture actually shows.
 */

const PREVIEWS = [
  {
    slug: "100-smart-food",
    label: "eCommerce",
    src: "/projekti/smart-food/mobile-home.webp",
    alt: "Naslovnica webshopa 100% Smart Food na mobitelu.",
    width: 720,
    height: 1559,
  },
  {
    slug: "vehicle-freak",
    label: "Sadržaj i SEO",
    src: "/projekti/vehicle-freak-featured.webp",
    alt: "Sekcija Vehicle Freak Expertise s uredničkim timom portala.",
    width: 1237,
    height: 389,
  },
  {
    slug: "bolero-temu",
    label: "Marketplace",
    src: "/projekti/bolero-temu-featured.webp",
    alt: "Vizual projekta Bolero Adria na Temu marketplaceu.",
    width: 1600,
    height: 900,
  },
];

const GRID_PROJECTS = [
  "100-smart-food",
  "bolero-temu",
  "vehicle-freak",
  "teladoc-business-vision",
  "elektronim-instalacije",
  "virus-hr",
  "adpiler",
  "varel",
];

export function LightHome() {
  return (
    <div className="lx">
      {/* 02 HERO + 03 FEATURED PREVIEWS */}
      <section className="lx-section pb-0">
        <div className="lx-wrap">
          <p className="lx-kicker">{lightHero.kicker}</p>
          <h1 className="lx-display mt-10 max-w-[18ch]">{lightHero.title}</h1>
          <p className="lx-lead mt-10">{lightHero.body[0]}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={lightHero.primary.href} className="lx-btn">
              {lightHero.primary.label}
            </Link>
            <Link href={lightHero.secondary.href} className="lx-btn lx-btn-ghost">
              {lightHero.secondary.label}
            </Link>
          </div>

          <ul className="mt-20 grid gap-4 md:grid-cols-3">
            {PREVIEWS.map((preview) => {
              const project = getProjectBySlug(preview.slug);
              return (
                <li key={preview.slug}>
                  <Link href={`/projekti/${preview.slug}`} className="lx-preview group">
                    <div className="lx-preview-frame">
                      <Image
                        src={preview.src}
                        alt={preview.alt}
                        width={preview.width}
                        height={preview.height}
                        sizes="(min-width: 768px) 28rem, 92vw"
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                    <div className="mt-4 flex items-baseline justify-between gap-4">
                      <span className="font-medium">
                        {project?.projectName ?? preview.slug}
                      </span>
                      <span className="lx-kicker">{preview.label}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 04 EDITORIAL STATEMENT */}
      <section className="lx-section">
        <div className="lx-wrap">
          <LightStatement
            lead="Kako razmišljam"
            text="Tehnologija je važna. Razumijevanje poslovanja još važnije. Odličan webshop ne vrijedi puno ako kupci ne mogu pronaći proizvode, a marketing nema smisla ako web ne pretvara posjetitelje u kupce."
          />
        </div>
      </section>

      {/* 05 SERVICES */}
      <section className="lx-section">
        <div className="lx-wrap">
          <div className="lx-dotfield rounded-3xl px-6 py-14 md:px-12">
            <p className="lx-kicker">{servicesCopy.kicker}</p>
            <h2 className="lx-h2 mt-6 max-w-[16ch]">{servicesCopy.title}</h2>
          </div>
          <LightServices />
        </div>
      </section>

      {/* 06 SELECTED WORK */}
      <section className="lx-section">
        <div className="lx-wrap">
          <p className="lx-kicker">Selected work</p>
          <h2 className="lx-h2 mt-6 max-w-[18ch]">
            Rad koji govori više od opisa usluga.
          </h2>
        </div>

        <div className="mt-20 space-y-28 md:space-y-36">
          {lightMosaics.map((mosaic) => (
            <article key={mosaic.slug} className="lx-wrap" data-reveal>
              <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="lx-kicker">{mosaic.kicker}</p>
                  <h3 className="lx-h3 mt-3 max-w-[24ch]">{mosaic.title}</h3>
                </div>
                <Link href={`/projekti/${mosaic.slug}`} className="lx-link-arrow">
                  {mosaic.name}
                </Link>
              </header>

              <LightMosaic mosaic={mosaic} />

              <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
                <div className="space-y-3">
                  {mosaic.body.map((paragraph) => (
                    <p key={paragraph} className="lx-body">
                      {paragraph}
                    </p>
                  ))}
                  {mosaic.status ? (
                    <p className="lx-kicker pt-2">{mosaic.status}</p>
                  ) : null}
                </div>

                {mosaic.figures ? (
                  <ul className="space-y-6">
                    {mosaic.figures.map((figure) => (
                      <li key={figure.label}>
                        <p className="lx-h3">{figure.value}</p>
                        <p className="mt-1 font-medium">{figure.label}</p>
                        <p className="lx-body mt-1 text-sm">{figure.note}</p>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <div className="lx-wrap mt-20">
          <Link href="/projekti" className="lx-btn">
            Istražite sve projekte
          </Link>
        </div>
      </section>

      {/* 07 ABOUT AND REFERENCES */}
      <section className="lx-section">
        <div className="lx-wrap">
          <p className="lx-kicker">{lightAbout.kicker}</p>
          <h2 className="lx-h2 mt-6 max-w-[18ch]">{lightAbout.title}</h2>
          <p className="lx-lead mt-8">{lightAbout.body[0]}</p>
          <LightReferences entries={experience.slice(0, 5)} />
        </div>
      </section>

      {/* 08 EXPERIENCE GRID */}
      <section className="lx-section pt-0">
        <div className="lx-wrap">
          <p className="lx-kicker">Projekti i uloge</p>
          <ul className="lx-grid mt-8">
            {GRID_PROJECTS.map((slug) => {
              const project = getProjectBySlug(slug);
              if (!project) return null;
              return (
                <li key={slug}>
                  <Link href={`/projekti/${slug}`} className="lx-grid-cell">
                    {project.projectName}
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="lx-body mt-6 text-sm">
            Popis prikazuje projekte i uloge na kojima sam radio. Ne označava
            partnerstvo ni službenu suradnju s navedenim tvrtkama.
          </p>
        </div>
      </section>

      {/* 09 CONTACT */}
      <section className="lx-section">
        <div className="lx-wrap">
          <div className="lx-dotfield rounded-3xl px-6 py-20 text-center md:px-12">
            <h2 className="lx-display mx-auto max-w-[16ch]">
              {lightContact.title}
            </h2>
            <p className="lx-lead mx-auto mt-8">
              Bilo da razvijate novi digitalni proizvod, unapređujete online
              prodaju ili želite povezati poslovne procese, javite mi se.
            </p>
            <Link href="/kontakt" className="lx-btn lx-btn-big mt-10">
              Razgovarajmo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
