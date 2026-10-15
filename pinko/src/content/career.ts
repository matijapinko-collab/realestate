/**
 * Professional history (brief 3.4).
 *
 * These are roles in other people's organisations. They are NOT clients of the
 * Pinko trade and must never be presented as projects Matija built alone.
 * Every entry says what the engagement actually was.
 */

export type CareerEntry = {
  organisation: string;
  engagement: string;
  what: string;
};

export const career: CareerEntry[] = [
  {
    organisation: "Bolero Adria",
    engagement: "Aktualni rad",
    what: "Razvoj i upravljanje e-commerce sustavima, prodajni kanali, infrastruktura i koordinacija poslovnog softvera.",
  },
  {
    organisation: "HT OneApp",
    engagement: "Product owner",
    what: "Rad na digitalnom proizvodu: prioriteti, zahtjevi i koordinacija razvoja.",
  },
  {
    organisation: "OlyBet",
    engagement: "Marketing",
    what: "Marketinške aktivnosti i sadržaj.",
  },
  {
    organisation: "Morgancode",
    engagement: "Project management",
    what: "Vođenje projekata i koordinacija isporuke.",
  },
  {
    organisation: "Poslovna Vizija",
    engagement: "COO / direktorska uloga",
    what: "Operativno vodstvo i organizacija poslovanja.",
  },
  {
    organisation: "Freelance",
    engagement: "Content writing",
    what: "Autorsko pisanje i sadržaj za različite naručitelje.",
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
