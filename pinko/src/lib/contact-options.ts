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

/**
 * These follow the four services, so the answer on the form means the same
 * thing as the page the visitor came from. `development` keeps its value
 * even though its label changed: it is stored in sent enquiries and in the
 * tests, and renaming it would only break those for cosmetic reasons.
 */
export const categoryOptions = [
  { value: "development", label: "Web stranica ili aplikacija" },
  { value: "webshop", label: "Webshop" },
  { value: "business-development", label: "Automatizacije i ERP" },
  { value: "marketing", label: "Marketing i eCommerce rast" },
  { value: "nisam-siguran", label: "Nisam siguran — trebam preporuku" },
] as const;

export const timelineOptions = [
  { value: "sto-prije", label: "Što prije" },
  { value: "1-3-mjeseca", label: "Kroz 1–3 mjeseca" },
  { value: "3-6-mjeseci", label: "Kroz 3–6 mjeseci" },
  { value: "istrazujem", label: "Još istražujem" },
] as const;
