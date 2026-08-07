import { buildWhatsAppLink } from '../utils/whatsapp';
import whatsappIcon from '../assets/icons/whatsapp.svg';

export default function FloatingWhatsapp() {
  return (
    <a
      href={buildWhatsAppLink('Olá! Gostaria de falar com a Dra. Mayra Martins.')}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float btn-whatsapp"
      aria-label="Falar no WhatsApp"
    >
      <img src={whatsappIcon} alt="" aria-hidden="true" />
      <span className="visually-hidden">Abre em nova aba</span>
    </a>
  );
}
