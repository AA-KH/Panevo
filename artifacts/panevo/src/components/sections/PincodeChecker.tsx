import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Check, X, Loader2, ArrowRight } from "lucide-react";
import { QCOM_LINKS } from "@/config/brand";
import { track } from "@/lib/analytics";
import { toast } from "sonner";

const SERVICEABLE_PREFIXES: Record<string, string> = {
  "160": "Chandigarh",
  "140": "Mohali / Zirakpur",
  "134": "Panchkula",

};

type Result =
  | { kind: "idle" }
  | { kind: "checking" }
  | { kind: "yes"; city: string }
  | { kind: "no" }
  | { kind: "notify_sent" };

export function PincodeChecker() {
  const [pincode, setPincode] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<Result>({ kind: "idle" });

  const handleCheck = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = pincode.trim();
    if (!/^\d{6}$/.test(trimmed)) {
      toast.error("Please enter a valid 6-digit pincode.");
      return;
    }
    setResult({ kind: "checking" });
    setTimeout(() => {
      const prefix = trimmed.slice(0, 3);
      const city = SERVICEABLE_PREFIXES[prefix];
      if (city) {
        setResult({ kind: "yes", city });
        track("qcom_click", { platform: "pincode_check_hit", pincode: trimmed });
      } else {
        setResult({ kind: "no" });
        track("qcom_click", { platform: "pincode_check_miss", pincode: trimmed });
      }
    }, 450);
  };

  const handleNotify = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    track("coming_soon_signup", { pincode, email: trimmed, source: "pincode_checker" });
    setResult({ kind: "notify_sent" });
    toast.success("You're on the list — we'll email when we deliver to your pincode.");
  };

  const reset = () => {
    setResult({ kind: "idle" });
    setPincode("");
    setEmail("");
  };

  return (
    <div
      className="relative bg-card border border-border overflow-hidden"
      style={{ borderRadius: 16, boxShadow: "var(--shadow-rest)" }}
    >
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-primary/10 text-primary p-2.5 rounded-full">
            <MapPin className="w-5 h-5" strokeWidth={2} />
          </div>
          <h3 className="text-2xl text-foreground">Do We Deliver to You?</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          Enter your pincode — we'll show you the fastest way to get PANEVO.
        </p>

        <AnimatePresence mode="wait" initial={false}>
          {(result.kind === "idle" || result.kind === "checking") && (
            <motion.form
              key="check"
              onSubmit={handleCheck}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="text"
                inputMode="numeric"
                pattern="\d{6}"
                maxLength={6}
                placeholder="6-digit pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                className="flex-1 bg-background border border-border px-4 py-3 text-foreground tabnums focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                style={{ borderRadius: 8 }}
                aria-label="Pincode"
                disabled={result.kind === "checking"}
              />
              <button
                type="submit"
                disabled={result.kind === "checking"}
                className="cta-primary bg-primary text-primary-foreground px-6 py-3 font-bold notch-br inline-flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ borderRadius: 8 }}
              >
                {result.kind === "checking" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Checking…
                  </>
                ) : (
                  <>
                    Check <ArrowRight className="w-4 h-4 cta-arrow" />
                  </>
                )}
              </button>
            </motion.form>
          )}

          {result.kind === "yes" && (
            <motion.div
              key="yes"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-start gap-3 bg-secondary/5 border border-secondary/20 p-4 mb-4" style={{ borderRadius: 8 }}>
                <div className="bg-secondary text-secondary-foreground rounded-full p-1.5 mt-0.5">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </div>
                <div>
                  <p className="font-bold text-foreground">Yes — we deliver to {result.city}!</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Order now and get PANEVO in ~10 minutes from one of these apps:
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(QCOM_LINKS).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      track("qcom_click", { platform, source_element: "pincode_checker" })
                    }
                    className="qcom-shimmer cta-primary bg-primary text-primary-foreground text-center py-3 font-bold text-sm capitalize notch-br"
                    style={{ borderRadius: 6 }}
                  >
                    {platform}
                  </a>
                ))}
              </div>
              <button
                type="button"
                onClick={reset}
                className="text-xs text-muted-foreground hover:text-foreground mt-3 underline-offset-2 hover:underline"
              >
                Check another pincode
              </button>
            </motion.div>
          )}

          {result.kind === "no" && (
            <motion.form
              key="no"
              onSubmit={handleNotify}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-start gap-3 bg-muted border border-border p-4 mb-4" style={{ borderRadius: 8 }}>
                <div className="bg-muted-foreground/20 text-foreground rounded-full p-1.5 mt-0.5">
                  <X className="w-3.5 h-3.5" strokeWidth={3} />
                </div>
                <div>
                  <p className="font-bold text-foreground">Not yet in your area.</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    We're growing fast. Drop your email — you'll be the first to know when we
                    deliver to {pincode}.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  style={{ borderRadius: 8 }}
                  aria-label="Email"
                />
                <button
                  type="submit"
                  className="cta-primary bg-secondary text-secondary-foreground px-6 py-3 font-bold notch-br inline-flex items-center justify-center gap-2"
                  style={{ borderRadius: 8 }}
                >
                  Notify Me <ArrowRight className="w-4 h-4 cta-arrow" />
                </button>
              </div>
              <button
                type="button"
                onClick={reset}
                className="text-xs text-muted-foreground hover:text-foreground mt-3 underline-offset-2 hover:underline"
              >
                Try a different pincode
              </button>
            </motion.form>
          )}

          {result.kind === "notify_sent" && (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-3 bg-secondary/5 border border-secondary/20 p-4"
              style={{ borderRadius: 8 }}
            >
              <div className="bg-secondary text-secondary-foreground rounded-full p-1.5">
                <Check className="w-3.5 h-3.5" strokeWidth={3} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-foreground">You're on the list!</p>
                <p className="text-sm text-muted-foreground">
                  We'll email the moment PANEVO reaches your pincode.
                </p>
              </div>
              <button
                type="button"
                onClick={reset}
                className="text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
              >
                Check another
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
