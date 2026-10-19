import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { getPublishedProjects } from "@/content/projects";

/**
 * The light world's homepage.
 *
 * Not the dark homepage in other colours: a different information
 * architecture, a different composition per section and its own copy. Work
 * comes before services on purpose — the brief wants the projects to argue
 * for the services rather than the other way round.
 *
 * Shared with the dark world: the project records, the business facts and
 * the contact details. Nothing factual is written twice.
 */

const SELECTED = [
  {
    slug: "vehicle-freak",
    kicker: "SEO / CONTENT / YOUTUBE",
    title: "Od korisnog sadržaja do međunarodne publike.",
    body: "SEO, sadržajna strategija, automobilsko istraživanje i YouTube scenariji. U razdoblju najveće popularnosti portal je privlačio više od milijun jedinstvenih posjetitelja mjesečno i ostvarivao više od 60.000 USD mjesečnog prihoda od oglašavanja.",
    note: "Povijesni rezultati cijelog portala i cijelog tima. Moj doprinos: sadržajna strategija, istraživanje, pisanje i YouTube skripte.",
    ground: "lw-yellow",
  },
  {
    slug: "100-smart-food",
    kicker: "ECOMMERCE / NEXT.JS",
    title: "Digitalna trgovina izgrađena oko stvarnog poslovanja.",
    body: "Razvoj eCommerce iskustva i povezivanje tehnologije s prodajnim procesima. Fokus na korisničkom iskustvu, upravljanju proizvodima, integracijama i operativnoj učinkovitosti.",
    note: null,
    ground: "lw-paper",
  },
  {
    slug: "bolero-erp",
    kicker: "ERP / PROCESI",
    title: "Kad poslovni sustavi trebaju pratiti rast poslovanja.",
    body: "Analiza procesa, ERP arhitektura, migracijska strategija i planiranje integracija.",
    note: "Projekt je u razvoju. Opisano je ono što je dogovoreno i analizirano, ne ono što je već implementirano.",
    ground: "lw-mint",
  },
  {
    slug: "bolero-temu",
    kicker: "MARKETPLACE / OPERATIVA",
    title: "Novi prodajni kanal. Nova operativna pravila.",
    body: "Razvoj marketplace prodaje, upravljanje katalogom, cijenama, narudžbama i logistikom.",
    note: null,
    ground: "lw-peach",
  },
];

const IMPACT = [
  {
    value: "1M+",
    label: "jedinstvenih mjesečnih posjetitelja",
    note: "Vehicle Freak na povijesnom vrhuncu. Rezultat cijelog portala i tima, ne jedne osobe.",
  },
  {
    value: "$60K+",
    label: "mjesečnog prihoda od oglašavanja",
    note: "Vehicle Freak u najuspješnijem razdoblju. Prihod projekta, ne osobna zarada.",
  },
  {
    value: "75+",
    label: "ljudi u organizaciji",
    note: "Organizacija čijom sam HR funkcijom upravljao — ne broj mojih zaposlenika.",
  },
  {
    value: "2018.",
    label: "godina pokretanja obrta",
    note: "Pinko, obrt za informatičke usluge.",
  },
];

const PROBLEMS = [
  {
    index: "01",
    title: "Vaš digitalni proizvod ne prati ambicije poslovanja.",
    body: "Web je spor, webshop ograničava prodaju ili postojeći sustav više ne podržava ono što želite postići. Pomažem definirati, razviti i unaprijediti digitalna rješenja koja imaju jasnu poslovnu svrhu.",
    ground: "lw-lavender",
  },
  {
    index: "02",
    title: "Imate kvalitetnu ponudu, ali nedovoljnu vidljivost.",
    body: "SEO, sadržaj i digitalni marketing trebaju privlačiti pravu publiku i pomagati joj donijeti odluku. Gradim pristup koji povezuje istraživanje korisnika, sadržaj i komercijalne ciljeve.",
    ground: "lw-peach",
  },
  {
    index: "03",
    title: "Vaši sustavi i procesi rade jedni protiv drugih.",
    body: "Ručno prepisivanje, nepovezani podaci i nepotrebni operativni koraci usporavaju rast. Pomažem analizirati procese, definirati integracije i osmisliti učinkovitiji način rada.",
    ground: "lw-mint",
  },
];

const APPROACH = [
  {
    key: "DISCOVER",
    title: "Razumjeti problem.",
    body: "Upoznajem poslovanje, korisnike, postojeće procese i ciljeve.",
  },
  {
    key: "DEFINE",
    title: "Odabrati pravi smjer.",
    body: "Definiramo prioritete, opseg, očekivane rezultate i način suradnje.",
  },
  {
    key: "BUILD",
    title: "Pretvoriti plan u konkretan rad.",
    body: "Razvoj, sadržaj, integracije ili operativne promjene — ovisno o projektu.",
  },
  {
    key: "IMPROVE",
    title: "Mjeriti, učiti i unapređivati.",
    body: "Projekt ne promatram samo kao isporuku, nego kao rješenje koje treba nastaviti stvarati vrijednost.",
  },
];

const CAPABILITIES = [
  {
    group: "Technology",
    ground: "lw-lavender",
    items: [
      "Web development",
      "eCommerce",
      "Aplikacije po mjeri",
      "Integracije sustava",
      "Automatizacije",
      "Hosting i održavanje",
    ],
  },
  {
    group: "Growth",
    ground: "lw-yellow",
    items: [
      "SEO strategija",
      "Sadržajna strategija",
      "Copywriting",
      "Digitalni marketing",
      "Email automatizacije",
      "Amazon i Temu",
    ],
  },
  {
    group: "Business",
    ground: "lw-mint",
    items: [
      "Analiza poslovnih procesa",
      "ERP i CRM savjetovanje",
      "Upravljanje proizvodom",
      "Digitalna transformacija",
      "Razvoj prodajnih kanala",
      "Operativna poboljšanja",
    ],
  },
];

export function LightHome() {
  const published = getPublishedProjects();
  const bySlug = new Map(published.map((p) => [p.slug, p]));

  return (
    <div className="light-world">
      {/* ---------------------------------------------------------- 01 */}
      <section className="lw-section lw-lavender overflow-hidden">
        <div className="lw-wrap">
          <p className="lw-eyebrow">
            Matija Pinko <span aria-hidden="true">/</span> Independent digital
            specialist
          </p>

          <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
            <div>
              <h1 className="lw-display">
                Kompleksne stvari.
                <br />
                Jednostavno riješene.
              </h1>

              <p className="lw-lead mt-9">
                Razvijam digitalne proizvode, stvaram strategije rasta i
                povezujem poslovne procese u cjeline koje funkcioniraju. Od
                prvog korisničkog klika do sustava koji stoje iza njega.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/projekti" className="lw-pill">
                  Istražite moj rad <span aria-hidden="true">↗</span>
                </Link>
                <Link href="/kontakt" className="lw-pill lw-pill-ghost">
                  Razgovarajmo o projektu <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>

            {site.portrait ? (
              <figure className="relative">
                <div className="relative aspect-4/5 w-full overflow-hidden">
                  <Image
                    src={site.portrait.src}
                    alt={site.portrait.alt}
                    width={site.portrait.width}
                    height={site.portrait.height}
                    sizes="(min-width: 1024px) 26rem, 80vw"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="lw-eyebrow mt-4">
                  Matija Pinko <span aria-hidden="true">/</span> Pinko, obrt za
                  informatičke usluge
                </figcaption>
              </figure>
            ) : null}
          </div>

          <div className="lw-rule mt-14 pt-8">
            <p className="lw-body">
              Ja sam Matija Pinko. Tijekom karijere radio sam na razvoju
              digitalnih proizvoda, međunarodnim eCommerce projektima,
              sadržajnim strategijama i upravljanju poslovnim procesima. Danas
              to iskustvo koristim kako bih tvrtkama pomogao pretvoriti složene
              izazove u konkretna, održiva rješenja. Bez nepotrebnog
              kompliciranja.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- 02 */}
      <section className="lw-section lw-paper">
        <div className="lw-wrap">
          <p className="lw-eyebrow">Selected work / 2020—2026</p>
          <h2 className="lw-h2 mt-6">
            Rad koji govori više od opisa usluga.
          </h2>
          <p className="lw-lead mt-7">
            Različite industrije. Različiti izazovi. Zajedničko im je da su
            zahtijevali više od jednog alata, jedne discipline ili jednog dobrog
            prijedloga. Ovo je izbor projekata na kojima sam radio i rezultata
            kojima sam doprinio.
          </p>
        </div>
      </section>

      {SELECTED.map((item, i) => {
        const project = bySlug.get(item.slug);
        if (!project) return null;
        const image = project.featuredImage;
        const flip = i % 2 === 1;

        return (
          <section
            key={item.slug}
            className={`lw-section ${item.ground}`}
            aria-labelledby={`work-${item.slug}`}
          >
            <div className="lw-wrap">
              <div
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  flip ? "lg:[&>figure]:order-first" : ""
                }`}
              >
                <div>
                  <p className="lw-eyebrow">{item.kicker}</p>
                  <h3 id={`work-${item.slug}`} className="lw-h3 mt-5">
                    {item.title}
                  </h3>
                  <p className="lw-body mt-5">{item.body}</p>
                  {item.note ? (
                    <p className="lw-body mt-4 text-[0.9375rem] opacity-70">
                      {item.note}
                    </p>
                  ) : null}
                  <Link
                    href={`/projekti/${project.slug}`}
                    className="lw-pill mt-8"
                  >
                    Pogledajte projekt <span aria-hidden="true">↗</span>
                  </Link>
                </div>

                {image ? (
                  <figure className="overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="(min-width: 1024px) 40rem, 92vw"
                      className="h-auto w-full"
                    />
                  </figure>
                ) : (
                  <figure className="lw-dots flex aspect-16/10 items-center justify-center">
                    <p className="lw-eyebrow">{project.contributionLabel}</p>
                  </figure>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <section className="lw-section lw-paper">
        <div className="lw-wrap lw-rule pt-10">
          <p className="lw-body">
            Ostali projekti: Teladoc, Elektronim Instalacije, Virus.hr, Varel,
            Adpiler i potvrđeni freelance angažmani.
          </p>
          <Link href="/projekti" className="lw-pill mt-7">
            Svi projekti <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------------- 03 */}
      <section className="lw-section lw-blue">
        <div className="lw-wrap">
          <h2 className="lw-h2">
            Iskustvo je korisno. Rezultati su uvjerljiviji.
          </h2>
          <p className="lw-lead mt-7 opacity-90">
            Dobar projekt nije samo ono što je isporučeno. Važno je i kakvu je
            vrijednost stvorio, koji je problem riješio i što je omogućio dalje.
          </p>

          <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {IMPACT.map((fact) => (
              <li key={fact.label}>
                <p className="lw-figure">{fact.value}</p>
                <p className="mt-4 font-semibold">{fact.label}</p>
                <p className="mt-2 text-sm opacity-80">{fact.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------- 04 */}
      <section className="lw-section lw-paper">
        <div className="lw-wrap">
          <h2 className="lw-h2">Tehnologija je alat. Poslovni rezultat je cilj.</h2>
          <p className="lw-lead mt-7">
            Tvrtke rijetko imaju problem koji se može riješiti samo ljepšim
            dizajnom, novom aplikacijom ili dodatnom kampanjom. Najčešće je
            potrebno razumjeti kako su korisnici, tehnologija i poslovni procesi
            povezani.
          </p>
        </div>
      </section>

      {PROBLEMS.map((problem) => (
        <section key={problem.index} className={`lw-section ${problem.ground}`}>
          <div className="lw-wrap grid gap-8 lg:grid-cols-[6rem_1fr_1fr] lg:gap-14">
            <p className="lw-eyebrow lg:pt-3">{problem.index}</p>
            <h3 className="lw-h3">{problem.title}</h3>
            <p className="lw-body lg:pt-2">{problem.body}</p>
          </div>
        </section>
      ))}

      {/* ---------------------------------------------------------- 05 */}
      <section className="lw-section lw-paper">
        <div className="lw-wrap">
          <h2 className="lw-h2">Dobar rezultat počinje pravim pitanjima.</h2>
          <p className="lw-lead mt-7">
            Prije nego što predložim tehnologiju, kampanju ili novi sustav,
            želim razumjeti što zapravo pokušavamo postići. Jer najskuplje
            rješenje nije uvijek najbolje. A najbrže nije uvijek najpametnije.
          </p>

          <ol className="mt-14">
            {APPROACH.map((step) => (
              <li
                key={step.key}
                data-reveal
                className="lw-rule grid gap-4 py-8 lg:grid-cols-[10rem_1fr_1fr] lg:gap-14"
              >
                <p className="lw-eyebrow lg:pt-2">{step.key}</p>
                <h3 className="lw-h3">{step.title}</h3>
                <p className="lw-body lg:pt-2">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------------------------------------------------- 06 */}
      <section className="lw-section lw-lavender">
        <div className="lw-wrap">
          <p className="lw-eyebrow">The person behind the work</p>
          <div className="mt-8 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            {site.portrait ? (
              <figure className="aspect-4/5 overflow-hidden">
                <Image
                  src={site.portrait.src}
                  alt=""
                  width={site.portrait.width}
                  height={site.portrait.height}
                  sizes="(min-width: 1024px) 28rem, 90vw"
                  className="h-full w-full object-cover"
                />
              </figure>
            ) : null}

            <div>
              <h2 className="lw-h2">Jedan čovjek. Više perspektiva.</h2>
              <div className="lw-body mt-7 space-y-4">
                <p>
                  Bok, ja sam Matija. Karijeru nisam gradio unutar samo jedne
                  discipline. Radio sam u prodaji, vodio timove i poslovne
                  operacije, sudjelovao u razvoju digitalnih proizvoda i stvarao
                  sadržaj za međunarodnu publiku.
                </p>
                <p>
                  Danas razvijam webove i aplikacije, radim na eCommerce
                  projektima, digitalnom marketingu i poslovnim sustavima.
                </p>
                <p>
                  Ta kombinacija iskustva omogućuje mi da problem sagledam iz
                  više kutova. Razumijem što očekuje korisnik, što treba
                  poslovanju i što je potrebno da se rješenje stvarno izvede.
                </p>
                <p>
                  Ne vjerujem u kompliciranje radi dojma. Vjerujem u dobar rad.
                </p>
              </div>
              <Link href="/o-meni" className="lw-pill mt-8">
                Više o meni <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- 07 */}
      <section className="lw-section lw-paper">
        <div className="lw-wrap">
          <h2 className="lw-h2">Od ideje do izvedbe. I svega između.</h2>
          <p className="lw-lead mt-7">
            Suradnja može obuhvatiti cijeli projekt ili samo dio u kojem trebate
            dodatno iskustvo.
          </p>
        </div>
      </section>

      <div className="grid lg:grid-cols-3">
        {CAPABILITIES.map((group) => (
          <section
            key={group.group}
            className={`lw-section ${group.ground}`}
            aria-labelledby={`cap-${group.group}`}
          >
            <div className="lw-wrap lg:w-[calc(100%-4rem)]">
              <h3 id={`cap-${group.group}`} className="lw-h3">
                {group.group}
              </h3>
              <ul className="mt-7 space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="lw-rule pt-3 text-lg">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <section className="lw-section lw-paper">
        <div className="lw-wrap">
          <Link href="/usluge" className="lw-pill">
            Sve usluge <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------------- 08 */}
      <section className="lw-section lw-blue">
        <div className="lw-wrap">
          <p className="lw-eyebrow">Let&rsquo;s make it work.</p>
          <h2 className="lw-h2 mt-6">
            Imate ideju. Izazov. Ili problem koji predugo čeka rješenje?
          </h2>
          <p className="lw-lead mt-7 opacity-90">
            Razgovarajmo o tome što želite postići. Bez nepotrebne prezentacije
            i unaprijed pripremljenog prodajnog scenarija. Samo konkretan
            razgovor o Vašem projektu.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/kontakt" className="lw-pill">
              Započnimo razgovor <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/kako-radim" className="lw-pill lw-pill-ghost">
              Pogledajte kako surađujem <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <p className="lw-eyebrow mt-8 opacity-80">
            Dobar projekt često počinje jednostavnom porukom.
          </p>
        </div>
      </section>
    </div>
  );
}
