import { logger } from "./logger";

export interface SendEmailOptions {
  to: string;
  from?: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail({ to, from = "noreply@panevo.in", subject, text, html }: SendEmailOptions) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    logger.warn({ to, subject }, "RESEND_API_KEY not set. Email logging instead.");
    logger.info({ to, from, subject, text, html }, "Mock Email Sent");
    return { ok: true, skipped: true };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      logger.error({ errorData }, "Resend API failed");
      return { ok: false, error: errorData };
    }

    const data = await response.json();
    return { ok: true, data };
  } catch (err) {
    logger.error({ err }, "Resend API exception");
    return { ok: false, error: err };
  }
}
