/**
 * Project case studies.
 *
 * Publication rules from the brief (section 12):
 *  - only records with `approvedForPublication: true` may reach production
 *  - every record states the relationship type, Matija's role and the status
 *  - no invented results, logos, testimonials or growth figures
 *  - personal career history is NOT presented as a client of the Pinko trade
 *
 * `getPublishedProjects()` is the only accessor pages use, so an unapproved
 * record cannot leak into a page by accident.
 */

export type RelationshipType =
  /** Contracted work for a client of the Pinko trade. */
  | "klijent"
  /** Ongoing in-house / operational work. */
  | "interni-razvoj"
  /** Authored or editorial contribution. */
  | "autorski-rad"
  /** Employment or contract role in someone else's organisation. */
  | "profesionalna-uloga";

export type ProjectStatus = "lansirano" | "u-razvoju" | "u-pripremi";

export type EvidenceLink = {
  label: string;
  href: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * A full-page capture of the live site, shown in a frame the visitor can
 * scroll. An iframe is not an option: the sites we would embed send
 * `frame-ancestors 'self'`, and asking a client to loosen that header just so
 * a portfolio can frame them is the wrong trade.
 */
export type LiveScreen = {
  label: string;
  /** Full-page capture, tall. Real pixel dimensions, no guessing. */
  image: ProjectImage;
  /** The page the capture was taken from, so the reader can open the real thing. */
  href: string;
  /** Date of the capture — a screenshot ages, and the page says so. */
  capturedOn: string;
};

export type Project = {
  slug: string;
  projectName: string;
  relationshipType: RelationshipType;
  /** Precise description of Matija's contribution. No overstating. */
  role: string;
  status: ProjectStatus;
  approvedForPublication: boolean;
  summary: string;
  context: string;
  challenge: string;
  decisions: string[];
  deliverables: string[];
  /** Functional or operational outcomes only — never invented revenue. */
  outcomes: string[];
  /**
   * Heading for the list above. Defaults to "Rezultat"; a project whose
   * outcome was never measured says "Moj doprinos" instead, rather than
   * dressing responsibilities up as results.
   */
  outcomesLabel?: string;
  /** What is still ahead on the project. Omitted when nothing is planned. */
  roadmap?: string[];
  nextStep: string;
  evidenceLinks: EvidenceLink[];
  images: ProjectImage[];
  /** Scrollable captures of the live site. */
  liveScreens?: LiveScreen[];
  publishedAt: string | null;
  /** Shown on the card as a one-line contribution label. */
  contributionLabel: string;
  /** Internal note for the launch checklist; never rendered. */
  internalNote?: string;
};

export const relationshipLabels: Record<RelationshipType, string> = {
  klijent: "Klijent",
  "interni-razvoj": "Interni razvoj i operativa",
  "autorski-rad": "Autorski i urednički rad",
  "profesionalna-uloga": "Profesionalna uloga",
};

export const statusLabels: Record<ProjectStatus, string> = {
  lansirano: "Lansirano",
  "u-razvoju": "U razvoju",
  "u-pripremi": "U pripremi",
};

/**
 * Records drafted from the brief (12). A record stays
 * `approvedForPublication: false` until Matija confirms the exact status,
 * contribution and what may be shown. That is the brief's rule, not a
 * technical limitation — flipping the flag is a business decision, so it is
 * deliberately left to him.
 *
 * Approved on 16 October 2026: `100-smart-food` and `varel`. The record for
 * the rare-disease association was parked at Matija's request (its official
 * name was never verified); it is recoverable from git history.
 */
export const projects: Project[] = [
  {
    slug: "teladoc-business-vision",
    projectName: "Teladoc / Business Vision",
    relationshipType: "profesionalna-uloga",
    role:
      "Chief Operating Officer Business Visiona; vođenje tima angažiranog na Teladoc projektu, uz odgovornost za operativu i povezivanje razvoja s poslovnim prioritetima.",
    status: "lansirano",
    approvedForPublication: true,
    summary:
      "Vođenje agencijskog tima iza telemedicinske platforme, uz operativu, razvoj proizvoda i usklađivanje prioriteta s dionicima.",
    context:
      "Teladoc je telemedicinska platforma na kojoj je Business Vision bio angažiran kao agencija. Nisam bio Teladocov dobavljač niti je Teladoc klijent Pinko obrta — bio sam COO tvrtke čiji je tim radio na projektu, u razdoblju siječanj 2023. – prosinac 2024.",
    challenge:
      "Razvoj digitalnog proizvoda traži puno više od dobrog koda. Poslovne ciljeve treba povezati s kapacitetom tima, razvoj s realnim prioritetima, a svakodnevne odluke s onim što se pokušava postići. Kod telemedicine se tome pridružuje i svrha proizvoda: tehnologija treba pomoći ljudima da lakše dođu do zdravstvene skrbi.",
    decisions: [
      "Vodstvo kao posao s ljudima, a ne s tablicama: mentoriranje, usklađivanje očekivanja i jasni ciljevi",
      "Proces ima smisla samo ako ljudima olakšava rad — ako proizvodi još jedan sastanak, preispituje se",
      "Jedna kontaktna točka prema partnerima, klijentima i investitorima, umjesto paralelnih kanala",
      "Ambicija mora imati organizacijsku i financijsku podršku, pa su budžet i kapacitet dio razgovora o opsegu",
    ],
    deliverables: [
      "Vođenje Business Vision tima angažiranog na Teladoc projektu",
      "Koordinacija više timova i povezivanje njihova rada s poslovnim prioritetima",
      "Svakodnevna operativa tvrtke i razvoj učinkovitijih procesa",
      "Izravna uključenost u razvoj proizvoda, uz Travel Elysium",
      "Komunikacija s partnerima, klijentima i investitorima",
      "Suradnja s financijama na budžetima, resursima i održivosti poslovanja",
    ],
    outcomes: [
      "Ljudi: iskustvo vođenja, zapošljavanja, mentoriranja i razvoja timova",
      "Poslovanje: razumijevanje prioriteta, odnosa s dionicima, budžeta i resursa",
      "Proizvod: izravna uključenost u razvoj i povezivanje poslovnih ciljeva s izvedbom",
      "Podloga za sve to je HR uloga prije COO-a, u organizaciji koja je na vrhuncu imala više od 75 developera",
    ],
    outcomesLabel: "Moj doprinos",
    nextStep:
      "Imate projekt kojem treba netko tko će povezati ljude, poslovanje i izvedbu?",
    evidenceLinks: [
      { label: "teladochealth.com", href: "https://www.teladochealth.com/" },
    ],
    images: [],
    publishedAt: "2026-10-16",
    contributionLabel: "Vođenje tima i operativa",
    internalNote:
      "Objavu odobrio Matija 16. 10. 2026. VAŽNO: razdoblje je trajanje COO uloge, NE potvrđeno trajanje rada na Teladocu. 75+ developera odnosi se na cijeli Business Vision na vrhuncu, ne na Teladoc tim. Nema brojki o prihodu, pacijentima, SLA, certifikatima ni zdravstvenim funkcionalnostima — ništa od toga nije potvrđeno. Teladoc nije klijent Pinko obrta.",
  },
  {
    slug: "100-smart-food",
    projectName: "100% Smart Food",
    relationshipType: "interni-razvoj",
    role:
      "Vodim razvoj i puštanje u rad: arhitektura storefronta, vlastiti konektor prema WordPressu, plaćanja i dostava, mjerenje, izvozi prema usporedbama cijena i operativa koja sve to drži na nogama.",
    status: "lansirano",
    approvedForPublication: true,
    summary:
      "Webshop sportske prehrane prebačen s gotove WordPress teme na vlastiti Next.js storefront — bez gašenja prodaje i bez preseljenja kataloga.",
    context:
      "100% Smart Food prodaje dodatke prehrani na više tržišta, kroz maloprodaju i B2B. Katalog, cijene, akcije i narudžbe godinama žive u WordPressu i WooCommerceu, na kojima radi cijela operativa: nabava, zalihe, računovodstvo, podrška.",
    challenge:
      "Gotova tema je došla do svoje granice. Stranica proizvoda se dugo otvarala, pravila kupnje nisu stala u predloške, a svaka izmjena značila je borbu s nečim tuđim. Katalog se pritom nije smio seliti — ljudi koji svaki dan rade u administraciji ne smiju preko noći ostati bez alata koji znaju.",
    decisions: [
      "Razdvojiti glavu od repa: WordPress ostaje mjesto gdje se vodi katalog, a Next.js preuzima ono što kupac vidi",
      "Vlastiti konektor umjesto gotovog REST-a — jedan ugovor o podacima između dva sustava, koji se verzionira i može vratiti unatrag",
      "Jedan predložak proizvoda za sve vrste artikala, umjesto šume iznimki",
      "Prikaz cijene po Omnibus pravilima ugrađen u sam proizvod, a ne nalijepljen pluginom",
      "Puštanje u rad u fazama, s kontrolnim točkama — plaćanja idu zadnja i tek kad testne narudžbe prođu čiste",
    ],
    deliverables: [
      "Next.js storefront: naslovnica, katalog s filterima, stranica proizvoda, košarica i blagajna",
      "Konektor prema WordPressu koji nosi katalog, cijene, zalihe, narudžbe i medijsku knjižnicu",
      "Kartično plaćanje i plaćanje na rate, uz dostavu na adresu i u paketomate",
      "Sidrena cijena i najniža cijena u 30 dana, recenzije i prednarudžbe na stranici proizvoda",
      "Izvozi prema Google Merchantu i usporedbama cijena",
      "Mjerenje kroz GTM i GA4, uključujući serversko slanje kupnje",
      "Operativa: deployment, keširanje i revalidacija, nadzor i vraćanje na prethodnu verziju",
    ],
    outcomes: [
      "Nova naslovnica i stranice proizvoda rade na živom prometu, uz nepromijenjen tijek narudžbe za operativu",
      "Katalog se i dalje vodi na jednom mjestu, bez dvostrukog unosa",
      "Stranica proizvoda otvara se bez čekanja koje je prije dolazilo od gotove teme",
      "Pravila kupnje — paketi, ograničenja po okusu, akcije — opisana su u kodu, pa se mijenjaju bez pregovora s predloškom",
      "Mjerenje i izvozi rade iz istog izvora podataka kao i trgovina",
    ],
    roadmap: [
      "Savjetnik u trgovini: chatbot koji odgovara iz stvarnog kataloga i deklaracija, a ne iz općih fraza",
      "Novi B2B storefront na istoj osnovi kao maloprodajni",
      "Povezivanje sa zalihama i ERP-om, da stanje na webu prati stvarno skladište",
      "Širenje na preostala tržišta po istom receptu",
    ],
    nextStep:
      "Imate webshop koji je prerastao gotovu temu, ali ne smijete stati s prodajom?",
    evidenceLinks: [{ label: "100smartfood.hr", href: "https://100smartfood.hr/" }],
    images: [],
    liveScreens: [
      {
        label: "Naslovnica",
        href: "https://100smartfood.hr/",
        capturedOn: "16. 10. 2026.",
        image: {
          src: "/projekti/100-smart-food-naslovnica.webp",
          alt: "Naslovnica weba 100% Smart Food: slider s akcijom, trake pogodnosti, redovi proizvoda, ambasadori i podnožje.",
          width: 1280,
          height: 5899,
        },
      },
      {
        label: "Stranica proizvoda",
        href: "https://100smartfood.hr/proizvod/100-sleep",
        capturedOn: "16. 10. 2026.",
        image: {
          src: "/projekti/100-smart-food-proizvod.webp",
          alt: "Stranica proizvoda 100% Sleep: galerija, kupovni okvir s cijenom i sidrenom cijenom, recenzije i harmonike s opisom.",
          width: 1280,
          height: 5300,
        },
      },
    ],
    publishedAt: "2026-10-16",
    contributionLabel: "Next.js storefront nad WordPressom",
    internalNote:
      "Objavu odobrio Matija 16. 10. 2026. Tekst je namjerno bez imena poslužitelja, incidenata, brojeva narudžbi i internih brojki iz ERP-a — to je klijentova kuhinja i ne ide na javni portfelj.",
  },
  {
    slug: "bolero-drinks",
    projectName: "Bolero Drinks",
    relationshipType: "interni-razvoj",
    role:
      "Razvoj prodajnog weba i iskustva odabira proizvoda i paketa, uz rad na prodajnim kanalima i infrastrukturi.",
    status: "u-razvoju",
    approvedForPublication: false,
    summary:
      "Prodajni web i odabir proizvoda/paketa za brend napitaka, povezan s operativom više kanala.",
    context:
      "Brend napitaka s više proizvoda i paketa koji se prodaju kroz nekoliko kanala.",
    challenge:
      "Odabir proizvoda i paketa mora biti razumljiv kupcu, a operativa mora pratiti više kanala bez dvostrukog unosa.",
    decisions: [
      "Jedan izvor istine za katalog prema kanalima",
      "Iskustvo odabira paketa prilagođeno stvarnoj ponudi",
      "Infrastruktura i deployment pod vlastitim upravljanjem",
    ],
    deliverables: [
      "Prodajni web i odabir proizvoda/paketa",
      "Povezivanje s prodajnim kanalima prema opsegu",
    ],
    outcomes: [
      "Jasniji put od odabira paketa do narudžbe",
      "Operativa više kanala s manje ručnih koraka",
    ],
    nextStep: "Prodajete kroz više kanala i gubite vrijeme na dvostruki unos?",
    evidenceLinks: [],
    images: [],
    publishedAt: null,
    contributionLabel: "Prodajni web i operativa kanala",
    internalNote:
      "Potvrditi točan status i doprinos te odobrene screenshotove prije objave.",
  },
  {
    slug: "varel",
    projectName: "Varel",
    relationshipType: "interni-razvoj",
    role:
      "Vlastiti proizvod, od prazne mape do produkcije: arhitektura, model podataka, razvoj, vlastita administracija, alati i objava.",
    status: "u-razvoju",
    approvedForPublication: true,
    summary:
      "Višejezična platforma za pronalaženje i usporedbu alata za rad, s vlastitom administracijom i alatima koji rade posao umjesto čitatelja.",
    context:
      "Tražilice za alate uglavnom su popisi s afilijacijskim poveznicama. Varel je pokušaj da to bude korisno: katalog alata, usporedbe, vodiči i uredničko pismo na jednom mjestu, na više jezika, s administracijom u kojoj sadržaj može mijenjati čovjek koji nije programer.",
    challenge:
      "Višejezičnost se ne da nalijepiti naknadno, a katalog, usporedbe, vodiči i tekstovi dijele iste pojmove. Uz to proizvod ne smije ovisiti o meni: ako za svaku izmjenu treba deployment, projekt je mrtav čim se prestanem njime baviti.",
    decisions: [
      "Jezik ugrađen u model podataka od prvog dana, a ne dodan kao prijevodna datoteka",
      "Vlastita administracija umjesto gotovog CMS-a — uredničko sučelje za alate, usporedbe, vodiče i objave",
      "Jedan izvor istine za alate i kategorije, iz kojeg se hrane i usporedbe i tekstovi",
      "Odbacivanje dijelova koji nisu nosili svoju težinu: početni opseg je u hodu smanjen umjesto da se vuče dalje",
      "Alati koji nešto stvarno rade, a ne samo nabrajaju — upitnik koji preporuča alate i skener vidljivosti",
    ],
    deliverables: [
      "Katalog alata s kategorijama, usporedbama i vodičima",
      "Uredničko pismo i sustav autora, sve višejezično",
      "Vlastita administracija: unos i uređivanje sadržaja, medijska knjižnica, upravljanje afilijacijskim poveznicama",
      "Upitnik koji iz nekoliko odgovora predlaže alate",
      "Skener vidljivosti koji provjerava kako se stranica vidi iz perspektive jezičnih modela",
      "Objava u produkciju na vlastitoj domeni, s vlastitom bazom i pohranom medija",
    ],
    outcomes: [
      "Platforma je javno dostupna i radi na više jezika",
      "Sadržaj se dodaje i mijenja kroz administraciju, bez izmjene koda i bez novog deploya",
      "Zajednički model podataka drži katalog, usporedbe i tekstove u skladu",
    ],
    roadmap: [
      "Punjenje kataloga stvarnim alatima umjesto početnog ogledne postave",
      "Uredničko pismo kao redovit ritam, ne kao jednokratna objava",
      "Zasebni poslovni moduli koji dijele istu osnovu",
      "Mjerenje i afilijacijsko izvještavanje nad stvarnim prometom",
    ],
    nextStep: "Gradite proizvod koji morate sami moći puniti sadržajem?",
    evidenceLinks: [{ label: "varel.io", href: "https://varel.io/" }],
    images: [],
    publishedAt: "2026-10-16",
    contributionLabel: "Vlastiti proizvod — arhitektura i razvoj",
    internalNote:
      "Objavu odobrio Matija 16. 10. 2026. Status spušten na 'u-razvoju' 16. 10.: platforma radi, ali javni katalog još prikazuje ogledne zapise ([SAMPLE] Demo tool). Snimke živih stranica namjerno NISU objavljene dok je tako — vratiti ih čim katalog ima stvarne alate, postupak je u docs/snimke-zivih-stranica.md. Moduli za poslovne korisnike (CRM, electro) namjerno se ne spominju.",
  },
  {
    slug: "virus-hr",
    projectName: "Virus.hr",
    relationshipType: "autorski-rad",
    role: "Autorstvo i urednički sadržaj.",
    status: "lansirano",
    approvedForPublication: false,
    summary:
      "Autorski i urednički rad kao dokaz sadržajne ekspertize, ne kao razvojni projekt.",
    context:
      "Medijski portal za koji je Matija pisao i uređivao sadržaj.",
    challenge:
      "Teme je trebalo objasniti jezikom čitatelja, bez žargona.",
    decisions: [
      "Sadržaj prema stvarnoj namjeri čitatelja",
      "Urednička kontrola kvalitete i konzistentnosti",
    ],
    deliverables: ["Autorski tekstovi", "Urednički rad na sadržaju"],
    outcomes: ["Objavljeni tekstovi kao dokaz sadržajne ekspertize"],
    nextStep: "Treba vam sadržaj koji objašnjava ponudu bez žargona?",
    evidenceLinks: [],
    images: [],
    publishedAt: null,
    contributionLabel: "Autorski i urednički sadržaj",
    internalNote:
      "Potvrditi opis uloge i prava objave odabranih tekstova prije objave.",
  },
];

/**
 * The only accessor used by pages. Keeps unapproved records out of production.
 *
 * In development the gate can be lifted with NEXT_PUBLIC_SHOW_DRAFT_PROJECTS=true
 * so the layout can be reviewed locally. The check below makes sure that flag
 * can never do anything in a production build.
 */
export function getPublishedProjects(): Project[] {
  const approved = projects.filter((p) => p.approvedForPublication);
  if (
    approved.length === 0 &&
    process.env.NODE_ENV !== "production" &&
    process.env.NEXT_PUBLIC_SHOW_DRAFT_PROJECTS === "true"
  ) {
    return projects;
  }
  return approved;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getPublishedProjects().find((p) => p.slug === slug);
}

/** Records still waiting on confirmation — for the launch checklist. */
export function getPendingProjects(): Project[] {
  return projects.filter((p) => !p.approvedForPublication);
}
