import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CapabilityMarquee } from "@/components/sections/CapabilityMarquee";
import { getProjectBySlug } from "@/content/projects";
import {
  lightAbout,
  lightApproach,
  lightContact,
  lightFaq,
  lightHero,
  lightHosting,
  lightProcess,
  lightServices,
  lightWork,
  lightWorkIntro,
  lightWorkOutro,
} from "@/content/light-copy";

/**
 * The light world's homepage.
 *
 * It is the site's existing design language — the same Section, the same
 * buttons, the same monochrome studio palette — carrying the light world's
 * own words and its own order of sections: hero, selected work, approach,
 * expertise, about, process, hosting, questions, contact.
 *
 * What makes it a separate world is the copy and the architecture, not a
 * second visual system. Dark keeps its sections and its sentences; this one
 * never touches them.
 *
 * House rules for the copy are in src/content/light-copy.ts: no em dashes,
 * no decorative hyphens, no quotation marks in anything a visitor reads.
 * Any punctuation added here has to respect them too.
 */
export function LightHome() {
  return (
    <>
      {/* 01 */}
      <section className="relative overflow-hidden border-b border-rule">
        <div
          aria-hidden="true"
          className="grid-field pointer-events-none absolute inset-0"
        />
        <div className="wrap relative pt-14 pb-16 md:pt-20 md:pb-24">
          <p className="mono-label font-semibold text-ink-soft">
            {lightHero.kicker}
          </p>

          <h1 className="mt-6 text-(length:--text-hero) font-extrabold">
            {lightHero.title}
          </h1>

          <div className="measure-wide mt-8 space-y-4">
            {lightHero.body.map((paragraph, i) => (
              <p
                key={paragraph}
                className={
                  i === 0
                    ? "text-(length:--text-lead)"
                    : "text-(length:--text-lead) text-ink-soft"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={lightHero.primary.href} size="lg">
              {lightHero.primary.label}
            </ButtonLink>
            <ButtonLink
              href={lightHero.secondary.href}
              variant="secondary"
              size="lg"
            >
              {lightHero.secondary.label}
            </ButtonLink>
          </div>
        </div>
      </section>

      <CapabilityMarquee />

      {/* 02 */}
      <Section
        index="01"
        eyebrow="Odabrani projekti"
        marker="Projekti"
        title={lightWorkIntro.title}
        lead={
          <>
            {lightWorkIntro.body.map((paragraph, i) => (
              <p key={paragraph} className={i > 0 ? "mt-4" : undefined}>
                {paragraph}
              </p>
            ))}
          </>
        }
        tone="surface"
      >
        <div className="space-y-16">
          {lightWork.map((work) => {
            const project = getProjectBySlug(work.slug);
            const image =
              project?.featuredImage ?? project?.liveScreens?.[0]?.image;

            return (
              <article
                key={work.slug}
                data-reveal
                aria-labelledby={`work-${work.slug}`}
              >
                {image ? (
                  <figure className="overflow-hidden rounded-(--radius-card) border border-rule bg-paper">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="(min-width: 1280px) 76rem, 92vw"
                      className="h-auto w-full"
                    />
                  </figure>
                ) : null}

                <div className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
                  <div>
                    <p className="mono-label text-ink-soft">{work.kicker}</p>
                    <p className="mt-3 font-extrabold">{work.name}</p>
                    {work.status ? (
                      <p className="mono-label mt-4 text-accent">
                        {work.status}
                      </p>
                    ) : null}

                    {work.figures.length > 0 ? (
                      <ul className="mt-8 space-y-6">
                        {work.figures.map((figure) => (
                          <li key={figure.label}>
                            <p className="metric-value font-mono font-extrabold text-accent">
                              {figure.value}
                            </p>
                            <p className="mt-1.5 text-sm text-ink-soft">
                              {figure.label}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>

                  <div>
                    <h3
                      id={`work-${work.slug}`}
                      className="text-(length:--text-title) font-extrabold"
                    >
                      {work.title}
                    </h3>
                    <div className="measure-wide mt-5 space-y-3.5 text-ink-soft">
                      {work.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    <Link
                      href={`/projekti/${work.slug}`}
                      className="mt-6 inline-block font-semibold text-accent-ink underline underline-offset-4"
                    >
                      Pogledajte case study
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16 border-t border-rule pt-8">
          <h3 className="text-(length:--text-title) font-extrabold">
            {lightWorkOutro.title}
          </h3>
          <p className="measure-wide mt-4 text-ink-soft">
            {lightWorkOutro.body}
          </p>
          <ButtonLink
            href={lightWorkOutro.cta.href}
            variant="secondary"
            className="mt-7"
          >
            {lightWorkOutro.cta.label}
          </ButtonLink>
        </div>
      </Section>

      {/* 03 */}
      <Section
        index="02"
        eyebrow="Poslovni pristup"
        marker="Pristup"
        title={lightApproach.title}
        lead={
          <>
            {lightApproach.body.map((paragraph, i) => (
              <p key={paragraph} className={i > 0 ? "mt-4" : undefined}>
                {paragraph}
              </p>
            ))}
          </>
        }
      >
        <ol className="border-t border-rule">
          {lightApproach.points.map((point, i) => (
            <li
              key={point.title}
              data-reveal
              className="grid gap-4 border-b border-rule py-8 lg:grid-cols-[5rem_1fr_1.3fr] lg:gap-12"
            >
              <p className="mono-label font-semibold text-accent lg:pt-2">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-(length:--text-title) font-extrabold">
                {point.title}
              </h3>
              <p className="text-ink-soft lg:pt-1">{point.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 04 */}
      <Section
        index="03"
        eyebrow="Usluge"
        marker="Usluge"
        title={lightServices.title}
        lead={
          <>
            {lightServices.body.map((paragraph, i) => (
              <p key={paragraph} className={i > 0 ? "mt-4" : undefined}>
                {paragraph}
              </p>
            ))}
          </>
        }
        tone="surface"
      >
        <div className="space-y-12">
          {lightServices.areas.map((area) => (
            <article
              key={area.slug}
              data-reveal
              className="border-t border-rule pt-8"
            >
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
                <div>
                  <p className="mono-label text-ink-soft">{area.name}</p>
                  <h3 className="mt-3 text-(length:--text-title) font-extrabold">
                    {area.title}
                  </h3>
                  <Link
                    href={`/usluge/${area.slug}`}
                    className="mt-6 inline-block font-semibold text-accent-ink underline underline-offset-4"
                  >
                    {area.cta}
                  </Link>
                </div>

                <div>
                  <div className="measure-wide space-y-3.5 text-ink-soft">
                    {area.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <ul className="mt-7 grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
                    {area.items.map((item) => (
                      <li
                        key={item}
                        className="border-t border-rule pt-2.5 text-sm font-semibold"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* 05 */}
      <Section
        index="04"
        eyebrow="O meni"
        marker="O meni"
        title={lightAbout.title}
        lead={
          <>
            {lightAbout.body.slice(0, 2).map((paragraph, i) => (
              <p key={paragraph} className={i > 0 ? "mt-4" : undefined}>
                {paragraph}
              </p>
            ))}
          </>
        }
      >
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="measure-wide space-y-4 text-ink-soft">
            {lightAbout.body.slice(2).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="pt-4">
              <ButtonLink href={lightAbout.cta.href} variant="secondary">
                {lightAbout.cta.label}
              </ButtonLink>
            </div>
          </div>

          <ul className="grid gap-px self-start overflow-hidden rounded-(--radius-card) border border-rule bg-rule">
            {lightAbout.points.map((point) => (
              <li key={point.title} className="bg-surface p-6">
                <h3 className="text-lg font-extrabold">{point.title}</h3>
                <p className="mt-2 text-ink-soft">{point.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 06 */}
      <Section
        index="05"
        eyebrow="Način suradnje"
        marker="Suradnja"
        title={lightProcess.title}
        lead={
          <>
            {lightProcess.body.map((paragraph, i) => (
              <p key={paragraph} className={i > 0 ? "mt-4" : undefined}>
                {paragraph}
              </p>
            ))}
          </>
        }
        tone="surface"
      >
        <ol className="border-t border-rule">
          {lightProcess.steps.map((step) => (
            <li
              key={step.index}
              data-reveal
              className="grid gap-4 border-b border-rule py-8 lg:grid-cols-[5rem_1fr_1.3fr] lg:gap-12"
            >
              <p className="mono-label font-semibold text-accent lg:pt-2">
                {step.index}
              </p>
              <h3 className="text-(length:--text-title) font-extrabold">
                {step.title}
              </h3>
              <p className="text-ink-soft lg:pt-1">{step.body}</p>
            </li>
          ))}
        </ol>

        <ButtonLink
          href={lightProcess.cta.href}
          variant="secondary"
          className="mt-10"
        >
          {lightProcess.cta.label}
        </ButtonLink>
      </Section>

      {/* 07 */}
      <Section
        eyebrow="Hosting i održavanje"
        title={lightHosting.title}
        lead={
          <>
            {lightHosting.body.slice(0, 2).map((paragraph, i) => (
              <p key={paragraph} className={i > 0 ? "mt-4" : undefined}>
                {paragraph}
              </p>
            ))}
          </>
        }
      >
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="measure-wide space-y-4 text-ink-soft">
            {lightHosting.body.slice(2).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="pt-4">
              <ButtonLink href={lightHosting.cta.href} variant="secondary">
                {lightHosting.cta.label}
              </ButtonLink>
            </div>
          </div>

          <ul className="grid gap-px self-start overflow-hidden rounded-(--radius-card) border border-rule bg-rule">
            {lightHosting.points.map((point) => (
              <li key={point.title} className="bg-surface p-6">
                <h3 className="font-extrabold">{point.title}</h3>
                <p className="mt-2 text-ink-soft">{point.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 08 */}
      <Section eyebrow="Česta pitanja" title={lightFaq.title} tone="surface">
        <dl className="border-t border-rule">
          {lightFaq.items.map((item) => (
            <div key={item.question} className="border-b border-rule py-7">
              <dt className="text-(length:--text-title) font-extrabold">
                {item.question}
              </dt>
              <dd className="measure-wide mt-3 text-ink-soft">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* 09 */}
      <section className="section border-y border-rule bg-accent-wash">
        <div className="wrap">
          <p className="mono-label mb-5 font-semibold text-ink-soft">
            <span className="text-accent">06</span> Kontakt
          </p>
          <h2 className="max-w-[24ch] text-(length:--text-hero) font-extrabold">
            {lightContact.title}
          </h2>
          <div className="measure-wide mt-7 space-y-3.5 text-(length:--text-lead) text-ink-soft">
            {lightContact.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            {/* No colour overrides here. The dark world's closing section
                sits on a dark ground, so its button is inverted; this one
                sits on a pale ground, and carrying those overrides across
                left white text on a white fill: a 1:1 contrast, which is
                an invisible button, not a subtle one. The plain primary
                variant is dark on pale and measures 17.9:1. */}
            <ButtonLink href={lightContact.primary.href} size="lg">
              {lightContact.primary.label}
            </ButtonLink>
            <Link
              href={lightContact.secondary.href}
              className="font-semibold underline underline-offset-4"
            >
              {lightContact.secondary.label}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
