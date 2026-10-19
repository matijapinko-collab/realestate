import Link from "next/link";
import { services } from "@/content/services";

/**
 * The light world's services page.
 *
 * Organised by the business problem rather than by Matija's department, and
 * written in the light register: the dark world's sales copy — the circus,
 * the Excel jokes, the previous contractor — stays where it belongs. The
 * factual scope lists and the boundaries are the same data as the dark
 * world uses; only the framing around them changes.
 */

const PROBLEM_FRAMING: Record<
  string,
  { problem: string; outcome: string; ground: string }
> = {
  development: {
    problem:
      "Vaš digitalni proizvod ne prati ambicije poslovanja. Web je spor, webshop ograničava prodaju ili postojeći sustav više ne podržava ono što želite postići.",
    outcome:
      "Rješenje koje ljudi mogu koristiti bez objašnjenja i koje vi možete održavati bez developera za svaku izmjenu.",
    ground: "lw-lavender",
  },
  marketing: {
    problem:
      "Imate kvalitetnu ponudu, ali nedovoljnu vidljivost. Publika koja bi kupila ne zna da postojite, ili ne razumije zašto bi odabrala vas.",
    outcome:
      "Sadržaj i kanali posloženi oko stvarne namjere kupca, s mjerenjem koje pokazuje što se dogodilo nakon klika.",
    ground: "lw-yellow",
  },
  "business-development": {
    problem:
      "Vaši sustavi i procesi rade jedni protiv drugih. Ručno prepisivanje, nepovezani podaci i nepotrebni koraci usporavaju rast.",
    outcome:
      "Procesi i integracije posloženi prema tome kako tvrtka stvarno radi, s planom koji se može izvesti u fazama.",
    ground: "lw-mint",
  },
};

export function LightServices() {
  return (
    <div className="light-world">
      <section className="lw-section lw-paper">
        <div className="lw-wrap">
          <p className="lw-eyebrow">Expertise</p>
          <h1 className="lw-display mt-6">
            Tri područja koja rijetko stoje odvojeno.
          </h1>
          <p className="lw-lead mt-8">
            Tehnologija bez poslovne logike ostaje skup projektnih zadataka.
            Marketing bez dobrog proizvoda i procesa teško doseže puni
            potencijal. Strategija bez izvedbe ostaje prezentacija. Suradnja
            može obuhvatiti cijeli projekt ili samo dio u kojem trebate dodatno
            iskustvo.
          </p>
        </div>
      </section>

      {services.map((service, i) => {
        const framing = PROBLEM_FRAMING[service.slug];
        if (!framing) return null;

        return (
          <section
            key={service.slug}
            id={service.slug}
            className={`lw-section ${framing.ground}`}
            aria-labelledby={`svc-${service.slug}`}
          >
            <div className="lw-wrap">
              <div className="grid gap-10 lg:grid-cols-[6rem_1fr] lg:gap-14">
                <p className="lw-eyebrow lg:pt-4">
                  {String(i + 1).padStart(2, "0")}
                </p>

                <div>
                  <h2 id={`svc-${service.slug}`} className="lw-h2">
                    {service.name}
                  </h2>

                  <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14">
                    <div>
                      <p className="lw-eyebrow">Problem</p>
                      <p className="lw-body mt-3">{framing.problem}</p>
                    </div>
                    <div>
                      <p className="lw-eyebrow">Što dobivate</p>
                      <p className="lw-body mt-3">{framing.outcome}</p>
                    </div>
                  </div>

                  <ul className="mt-12 grid gap-x-10 gap-y-6 md:grid-cols-2">
                    {service.items.map((item) => (
                      <li key={item.title} className="lw-rule pt-4">
                        <h3 className="text-lg font-medium">{item.title}</h3>
                        <p className="lw-body mt-2 text-[0.9375rem]">
                          {item.body}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <details className="lw-rule mt-12 pt-5">
                    <summary className="cursor-pointer font-medium">
                      Što nije uključeno
                    </summary>
                    <ul className="lw-body mt-4 space-y-3">
                      {service.boundaries.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </details>

                  <Link
                    href={`/usluge/${service.slug}`}
                    className="lw-pill mt-10"
                  >
                    Detaljan opseg <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="lw-section lw-blue">
        <div className="lw-wrap">
          <p className="lw-eyebrow">Let&rsquo;s make it work.</p>
          <h2 className="lw-h2 mt-6">
            Niste sigurni u koje od tri područja vaš problem spada?
          </h2>
          <p className="lw-lead mt-7 opacity-90">
            To je u redu — većina stvarnih problema ne stane uredno u jednu
            kategoriju. Opišite situaciju i reći ću vam odakle bih krenuo.
          </p>
          <Link href="/kontakt" className="lw-pill mt-9">
            Razgovarajmo o projektu <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
