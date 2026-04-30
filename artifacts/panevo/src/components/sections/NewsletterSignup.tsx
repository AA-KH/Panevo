import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { track } from "@/lib/analytics";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error("Please enter a valid email.");
      return;
    }
    setState("loading");
    track("waitlist_signup", { email: trimmed, source: "footer_newsletter" });
    // Simulate request — Phase 2 will wire to MSG91 / Mailchimp endpoint
    await new Promise((r) => setTimeout(r, 600));
    setState("done");
    toast.success("Welcome aboard — recipes & news coming your way.");
  };

  return (
    <div>
      <h4
        className="mb-3 text-lg uppercase"
        style={{ fontFamily: "var(--app-font-display)", letterSpacing: "0.02em" }}
      >
        Stay in the kitchen
      </h4>
      <p className="text-sm opacity-80 mb-4 leading-relaxed">
        Recipes, new flavours, and quiet drops. No spam. One email a fortnight, max.
      </p>

      <AnimatePresence mode="wait">
        {state !== "done" ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-2"
          >
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-foreground/60 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                disabled={state === "loading"}
                className="w-full bg-white/10 border border-white/20 text-secondary-foreground placeholder:text-secondary-foreground/50 pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:bg-white/15 transition-all disabled:opacity-60"
                style={{ borderRadius: 6 }}
              />
            </div>
            <button
              type="submit"
              disabled={state === "loading"}
              className="cta-primary bg-primary text-primary-foreground px-4 py-2.5 text-sm font-bold notch-br inline-flex items-center justify-center gap-2 disabled:opacity-60"
              style={{ borderRadius: 6 }}
            >
              {state === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Joining…
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white/10 border border-white/20 px-3 py-2.5 text-sm flex items-center gap-2"
            style={{ borderRadius: 6 }}
          >
            <Check className="w-4 h-4 text-primary" strokeWidth={3} />
            <span className="text-secondary-foreground">You're in. See you on Friday.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
