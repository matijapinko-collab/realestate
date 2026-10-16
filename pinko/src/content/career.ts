/**
 * Matija's professional history, supplied by him from his own LinkedIn
 * profile on 16 October 2026.
 *
 * These are his statements about his own work, which is exactly the kind of
 * claim he is entitled to make. The site's rule still holds for everything
 * else: no figure appears here that he did not state himself, and nothing is
 * rounded up, embellished or inferred. The LinkedIn copy was rewritten into
 * the site's plain Croatian — the facts are unchanged.
 */

export type CareerEntry = {
  /** Organisation, exactly as he writes it. */
  organisation: string;
  role: string;
  /** Rendered as given; open-ended periods end with "danas". */
  period: string;
  /** Two to four sentences, plain Croatian, no superlatives. */
  summary: string;
  /** Shown as small monospace tags under the entry. */
  tags: string[];
  /** Own trade and current work are highlighted. */
  highlight?: boolean;
};

export const career: CareerEntry[] = [
  {
    organisation: "Pinko, obrt za informatičke usluge",
    role: "Vlasnik",
    period: "rujan 2018. — danas",
    summary:
      "Vlastiti obrt za IT usluge koji vodim osmu godinu. Pokriva vođenje projekata, strateški razvoj, IT zapošljavanje i izradu proizvoda, za klijente od startupa do korporacija. Kroz obrt je nastao i Eventrify, vlastita platforma za upravljanje događajima.",
    tags: ["Vođenje projekata", "Strategija", "IT recruitment", "Razvoj proizvoda"],
    highlight: true,
  },
  {
    organisation: "BISNEYS",
    role: "KAM & Delivery team lead",
    period: "lipanj 2025. — danas",
    summary:
      "Razvoj prodaje, vođenje ključnih kupaca i poslovni razvoj u tvrtki za zapošljavanje i poslovno savjetovanje, na području Hrvatske. Vodim odnos s klijentom od prvog kontakta i pregovora do same isporuke usluge, uz koordinaciju internih timova.",
    tags: ["Key account management", "Pregovaranje", "Poslovni razvoj"],
    highlight: true,
  },
  {
    organisation: "Upwork",
    role: "Freelance writer",
    period: "studeni 2018. — danas",
    summary:
      "Top Rated Plus status na Upworku, pet godina zaredom u gornjem postotku izvođača po isporuci i zadovoljstvu klijenata. Rad za međunarodne klijente na sadržajnoj strategiji, digitalnom marketingu, poslovnom razvoju i tehničkoj podršci projektima.",
    tags: ["Sadržajna strategija", "Digitalni marketing"],
  },
  {
    organisation: "Hrvatski Telekom",
    role: "Product Owner, B2B digitalni dodirnici",
    period: "prosinac 2024. — lipanj 2025.",
    summary:
      "Oblikovanje digitalnog iskustva za poslovne korisnike: alati za samoposluživanje, upravljanje računom i funkcije mobilne aplikacije. Spona između poslovnih potreba, očekivanja korisnika i tehničke stvarnosti, kroz više timova. Rad na prebacivanju B2B/B2C profila, upravljanju privolama, eSIM-u, praćenju zahtjeva i onboardingu.",
    tags: ["Product ownership", "Agile", "Jira", "Telekom"],
  },
  {
    organisation: "Business Vision",
    role: "Chief Operating Officer",
    period: "siječanj 2023. — prosinac 2024.",
    summary:
      "Vođenje strategije, operative i razvoja proizvoda u softverskoj agenciji. Vodio sam više timova kroz organizaciju, s naglaskom na telemedicinski projekt Teladoc i aplikaciju Travel Elysium. Uz to odnos s investitorima i partnerima te praćenje financija i resursa.",
    tags: ["Operativa", "Razvoj proizvoda", "Vodstvo"],
  },
  {
    organisation: "Business Vision",
    role: "Head of Human Resources",
    period: "travanj 2020. — siječanj 2023.",
    summary:
      "Vođenje cijele HR funkcije u tvrtki koja je u vrhuncu imala preko 75 ljudi. Postavljanje procesa zapošljavanja i upravljanja ljudima, mentoriranje i podrška u razvoju, te otvaranje inozemnog ureda — od prostora i ugovora do opreme i pune operative.",
    tags: ["HR", "Zapošljavanje", "Mentoriranje", "Širenje"],
  },
  {
    organisation: "Croatique DMC",
    role: "Senior travel consultant i voditelj projekta",
    period: "veljača 2023. — veljača 2024.",
    summary:
      "Spoj IT-a i turizma: vođenje razvoja softverskog rješenja za destinacijski menadžment, od koncepta do uvođenja u svakodnevni rad. Uz to traženje novih poslovnih prilika i rad s ključnim klijentima.",
    tags: ["Destinacijski menadžment", "Vođenje projekta"],
  },
  {
    organisation: "Tomsoft d.o.o.",
    role: "IT project manager",
    period: "rujan 2022. — veljača 2023.",
    summary:
      "Vođenje projekata u jednom od vodećih ERP sustava na tržištu, uključujući prelazak s kune na euro — nadogradnje sustava, migraciju podataka i usklađivanje financijskih procesa uz najmanji mogući zastoj u poslovanju.",
    tags: ["ERP", "HRK → EUR", "Upravljanje promjenom"],
  },
  {
    organisation: "Eventrify Ltd.",
    role: "IT project manager",
    period: "rujan 2018. — rujan 2019.",
    summary:
      "Vođenje razvoja platforme za upravljanje događajima u startup okruženju: prikupljanje zahtjeva, opseg, plan, proračun i vođenje razvojnog tima, od prve ideje do isporuke.",
    tags: ["Startup", "Vođenje razvoja"],
  },
  {
    organisation: "Hrvatski Telekom",
    role: "Key account manager i prodaja",
    period: "rujan 2013. — ožujak 2018.",
    summary:
      "Pet godina u telekomu, od vođenja društvenih mreža i zajednice oko proizvoda do rada s ključnim kupcima i prodaje u maloprodaji. Pregovaranje ugovora, praćenje rezultata računa i redoviti pregledi s klijentima.",
    tags: ["Key account", "Prodaja", "Društvene mreže"],
  },
  {
    organisation: "Pametna špica",
    role: "Dopredsjednik udruge",
    period: "rujan 2016. — siječanj 2023.",
    summary:
      "Vođenje tima u neprofitnoj udruzi: postavljanje ciljeva, koordinacija ljudi i rješavanje zastoja, uz rad s vanjskim partnerima.",
    tags: ["Neprofitni rad", "Vođenje tima"],
  },
  {
    organisation: "Hashtag Poduzetnik",
    role: "Marketing specialist",
    period: "travanj 2018. — siječanj 2022.",
    summary:
      "Predavanja i mentorstvo u prodajnoj akademiji za poduzetnike: kako postaviti vlastite kanale na društvenim mrežama i voditi ih korak po korak.",
    tags: ["Predavanja", "Društvene mreže"],
  },
];

/**
 * Figures shown under the hero. Each one is countable from the entries above
 * or stated by Matija himself — none is an estimate.
 */
export const careerFacts = [
  { value: "2018.", label: "Pinko radi od" },
  { value: "8", label: "godina samostalno" },
  { value: "75+", label: "ljudi u timovima koje sam vodio" },
  { value: "3", label: "discipline u jednoj osobi" },
] as const;

/**
 * Named in the original brief but absent from the LinkedIn history Matija
 * supplied on 16 October 2026. Kept rather than silently dropped, and shown
 * without dates because none were ever confirmed. Ask him before publishing
 * anything more specific about these.
 */
export const additionalWork = [
  {
    organisation: "Bolero Adria",
    what: "Razvoj i upravljanje e-commerce sustavima, prodajni kanali, infrastruktura i koordinacija poslovnog softvera.",
  },
  {
    organisation: "HT OneApp",
    what: "Rad na digitalnom proizvodu: prioriteti, zahtjevi i koordinacija razvoja.",
  },
  {
    organisation: "OlyBet",
    what: "Marketinške aktivnosti i sadržaj.",
  },
  {
    organisation: "Morgancode",
    what: "Vođenje projekata i koordinacija isporuke.",
  },
];

export const careerDisclaimer =
  "Ovo su profesionalne uloge u tuđim organizacijama, a ne klijenti Pinko obrta. Navodim ih jer objašnjavaju odakle dolazi iskustvo, ne kao dokaz da sam te proizvode izradio sam.";

/** What the experience means for a client, with the kind of proof it rests on. */
export const experienceAreas = [
  {
    area: "Next.js i e-commerce",
    meaning:
      "Web može dobiti prilagođeno sučelje i funkcije oko stvarnog načina prodaje.",
  },
  {
    area: "Operativa više webshopova",
    meaning: "Razumijevanje zaliha, dostave, tržišta i administracije.",
  },
  {
    area: "Sadržaj i marketing",
    meaning: "Proizvod i usluga mogu se objasniti jezikom kupca.",
  },
  {
    area: "Amazon i Temu",
    meaning:
      "Razumijevanje kataloga, listinga, prodajnih procesa i ekonomike kanala.",
  },
  {
    area: "PM, PO i operativno vodstvo",
    meaning: "Pretvaranje nejasne potrebe u prioritete i plan razvoja.",
  },
  {
    area: "Poslužitelji i deployment",
    meaning: "Kontinuitet od razvoja do rada aplikacije.",
  },
];
