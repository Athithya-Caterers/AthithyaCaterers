// Floating WhatsApp CTA, visible on every page (mobile-friendly tap target).
import { MessageCircle } from "lucide-react";

const PHONE = "6363520417"; // E.164 without "+"

export function FloatingWhatsapp() {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(
    "Hi Athithya Caterers, I would like to enquire about catering for my event."
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Athithya Caterers on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.6)] transition-transform hover:scale-110"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
