import { Router, type IRouter } from "express";
import { CreateSubscriptionBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/create-subscription", async (req, res): Promise<void> => {
  const parsed = CreateSubscriptionBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: parsed.error.message });
    return;
  }

  const { planId, customer } = parsed.data;
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (keyId && keySecret) {
    try {
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
      const response = await fetch("https://api.razorpay.com/v1/subscriptions", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan_id: planId,
          total_count: 12,
          customer_notify: 1,
          notes: {
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        req.log.error({ errorData }, "Razorpay subscription creation failed");
        res.status(500).json({ ok: false, error: "Payment gateway error" });
        return;
      }

      const data = (await response.json()) as { id: string };
      res.json({
        subscriptionId: data.id,
        razorpayKeyId: keyId,
        customer: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
        },
      });
      return;
    } catch (err) {
      req.log.error({ err }, "Razorpay subscription creation exception");
      res.status(500).json({ ok: false, error: "Internal server error" });
      return;
    }
  } else {
    req.log.warn("RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET not set. Returning mock subscription.");
    res.json({
      subscriptionId: `sub_mock_${Date.now()}`,
      razorpayKeyId: "rzp_test_placeholder",
      mock: true,
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      },
    });
  }
});

export default router;
