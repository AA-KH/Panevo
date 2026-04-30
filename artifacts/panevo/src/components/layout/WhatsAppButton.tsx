import { useLocation } from "wouter";
import { track } from "@/lib/analytics";
import { MessageCircle } from "lucide-react";
import { BRAND } from "@/config/brand";

export function WhatsAppButton() {
  const [location] = useLocation();

  if (location === "/subscribe" || location === "/subscribe/thank-you") return null;

  const handleClick = () => {
    track("whatsapp_click", { source_page: location });
  };

  return (
    <a
      href={BRAND.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="fixed right-4 md:right-8 bg-[#25D366] text-white rounded-full hover:scale-110 transition-transform active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] flex items-center justify-center"
      style={{
        bottom: "calc(56px + 1rem)",
        width: 56,
        height: 56,
        zIndex: 99,
        boxShadow: "var(--shadow-hover)",
      }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
