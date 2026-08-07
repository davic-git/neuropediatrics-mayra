import CTA from '../components/CTA';
import Container from '../components/ui/Container';
import IconBadge from '../components/ui/IconBadge';
import PhotoSlot from '../components/ui/PhotoSlot';
import { APPOINTMENT_WHATSAPP_TEXT, CONTACT } from '../data/contact';
import { useReveal } from '../hooks/useReveal';
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
          />
        </div>

        <div ref={gridRef} className={`contato-grid ${gridRevealClass}`}>
          <PhotoSlot
            className="contato-photo"
            src="/images/foto-consultorio-1.jpg"
            alt="Consultório da Dra. Mayra Martins"
            label="foto-consultorio-1.jpg"
            width={1000}
            height={700}
          />

          <div className="contato-card">
            <h3>Entre em contato</h3>
            <ul className="contato-list">
              <li>
                <IconBadge icon={Phone} className="contato-icon" />
                <div>
                  <span className="contato-label">Telefone</span>
                  <a href={CONTACT.phone.href}>{CONTACT.phone.label}</a>
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
                  <a href={CONTACT.email.href}>{CONTACT.email.label}</a>
                </div>
              </li>
            </ul>
          </div>

          <PhotoSlot
            className="contato-photo"
            src="/images/foto-consultorio-2.jpg"
            alt="Recepção do consultório da Dra. Mayra Martins"
            label="foto-consultorio-2.jpg"
            width={1000}
            height={700}
          />
        </div>
      </Container>
    </section>
  );
}
