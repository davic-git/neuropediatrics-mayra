import { buildWhatsAppLink } from '../utils/whatsapp';
import { ANALYTICS_EVENTS } from '../utils/analytics-events';
import whatsappIcon from '../assets/icons/whatsapp.svg';

export default function FloatingWhatsapp() {
  return (
    <a
      href={buildWhatsAppLink('Olá! Gostaria de falar com a Dra. Mayra Martins.')}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float btn-whatsapp"
      aria-label="Falar com a Dra. Mayra pelo WhatsApp (abre em nova aba)"
      data-analytics-event={ANALYTICS_EVENTS.WHATSAPP}
    >
      <img src={whatsappIcon} alt="" aria-hidden="true" />
    </a>
  );
}
