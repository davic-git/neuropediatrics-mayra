import CTA from './CTA';
import PhotoSlot from '../components/ui/PhotoSlot';
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
      <div className="container">
        <div ref={head.ref} className={`contato-head ${head.className}`}>
          <h2>Cada criança possui um caminho único de desenvolvimento.</h2>
          <CTA
            text="Se você tem dúvidas sobre o desenvolvimento do seu filho, estamos prontos para acolher sua família e oferecer uma avaliação individualizada."
            buttonLabel="Agendar consulta"
            whatsappText="Olá! Gostaria de agendar uma consulta com a Dra. Mayra Martins."
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
                  <a href="tel:+5524999459027">(24) 99945-9027</a>
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
                  <span className="contato-value">Segunda a Sábado de 8h às 18h</span>
                </div>
              </li>
              <li>
                <span className="contato-icon" style={{ backgroundImage: `url(${Mail})` }}></span>
                <div>
                  <span className="contato-label">Email</span>
                  <a href="mailto:dra.mayra_martins@gmail.com">dra.mayra_martins@gmail.com</a>
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
      </div>
    </section>
  );
}
