import { buildWhatsAppLink } from '../utils/whatsapp';
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsapp() {
  return (
    <a
      href={buildWhatsAppLink('Olá! Gostaria de falar com a Dra. Mayra Martins.')}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float btn-whatsapp"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={26} />
      <span className="visually-hidden">Abre em nova aba</span>
    </a>
  );
}
