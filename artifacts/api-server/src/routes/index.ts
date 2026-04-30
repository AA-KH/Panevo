import express, { Router, type IRouter } from "express";
import healthRouter from "./health";
import waitlistRouter from "./waitlist";
import tradeRouter from "./trade";
import contactRouter from "./contact";
import subscriptionRouter from "./subscription";
import razorpayWebhookRouter from "./razorpayWebhook";
import seoRouter from "./seo";

const router: IRouter = Router();

router.use(healthRouter);
router.use(waitlistRouter);
router.use(tradeRouter);
router.use(contactRouter);
router.use(subscriptionRouter);

// Razorpay webhook needs raw body for signature verification.
// We mount it with express.raw middleware before the global express.json() would consume it.
// However, the global middlewares are applied in app.ts.
// To handle this, we can either reorder in app.ts or use a specific mount here if possible.
// Since app.ts uses express.json() globally, we should ideally put this before it.
// But we are editing routes/index.ts which is mounted AFTER global middlewares.
router.use("/razorpay-webhook", express.raw({ type: "application/json" }), razorpayWebhookRouter);

router.use(seoRouter);

export default router;
