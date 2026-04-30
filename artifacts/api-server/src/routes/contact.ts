import { Router, type IRouter } from "express";
import { SendContactFormBody } from "@workspace/api-zod";
import { sendEmail } from "../lib/email";

const router: IRouter = Router();

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SendContactFormBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: parsed.error.message });
    return;
  }

  const { name, email, phone, subject: subjectKey, message } = parsed.data;

  let to = "info@panevo.in";
  let subjectLabel: string = subjectKey;

  switch (subjectKey) {
    case "trade":
      to = "trade@panevo.in";
      subjectLabel = "Trade Enquiry";
      break;
    case "press":
      to = "harviinder@panevo.in";
      subjectLabel = "Press Enquiry";
      break;
    case "investor":
      to = "harviinder@panevo.in";
      subjectLabel = "Investor Enquiry";
      break;
    case "careers":
      subjectLabel = "Careers Enquiry";
      break;
    default:
      subjectLabel = subjectKey.charAt(0).toUpperCase() + subjectKey.slice(1);
  }

  const subject = `[PANEVO Contact] ${subjectLabel}: from ${name}`;
  const text = `
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Subject: ${subjectLabel}

Message:
${message}
  `.trim();

  await sendEmail({
    to,
    subject,
    text,
  });

  res.json({ ok: true });
});

export default router;
