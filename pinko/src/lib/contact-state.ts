/**
 * Form state shared between the server action and the client form.
 *
 * This lives outside the "use server" module on purpose: a server-action file
 * may only export async functions, so the initial state and its type cannot be
 * exported from there.
 */

import type { FieldErrors } from "@/lib/contact-schema";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: FieldErrors;
  /** Echoed back so a rejected submission does not wipe what was typed. */
  values: Record<string, string>;
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
  errors: {},
  values: {},
};
