import { Router, type IRouter } from "express";
import { SendTradeEnquiryBody } from "@workspace/api-zod";
import { sendEmail } from "../lib/email";

const router: IRouter = Router();

router.post("/trade-enquiry", async (req, res): Promise<void> => {
  const parsed = SendTradeEnquiryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: parsed.error.message });
    return;
  }

  const { name, businessName, city, type, monthlyVolume, message } = parsed.data;

  const subject = `[PANEVO] Trade enquiry from ${businessName} (${city})`;
  const text = `
Name: ${name}
Business Name: ${businessName}
City: ${city}
Type: ${type}
Monthly Volume: ${monthlyVolume || "Not specified"}

Message:
${message}
  `.trim();

  await sendEmail({
    to: "trade@panevo.in",
    subject,
    text,
  });

  res.json({ ok: true });
});

export default router;
