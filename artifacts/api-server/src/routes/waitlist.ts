import { Router, type IRouter } from "express";
import { AddToWaitlistBody } from "@workspace/api-zod";
import { makeRateLimiter } from "../lib/rateLimit";
import { addToList } from "../lib/klaviyo";

const router: IRouter = Router();

const rateLimiter = makeRateLimiter(60000, 1);

router.post("/waitlist", rateLimiter, async (req, res): Promise<void> => {
  const parsed = AddToWaitlistBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: parsed.error.message });
    return;
  }

  const { email, city, source } = parsed.data;
  const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) {
        req.log.error({ status: response.status }, "Waitlist webhook failed");
      }
    } catch (err) {
      req.log.error({ err }, "Waitlist webhook exception");
    }
  } else {
    req.log.warn("WAITLIST_WEBHOOK_URL not set. Skipping webhook.");
  }

  // Always try to add to Klaviyo if key set
  const listId = process.env.KLAVIYO_LIST_ID_WAITLIST;
  if (listId) {
    await addToList(email, listId, { city, source });
  } else {
    req.log.warn("KLAVIYO_LIST_ID_WAITLIST not set. Skipping Klaviyo add.");
  }

  res.json({ ok: true });
});

export default router;
