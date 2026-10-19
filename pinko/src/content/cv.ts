/**
 * The CV — one source for the whole site.
 *
 * `/cv` prints from here, `/o-meni` draws its timeline from here and the
 * biography dialog in the hero reads the same entries. Dates and role
 * descriptions are written once; no component repeats them.
 *
 * Written from the CV brief Matija supplied on 16 October 2026, with the
 * editorial rules it sets out kept to the letter:
 *  - no "top 1%" claim without a verifiable profile;
 *  - no degree implied where completion was never stated;
 *  - no private address, no date of birth, no German until confirmed;
 *  - former employers are never presented as clients of the Pinko trade;
 *  - nothing is described as delivered when it is known only to be planned.
 */

export type CvExperience = {
  organisation: string;
  role: string;
  /** Exactly as given; open-ended periods end in "danas". */
  period: string;
  /** Two to four sentences for the timeline and the biography dialog. */
  summary: string;
  /** Detail lines, printed on the CV page only. */
  bullets?: string[];
  tags: string[];
  /** Current work is marked on the timeline. */
  highlight?: boolean;
};

import { site } from "@/config/site";

export const cvProfile = {
  name: "Matija Pinko",
  title: "AI i LLM strateg · savjetnik za digitalne proizvode i rast",
  claim:
    "Povezujem umjetnu inteligenciju, digitalne proizvode, marketing i prodaju u posao koji ima smisla — od ideje do svakodnevne izvedbe.",
  location: "Velika Gorica / Zagreb · Hrvatska i regija · rad na daljinu",
  /**
   * The CV shows the same address as the rest of the site, read from the
   * config rather than written again here. The brief originally named a
   * hotmail address; Matija decided on 16 October 2026 that everything uses
   * matija@pinko.hr — the mailbox the contact form actually sends through.
   */
  email: site.contact.email,
  linkedin: "https://www.linkedin.com/in/matijapinko/",
  web: "https://pinko.hr/",
} as const;

export const cvSummary = [
  "Stručnjak za primjenu AI-ja i velikih jezičnih modela u poslovanju, digitalne proizvode i razvoj poslovanja, s iskustvom u vođenju tehnoloških timova, product ownershipu, e-commerceu, marketingu, prodaji i operativnom upravljanju.",
  "Moja je prednost povezivanje područja koja se u tvrtkama često rješavaju odvojeno. Razumijem što poslovanje želi postići, što kupac treba čuti, kako digitalni proizvod treba raditi i gdje AI stvarno pomaže ljudima da posao obave brže i kvalitetnije.",
  "Klijentima donosim i strateško razmišljanje i operativnu uključenost: mogu razgovarati o poslovnom modelu, razraditi korisnički tok, napisati razvojni brief i povezati sve to s načinom na koji se proizvod predstavlja i prodaje.",
];

export const expertise = [
  {
    area: "AI i primjena LLM-ova u poslovanju",
    items: [
      "Oblikovanje uputa, konteksta i višekoračnih zadataka za AI asistente",
      "Praktična primjena ChatGPT-a i Claudea u istraživanju, pisanju, analizi i planiranju",
      "Dizajn AI-potpomognutih radnih procesa uz provjeru izvora i rezultata",
      "Prevođenje poslovnog problema u jasan zadatak, kriterije prihvaćanja i provedive korake",
    ],
  },
  {
    area: "Digitalni proizvodi i izvedba",
    items: [
      "Product ownership, prioritizacija backloga, korisničke priče i specifikacije",
      "Vođenje IT projekata i koordinacija poslovnih, dizajnerskih i razvojnih dionika",
      "Razrada e-commerce funkcionalnosti, blagajne i administratorskih procesa",
      "Rad na projektima koji koriste Next.js, WooCommerce, API-je i poslovne sustave",
    ],
  },
  {
    area: "Marketing, sadržaj i komercijalna komunikacija",
    items: [
      "SEO, sadržajna strategija, copywriting i prodajni tekstovi",
      "Pozicioniranje proizvoda i prilagodba komunikacije publici i kanalu",
      "Planiranje email marketinga i automatiziranih tokova",
      "Istraživanje tržišta, publike i konkurencije",
    ],
  },
  {
    area: "E-commerce i prodajni kanali",
    items: [
      "Razvoj i operativno upravljanje webshopovima",
      "Amazon Seller Central, sadržaj listinga i rad na prodajnim kanalima",
      "Razvoj Temu kanala te procesa naručivanja i dostave",
      "Povezivanje kataloga, zaliha, narudžbi, logistike i korisničkog iskustva",
    ],
  },
  {
    area: "Business development i upravljanje",
    items: [
      "Analiza poslovnih potreba, razvoj suradnji, ponude i pregovori",
      "Upravljanje ključnim klijentima i odnosima s partnerima",
      "Operativno upravljanje, procesi, budžeti i koordinacija resursa",
      "Vođenje timova, zapošljavanje, mentoriranje i razvoj organizacije",
    ],
  },
];

export const experience: CvExperience[] = [
  {
    organisation: "Pinko, obrt za informatičke usluge",
    role: "Vlasnik",
    period: "2018. — danas",
    summary:
      "Vlastiti obrt za IT usluge koji vodim osmu godinu. Razvijam digitalne usluge, savjetovanje, projektno upravljanje i komercijalnu komunikaciju, povezujući potrebe klijenata s konkretnim rješenjima i načinom izvedbe.",
    bullets: [
      "Razrada digitalnih projekata od poslovnog cilja do funkcionalnih zahtjeva i koordinacije rada",
      "Priprema ponuda, komunikacija s klijentima, poslovno planiranje i organizacija isporuke",
      "Primjena AI alata u istraživanju, sadržaju, razradi proizvoda i svakodnevnim procesima",
      "Povezivanje poslovne strategije, web iskustva, sadržaja i prodajne komunikacije",
    ],
    tags: ["Vođenje projekata", "Savjetovanje", "AI u praksi"],
    highlight: true,
  },
  {
    organisation: "Bolero Adria / 100% Smart Food",
    role: "Digitalni razvoj i operativa",
    period: "aktualni angažman, 2026.",
    summary:
      "Povezivanje e-commercea, digitalnog razvoja i svakodnevne operative kroz više webshopova i međunarodne prodajne kanale.",
    bullets: [
      "Rad na pet webshopova i Amazon Seller Centralu za tri tržišta",
      "Razvoj i koordinacija modernizacije 100% Smart Food webshopa prema Next.js rješenju uz WooCommerce okruženje",
      "Razrada kataloga, varijacija, pretraživanja, filtera, zaliha, naručivanja i administratorskih funkcija",
      "Rad na hrvatskom, slovenskom i B2B prodajnom iskustvu",
      "Rad na Amazon i Temu kanalima te povezivanju prodajnih i dostavnih procesa",
      "Koordinacija pripreme Odoo ERP-a s klijentske strane: skladište, nabava, prodaja i integracije",
      "Razrada dodatnih AI funkcionalnosti i automatizacija; status pojedinih inicijativa razlikuje se po projektu",
    ],
    tags: ["E-commerce", "Next.js", "Amazon i Temu", "ERP"],
    highlight: true,
  },
  {
    organisation: "BISNEYS",
    role: "KAM & Delivery team lead",
    period: "lipanj 2025. — rujan 2026.",
    summary:
      "Razvoj prodaje, vođenje ključnih kupaca i poslovni razvoj u tvrtki za zapošljavanje i poslovno savjetovanje. Vodim odnos s klijentom od prvog kontakta i pregovora do isporuke usluge, uz koordinaciju internih timova.",
    tags: ["Key account management", "Pregovaranje", "Poslovni razvoj"],
    highlight: true,
  },
  {
    organisation: "Hrvatski Telekom",
    role: "Product owner — OneApp i digitalni kanali",
    period: "2024. — 2025.",
    summary:
      "Rad na digitalnim inicijativama unutar Hrvatskog Telekoma i šireg Deutsche Telekom okruženja, uz povezivanje poslovnih potreba, korisničkih tokova i razvojnih zahtjeva.",
    bullets: [
      "Definiranje korisničkih priča, prioriteta i zahtjeva za digitalne funkcionalnosti",
      "Koordinacija poslovnih i tehničkih dionika kroz razvojni proces",
      "Digitalni self-service, onboarding, upravljanje uslugama i korisničkim profilima",
      "Rad s backlogom, Jirom i agilnim načinom isporuke",
    ],
    tags: ["Product ownership", "Agile", "Jira"],
  },
  {
    organisation: "Business Vision",
    role: "Chief Operating Officer",
    period: "siječanj 2023. — prosinac 2024.",
    summary:
      "Vođenje operative, timova i razvoja organizacije, uz sudjelovanje u strateškom usmjeravanju tvrtke. Bio sam uključen u razvoj ključnih projekata, uključujući Teladoc i Travel Elysium.",
    bullets: [
      "Vođenje Business Vision tima angažiranog na Teladoc telemedicinskom projektu",
      "Koordinacija više timova i povezivanje njihova rada s poslovnim prioritetima",
      "Upravljanje svakodnevnim poslovanjem te razvoj procesa i organizacijske podrške",
      "Izravna uključenost u razvoj proizvoda i povezivanje poslovne perspektive s izvedbom",
      "Komunikacija s partnerima, klijentima i investitorima",
      "Suradnja s financijama na budžetima, resursima i održivosti poslovanja",
    ],
    tags: ["Operativa", "Vodstvo", "Razvoj proizvoda"],
  },
  {
    organisation: "Business Vision",
    role: "Head of Human Resources",
    period:
      "travanj 2020. — rujan 2022. (puno radno vrijeme); rujan 2022. — siječanj 2023. (djelomični angažman)",
    summary:
      "Vođenje HR funkcije i razvoja organizacije koja je na vrhuncu imala više od 75 developera.",
    bullets: [
      "Zapošljavanje, mentoriranje i podrška profesionalnom razvoju",
      "Razvoj HR procesa i praksi upravljanja ljudima",
      "Podrška suradnji i usklađenosti međunarodnih timova",
      "Vođenje otvaranja međunarodnog ureda: prostor, ugovori, logistika, oprema i operativno postavljanje",
    ],
    tags: ["HR", "Zapošljavanje", "Mentoriranje"],
  },
  {
    organisation: "Croatique DMC",
    role: "Senior travel consultant — projektno i poslovno savjetovanje",
    period: "2023. — 2024.",
    summary:
      "Rad na inicijativi povezanoj sa softverom u destination management poslovanju, uz podršku razvoju poslovanja i odnosima s klijentima.",
    tags: ["Destinacijski menadžment", "Poslovni razvoj"],
  },
  {
    organisation: "Tomsoft",
    role: "IT project manager",
    period: "2022. — 2023.",
    summary:
      "Upravljanje opsegom, planiranjem, izvedbom i komunikacijom IT projekata, uz praćenje rokova, rizika i operativnih problema tijekom implementacije.",
    tags: ["Vođenje projekata", "Upravljanje promjenom"],
  },
  {
    organisation: "Upwork",
    role: "Freelance writer / copywriter",
    period: "2018. — danas",
    summary:
      "Marketinški, oglasni i poslovni sadržaj za webove, kampanje, newslettere i komunikaciju s klijentima. Status Top Rated Plus na Upworku.",
    tags: ["Copywriting", "Sadržajna strategija"],
  },
  {
    organisation: "Eventrify",
    role: "IT project manager",
    period: "2018. — 2019.",
    summary:
      "Prikupljanje zahtjeva, definiranje opsega, planiranje rokova i budžeta te koordinacija developera u startup okruženju.",
    tags: ["Startup", "Vođenje razvoja"],
  },
  {
    organisation: "Hrvatski Telekom",
    role: "Prodaja, ključni klijenti i digitalna komunikacija",
    period: "2013. — 2018.",
    summary:
      "Profesionalni razvoj kroz tehničku podršku, društvene mreže, upravljanje ključnim klijentima i vođenje smjene u T-Centru.",
    bullets: [
      "Dijagnostika tehničkih problema i korisnička podrška",
      "Komunikacija putem društvenih mreža i digitalnih korisničkih kanala",
      "Razumijevanje potreba kupaca, predstavljanje rješenja i razvoj odnosa",
      "Rad s prodajnim ciljevima, prigovorima i maloprodajnom operativom",
    ],
    tags: ["Key account", "Prodaja", "Društvene mreže"],
  },
];

/** Projects and contexts, named without claiming sole authorship. */
export const cvContexts = [
  {
    name: "Teladoc kroz Business Vision",
    what: "Vođenje agencijskog tima i povezivanje operativnih i poslovnih prioriteta s radom na telemedicinskom projektu.",
  },
  {
    name: "Travel Elysium kroz Business Vision",
    what: "Uključenost u razvoj proizvoda u sklopu COO odgovornosti.",
  },
  {
    name: "OneApp / Hrvatski Telekom",
    what: "Product ownership i povezivanje poslovnih zahtjeva s digitalnim funkcionalnostima.",
  },
  {
    name: "100% Smart Food i Bolero",
    what: "Modernizacija webshopova, korisničko iskustvo, prodajni kanali i operativno povezivanje sustava; više inicijativa je u razvoju.",
  },
  {
    name: "VIRUS.HR",
    what: "Urednički rad, autorski sadržaj i razvoj sadržajnog smjera u gaming i tehnološkom području.",
  },
];

export const cvTools = [
  "ChatGPT",
  "Claude",
  "Jira",
  "Agile / Scrum",
  "WooCommerce",
  "Next.js",
  "Amazon Seller Central",
  "Temu seller",
  "API integracije i specifikacije",
  "Odoo",
  "SEO i sadržajni procesi",
];

export const cvToolsNote =
  "Razina rada razlikuje se po alatu: od praktične uporabe i razrade rješenja do koordinacije implementacije.";

export const cvEducation = [
  {
    school: "Fakultet prometnih znanosti",
    field: "Inteligentni transportni sustavi",
    period: "2012. — 2017.",
    // The brief is explicit: no degree is implied where completion was never
    // stated. The line says what is known and nothing more.
    note: "Studij; status završetka nije naveden.",
  },
  {
    school: "I. tehnička škola Tesla, Zagreb",
    field: "Računalstvo",
    period: "2008. — 2012.",
  },
];

export const cvLanguages = [
  { name: "Hrvatski", level: "materinski" },
  { name: "Engleski", level: "profesionalna poslovna uporaba" },
];

export const cvShortBio =
  "Matija Pinko povezuje AI, digitalne proizvode, marketing i razvoj poslovanja. Kao bivši COO Business Visiona vodio je timove angažirane na projektima poput Teladoca, a kao product owner u Hrvatskom Telekomu radio na digitalnim korisničkim iskustvima. Danas kroz Pinko pomaže tvrtkama povezati webove, sadržaj, prodajne kanale i AI alate u smislen način rada.";
