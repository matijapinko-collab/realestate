/**
 * Central public business data.
 *
 * Rule from the brief: nothing unconfirmed goes live. Anything that is not yet
 * supplied by Matija stays `null` here, and the UI omits it instead of
 * inventing a value. Never add a placeholder email, phone, address or OIB.
 */

export type MaybeConfirmed<T> = T | null;

export const site = {
  name: "Pinko",
  wordmark: "pinko.",
  person: "Matija Pinko",
  /** Short positioning line (brief 2.4). */
  tagline: "Razvoj. Marketing. Posao koji ide dalje.",
  /** Main message (brief 2.4). */
  promise: 'Od „imam ideju” do „ovo nam olakšava posao”.',
  description:
    "Pinko je osobni studio Matije Pinka za razvoj webova, webshopova i aplikacija te sadržaj, automatizacije i poslovne procese koji podržavaju rast.",
  locale: "hr-HR",
  lang: "hr",

  /**
   * Canonical origin. Set NEXT_PUBLIC_SITE_URL in production.
   *
   * The brief records that on 14 Oct 2026 a public fetch of https://pinko.hr
   * ended at https://varel.io/en. That is an observation, not a decision: the
   * real DNS/HTTP behaviour and the canonical domain have to be confirmed
   * before launch. Nothing here assumes the existing site stays or goes.
   */
  /**
   * `||`, not `??`, and the difference is not academic: a Docker build that
   * declares `ENV NEXT_PUBLIC_X=$NEXT_PUBLIC_X` without passing the argument
   * sets the variable to an EMPTY STRING. `??` only catches null and
   * undefined, so the empty value wins and the fallback never runs. That is
   * exactly how the contact address vanished from the live site on
   * 16 October 2026 — present in the code, absent from every page.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  /** Set to true only once the canonical domain is confirmed and indexing is wanted. */
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",

  /**
   * Contact details. Confirmed items are filled in; anything still unconfirmed
   * stays null and the UI omits it rather than inventing a value.
   */
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "matija@pinko.hr",
    /** Display form; `phoneHref` is the dialable form. */
    phone: "098 137 8567" as MaybeConfirmed<string>,
    phoneHref: "+385981378567",
    /**
     * Registered details, as supplied by Matija from the craft register.
     * The OIB check digit validates (ISO 7064 MOD 11,10).
     */
    legalName: "PINKO, obrt za informatičke usluge, vl. Matija Pinko" as MaybeConfirmed<string>,
    address: "Zamlačka ulica 28 A, 10010 Velika Mlaka" as MaybeConfirmed<string>,
    oib: "12438213362" as MaybeConfirmed<string>,
    mbs: "97910945" as MaybeConfirmed<string>,
    bookingUrl: null as MaybeConfirmed<string>,
  },

  /** Response-time promise is published only when Matija confirms it. */
  responseTime: null as MaybeConfirmed<string>,

  /** Support window proposed in the brief (6.3) — still to be confirmed. */
  supportHours: {
    proposed: "pon–pet 9–17",
    confirmed: false,
  },

  /**
   * Matija's portrait. Null until the real photograph is in the repository —
   * the hero falls back to a typographic composition rather than a stock
   * person or an AI-generated face.
   *
   * To switch it on: put the file in `public/`, then set `src` to its path and
   * `width`/`height` to its real pixel dimensions (needed so the layout does
   * not shift while it loads).
   */
  portrait: {
    src: "/matija-pinko.webp",
    // Real pixel size of the file. Guessing these makes the layout jump
    // while the image loads.
    width: 960,
    height: 960,
    alt: "Matija Pinko za radnim stolom, pred otvorenim laptopom.",
  } as MaybeConfirmed<{
    src: string;
    width: number;
    height: number;
    alt: string;
  }>,

  vatRate: 0.25,
} as const;

export const nav = {
  primary: [
    { href: "/usluge", label: "Usluge" },
    { href: "/projekti", label: "Projekti" },
    { href: "/o-meni", label: "O meni" },
    { href: "/cjenik", label: "Cjenik" },
  ],
  secondary: [
    { href: "/kako-radim", label: "Kako radim" },
    { href: "/cv", label: "CV" },
    { href: "/privatnost", label: "Privatnost" },
  ],
  cta: { href: "/kontakt", label: "Imate ideju?" },
} as const;

export const disciplines = [
  {
    index: "01",
    slug: "development",
    href: "/usluge/development",
    title: "Development",
    claim: "Od weba koji predstavlja posao do aplikacije koja ga pokreće.",
    headline: "Napravimo da radi. I da lijepo izgleda dok radi.",
    cta: "Opišite što trebate razviti",
    highlights: [
      "Next.js webovi, webshopovi i web aplikacije",
      "API integracije i automatizacije",
      "Arhitektura, hosting i tehničko održavanje",
    ],
  },
  {
    index: "02",
    slug: "marketing",
    href: "/usluge/marketing",
    title: "Marketing",
    claim: "Sadržaj, email i prodajni kanali koji kupcu olakšavaju odluku.",
    headline: "Dobar proizvod zaslužuje da ga netko i pronađe.",
    cta: "Posložimo sljedeći korak",
    highlights: [
      "SEO strategija i sadržaj koji objašnjava ponudu",
      "Email marketing i automatizirani tokovi",
      "Amazon i Temu kao prodajni kanali",
    ],
  },
  {
    index: "03",
    slug: "business-development",
    href: "/usluge/business-development",
    title: "Business Development",
    claim: "Jasni prioriteti prije nego krenemo trošiti vrijeme i budžet.",
    headline: "Prvo posložimo što ima smisla razvijati.",
    cta: "Pogledajmo širu sliku",
    highlights: [
      "Digitalni poslovni audit i plan za 90 dana",
      "Ekonomika e-commercea i novih kanala",
      "Specifikacija ERP/CRM integracija i vođenje razvoja",
    ],
  },
] as const;

export type Discipline = (typeof disciplines)[number];
