import Container from './ui/Container';
import logo from '../assets/icons/logo-horizontal-reversed.svg';
import { CONTACT } from '../data/contact';
import { NAV_LINKS } from '../data/navigation';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Container className="footer-grid">
        <div className="footer-brand">
          <img src={logo} alt="Mayra Martins Neuropediatria" className="footer-logo" />
          <p>
            Acompanhamento neuropediátrico humanizado, com ciência e acolhimento em cada etapa do
            desenvolvimento do seu filho.
          </p>
        </div>

        <div className="footer-links">
          <h4>Navegação</h4>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contato</h4>
          <ul>
            <li>
              <a href={CONTACT.phone.href}>{CONTACT.phone.label}</a>
            </li>
            <li>
              <a href={CONTACT.email.href}>{CONTACT.email.label}</a>
            </li>
            <li>{CONTACT.hours}</li>
          </ul>
        </div>
      </Container>

      <div className="footer-bottom">
        <Container className="footer-bottom-inner">
          <span>© {year} Mayra Martins Neuropediatria. Todos os direitos reservados.</span>
        </Container>
      </div>
    </footer>
  );
}
