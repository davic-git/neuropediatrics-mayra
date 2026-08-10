import CTA from '../components/CTA';
import Container from '../components/ui/Container';
import IconBadge from '../components/ui/IconBadge';
import { APPOINTMENT_WHATSAPP_TEXT, CONTACT } from '../data/contact';
import { useReveal } from '../hooks/useReveal';
import { ANALYTICS_EVENTS } from '../utils/analytics-events';
import {
  Phone,
  MapPin,
  Clock,
  Mail
}  from "lucide-react";

export default function Contact() {
  const [headRef, headRevealClass] = useReveal<HTMLDivElement>();
  const [gridRef, gridRevealClass] = useReveal<HTMLDivElement>();

  return (
    <section className="section contato" id="contato">
      <Container>
        <div ref={headRef} className={`contato-head ${headRevealClass}`}>
          <h2>Cada criança possui um caminho único de desenvolvimento.</h2>
          <CTA
            text="Se você tem dúvidas sobre o desenvolvimento do seu filho, estamos prontos para acolher sua família e oferecer uma avaliação individualizada."
            buttonLabel="Agendar consulta"
            whatsappText={APPOINTMENT_WHATSAPP_TEXT}
            analyticsEvent={ANALYTICS_EVENTS.APPOINTMENT}
          />
        </div>

        <div ref={gridRef} className={`contato-grid ${gridRevealClass}`}>
          <div className="contato-card">
            <h3>Entre em contato</h3>
            <ul className="contato-list">
              <li>
                <IconBadge icon={Phone} className="contato-icon" />
                <div>
                  <span className="contato-label">Telefone</span>
                  <a
                    href={CONTACT.phone.href}
                    data-analytics-event={ANALYTICS_EVENTS.PHONE}
                  >
                    {CONTACT.phone.label}
                  </a>
                </div>
              </li>
              <li>
                <IconBadge icon={MapPin} className="contato-icon" />
                <div>
                  <span className="contato-label">Endereço</span>
                  <span className="contato-value" data-placeholder="true">
                    {CONTACT.address.label}
                  </span>
                </div>
              </li>
              <li>
                <IconBadge icon={Clock} className="contato-icon" />
                <div>
                  <span className="contato-label">Horário</span>
                  <span className="contato-value">{CONTACT.hours}</span>
                </div>
              </li>
              <li>
                <IconBadge icon={Mail} className="contato-icon" />
                <div>
                  <span className="contato-label">Email</span>
                  <a
                    href={CONTACT.email.href}
                    data-analytics-event={ANALYTICS_EVENTS.EMAIL}
                  >
                    {CONTACT.email.label}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
