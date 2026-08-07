import CTA from '../components/CTA';
import Container from '../components/ui/Container';
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
  const head = useReveal<HTMLDivElement>();
  const grid = useReveal<HTMLDivElement>();

  return (
    <section className="section contato" id="contato">
      <Container>
        <div ref={head.ref} className={`contato-head ${head.className}`}>
          <h2>Cada criança possui um caminho único de desenvolvimento.</h2>
          <CTA
            text="Se você tem dúvidas sobre o desenvolvimento do seu filho, estamos prontos para acolher sua família e oferecer uma avaliação individualizada."
            buttonLabel="Agendar consulta"
            whatsappText={APPOINTMENT_WHATSAPP_TEXT}
          />
        </div>

        <div ref={grid.ref} className={`contato-grid ${grid.className}`}>
          <PhotoSlot
            className="contato-photo"
            src="/images/foto-consultorio-1.jpg"
            alt="Consultório da Dra. Mayra Martins"
            label="foto-consultorio-1.jpg"
          />

          <div className="contato-card">
            <h3>Entre em contato</h3>
            <ul className="contato-list">
              <li>
                <span className="contato-icon" style={{ backgroundImage: `url(${Phone})` }}></span>
                <div>
                  <span className="contato-label">Telefone</span>
                  <a href={CONTACT.phone.href}>{CONTACT.phone.label}</a>
                </div>
              </li>
              <li>
                <span className="contato-icon" style={{ backgroundImage: `url(${MapPin})` }}></span>
                <div>
                  <span className="contato-label">Endereço</span>
                  <span className="contato-value" data-placeholder="true">
                    A definir — atualize com o endereço do consultório
                  </span>
                </div>
              </li>
              <li>
                <span className="contato-icon" style={{ backgroundImage: `url(${Clock})` }}></span>
                <div>
                  <span className="contato-label">Horário</span>
                  <span className="contato-value">{CONTACT.hours}</span>
                </div>
              </li>
              <li>
                <span className="contato-icon" style={{ backgroundImage: `url(${Mail})` }}></span>
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
          />
        </div>
      </Container>
    </section>
  );
}
