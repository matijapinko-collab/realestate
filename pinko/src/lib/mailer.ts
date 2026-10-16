/**
 * Email delivery over SMTP, using the mailbox on the project's own cPanel
 * hosting (matija@pinko.hr) rather than a third-party sending service.
 *
 * Secrets are read from the server environment only and never exposed through
 * a NEXT_PUBLIC variable.
 *
 * If SMTP is not configured the form says so honestly instead of showing a
 * fake "sent" message. That rule is enforced by `isMailerConfigured()`, which
 * the contact page reads on the server.
 */

import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

const TIMEOUT_MS = Number(process.env.CONTACT_TIMEOUT_MS ?? 10_000);

export type MailerResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "provider-error" | "timeout" };

type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  to: string;
};

function readConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!host || !user || !pass || !to) return null;

  // 465 is implicit TLS, 587 is STARTTLS. cPanel serves both; 465 is default.
  const port = Number(process.env.SMTP_PORT ?? 465);
  if (!Number.isInteger(port) || port <= 0) return null;

  return {
    host,
    port,
    user,
    pass,
    to,
    // The envelope sender must be a mailbox on this domain or the server will
    // refuse to relay; the visitor's address goes in Reply-To instead.
    from: process.env.CONTACT_FROM_EMAIL ?? user,
  };
}

export function isMailerConfigured(): boolean {
  return readConfig() !== null;
}

let cached: Transporter | null = null;

function transporter(config: SmtpConfig): Transporter {
  if (cached) return cached;
  cached = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: { user: config.user, pass: config.pass },
    connectionTimeout: TIMEOUT_MS,
    greetingTimeout: TIMEOUT_MS,
    socketTimeout: TIMEOUT_MS,
  });
  return cached;
}

export async function sendContactEmail(payload: {
  subject: string;
  text: string;
  replyTo: string;
}): Promise<MailerResult> {
  const config = readConfig();
  if (!config) return { ok: false, reason: "not-configured" };

  try {
    await transporter(config).sendMail({
      from: { name: "Pinko web", address: config.from },
      to: config.to,
      replyTo: payload.replyTo,
      subject: payload.subject,
      text: payload.text,
    });
    return { ok: true };
  } catch (error) {
    // Log the failure kind only. The error can echo back submitted content,
    // and enquiry text is personal data that does not belong in server logs.
    const code =
      typeof error === "object" && error !== null && "code" in error
        ? String((error as { code: unknown }).code)
        : "unknown";

    if (code === "ETIMEDOUT" || code === "ESOCKET" || code === "ECONNECTION") {
      console.error(`[kontakt] SMTP veza nije uspjela (${code}).`);
      return { ok: false, reason: "timeout" };
    }

    console.error(`[kontakt] Slanje nije uspjelo (${code}).`);
    return { ok: false, reason: "provider-error" };
  }
}
