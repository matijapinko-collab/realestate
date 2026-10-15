/**
 * Email delivery through Resend's REST API.
 *
 * Plain `fetch`, so there is no SDK dependency to keep current. Secrets are
 * read from the server environment only and are never exposed through a
 * NEXT_PUBLIC variable.
 *
 * If the provider is not configured the form says so honestly instead of
 * showing a fake "sent" message — that rule is from the brief and is enforced
 * by `isMailerConfigured()`, which the page reads on the server.
 */

import "server-only";

const DEFAULT_ENDPOINT = "https://api.resend.com/emails";
const TIMEOUT_MS = Number(process.env.CONTACT_TIMEOUT_MS ?? 10_000);

/**
 * Overridable so failure paths can be exercised against a local stub instead
 * of sending test submissions to a third party. Leave unset in production.
 */
function endpoint(): string {
  return process.env.RESEND_API_URL || DEFAULT_ENDPOINT;
}

export type MailerResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "provider-error" | "timeout" };

export function isMailerConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.CONTACT_TO_EMAIL &&
      process.env.CONTACT_FROM_EMAIL
  );
}

export async function sendContactEmail(payload: {
  subject: string;
  text: string;
  replyTo: string;
}): Promise<MailerResult> {
  if (!isMailerConfigured()) return { ok: false, reason: "not-configured" };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(endpoint(), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to: [process.env.CONTACT_TO_EMAIL],
        reply_to: payload.replyTo,
        subject: payload.subject,
        text: payload.text,
      }),
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      // Log the status only. The body can echo back submitted content, and
      // enquiry text is personal data that does not belong in server logs.
      console.error(
        `[kontakt] Provider je odbio slanje. HTTP ${response.status}`
      );
      return { ok: false, reason: "provider-error" };
    }

    return { ok: true };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error("[kontakt] Slanje je isteklo prije odgovora providera.");
      return { ok: false, reason: "timeout" };
    }
    console.error("[kontakt] Slanje nije uspjelo zbog mrežne greške.");
    return { ok: false, reason: "provider-error" };
  } finally {
    clearTimeout(timer);
  }
}
