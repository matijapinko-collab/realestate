import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { experience } from "@/content/cv";

/**
 * The light world's "about".
 *
 * A professional biography rather than an endless stack of cards: a large
 * portrait, the story in four paragraphs, three things a client actually
 * buys, and a condensed timeline of the roles that matter — the full list
 * stays on /cv, which is where someone who wants it will look.
 */
export function LightAbout() {
  // The timeline is a summary here; the CV page carries every entry.
  const selected = experience.slice(0, 6);

  return (
    <div className="light-world">
      <section className="lw-section lw-lavender">
        <div className="lw-wrap">
          <p className="lw-eyebrow">The person behind the work</p>
          <div className="mt-8 grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <h1 className="lw-display">Jedan čovjek. Više perspektiva.</h1>
              <p className="lw-lead mt-8">
                Karijeru nisam gradio unutar samo jedne discipline — i upravo
                mi to danas pomaže da problem sagledam iz više kutova.
              </p>
            </div>

            {site.portrait ? (
              <figure>
                <div className="aspect-4/5 overflow-hidden">
                  <Image
                    src={site.portrait.src}
                    alt={site.portrait.alt}
                    width={site.portrait.width}
                    height={site.portrait.height}
                    sizes="(min-width: 1024px) 28rem, 90vw"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="lw-eyebrow mt-4">
                  Matija Pinko <span aria-hidden="true">/</span> Velika Mlaka
                </figcaption>
              </figure>
            ) : null}
          </div>
        </div>
      </section>

      <section className="lw-section lw-paper">
        <div className="lw-wrap grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="lw-body space-y-4">
            <p>
              Bok, ja sam Matija. Radio sam u prodaji, vodio timove i poslovne
              operacije, sudjelovao u razvoju digitalnih proizvoda i stvarao
              sadržaj za međunarodnu publiku.
            </p>
            <p>
              Danas razvijam webove i aplikacije, radim na eCommerce
              projektima, digitalnom marketingu i poslovnim sustavima.
            </p>
            <p>
              Ta kombinacija iskustva omogućuje mi da razumijem što očekuje
              korisnik, što treba poslovanju i što je potrebno da se rješenje
              stvarno izvede.
            </p>
            <p>
              Ne vjerujem u kompliciranje radi dojma. Vjerujem u dobar rad.
            </p>
          </div>

          <ul className="space-y-8">
            {[
              {
                index: "01",
                title: "Razgovarate sa mnom",
                body: "Bez posrednika između vas i osobe koja radi posao. Odluke objašnjavam jezikom poslovanja, ne kraticama.",
              },
              {
                index: "02",
                title: "Opseg prije početka",
                body: "Prije nego što krenemo znamo što je uključeno, što nije, tko je za što odgovoran i što se mjeri kao gotovo.",
              },
              {
                index: "03",
                title: "Cijela slika",
                body: "Razvoj, marketing i poslovni procesi prate isti plan, pa odluka iz jednog područja ne ruši drugo.",
              },
            ].map((item) => (
              <li key={item.index} className="lw-rule pt-5">
                <p className="lw-eyebrow">{item.index}</p>
                <h2 className="lw-h3 mt-2">{item.title}</h2>
                <p className="lw-body mt-3">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="lw-section lw-paper pt-0">
        <div className="lw-wrap">
          <h2 className="lw-h2">Odabrane uloge</h2>
          <ol className="mt-12">
            {selected.map((entry) => (
              <li
                key={`${entry.organisation}-${entry.period}`}
                data-reveal
                className="lw-rule grid gap-3 py-7 lg:grid-cols-[14rem_1fr_1fr] lg:gap-12"
              >
                <p className="lw-eyebrow lg:pt-2">{entry.period}</p>
                <div>
                  <h3 className="text-xl font-medium tracking-tight">
                    {entry.role}
                  </h3>
                  <p className="mt-1 font-medium opacity-70">
                    {entry.organisation}
                  </p>
                </div>
                <p className="lw-body lg:pt-1">{entry.summary}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/cv" className="lw-pill">
              Cijeli životopis <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/projekti" className="lw-pill lw-pill-ghost">
              Projekti <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="lw-section lw-blue">
        <div className="lw-wrap">
          <h2 className="lw-h2">
            Ako vam se ovo iskustvo čini korisnim za vaš projekt, javite se.
          </h2>
          <Link href="/kontakt" className="lw-pill mt-9">
            Započnimo razgovor <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
