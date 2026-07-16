import Container from './ui/Container';
import logo from '../assets/icons/logo-horizontal-reversed.svg';

const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#como-agimos', label: 'Como agimos' },
  { href: '#condicoes', label: 'Condições' },
  { href: '#para-familias', label: 'Para famílias' },
  { href: '#faq', label: 'Perguntas frequentes' },
  { href: '#contato', label: 'Contato' },
];

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
              <a href="tel:+5524999459027">(24) 99945-9027</a>
            </li>
            <li>
              <a href="mailto:dra.mayra_martins@gmail.com">dra.mayra_martins@gmail.com</a>
            </li>
            <li>Segunda a Sábado de 8h às 18h</li>
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
