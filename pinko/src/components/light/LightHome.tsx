import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
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
 * Architecture from the brief of 19 Oct 2026: hero, selected work, business
 * approach, expertise, about, process, hosting, questions, contact. Work
 * comes second on purpose, so the projects argue before the service list
 * does, and only four of them appear here rather than the whole catalogue.
 *
 * Copy comes from src/content/light-copy.ts, which is the light world's
 * own. Pictures and links come from the shared project records, so a
 * screenshot or a slug is never maintained twice.
 */
export function LightHome() {
  return (
    <div className="pl">
      {/* 01 */}
      <section className="pl-section">
        <div className="pl-wrap">
          <p className="pl-kicker">{lightHero.kicker}</p>

          <div className="mt-10 grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <h1 className="pl-display">{lightHero.title}</h1>
              <div className="mt-10 space-y-5">
                {lightHero.body.map((paragraph, i) => (
                  <p
                    key={paragraph}
                    className={i === 0 ? "pl-lead" : "pl-body"}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-11 flex flex-wrap gap-3">
                <Link href={lightHero.primary.href} className="pl-btn">
                  {lightHero.primary.label}
                </Link>
                <Link
                  href={lightHero.secondary.href}
                  className="pl-btn pl-btn-ghost"
                >
                  {lightHero.secondary.label}
                </Link>
              </div>
            </div>

            {site.portrait ? (
              <figure className="lg:pt-3">
                <div className="aspect-4/5 overflow-hidden">
                  <Image
                    src={site.portrait.src}
                    alt={site.portrait.alt}
                    width={site.portrait.width}
                    height={site.portrait.height}
                    sizes="(min-width: 1024px) 30rem, 90vw"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="pl-kicker mt-4">
                  Matija Pinko, Pinko obrt za informatičke usluge
                </figcaption>
              </figure>
            ) : null}
          </div>
        </div>
      </section>

      {/* 02 */}
      <section className="pl-section">
        <div className="pl-wrap">
          <p className="pl-kicker">{lightWorkIntro.kicker}</p>
          <h2 className="pl-h2 mt-6 max-w-[22ch]">{lightWorkIntro.title}</h2>
          <div className="mt-8 space-y-4">
            {lightWorkIntro.body.map((paragraph) => (
              <p key={paragraph} className="pl-body">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {lightWork.map((work, i) => {
        const project = getProjectBySlug(work.slug);
        const image = project?.featuredImage ?? project?.liveScreens?.[0]?.image;
        const flip = i % 2 === 1;

        return (
          <section
            key={work.slug}
            className="pl-section"
            aria-labelledby={`work-${work.slug}`}
          >
            <div className="pl-wrap">
              {image ? (
                <figure className="overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(min-width: 1280px) 78rem, 92vw"
                    className="h-auto w-full"
                  />
                </figure>
              ) : null}

              <div
                className={`mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 ${
                  flip ? "lg:[&>div:first-child]:order-last" : ""
                }`}
              >
                <div>
                  <p className="pl-kicker">{work.kicker}</p>
                  <p className="mt-4 text-sm font-semibold">{work.name}</p>
                  {work.status ? (
                    <p className="pl-kicker mt-4">{work.status}</p>
                  ) : null}

                  {work.figures.length > 0 ? (
                    <ul className="mt-10 space-y-8">
                      {work.figures.map((figure) => (
                        <li key={figure.label}>
                          <p className="pl-figure">{figure.value}</p>
                          <p className="pl-body mt-2 text-[0.9375rem]">
                            {figure.label}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                <div>
                  <h3 id={`work-${work.slug}`} className="pl-h3">
                    {work.title}
                  </h3>
                  <div className="mt-6 space-y-4">
                    {work.body.map((paragraph) => (
                      <p key={paragraph} className="pl-body">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <Link
                    href={`/projekti/${work.slug}`}
                    className="pl-link mt-8 inline-block"
                  >
                    Pogledajte case study
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="pl-section">
        <div className="pl-wrap">
          <h2 className="pl-h3">{lightWorkOutro.title}</h2>
          <p className="pl-body mt-5">{lightWorkOutro.body}</p>
          <Link href={lightWorkOutro.cta.href} className="pl-btn mt-8">
            {lightWorkOutro.cta.label}
          </Link>
        </div>
      </section>

      {/* 03 */}
      <section className="pl-section">
        <div className="pl-wrap">
          <p className="pl-kicker">{lightApproach.kicker}</p>
          <h2 className="pl-h2 mt-6 max-w-[20ch]">{lightApproach.title}</h2>
          <div className="mt-8 space-y-4">
            {lightApproach.body.map((paragraph) => (
              <p key={paragraph} className="pl-body">
                {paragraph}
              </p>
            ))}
          </div>

          <ol className="mt-16">
            {lightApproach.points.map((point, i) => (
              <li
                key={point.title}
                data-reveal
                className="pl-rule grid gap-4 py-9 lg:grid-cols-[5rem_1fr_1.4fr] lg:gap-14"
              >
                <p className="pl-kicker lg:pt-2">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="pl-h3">{point.title}</h3>
                <p className="pl-body lg:pt-1">{point.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 04 */}
      <section className="pl-section">
        <div className="pl-wrap">
          <p className="pl-kicker">{lightServices.kicker}</p>
          <h2 className="pl-h2 mt-6 max-w-[22ch]">{lightServices.title}</h2>
          <div className="mt-8 space-y-4">
            {lightServices.body.map((paragraph) => (
              <p key={paragraph} className="pl-body">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-16 space-y-16">
            {lightServices.areas.map((area) => (
              <article
                key={area.slug}
                data-reveal
                className="pl-rule grid gap-8 pt-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"
              >
                <div>
                  <p className="pl-kicker">{area.name}</p>
                  <h3 className="pl-h3 mt-4">{area.title}</h3>
                  <Link
                    href={`/usluge/${area.slug}`}
                    className="pl-link mt-7 inline-block"
                  >
                    {area.cta}
                  </Link>
                </div>

                <div>
                  <div className="space-y-4">
                    {area.body.map((paragraph) => (
                      <p key={paragraph} className="pl-body">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <ul className="mt-8 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                    {area.items.map((item) => (
                      <li
                        key={item}
                        className="pl-rule pt-3 text-[0.9375rem] font-medium"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 05 */}
      <section className="pl-section">
        <div className="pl-wrap">
          <p className="pl-kicker">{lightAbout.kicker}</p>
          <div className="mt-6 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <h2 className="pl-h2 max-w-[20ch]">{lightAbout.title}</h2>
              <div className="mt-8 space-y-4">
                {lightAbout.body.map((paragraph) => (
                  <p key={paragraph} className="pl-body">
                    {paragraph}
                  </p>
                ))}
              </div>
              <Link href={lightAbout.cta.href} className="pl-btn mt-10">
                {lightAbout.cta.label}
              </Link>
            </div>

            <ul className="space-y-8 lg:pt-4">
              {lightAbout.points.map((point) => (
                <li key={point.title} className="pl-rule pt-5">
                  <h3 className="pl-h3">{point.title}</h3>
                  <p className="pl-body mt-3">{point.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 06 */}
      <section className="pl-section">
        <div className="pl-wrap">
          <p className="pl-kicker">{lightProcess.kicker}</p>
          <h2 className="pl-h2 mt-6 max-w-[20ch]">{lightProcess.title}</h2>
          <div className="mt-8 space-y-4">
            {lightProcess.body.map((paragraph) => (
              <p key={paragraph} className="pl-body">
                {paragraph}
              </p>
            ))}
          </div>

          <ol className="mt-16">
            {lightProcess.steps.map((step) => (
              <li
                key={step.index}
                data-reveal
                className="pl-rule grid gap-4 py-9 lg:grid-cols-[5rem_1fr_1.4fr] lg:gap-14"
              >
                <p className="pl-kicker lg:pt-2">{step.index}</p>
                <h3 className="pl-h3">{step.title}</h3>
                <p className="pl-body lg:pt-1">{step.body}</p>
              </li>
            ))}
          </ol>

          <Link href={lightProcess.cta.href} className="pl-btn mt-12">
            {lightProcess.cta.label}
          </Link>
        </div>
      </section>

      {/* 07 */}
      <section className="pl-section">
        <div className="pl-wrap">
          <p className="pl-kicker">{lightHosting.kicker}</p>
          <h2 className="pl-h2 mt-6 max-w-[22ch]">{lightHosting.title}</h2>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div className="space-y-4">
              {lightHosting.body.map((paragraph) => (
                <p key={paragraph} className="pl-body">
                  {paragraph}
                </p>
              ))}
              <div className="pt-4">
                <Link href={lightHosting.cta.href} className="pl-link">
                  {lightHosting.cta.label}
                </Link>
              </div>
            </div>

            <ul className="space-y-7">
              {lightHosting.points.map((point) => (
                <li key={point.title} className="pl-rule pt-5">
                  <h3 className="text-lg font-semibold">{point.title}</h3>
                  <p className="pl-body mt-2">{point.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 08 */}
      <section className="pl-section">
        <div className="pl-wrap">
          <p className="pl-kicker">{lightFaq.kicker}</p>
          <h2 className="pl-h2 mt-6 max-w-[20ch]">{lightFaq.title}</h2>

          <dl className="mt-14">
            {lightFaq.items.map((item) => (
              <div key={item.question} className="pl-rule py-7">
                <dt className="pl-h3">{item.question}</dt>
                <dd className="pl-body mt-3">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 09 */}
      <section className="pl-section pl-ink-section">
        <div className="pl-wrap">
          <p className="pl-kicker">{lightContact.kicker}</p>
          <h2 className="pl-h2 mt-6 max-w-[20ch]">{lightContact.title}</h2>
          <div className="mt-8 space-y-4">
            {lightContact.body.map((paragraph) => (
              <p key={paragraph} className="pl-body">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href={lightContact.primary.href} className="pl-btn">
              {lightContact.primary.label}
            </Link>
            <Link href={lightContact.secondary.href} className="pl-link">
              {lightContact.secondary.label}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
