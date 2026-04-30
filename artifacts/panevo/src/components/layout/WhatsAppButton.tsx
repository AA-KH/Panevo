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
      className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
