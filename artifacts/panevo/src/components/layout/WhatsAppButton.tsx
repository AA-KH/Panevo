import { useLocation } from "wouter";
import { track } from "@/lib/analytics";
import { MessageCircle } from "lucide-react"; // Fallback icon

export function WhatsAppButton() {
  const [location] = useLocation();

  if (location === "/subscribe") return null;

  const handleClick = () => {
    track("whatsapp_click", { source_page: location });
  };

  return (
    <a
      href="https://wa.me/918975016500?text=Hi%20PANEVO%20team,%20I%20have%20a%20question%20about..."
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
