"use server";

import { headers } from "next/headers";
import { parseContactForm } from "@/lib/contact-schema";
import {
  budgetOptions,
  categoryOptions,
  timelineOptions,
} from "@/lib/contact-options";
import type { ContactState } from "@/lib/contact-state";
import { isMailerConfigured, sendContactEmail } from "@/lib/mailer";
import { checkRateLimit } from "@/lib/rate-limit";

/** Reject oversized posts before parsing anything. */
const MAX_TOTAL_CHARS = 20_000;

function labelFor(
  options: readonly { value: string; label: string }[],
  value: string | undefined
) {
  if (!value) return "nije navedeno";
  return options.find((o) => o.value === value)?.label ?? value;
}

export async function submitContactForm(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
    company: String(formData.get("company") ?? ""),
    website: String(formData.get("website") ?? ""),
    category: String(formData.get("category") ?? ""),
    budget: String(formData.get("budget") ?? ""),
    timeline: String(formData.get("timeline") ?? ""),
    newsletter: formData.get("newsletter") === "on",
  };

  // Keep what was typed, so an error never costs the visitor their message.
  const values: Record<string, string> = {
    name: raw.name,
    email: raw.email,
    message: raw.message,
    company: raw.company,
    website: raw.website,
    category: raw.category,
    budget: raw.budget,
    timeline: raw.timeline,
    newsletter: raw.newsletter ? "on" : "",
  };

  const totalChars = Object.values(raw).reduce(
    (sum, v) => sum + (typeof v === "string" ? v.length : 0),
    0
  );
  if (totalChars > MAX_TOTAL_CHARS) {
    return {
      status: "error",
      message: "Upit je prevelik. Skratite poruku i pokušajte ponovno.",
      errors: { message: "Poruka je predugačka." },
      values,
    };
  }

  // Honeypot: a hidden field that only a bot fills in. Answer as if it worked,
  // so a scripted submitter gets no signal, but send nothing.
  if (String(formData.get("tvrtka_url") ?? "").length > 0) {
    return {
      status: "success",
      message: "Upit je stigao. Hvala na kontekstu — sad imamo od čega krenuti.",
      errors: {},
      values: {},
    };
  }

  const parsed = parseContactForm(raw);
  if (!parsed.ok) {
    return {
      status: "error",
      message: "Provjerite označena polja i pošaljite ponovno.",
      errors: parsed.errors,
      values,
    };
  }

  // Rate limit per client IP, read from the proxy headers (see DEPLOYMENT.md
  // for the trusted-proxy requirement).
  //
  // Behind Cloudflare, `cf-connecting-ip` is the one header the edge sets
  // itself and will not pass through from a visitor, so it is preferred when
  // present. `x-forwarded-for` is the fallback for a plain reverse proxy;
  // its first entry is the client only because the proxy in front is
  // required to rewrite the header rather than append to it.
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  const ip =
    headerList.get("cf-connecting-ip")?.trim() ||
    forwarded?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "unknown";

  const limit = checkRateLimit(`kontakt:${ip}`);
  if (!limit.allowed) {
    const minutes = Math.ceil(limit.retryAfter / 60);
    return {
      status: "error",
      message: `Stiglo je previše upita s ove veze. Pokušajte ponovno za ${minutes} min ili mi se javite izravno.`,
      errors: {},
      values,
    };
  }

  if (!isMailerConfigured()) {
    // The brief is explicit: without a configured provider, never show a fake
    // success message.
    return {
      status: "error",
      message:
        "Slanje forme trenutačno nije postavljeno, pa upit nije poslan. Ispričavam se — javite mi se izravno dok to ne posložim.",
      errors: {},
      values,
    };
  }

  const { data } = parsed;
  const lines = [
    `Ime: ${data.name}`,
    `Email: ${data.email}`,
    `Tvrtka: ${data.company ?? "nije navedeno"}`,
    `Web: ${data.website ?? "nije navedeno"}`,
    `Kategorija: ${labelFor(categoryOptions, data.category)}`,
    `Budžet: ${labelFor(budgetOptions, data.budget)}`,
    `Rok: ${labelFor(timelineOptions, data.timeline)}`,
    `Newsletter privola: ${data.newsletter ? "DA" : "ne"}`,
    "",
    "Poruka:",
    data.message,
  ];

  const sent = await sendContactEmail({
    subject: `Upit s weba — ${data.name}`,
    text: lines.join("\n"),
    replyTo: data.email,
  });

  if (!sent.ok) {
    return {
      status: "error",
      message:
        "Slanje trenutačno ne radi, pa upit nije stigao do mene. Pokušajte ponovno za koju minutu ili mi se javite izravno.",
      errors: {},
      values,
    };
  }

  return {
    status: "success",
    message: "Upit je stigao. Hvala na kontekstu — sad imamo od čega krenuti.",
    errors: {},
    values: {},
  };
}
