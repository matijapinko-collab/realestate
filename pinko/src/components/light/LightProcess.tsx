import Link from "next/link";
import { processSteps } from "@/content/copy";

/**
 * The light world's "how I work".
 *
 * Four phases as an editorial timeline, and for each one the four things a
 * client actually wants to know before signing: what happens, what they
 * get, what they need to prepare, and when the decision to continue is
 * made. The phase names and their deliverables are the same data the dark
 * world uses; what is new here is that the last two columns are stated
 * rather than implied.
 */

const DETAIL: Record<
  string,
  { prepare: string; decision: string; ground: string }
> = {
  "01": {
    prepare:
      "Pristup postojećem webu ili sustavu, ime osobe koja odlučuje i gruba predodžba roka.",
    decision:
      "Nakon ovog koraka odlučujete idemo li dalje — bez obveze da nastavite sa mnom.",
    ground: "lw-paper",
  },
  "02": {
    prepare:
      "Odgovore na pitanja iz prvog koraka i potvrdu što je prioritet, a što može čekati.",
    decision:
      "Potpisom ponude dogovoren je opseg, cijena i kriteriji prihvata. Sve izvan toga je zasebna odluka.",
    ground: "lw-yellow",
  },
  "03": {
    prepare:
      "Sadržaj, materijale i pristupe sustavima koje povezujemo, te osobu koja daje povratnu informaciju.",
    decision:
      "Smjer dizajna potvrđuje se prije pune implementacije, dok je promjena još jeftina.",
    ground: "lw-mint",
  },
  "04": {
    prepare:
      "Vrijeme za obuku i odluku o paketu održavanja koji vam odgovara.",
    decision:
      "Nakon puštanja dogovaramo opseg podrške; bez toga projekt je isporučen, ali nije čuvan.",
    ground: "lw-peach",
  },
};

export function LightProcess() {
  return (
    <div className="light-world">
      <section className="lw-section lw-paper">
        <div className="lw-wrap">
          <p className="lw-eyebrow">Approach</p>
          <h1 className="lw-display mt-6">
            Dobar rezultat počinje pravim pitanjima.
          </h1>
          <p className="lw-lead mt-8">
            Prije nego što predložim tehnologiju, kampanju ili novi sustav,
            želim razumjeti što zapravo pokušavamo postići. Ne trebate doći s
            tehničkom specifikacijom — dovoljno je da znate što vas muči i što
            želite postići.
          </p>
        </div>
      </section>

      {processSteps.map((step) => {
        const detail = DETAIL[step.index];
        if (!detail) return null;

        return (
          <section
            key={step.index}
            className={`lw-section ${detail.ground}`}
            aria-labelledby={`faza-${step.index}`}
          >
            <div className="lw-wrap grid gap-10 lg:grid-cols-[6rem_1fr] lg:gap-14">
              <p className="lw-eyebrow lg:pt-4">{step.index}</p>

              <div>
                <h2 id={`faza-${step.index}`} className="lw-h2">
                  {step.title}
                </h2>
                <p className="lw-lead mt-6">{step.body}</p>

                <dl className="mt-12 grid gap-8 md:grid-cols-3">
                  <div className="lw-rule pt-4">
                    <dt className="lw-eyebrow">Što dobivate</dt>
                    <dd className="lw-body mt-3">{step.output}</dd>
                  </div>
                  <div className="lw-rule pt-4">
                    <dt className="lw-eyebrow">Što pripremate</dt>
                    <dd className="lw-body mt-3">{detail.prepare}</dd>
                  </div>
                  <div className="lw-rule pt-4">
                    <dt className="lw-eyebrow">Odluka o nastavku</dt>
                    <dd className="lw-body mt-3">{detail.decision}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
        );
      })}

      <section className="lw-section lw-blue">
        <div className="lw-wrap">
          <h2 className="lw-h2">Krenimo od prvog koraka.</h2>
          <p className="lw-lead mt-7 opacity-90">
            Opišite situaciju i dogovorit ćemo razgovor u kojem ćemo proći
            problem, ograničenja i ono što želite postići.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/kontakt" className="lw-pill">
              Započnimo razgovor <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/cjenik" className="lw-pill lw-pill-ghost">
              Pogledajte cijene <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
