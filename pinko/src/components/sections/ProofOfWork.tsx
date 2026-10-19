import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ProjectCarousel } from "./ProjectCarousel";
import { getPublishedProjects } from "@/content/projects";

/**
 * "Dokaz kroz rad" (brief 11.3).
 *
 * The approved projects drift past in a slow loop. When nothing is approved
 * yet the section says so plainly instead of rendering placeholder cards,
 * invented logos or empty statistics.
 */
export function ProofOfWork() {
  // Every published project goes into the loop. It used to be the first
  // three, which quietly hid most of the portfolio on the page where the
  // portfolio is supposed to be the argument.
  const projects = getPublishedProjects();

  return (
    <Section
      index="02"
      eyebrow="Dokazi da ne pričam bezveze"
      marker="Projekti"
      title="Mogu Vam pričati kaj sve znam. Ali bolje da pokažem."
      lead={
        <>
          <p>
            Svaki projekt počeo je nekim problemom. Neki su bili jednostavni.
            Neki su imali toliko slojeva da bi se od njih mogla napraviti
            pristojna torta.
          </p>
          <p className="mt-4">
            Ovo su stvari na kojima sam radio i moj konkretan doprinos.
          </p>
        </>
      }
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
          <ProjectCarousel projects={projects} />
          <ButtonLink href="/projekti" variant="secondary" className="mt-10">
            Svi projekti
          </ButtonLink>
        </>
      )}
    </Section>
  );
}
