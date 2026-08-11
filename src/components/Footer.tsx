import Container from './ui/Container';
import BrandLogo from './ui/BrandLogo';
import { CONTACT } from '../data/contact';
import { NAV_LINKS } from '../data/navigation';
import { ANALYTICS_EVENTS } from '../utils/analytics-events';
import { Stethoscope } from 'lucide-react';
import instagramIcon from '../assets/icons/instagram.svg';
import threadsIcon from '../assets/icons/threads.svg';
import facebookIcon from '../assets/icons/facebook.svg';

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/dra.mayra_martins/',
    icon: instagramIcon,
  },
  {
    name: 'Threads',
    href: 'https://www.threads.com/@dra.mayra_martins',
    icon: threadsIcon,
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/dra.maymartins/',
    icon: facebookIcon,
  },
  {
    name: 'Doctoralia',
    href: 'https://www.doctoralia.com.br/mayra-martins-6/pediatra/volta-redonda',
    icon: null,
  },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Container className="footer-grid">
        <div className="footer-brand">
          <BrandLogo placement="footer" />
          <p>
            Acompanhamento neuropediátrico humanizado, com ciência e acolhimento em cada etapa do
            desenvolvimento do seu filho.
          </p>
        </div>

        <div className="footer-links">
          <h2>Navegação</h2>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-contact">
          <h2>Contato</h2>
          <ul>
            <li>
              <a
                href={CONTACT.phone.href}
                data-analytics-event={ANALYTICS_EVENTS.PHONE}
              >
                {CONTACT.phone.label}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.email.href}
                data-analytics-event={ANALYTICS_EVENTS.EMAIL}
              >
                {CONTACT.email.label}
              </a>
            </li>
            <li>{CONTACT.hours}</li>
            {CONTACT.locations.map((location) => (
              <li key={location.id}>
                {location.name} — {location.city} - {location.region}
              </li>
            ))}
          </ul>
          <ul className="footer-socials" aria-label="Perfis profissionais e redes sociais">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.name} — abre em nova aba`}
                >
                  {social.icon ? (
                    <img src={social.icon} alt="" aria-hidden="true" />
                  ) : (
                    <Stethoscope size={19} aria-hidden="true" />
                  )}
                </a>
              </li>
            ))}
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
