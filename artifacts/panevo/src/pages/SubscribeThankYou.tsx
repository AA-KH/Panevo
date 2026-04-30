import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

export default function SubscribeThankYou() {
  useEffect(() => {
    track("subscription_payment_success", {});
  }, []);

  return (
    <div className="w-full bg-background min-h-screen flex items-center justify-center py-24">
      <SEO title="You're In" description="Your PANEVO subscription is confirmed." />
      <div className="container px-4 max-w-lg text-center">
        <div className="bg-card border border-primary p-12 rounded-xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">You're In.</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Your PANEVO subscription is confirmed. We've sent a receipt and account details to your email.
          </p>
          <div className="bg-muted p-6 rounded-lg mb-8 text-left">
            <h3 className="font-bold text-foreground mb-2">What happens next?</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>1. Your first box will be dispatched within 24 hours.</li>
              <li>2. You can manage flavours and frequency from your account.</li>
              <li>3. Expect tracking updates via WhatsApp.</li>
            </ul>
          </div>
          <Link href="/" className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg notch-br hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2 w-full">
            Back to Home <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
