import { Router, type IRouter } from "express";
import crypto from "crypto";
import { trackEvent } from "../lib/klaviyo";

const router: IRouter = Router();

router.post("/razorpay-webhook", async (req, res): Promise<void> => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.get("x-razorpay-signature");

  // req.body should be the raw buffer/string because of the middleware in app.ts or where it's mounted
  const rawBody = req.body;

  if (secret && signature) {
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    if (signature !== expectedSignature) {
      req.log.warn({ signature, expectedSignature }, "Invalid Razorpay signature");
      // Even with invalid signature, some recommend returning 200 to stop retries, 
      // but 400 is safer for debugging if you know it's definitely not from them.
      // Spec says "return 200 always after verification (even if event is unhandled)".
      // It implies we should only proceed if verification passes.
      res.status(400).json({ ok: false, error: "Invalid signature" });
      return;
    }
  } else if (!secret) {
    req.log.warn("RAZORPAY_WEBHOOK_SECRET not set. Skipping signature verification (dev mode).");
  } else if (!signature) {
    req.log.warn("x-razorpay-signature header missing");
    res.status(400).json({ ok: false, error: "Missing signature" });
    return;
  }

  // Parse body if it was raw
  let body: any;
  try {
    body = typeof rawBody === "string" ? JSON.parse(rawBody) : JSON.parse(rawBody.toString());
  } catch (err) {
    req.log.error({ err }, "Failed to parse Razorpay webhook body");
    res.json({ ok: true }); // Still return 200 to acknowledge
    return;
  }

  const event = body.event;
  const payload = body.payload;

  req.log.info({ event }, "Razorpay webhook received");

  if (event === "subscription.charged" || event === "subscription.activated") {
    req.log.info({ subscriptionId: payload?.subscription?.entity?.id }, "subscriber active");
    
    const email = payload?.subscription?.entity?.notes?.email;
    const listId = process.env.KLAVIYO_LIST_ID_SUBSCRIBERS;
    
    if (email && listId) {
      await trackEvent(email, "Subscription Active", {
        subscription_id: payload?.subscription?.entity?.id,
        plan_id: payload?.subscription?.entity?.plan_id,
        event_type: event
      });
    }
  } else if (event === "subscription.cancelled") {
    req.log.info({ subscriptionId: payload?.subscription?.entity?.id }, "subscriber cancelled");
  }

  res.json({ ok: true });
});

export default router;
