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
  nextStep: string;
  evidenceLinks: EvidenceLink[];
  images: ProjectImage[];
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
    slug: "100-smart-food",
    projectName: "100% Smart Food",
    relationshipType: "interni-razvoj",
    role:
      "Razvoj Next.js e-commerce iskustva i povezanih funkcija, uz rad na katalogu i integracijama.",
    status: "lansirano",
    approvedForPublication: true,
    summary:
      "Next.js webshop s katalogom, filterima i varijacijama, građen oko stvarnih pravila kupnje.",
    context:
      "Webshop prehrambenog brenda kojem katalog, varijacije i pravila kupnje ne ulaze u standardni template.",
    challenge:
      "Kupac mora brzo pronaći pravi proizvod i varijantu, a administracija ne smije postati ručni posao.",
    decisions: [
      "Next.js front s prilagođenim katalogom umjesto gotove teme",
      "Model podataka prema stvarnim varijacijama i pravilima kupnje",
      "Integracije prema postojećim izvorima kataloga i narudžbi",
    ],
    deliverables: [
      "Katalog, filteri i prikaz varijacija",
      "Kupovni tok prilagođen pravilima kupnje",
      "Integracije prema dogovorenom opsegu",
    ],
    outcomes: [
      "Funkcionalan katalog s filterima i varijacijama",
      "Manje ručnog prepisivanja podataka u administraciji",
    ],
    nextStep: "Imate sličan katalog koji se ne da složiti u gotovu temu?",
    evidenceLinks: [{ label: "100smartfood.hr", href: "https://100smartfood.hr/" }],
    images: [],
    publishedAt: "2026-10-16",
    contributionLabel: "Next.js e-commerce razvoj",
    internalNote:
      "Objavu odobrio Matija 16. 10. 2026. Screenshotovi još nisu dostavljeni, pa kartica ide bez slike.",
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
      "Vlastiti proizvod: arhitektura, razvoj, model podataka, administracija sadržaja i objava u produkciju.",
    status: "lansirano",
    approvedForPublication: true,
    summary:
      "Višejezična platforma za pronalaženje i usporedbu alata za rad, s vlastitom administracijom sadržaja.",
    context:
      "Vlastiti proizvod, a ne klijentski posao: mjesto na kojem se alati za rad mogu pronaći, usporediti i razumjeti bez prolaska kroz deset marketinških stranica.",
    challenge:
      "Katalog alata, usporedbe i urednički sadržaj moraju raditi na više jezika, a unos i uređivanje ne smiju ovisiti o programeru.",
    decisions: [
      "Višejezičnost ugrađena u model podataka, ne nalijepljena naknadno",
      "Vlastita administracija sadržaja umjesto gotovog CMS-a",
      "Jedan izvor istine za alate, usporedbe i uredničke tekstove",
    ],
    deliverables: [
      "Katalog alata s usporedbama i vodičima",
      "Administracija za unos i uređivanje sadržaja",
      "Postavljanje u produkciju na vlastitoj domeni",
    ],
    outcomes: [
      "Platforma je javno dostupna i radi na više jezika",
      "Sadržaj se dodaje i mijenja bez izmjene koda",
    ],
    nextStep: "Treba vam proizvod koji sami možete puniti sadržajem?",
    evidenceLinks: [{ label: "varel.io", href: "https://varel.io/" }],
    images: [],
    publishedAt: "2026-10-16",
    contributionLabel: "Vlastiti proizvod — arhitektura i razvoj",
    internalNote:
      "Objavu odobrio Matija 16. 10. 2026. Vlastiti proizvod, pa nema klijenta od kojeg treba pribaviti prava objave.",
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
