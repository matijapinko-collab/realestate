/**
 * Option lists for the contact form.
 *
 * Deliberately free of any zod import: the client form needs these lists, and
 * keeping them here stops the validation library (~88 KiB) from being pulled
 * into the browser bundle. Validation itself stays on the server.
 */

export const budgetOptions = [
  { value: "do-5000", label: "do 5.000 €" },
  { value: "5000-10000", label: "5.000–10.000 €" },
  { value: "10000-15000", label: "10.000–15.000 €" },
  { value: "vise-od-15000", label: "više od 15.000 €" },
  { value: "mjesecna-suradnja", label: "Želim mjesečnu suradnju" },
] as const;

export const categoryOptions = [
  { value: "development", label: "Development" },
  { value: "marketing", label: "Marketing" },
  { value: "business-development", label: "Business Development" },
  { value: "nisam-siguran", label: "Nisam siguran — trebam preporuku" },
] as const;

export const timelineOptions = [
  { value: "sto-prije", label: "Što prije" },
  { value: "1-3-mjeseca", label: "Kroz 1–3 mjeseca" },
  { value: "3-6-mjeseci", label: "Kroz 3–6 mjeseci" },
  { value: "istrazujem", label: "Još istražujem" },
] as const;
