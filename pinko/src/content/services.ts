/** Detailed service lists per discipline (brief section 4). */

export type ServiceItem = {
  title: string;
  body: string;
};

export const developmentServices: ServiceItem[] = [
  {
    title: "Next.js poslovni webovi",
    body: "Vlastiti vizualni sustav, struktura sadržaja, landing stranice, jednostavno uređivanje i kontaktni tokovi.",
  },
  {
    title: "Webshopovi",
    body: "Prilagođeni katalog, pretraga, filteri, varijacije, košarica, checkout te odabrane dostavne i platne integracije.",
  },
  {
    title: "Web aplikacije",
    body: "Korisnički računi, portali, interni alati, dashboardi, rezervacije, konfiguratori i funkcije prilagođene vašem procesu.",
  },
  {
    title: "API integracije i automatizacije",
    body: "ERP, CRM, katalog, narudžbe, zalihe, kurirske službe i servisi trećih strana — prema onome što njihov pristup stvarno dopušta.",
  },
  {
    title: "Arhitektura sustava",
    body: "Izbor komponenti, model podataka, izvori istine, ovlasti, troškovi, rizici, faze razvoja i plan prelaska.",
  },
  {
    title: "Modernizacija",
    body: "Postupna migracija na Next.js, uključujući headless WooCommerce kada zadržavanje backenda ima poslovnog smisla.",
  },
  {
    title: "Hosting i infrastruktura",
    body: "Deployment, upravljano okruženje, migracije, održavanje, monitoring i sigurnosne kopije prema ugovorenom paketu.",
  },
];

export const developmentBoundaries = [
  "„Aplikacije” ovdje znače web aplikacije i po potrebi PWA. Native iOS/Android razvoj i objava u trgovinama nisu uključeni u standardne pakete i ne obećavam ih bez zasebne procjene.",
  "WordPress radim kao dopunsku uslugu za održavanje, migraciju i selektivne projekte. Ne gradim identitet weba oko instalacije tema i plugina.",
  "Next.js nije automatski bolji u svakom slučaju. Izbor mora slijediti vaše potrebe — ako postojeći sustav dobro služi, reći ću vam to.",
];

export const marketingServices: ServiceItem[] = [
  {
    title: "SEO strategija i tehnička suradnja s razvojem",
    body: "Struktura stranica, namjera pretrage, prioriteti i on-page optimizacija — dogovoreni zajedno s razvojem, ne naknadno zalijepljeni.",
  },
  {
    title: "Sadržaj i copywriting",
    body: "Web, landing stranice, kategorije, proizvodi, članci, prodajni emailovi i sadržaj koji objašnjava ponudu jezikom kupca.",
  },
  {
    title: "Email marketing",
    body: "Početno postavljanje, segmentacija, welcome tokovi, napuštena košarica gdje postoje tehnički i pravni uvjeti, post-purchase tokovi i newsletteri.",
  },
  {
    title: "Amazon",
    body: "Pregled spremnosti, katalog i listing optimizacija, A+ sadržaj u dogovorenom opsegu, plan lansiranja i organizacija prodajne operative.",
  },
  {
    title: "Temu",
    body: "Procjena kanala, onboarding podrška, katalog te procesi naručivanja i isporuke prema mogućnostima platforme.",
  },
];

export const marketingBoundaries = [
  "Google Ads, Meta Ads i vođenje društvenih mreža u ovoj verziji ne nudim kao aktivne usluge. PPC upravljanje nije dio Amazon paketa.",
  "Ne obećavam platformsku dozvolu, prihvaćanje listinga, recenzije ni prodaju.",
  "Pravna i regulatorna usklađenost te službene registracije odvojene su od operativne pomoći.",
];

export const bizDevServices: ServiceItem[] = [
  {
    title: "Digitalni poslovni audit",
    body: "Prodajni put, alati, procesi i najveće prepreke — s popisom prioriteta umjesto općenitih preporuka.",
  },
  {
    title: "Plan razvoja za 90 dana",
    body: "Prioriteti, vlasnici zadataka, troškovni okvir, ovisnosti i mjerila uspjeha.",
  },
  {
    title: "E-commerce poslovni model",
    body: "Marže, trošak kanala, dostava, povrati, prag rentabilnosti i scenariji prema vašim podacima.",
  },
  {
    title: "Razvoj novih kanala i tržišta",
    body: "Izvedivost, pilot, resursi i plan operacije prije šireg ulaganja.",
  },
  {
    title: "Specifikacija ERP/CRM i integracija",
    body: "Poslovni zahtjevi, mapiranje procesa, model razmjene podataka i koordinacija s dobavljačem.",
  },
  {
    title: "Vanjski voditelj digitalnog razvoja",
    body: "Backlog, koordinacija izvođača, kontrola opsega i redovita prioritizacija.",
  },
];

export const bizDevBoundaries = [
  "Ne obećavam pronalazak investitora, pravno ili porezno savjetovanje, računovodstvo ni zajamčene prodajne kontakte.",
  "Prodajem konkretan plan i odgovornost za dogovorene aktivnosti — ne obećanje određenog prometa ili povrata ulaganja.",
];

/* ------------------------------------------------------------------ *
 * The four services (brief of 19 Oct 2026)
 *
 * The site used to present three disciplines — Development, Marketing and
 * Business Development. The brief names four services instead, written the
 * way a client describes a problem rather than the way an agency sorts its
 * departments. The headline, body and CTA of each are Matija's own words and
 * are reproduced as written.
 *
 * The detailed item lists above are not rewritten: each item moves to the
 * service it belongs to, and every one of them still appears exactly once.
 * Nothing here invents a service that was not already offered.
 * ------------------------------------------------------------------ */

export type Service = {
  slug: string;
  index: string;
  /** Short name, used in navigation and cards. */
  name: string;
  /** The promise, in Matija's voice. */
  headline: string;
  /** Body paragraphs, in order. */
  body: string[];
  cta: string;
  /** Detailed items, drawn from the lists above. */
  items: ServiceItem[];
  boundaries: string[];
  /** Where the old discipline page pointed, so links keep working. */
  previousPath?: string;
};

const byTitle = (items: ServiceItem[], titles: string[]): ServiceItem[] =>
  titles.map((title) => {
    const found = items.find((item) => item.title === title);
    if (!found) throw new Error(`Nepoznata stavka usluge: ${title}`);
    return found;
  });

export const services: Service[] = [
  {
    slug: "web-stranice-i-aplikacije",
    index: "01",
    name: "Web stranice i aplikacije",
    headline:
      "Web koji nije samo digitalna posjetnica koju nitko ne posjećuje.",
    body: [
      "Svi znamo one webove koji izgledaju prekrasno, ali ništa ne prodaju. Ja ga ne želim napraviti.",
      "Budimo realni, svi imamo webove da zaradimo pare, ne zato jer nam dosadno. Radim brze, moderne i funkcionalne webove i aplikacije koji imaju konkretan posao. Dovesti kupca, objasniti ponudu, prikupiti upit ili riješiti poslovni problem.",
      "Jer ako je jedina funkcija weba da šef veli „E super ovo baš lijepo izgleda”, mogli smo mu jednostavno kupiti ogledalo.",
    ],
    cta: "Hoću web koji nešto radi",
    items: byTitle(developmentServices, [
      "Next.js poslovni webovi",
      "Web aplikacije",
      "Arhitektura sustava",
      "Hosting i infrastruktura",
    ]),
    boundaries: developmentBoundaries,
    previousPath: "/usluge/development",
  },
  {
    slug: "webshopovi",
    index: "02",
    name: "Webshopovi",
    headline: "Webshop koji prodaje. Znam, zvuči suludo.",
    body: [
      "Nije dovoljno staviti proizvode na internet, dodati košaricu i čekati da novac počne padati s neba. Nažalost, internet ne funkcionira tako. Provjerio sam.",
      "Razvijam webshopove koji povezuju proizvode, naplatu, logistiku, analitiku i poslovne procese u jednu smislenu cjelinu.",
      "Složiti ćemo Vam nešto da imate manje ručnog posla, više prostora za rad, a nadajmo se najviše od svega da budete imali novaca!",
    ],
    cta: "Ajmo prodati nešto",
    items: [
      ...byTitle(developmentServices, ["Webshopovi", "Modernizacija"]),
      ...byTitle(bizDevServices, ["E-commerce poslovni model"]),
    ],
    boundaries: developmentBoundaries,
  },
  {
    slug: "automatizacije-i-erp",
    index: "03",
    name: "Automatizacije i ERP",
    headline: "Ako nešto radite ručno 47 puta dnevno, imamo problem.",
    body: [
      "Excel je fantastičan alat. Dok ne postane glavni direktor vaše tvrtke.",
      "Povezujem sustave, automatiziram procese i razvijam poslovna rješenja koja uklanjaju nepotrebno prepisivanje, kopiranje i svakodnevno živciranje.",
      "Ako zaposlenik svaki dan tri sata prebacuje podatke iz jednog sustava u drugi, ne treba mu motivacijski seminar. Treba mu dati otkaz.",
      "Okej, šalim se, treba mu složiti automatizaciju da se može baviti stvarima koje zarađuju novce.",
    ],
    cta: "Otpustimo dosadne zadatke",
    items: [
      ...byTitle(developmentServices, ["API integracije i automatizacije"]),
      ...byTitle(bizDevServices, [
        "Specifikacija ERP/CRM i integracija",
        "Digitalni poslovni audit",
        "Plan razvoja za 90 dana",
        "Vanjski voditelj digitalnog razvoja",
      ]),
    ],
    boundaries: bizDevBoundaries,
    previousPath: "/usluge/business-development",
  },
  {
    slug: "marketing-i-ecommerce-rast",
    index: "04",
    name: "Marketing i eCommerce rast",
    headline: "Promet je super. Kupci su još bolji.",
    body: [
      "Možete imati milijun posjetitelja. Ako nitko ništa ne kupi, čestitam — imate jako popularan trošak.",
      "Bavim se SEO-om, digitalnim oglašavanjem, prodajnim kanalima, Amazonom, Temuom i razvojem eCommerce poslovanja.",
      "Ne zanima me koliko smo klikova skupili za prezentaciju. Zanima me što se dogodilo nakon klika.",
    ],
    cta: "Dosta klikova, hoću rezultate",
    items: [
      ...marketingServices,
      ...byTitle(bizDevServices, ["Razvoj novih kanala i tržišta"]),
    ],
    boundaries: marketingBoundaries,
    previousPath: "/usluge/marketing",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
