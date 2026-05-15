import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";

export function WaitlistPopup({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "order-waitlist" }),
      });
      if (!res.ok) throw new Error("Failed to join waitlist");
      toast.success("Thanks! We'll let you know when we're live.");
      setEmail("");
      setIsOpen(false);
    } catch (err) {
      toast.error("Failed to join waitlist. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join the Waitlist</DialogTitle>
          <DialogDescription>
            We're launching soon! Enter your email to get early access and exclusive updates.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleWaitlistSubmit} className="flex flex-col gap-4 mt-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 border text-foreground px-4 py-3 focus:outline-none focus:border-primary rounded-md bg-background"
          />
          <button
            disabled={isSubmitting}
            type="submit"
            className="cta-primary bg-primary text-primary-foreground px-6 py-3 font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 notch-br rounded"
          >
            {isSubmitting ? "Submitting..." : "Join Waitlist"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
