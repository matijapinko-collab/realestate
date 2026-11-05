/**
 * Contact form validation.
 *
 * Kept in its own module (no "use server") so it can be unit tested and, if
 * ever needed, reused on the client without pulling the server action in.
 */

import { z } from "zod";
import {
  budgetOptions,
  categoryOptions,
  timelineOptions,
} from "./contact-options";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Najviše ${max} znakova.`)
    .optional()
    .transform((v) => (v === "" ? undefined : v));

const enumFrom = (
  options: readonly { value: string }[],
  message: string
) =>
  z
    .string()
    .trim()
    .optional()
    .transform((v) => (v === "" ? undefined : v))
    .refine(
      (v) => v === undefined || options.some((o) => o.value === v),
      message
    );

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Upišite svoje ime.")
    .max(120, "Ime je predugačko."),
  email: z
    .string()
    .trim()
    .min(1, "Upišite email adresu.")
    .max(254, "Email adresa je predugačka.")
    .pipe(z.email("Provjerite email adresu — čini se da nije ispravna.")),
  message: z
    .string()
    .trim()
    .min(20, "Napišite barem nekoliko rečenica o tome što trebate.")
    .max(5000, "Poruka je predugačka. Najviše 5.000 znakova."),
  company: optionalText(160),
  website: optionalText(300),
  category: enumFrom(categoryOptions, "Odaberite jednu od ponuđenih kategorija."),
  budget: enumFrom(budgetOptions, "Odaberite jedan od ponuđenih raspona."),
  timeline: enumFrom(timelineOptions, "Odaberite jedan od ponuđenih rokova."),
  /** Separate, voluntary newsletter consent — never implied by sending an enquiry. */
  newsletter: z.boolean().default(false),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Field-keyed error messages, ready for rendering. */
export type FieldErrors = Partial<Record<keyof ContactInput | "form", string>>;

export function parseContactForm(
  raw: Record<string, unknown>
): { ok: true; data: ContactInput } | { ok: false; errors: FieldErrors } {
  const result = contactSchema.safeParse(raw);
  if (result.success) return { ok: true, data: result.data };

  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !(key in errors)) {
      errors[key as keyof ContactInput] = issue.message;
    }
  }
  return { ok: false, errors };
}
