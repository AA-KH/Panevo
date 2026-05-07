import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { toast } from "sonner";
import { track } from "@/lib/analytics";

const STORAGE_KEY = "panevo_newsletter_dismissed";

export function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {}
    const timer = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "newsletter_popup" }),
      });
      track("waitlist_signup", { source: "newsletter_popup" });
      setDone(true);
      try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
      setTimeout(dismiss, 1800);
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[900]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={dismiss}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[901] flex items-center justify-center p-4 pointer-events-none"
          >
            <motion.div
              className="relative w-full max-w-[780px] rounded-2xl overflow-hidden shadow-2xl pointer-events-auto"
              initial={{ opacity: 0, scale: 0.93, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 24 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col sm:flex-row min-h-0">

                {/* Image panel */}
                <div
                  className="relative sm:w-[46%] h-52 sm:h-auto flex-shrink-0 overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #BF3D0B 0%, #7c2d12 60%, #1c0a00 100%)" }}
                >
                  <img
                    src="/hero-chalk.png"
                    alt="PANEVO pre-flavoured paneer"
                    className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-60"
                    draggable={false}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/70 via-transparent to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-5 left-5">
                    <span
                      className="inline-block text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full"
                      style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)" }}
                    >
                      India's First
                    </span>
                  </div>

                  {/* Bottom text on image */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <p
                      className="text-white text-2xl sm:text-3xl leading-tight"
                      style={{ fontFamily: "var(--app-font-display)", letterSpacing: "0.02em" }}
                    >
                      Flavour,<br />delivered.
                    </p>
                  </div>
                </div>

                {/* Form panel */}
                <div
                  className="flex-1 flex flex-col justify-center px-7 py-8 sm:py-10"
                  style={{ backgroundColor: "#F9F5EC" }}
                >
                  <AnimatePresence mode="wait">
                    {done ? (
                      <motion.div
                        key="done"
                        className="text-center py-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                      >
                        <div className="text-4xl mb-3">🎉</div>
                        <p
                          className="text-2xl text-foreground mb-2"
                          style={{ fontFamily: "var(--app-font-display)" }}
                        >
                          You're in!
                        </p>
                        <p className="text-muted-foreground text-sm">Watch your inbox for the good stuff.</p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-3">
                          Join the inner circle
                        </p>
                        <h2
                          className="text-2xl sm:text-3xl text-foreground leading-tight mb-3"
                          style={{ fontFamily: "var(--app-font-display)" }}
                        >
                          First bites.<br />Best deals.
                        </h2>
                        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                          New flavours, exclusive drops and zero spam. Unsubscribe any time.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="w-full border border-border bg-white text-foreground placeholder:text-muted-foreground px-4 py-3 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                          />
                          <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-primary text-white font-bold text-sm py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
                          >
                            {submitting ? "Joining…" : "Subscribe — it's free"}
                          </button>
                        </form>

                        <button
                          onClick={dismiss}
                          className="mt-4 text-xs text-muted-foreground hover:text-foreground transition w-full text-center"
                        >
                          No thanks, I'll pass
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={dismiss}
                aria-label="Close"
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors z-10"
                style={{ background: "rgba(0,0,0,0.25)", color: "#fff" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.45)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,0,0,0.25)")}
              >
                <X size={14} strokeWidth={2.5} />
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
