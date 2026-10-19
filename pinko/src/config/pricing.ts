/**
 * Single source of truth for every published price.
 *
 * Rules from the brief (section 5):
 *  - every amount here is NET, excluding VAT; the UI always renders "+ PDV"
 *  - "od" (from) marks the stated starting scope, not a final quote
 *  - platform, licence, domain, third-party and ad spend are always separate
 *
 * The internal negotiation table (brief section 8) is deliberately NOT in this
 * file, nor anywhere else in the application. It must never reach the client
 * bundle or public content.
 */

export type Currency = "EUR";

/** A published price. `from: true` renders as "od X €". */
export type Price = {
  amount: number;
  from?: boolean;
  /** "mj" renders as "/mj.", "h" as "/h". */
  unit?: "once" | "mj" | "h";
  /** Used when the price genuinely depends on scope. */
  note?: string;
};

/** Price that cannot be published as a number yet. */
export type QuotedPrice = { quoted: string };

export type MaybePrice = Price | QuotedPrice;

export function isQuoted(p: MaybePrice): p is QuotedPrice {
  return "quoted" in p;
}

/* ------------------------------------------------------------------ *
 * 5.1 Hourly rates
 * ------------------------------------------------------------------ */

export type HourlyRate = {
  slug: string;
  kind: string;
  rate: number;
  billedFor: string;
};

export const hourlyRates: HourlyRate[] = [
  {
    slug: "programiranje",
    kind: "Programiranje",
    rate: 50,
    billedFor:
      "Implementacija, izmjene i razvoj funkcionalnosti prema dogovorenom zadatku",
  },
  {
    slug: "arhitektura",
    kind: "Arhitektura sustava",
    rate: 100,
    billedFor: "Tehnički nacrt, model podataka, granice sustava i plan integracija",
  },
  {
    slug: "audit",
    kind: "Tehnički audit i savjetovanje",
    rate: 90,
    billedFor: "Pregled, dijagnostika, dokumentirani nalazi i preporuke",
  },
  {
    slug: "devops",
    kind: "DevOps i administracija poslužitelja",
    rate: 75,
    billedFor: "Okruženja, deployment, migracije i održavanje infrastrukture",
  },
  {
    slug: "dizajn",
    kind: "UX/UI dizajn",
    rate: 70,
    billedFor: "Tokovi, wireframeovi, dizajn ključnih ekrana i komponente",
  },
  {
    slug: "sadrzaj",
    kind: "Sadržaj i copywriting",
    rate: 65,
    billedFor: "Istraživanje, pisanje, uređivanje i dogovorene revizije",
  },
  {
    slug: "seo-email-marketplace",
    kind: "SEO, email i marketplace savjetovanje",
    rate: 85,
    billedFor: "Analiza, planiranje i optimizacija odabranog područja",
  },
  {
    slug: "strategija",
    kind: "Poslovna strategija i razvoj",
    rate: 110,
    billedFor: "Poslovni model, prioritizacija, plan kanala i procesi",
  },
  {
    slug: "vodjenje",
    kind: "Vođenje digitalnog projekta",
    rate: 85,
    billedFor: "Koordinacija, backlog, plan i kontrola isporuke",
  },
];

/** Programming rate is fixed at exactly 50 €/h (brief, decision list). */
export const programmingRate = 50;

export const hourlyTerms = [
  "Prije rada dobivate vrstu rada i procjenu.",
  "Evidencija u koracima od 15 minuta; jednokratni angažman najmanje 1 sat.",
  "U istom vremenu naplaćuje se jedna vrsta rada.",
  "Planirani razgovor za upoznavanje do 20 minuta je besplatan i ne uključuje audit ili pisanu strategiju.",
];

/* ------------------------------------------------------------------ *
 * 5.2 Development packages
 * ------------------------------------------------------------------ */

export type DevPackage = {
  slug: string;
  name: string;
  price: Price;
  /** Label shown on the card, never an invented "best seller" badge. */
  badge?: string;
  /**
   * One line of the site's own voice, from the 19 Oct 2026 brief. It sits
   * under the package name and never carries a claim — the numbers, scope
   * and boundaries below it do that work.
   */
  quip?: string;
  scope: string;
  timeline: string;
  summary: string;
  includes: string[];
  excludes: string[];
};

export const devPackages: DevPackage[] = [
  {
    slug: "web-koji-radi-posao",
    name: "Web koji radi posao",
    quip:
      "Za tvrtke koje žele nešto više od digitalne brošure s kontakt formom koju nitko ne provjerava.",
    price: { amount: 6500, from: true },
    scope:
      "Next.js poslovni web, do 7 sadržajnih stranica, jedan jezik, uređivanje sadržaja, kontaktna forma",
    timeline: "5–7 tjedana",
    summary:
      "Za tvrtke kojima treba web koji jasno objašnjava ponudu i dovodi upite, bez administrativne gnjavaže.",
    includes: [
      "Uvodna radionica do 2 sata, struktura weba i jedan dogovoreni dizajnerski smjer",
      "Do 7 jedinstvenih sadržajnih stranica i do 3 tipa sadržajnih predložaka; zakonske stranice iz vaših odobrenih tekstova",
      "Responzivna izvedba, osnovni on-page SEO, metapodaci i forme",
      "Jednostavno uređivanje sadržaja, unos dostavljenog sadržaja i do 2 kruga konsolidiranih korekcija dizajna",
      "Tehnička provjera, puštanje i obuka do 90 minuta",
    ],
    excludes: [
      "Pisanje cjelokupnog sadržaja",
      "Fotografija",
      "Više jezika",
      "Rezervacijski sustav i zasebne aplikativne funkcije",
    ],
  },
  {
    slug: "shop-s-planom",
    name: "Shop s planom",
    quip:
      "Jer webshop bez procesa iza sebe može biti vrlo skup način za proizvodnju glavobolja.",
    price: { amount: 11500, from: true },
    badge: "Za webshopove i brendove",
    scope:
      "Next.js webshop, jedan backend, jedan jezik/tržište, jedan sustav naplate i jedan dostavni servis",
    timeline: "8–12 tjedana",
    summary:
      "Za webshopove koji žele rasti: kupovni tok prilagođen stvarnom načinu prodaje i podaci koji završe gdje trebaju.",
    includes: [
      "Discovery do 4 sata, nacrt kupovnog toka i dogovor izvora kataloga i zaliha",
      "Ključni predlošci: naslovnica, katalog, kategorija, proizvod, košarica, checkout i osnovne informativne stranice",
      "Jedan postojeći ili dogovoreni commerce backend; headless WooCommerce je moguća konfiguracija",
      "Jedan uvoz do 100 proizvoda i ukupno do 300 varijanti iz uredne tablice, uz dogovoreno mapiranje",
      "Pretraga i do 4 osnovna filtera prema kvaliteti podataka i backendu",
      "Jedna platna i jedna dostavna integracija koje već imaju dostupan i odgovarajući API/plugin",
      "Dogovoreni test narudžbe u testnom okruženju, ključni scenariji kupnje i obuka",
      "Dva kruga dizajnerskih korekcija",
    ],
    excludes: [
      "Čišćenje neurednih podataka",
      "B2B cjenici i ERP konektor",
      "Više tržišta i loyalty",
      "Konfigurator paketa i složene migracije",
      "Naknade pružatelja platnih i dostavnih usluga",
    ],
  },
  {
    slug: "aplikacija-po-mjeri",
    name: "Aplikacija po mjeri",
    quip:
      "Kad ste već peti put rekli „Trebao bi nam sustav koji...”, vrijeme je da ga napravimo.",
    price: { amount: 14500, from: true },
    scope:
      "MVP jedne web aplikacije: jedan glavni proces, do 2 korisničke uloge, do 8 ključnih ekrana i 1 integracija",
    timeline: "10–14 tjedana",
    summary:
      "Za procese koji se danas rješavaju tablicama i ručnim prepisivanjem, a zaslužuju vlastiti alat.",
    includes: [
      "Plaćeni discovery i potpisan popis kriterija prihvata prije potvrde cijelog MVP-a",
      "Autentikacija, do 2 uloge i jedna definirana jezgra procesa",
      "Do 8 ključnih ekrana, osnovni administrativni pregled i jedna vanjska integracija",
      "Produkcijska i testna konfiguracija prema ugovoru, dokumentacija i obuka",
    ],
    excludes: [
      "Više organizacija/tenantova",
      "Real-time suradnja",
      "Native aplikacije",
      "Napredna AI funkcionalnost i složene naplate",
    ],
  },
  {
    slug: "commerce-operations",
    name: "Commerce & Operations",
    price: { amount: 22500, from: true },
    scope:
      "Viša razina za B2B, više kanala, složene integracije i operativne tokove; početak kroz plaćeni discovery",
    timeline: "Fazno prema opsegu",
    summary:
      "Za sustave u kojima se prodaja, zalihe i administracija spajaju u više kanala i više tržišta.",
    includes: [
      "Plaćeni discovery i arhitekturni nacrt prije potvrde faza",
      "Više prodajnih kanala i tržišta prema dogovorenom opsegu",
      "Složene integracije s ERP/CRM i operativnim sustavima",
      "Fazni plan razvoja s kriterijima prihvata po fazi",
    ],
    excludes: [
      "Opseg se potvrđuje nakon discoveryja",
      "Vanjski suradnici i licence trećih strana",
    ],
  },
];

/** Homepage shows these three (brief 11.7). */
export const homepagePackageSlugs = [
  "web-koji-radi-posao",
  "shop-s-planom",
  "aplikacija-po-mjeri",
] as const;

export const timelineNote =
  "Rokovi su prijedlog za planiranje od potvrđenog opsega i dostupnih materijala. Potvrđuju se prema kapacitetu, integracijama i brzini povratnih informacija — nisu zajamčen rok svakog projekta.";

export const warrantyNote =
  "Za sve projekte predlažem 30 dana otklanjanja reproducibilnih grešaka u dogovorenoj isporuci od prihvata. Nove funkcije i promjene vanjskih API-ja zaseban su posao.";

/* ------------------------------------------------------------------ *
 * 5.3 Smaller development engagements
 * ------------------------------------------------------------------ */

export type SmallEngagement = {
  slug: string;
  name: string;
  price: MaybePrice;
  limit: string;
};

export const smallEngagements: SmallEngagement[] = [
  {
    slug: "tehnicki-audit",
    name: "Tehnički audit weba ili webshopa",
    price: { amount: 750, from: true },
    limit:
      "Jedan web, do 5 ključnih predložaka, nalazi i prioriteti; implementacija zasebno",
  },
  {
    slug: "arhitekturni-discovery",
    name: "Arhitekturni discovery",
    price: { amount: 1500, from: true },
    limit: "Do 15 sati arhitekture, radionica, dijagram, odluke i fazni plan",
  },
  {
    slug: "landing",
    name: "Prodajna landing stranica",
    price: { amount: 2500, from: true },
    limit: "Jedna stranica do 8 sekcija i jedan kontaktni tok",
  },
  {
    slug: "api-integracija",
    name: "API integracija",
    price: { amount: 1500, from: true },
    limit: "Jedan sustav i jedan smjer jednog podatkovnog toka, nakon provjere API-ja",
  },
  {
    slug: "migracija-infrastrukture",
    name: "Migracija infrastrukture",
    price: { amount: 650, from: true },
    limit:
      "Jedna aplikacija uz postojeću dokumentaciju; složene baze i email migracije su procjena",
  },
  {
    slug: "migracija-na-nextjs",
    name: "Migracija na Next.js",
    price: { quoted: "nakon discoveryja" },
    limit: "Cijena prema funkcijama, katalogu, SEO migraciji i integracijama",
  },
];

export const discoveryNote =
  "Discovery je zasebna isporuka koja ostaje vama. Ako se nakon njega ugovori projekt, ponuda pokazuje preostali rad — već plaćeni isti posao ne naplaćujem ponovno.";

/* ------------------------------------------------------------------ *
 * 5.4 Marketing packages
 * ------------------------------------------------------------------ */

export type MarketingPackage = {
  slug: string;
  name: string;
  price: Price;
  /** "Jednokratno", "projekt", "mjesečno" */
  model: string;
  scope: string;
};

export const marketingPackages: MarketingPackage[] = [
  {
    slug: "seo-smjer",
    name: "SEO smjer",
    price: { amount: 1250, from: true },
    model: "jednokratno",
    scope:
      "Jedan web, do 10 predložaka/ključnih URL-ova, mapa do 30 tema/pojmova i plan za 90 dana",
  },
  {
    slug: "sadrzaj-koji-prodaje",
    name: "Sadržaj koji prodaje",
    price: { amount: 1950, from: true },
    model: "projekt",
    scope:
      "Do 5 ključnih stranica i ukupno do 4.000 riječi, radionica, istraživanje i 2 kruga revizija",
  },
  {
    slug: "seo-content-partner",
    name: "SEO & Content partner",
    price: { amount: 950, from: true, unit: "mj" },
    model: "mjesečno",
    scope:
      "Mjesečni plan, 2 nova sadržaja do ukupno 3.000 riječi, optimizacija 2 postojeća URL-a i izvještaj",
  },
  {
    slug: "email-start",
    name: "Email start",
    price: { amount: 1650, from: true },
    model: "jednokratno",
    scope:
      "Jedna platforma, do 3 jednostavna toka do ukupno 8 emailova, osnovni predložak i testiranje",
  },
  {
    slug: "email-partner",
    name: "Email partner",
    price: { amount: 650, from: true, unit: "mj" },
    model: "mjesečno",
    scope: "Do 2 newslettera, jedan manji eksperiment/izmjena toka i mjesečni pregled",
  },
  {
    slug: "marketplace-provjera",
    name: "Marketplace provjera",
    price: { amount: 950, from: true },
    model: "jednokratno",
    scope:
      "Jedna platforma i jedno tržište, do 10 listinga/SKU-ova, spremnost i prioritiziran plan",
  },
  {
    slug: "amazon-start",
    name: "Amazon start",
    price: { amount: 2500, from: true },
    model: "jednokratno",
    scope:
      "Jedno tržište, do 5 jednostavnih listinga, sadržaj, backend polja i plan lansiranja uz vaše provjerene podatke",
  },
  {
    slug: "temu-start",
    name: "Temu start",
    price: { amount: 1750, from: true },
    model: "jednokratno",
    scope:
      "Jedno tržište, do 10 jednostavnih SKU-ova, katalog i dokumentiran osnovni operativni tok",
  },
  {
    slug: "marketplace-partner",
    name: "Marketplace partner",
    price: { amount: 950, from: true, unit: "mj" },
    model: "mjesečno",
    scope:
      "Jedna platforma/tržište, do 10 aktivnih listinga, dogovorena optimizacija i operativni pregled",
  },
];

export const marketingAddOns = [
  {
    name: "A+ sadržaj",
    price: { amount: 850, from: true } satisfies Price,
    scope:
      "Jedan osnovni skup do 5 modula s dostavljenim fotografijama, uz uvjet pristupa i platformskih prava",
  },
];

export const marketingTerms = [
  "Listing znači jednu samostalnu prodajnu stranicu bez složene obitelji varijacija. Prije ugovora točno popisujemo parent/child strukturu.",
  "Izrada fotografija, prijevodi i video nisu uključeni.",
  "Email platforma, trošak slanja, platformne naknade, logistika, proizvodi za promocije, plaćeni alati i pravne provjere plaćaju se zasebno.",
  "SEO retainer ne uključuje neograničeni razvoj.",
  "Marketplace retainer ne uključuje neograničenu korisničku podršku, registracije, sve sporove ni zajamčen uspjeh žalbi.",
  "Sve iznad dogovorenog mjesečnog popisa procjenjujemo prije rada.",
  "Ne obećavam platformsku dozvolu, prihvaćanje listinga, recenzije ni prodaju. Pravna i regulatorna usklađenost te službene registracije odvojene su od operativne pomoći.",
];

/* ------------------------------------------------------------------ *
 * 5.5 Business development packages
 * ------------------------------------------------------------------ */

export type BizDevPackage = {
  slug: string;
  name: string;
  price: Price;
  forWhom: string;
  delivers: string;
  next: string;
};

export const bizDevPackages: BizDevPackage[] = [
  {
    slug: "digitalni-audit",
    name: "Digitalni poslovni audit",
    price: { amount: 1500, from: true },
    forWhom: "Za tvrtke koje znaju da nešto koči, ali ne znaju točno što.",
    delivers:
      "Do 3 razgovora, pregled jednog poslovnog sustava/kanala, nalazi i do 10 prioriteta",
    next: "Nakon audita birate što rješavamo prvo — sami ili zajedno.",
  },
  {
    slug: "plan-rasta-90",
    name: "Plan rasta za 90 dana",
    price: { amount: 2750, from: true },
    forWhom: "Za one koji imaju ideje, ali nemaju redoslijed.",
    delivers:
      "Ciljevi, ekonomika prema dostupnim podacima, prioriteti, plan aktivnosti i mjerenja",
    next: "Plan se izvodi kroz projekt, mjesečni angažman ili vaš tim.",
  },
  {
    slug: "erp-crm-blueprint",
    name: "ERP/CRM blueprint",
    price: { amount: 3500, from: true },
    forWhom: "Za tvrtke pred uvođenjem ili zamjenom poslovnog softvera.",
    delivers:
      "Do 5 glavnih procesa i do 2 vanjska sustava, zahtjevi, mapa podataka i plan faza",
    next: "Blueprint ide dobavljaču kao podloga za ponudu i implementaciju.",
  },
  {
    slug: "novo-trziste",
    name: "Novo tržište ili kanal",
    price: { amount: 3250, from: true },
    forWhom: "Za brendove koji razmišljaju o novom kanalu ili tržištu.",
    delivers:
      "Jedno tržište/kanal, scenariji troška, operativni zahtjevi i pilot plan",
    next: "Pilot pokazuje je li kanal vrijedan šireg ulaganja.",
  },
  {
    slug: "vanjski-voditelj",
    name: "Vanjski voditelj razvoja",
    price: { amount: 1750, from: true, unit: "mj" },
    forWhom: "Za tvrtke s izvođačima, ali bez nekoga ko drži smjer.",
    delivers:
      "Do 20 sati koordinacije i vođenja; izvedbeni razvoj i ostale specijalnosti zasebno",
    next: "Mjesečna prioritizacija i kontrola opsega umjesto improvizacije.",
  },
];

export const bizDevBoundary =
  "Business Development ne znači obećanje pronalaska investitora, pravno ili porezno savjetovanje, računovodstvo ni zajamčene prodajne kontakte. Cijena paketa nije obećanje određenog prometa ili povrata ulaganja.";

/* ------------------------------------------------------------------ *
 * 5.6 Combined monthly engagements
 * ------------------------------------------------------------------ */

export type MonthlyPackage = {
  slug: string;
  name: string;
  price: Price;
  deliveryHours: number;
  planningHours: number;
  meetings: string;
  capacity: string;
};

export const monthlyPackages: MonthlyPackage[] = [
  {
    slug: "pinko-partner",
    name: "Pinko Partner",
    price: { amount: 1490, unit: "mj" },
    deliveryHours: 16,
    planningHours: 2,
    meetings: "Jedan mjesečni sastanak",
    capacity:
      "Do 16 sati provedbe po dogovorenom backlogu + do 2 sata planiranja",
  },
  {
    slug: "pinko-growth",
    name: "Pinko Growth",
    price: { amount: 2490, unit: "mj" },
    deliveryHours: 28,
    planningHours: 4,
    meetings: "Dva sastanka",
    capacity: "Do 28 sati provedbe + do 4 sata planiranja i vođenja",
  },
  {
    slug: "pinko-embedded",
    name: "Pinko Embedded",
    price: { amount: 3990, unit: "mj" },
    deliveryHours: 45,
    planningHours: 6,
    meetings: "Tjedna koordinacija unutar tog kapaciteta",
    capacity: "Do 45 sati provedbe + do 6 sati planiranja i vođenja",
  },
];

export const monthlyTerms = [
  "Provedba može biti razvoj, sadržaj ili automatizacija prema mjesečnom dogovoru i kompetencijama. To nije pristup svim uslugama bez ograničenja.",
  "Arhitektura većih sustava, vanjski suradnici i cjeloviti novi projekti procjenjuju se odvojeno. Infrastruktura i platforme nisu uključene.",
  "Sastanci troše navedeni planerski kapacitet; nema skrivene dodatne satnice.",
  "Predlažem početnu suradnju 3 mjeseca, mjesečno fakturiranje unaprijed i otkazni rok 30 dana.",
  "Prijenos najviše 25% neiskorištenog provedbenog kapaciteta u sljedeći mjesec, jednokratno; potvrđujemo u ugovoru.",
  "Dodatni rad samo uz prethodnu procjenu i odobrenje.",
  "Ako vam treba samo provedba, programiranje je 50 €/h. Paket se prodaje zbog prioriteta, kontinuiteta i koordinacije — ne zbog jeftinijih sati.",
];

/* ------------------------------------------------------------------ *
 * 6.3 Hosting and maintenance
 * ------------------------------------------------------------------ */

export type HostingPlan = {
  slug: string;
  name: string;
  price: MaybePrice;
  /** Separate infrastructure cost, where the provider bills it. */
  infraNote?: string;
  limit: string;
  group: "hosting" | "care";
};

export const hostingPlans: HostingPlan[] = [
  {
    slug: "managed-web",
    name: "Managed Web hosting",
    price: { amount: 49, from: true, unit: "mj" },
    limit:
      "Jedan jednostavan poslovni web; predloženo do 5 GB aplikativnih podataka; bez mailboxova",
    group: "hosting",
  },
  {
    slug: "managed-app",
    name: "Managed App hosting",
    price: { amount: 129, from: true, unit: "mj" },
    limit: "Jedna manja aplikacija i baza; kvote i resursi nakon procjene opterećenja",
    group: "hosting",
  },
  {
    slug: "izdvojeni-vps",
    name: "Izdvojeni VPS",
    price: { amount: 150, from: true, unit: "mj" },
    infraNote: "Infrastruktura po ponudi pružatelja, odvojeno od upravljanja",
    limit: "Resursi prema potrebi; trošak pružatelja se iskazuje zasebno",
    group: "hosting",
  },
  {
    slug: "care",
    name: "Care",
    price: { amount: 190, unit: "mj" },
    limit:
      "Jedan web, planirane nadogradnje i provjere, do 1 sat manjih sadržajnih/tehničkih zahvata",
    group: "care",
  },
  {
    slug: "care-plus",
    name: "Care Plus",
    price: { amount: 390, unit: "mj" },
    limit: "Jedan web ili webshop, do 3 sata zahvata i mjesečni tehnički pregled",
    group: "care",
  },
  {
    slug: "care-commerce",
    name: "Care Commerce",
    price: { amount: 690, unit: "mj" },
    limit:
      "Jedan složeniji webshop/aplikacija, do 6 sati zahvata i dogovorene provjere ključnih tokova",
    group: "care",
  },
];

export const hostingTerms = [
  "Hosting i održavanje dvije su različite stavke. Ako ih objedinimo u ponudi, ukupna cijena i uključene usluge prikazuju se jasno.",
  "Kvote su prijedlog komercijalnih paketa, ne potvrda slobodnih resursa postojećih servera.",
  "Prije ugovora definiramo broj aplikacija i baza, prostor, promet, email, interval i zadržavanje kopija, odvojenu lokaciju kopija, test vraćanja, monitoring i kontakt za incident.",
  "Predloženi početni cilj je dnevna sigurnosna kopija sa zadržavanjem 7 dana i kvartalna proba povrata. To javno obećavam tek kada je postavljeno i provjereno.",
  "Podrška u radnom vremenu. Cilj prvog odgovora sljedeći radni dan, uz potvrdu kapaciteta prije ugovaranja. Prvi odgovor nije rok rješenja.",
  "Nema automatskog 24/7 dežurstva, jamstva 100% dostupnosti, neograničenog prometa ni „potpune sigurnosti”. Poslovni RPO/RTO i SLA dogovaramo zasebno za kritične sustave.",
];

/* ------------------------------------------------------------------ *
 * 7 Payment models
 * ------------------------------------------------------------------ */

export type PaymentModel = {
  slug: string;
  name: string;
  rule: string;
  /** Deposit as a share of the contracted price. */
  depositShare: number;
  /** Number of monthly instalments for the remainder, or null for phase-based. */
  instalments: number | null;
  /** Minimum contracted price this model is offered from. */
  minAmount?: number;
  /** Phase shares, used when `instalments` is null. */
  phases?: number[];
};

export const paymentModels: PaymentModel[] = [
  {
    slug: "po-fazama",
    name: "Po fazama",
    rule:
      "40% na početak, 30% nakon prihvata dizajna ili ključne faze, 30% prije produkcijskog puštanja",
    depositShare: 0.4,
    instalments: null,
    phases: [0.4, 0.3, 0.3],
  },
  {
    slug: "do-6-rata",
    name: "Do 6 rata",
    rule: "30% predujam, ostatak u 6 mjesečnih rata; dostupno nakon dogovora",
    depositShare: 0.3,
    instalments: 6,
  },
  {
    slug: "do-12-rata",
    name: "Do 12 rata",
    rule:
      "Za projekte od 10.000 €: 40% predujam, ostatak do 12 rata nakon dogovora",
    depositShare: 0.4,
    instalments: 12,
    minAmount: 10000,
  },
];

export const paymentTerms = [
  "Predujam je odvojen od broja naknadnih rata.",
  "Obroci se računaju na punu ugovorenu cijenu, bez automatske naknade financiranja. Ako uvjeti odgode traže drukčiju ukupnu cijenu, pokazujem je unaprijed.",
  "Zadnja rata korigira zaokruživanje.",
  "Cijena projekta i ponavljajući mjesečni trošak uvijek su odvojeni.",
  "Nije riječ o kartičnom obročnom plaćanju, nego o ugovorenom rasporedu fakturiranja.",
  "Odabir modela ne znači automatsko odobrenje obročne suradnje — model, predujam i ukupnu cijenu definiramo u ponudi, prije početka rada.",
];

export const vatNotice = "Sve cijene su bez PDV-a.";
