import type { Metadata } from "next";
import { PrintButton } from "@/components/ui/PrintButton";
import {
  cvContexts,
  cvEducation,
  cvLanguages,
  cvProfile,
  cvSummary,
  cvTools,
  cvToolsNote,
  experience,
  expertise,
} from "@/content/cv";

export const metadata: Metadata = {
  title: "CV — Matija Pinko",
  description:
    "Profesionalni životopis Matije Pinka: AI i LLM primjena, digitalni proizvodi, e-commerce, marketing i operativno vodstvo. Za ispis ili spremanje u PDF.",
  alternates: { canonical: "/cv" },
};

function Head({ children }: { children: string }) {
  return (
    <h2 className="cv-head mt-12 border-b border-rule pb-2 text-(length:--text-title) font-extrabold">
      {children}
    </h2>
  );
}

export default function CvPage() {
  return (
    <article className="cv wrap py-14 md:py-20">
      <header className="cv-header">
        <p className="mono-label text-ink-soft">Životopis</p>
        <h1 className="mt-3 text-(length:--text-display) font-extrabold">
          {cvProfile.name}
        </h1>
        <p className="mt-2 text-(length:--text-lead) font-semibold">
          {cvProfile.title}
        </p>
        <p className="measure-wide mt-4 text-ink-soft">{cvProfile.claim}</p>

        <ul className="mt-6 flex flex-col gap-1.5 text-sm text-ink-soft sm:flex-row sm:flex-wrap sm:gap-x-6">
          <li>{cvProfile.location}</li>
          <li>
            <a
              className="inline-flex min-h-6 items-center underline underline-offset-4"
              href={`mailto:${cvProfile.email}`}
            >
              {cvProfile.email}
            </a>
          </li>
          <li>
            <a
              className="inline-flex min-h-6 items-center underline underline-offset-4"
              href={cvProfile.linkedin}
              rel="noopener noreferrer"
              target="_blank"
            >
              linkedin.com/in/matijapinko
            </a>
          </li>
          <li>
            <a className="inline-flex min-h-6 items-center underline underline-offset-4" href={cvProfile.web}>
              pinko.hr
            </a>
          </li>
        </ul>

        {/* No PDF is offered until a real file exists; the browser's own
            print dialogue saves one just as well. */}
        <PrintButton />
      </header>

      <Head>Profil</Head>
      <div className="measure-wide mt-5 space-y-4 text-ink-soft">
        {cvSummary.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <Head>Područja stručnosti</Head>
      <div className="mt-5 grid gap-7 md:grid-cols-2">
        {expertise.map((group) => (
          <section key={group.area} className="cv-block">
            <h3 className="font-extrabold">{group.area}</h3>
            <ul className="mt-2.5 space-y-1.5 text-ink-soft">
              {group.items.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span aria-hidden="true" className="text-accent">
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <Head>Profesionalno iskustvo</Head>
      <ol className="mt-5">
        {experience.map((entry) => (
          <li
            key={`${entry.organisation}-${entry.period}`}
            className="cv-block border-b border-rule py-6 last:border-b-0"
          >
            <p className="mono-label text-ink-soft">{entry.period}</p>
            <h3 className="mt-1.5 text-lg font-extrabold">{entry.role}</h3>
            <p className="text-sm font-semibold text-accent">
              {entry.organisation}
            </p>
            <p className="measure-wide mt-2.5 text-ink-soft">{entry.summary}</p>
            {entry.bullets ? (
              <ul className="mt-3 space-y-1.5 text-ink-soft">
                {entry.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2.5">
                    <span aria-hidden="true" className="text-accent">
                      —
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>

      <Head>Odabrani projekti i konteksti</Head>
      <dl className="mt-5 space-y-4">
        {cvContexts.map((item) => (
          <div key={item.name} className="cv-block">
            <dt className="font-extrabold">{item.name}</dt>
            <dd className="measure-wide text-ink-soft">{item.what}</dd>
          </div>
        ))}
      </dl>

      <Head>Alati i radna okruženja</Head>
      <ul className="mt-5 flex flex-wrap gap-2">
        {cvTools.map((tool) => (
          <li
            key={tool}
            className="rounded-(--radius-pill) border border-rule px-3 py-1.5 text-sm"
          >
            {tool}
          </li>
        ))}
      </ul>
      <p className="measure-wide mt-4 text-sm text-ink-soft">{cvToolsNote}</p>

      <div className="grid gap-10 md:grid-cols-2">
        <section>
          <Head>Obrazovanje</Head>
          <ul className="mt-5 space-y-4">
            {cvEducation.map((item) => (
              <li key={item.school} className="cv-block">
                <p className="mono-label text-ink-soft">{item.period}</p>
                <p className="mt-1 font-extrabold">{item.school}</p>
                <p className="text-ink-soft">{item.field}</p>
                {item.note ? (
                  <p className="mt-1 text-sm text-ink-soft">{item.note}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <Head>Jezici</Head>
          <ul className="mt-5 space-y-2">
            {cvLanguages.map((item) => (
              <li key={item.name}>
                <span className="font-semibold">{item.name}</span>{" "}
                <span className="text-ink-soft">— {item.level}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
