/**
 * Matija's professional history.
 *
 * The entries themselves come from `cv.ts`, which is the single source for
 * dates and role descriptions. This file keeps only what is specific to the
 * site: the disclaimer, what the experience means for a client, and the
 * organisations still waiting on dates.
 */

import { experience, type CvExperience } from "./cv";

/**
 * The timeline on `/o-meni` and in the biography dialog is the CV, not a
 * second copy of it. Dates and descriptions live once, in `cv.ts`.
 */
export type CareerEntry = CvExperience;

export const career: CareerEntry[] = experience;

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
 * Named in the original brief and still without dates. Bolero Adria and HT
 * OneApp moved into the dated CV entries once the CV brief supplied their
 * periods; Morgancode is the last one waiting. Ask Matija before publishing
 * anything more specific about it. (OlyBet was removed from the site
 * entirely on 19 Oct 2026, at his request.)
 */
export const additionalWork = [
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
