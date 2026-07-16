import { useEffect, useState } from 'react';
import Button from './ui/Button';
import logo from '../assets/icons/logo-horizontal-primary.svg';

const MAIN_LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#como-agimos', label: 'Como agimos' },
  { href: '#condicoes', label: 'Condições' },
  { href: '#para-familias', label: 'Para famílias' },
  { href: '#contato', label: 'Contato' },
];

const MOBILE_LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#como-agimos', label: 'Como agimos' },
  { href: '#condicoes', label: 'Condições' },
  { href: '#para-familias', label: 'Para famílias' },
  { href: '#faq', label: 'Perguntas frequentes' },
  { href: '#contato', label: 'Contato' },
];

const AGENDAR_TEXT = 'Olá! Gostaria de agendar uma consulta com a Dra. Mayra Martins.';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
  }, [isMobileOpen]);

  const closeMobile = () => setIsMobileOpen(false);

  return (
    <>
      <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`} id="site-header">
        <div className="header-inner">
          <a href="#topo" className="brand" aria-label="Mayra Martins Neuropediatria — início">
            <img src={logo} alt="Mayra Martins Neuropediatria" className="brand-logo" />
          </a>

          <nav className="main-nav" aria-label="Navegação principal">
            <ul>
              {MAIN_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <Button variant="primary" whatsappText={AGENDAR_TEXT} className="header-cta">
              Agendar consulta
            </Button>
            <button
              className="nav-toggle"
              aria-label="Abrir menu"
              aria-expanded={isMobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setIsMobileOpen((v) => !v)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-nav${isMobileOpen ? ' is-open' : ''}`} id="mobile-nav">
        <ul>
          {MOBILE_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={closeMobile}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <Button variant="primary" whatsappText={AGENDAR_TEXT}>
          Agendar consulta
        </Button>
      </div>
    </>
  );
}
