import { useCallback, useEffect, useRef, useState } from 'react';
import Button from './ui/Button';
import logo from '../assets/icons/logo-horizontal-primary.svg';
import { APPOINTMENT_WHATSAPP_TEXT } from '../data/contact';
import { MAIN_NAV_LINKS, NAV_LINKS } from '../data/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const mobileNavRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMobile = useCallback((restoreFocus = true) => {
    setIsMobileOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => toggleRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 861px)');
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMobileOpen(false);
    };

    desktopQuery.addEventListener('change', closeOnDesktop);
    return () => desktopQuery.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!isMobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    const inertTargets = Array.from(
      document.querySelectorAll<HTMLElement>('main, footer, .whatsapp-float'),
    ).map((element) => ({ element, wasInert: element.inert }));
    const focusFrame = window.requestAnimationFrame(() => {
      mobileNavRef.current?.querySelector<HTMLElement>('a[href], button')?.focus();
    });

    document.body.style.overflow = 'hidden';
    inertTargets.forEach(({ element }) => {
      element.inert = true;
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMobile();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = [
        toggleRef.current,
        ...Array.from(
          mobileNavRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
        ),
      ].filter((element): element is HTMLElement => element !== null);

      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      inertTargets.forEach(({ element, wasInert }) => {
        element.inert = wasInert;
      });
    };
  }, [closeMobile, isMobileOpen]);

  return (
    <>
      <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`} id="site-header">
        <div className="header-inner">
          <a href="#topo" className="brand" aria-label="Mayra Martins Neuropediatria — início">
            <img src={logo} alt="Mayra Martins Neuropediatria" className="brand-logo" />
          </a>

          <nav className="main-nav" aria-label="Navegação principal">
            <ul>
              {MAIN_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <Button variant="primary" whatsappText={APPOINTMENT_WHATSAPP_TEXT} className="header-cta">
              Agendar consulta
            </Button>
            <button
              ref={toggleRef}
              className="nav-toggle"
              aria-label={isMobileOpen ? 'Fechar menu' : 'Abrir menu'}
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

      <nav
        ref={mobileNavRef}
        className={`mobile-nav${isMobileOpen ? ' is-open' : ''}`}
        id="mobile-nav"
        aria-label="Navegação móvel"
        hidden={!isMobileOpen}
      >
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => closeMobile()}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <Button variant="primary" whatsappText={APPOINTMENT_WHATSAPP_TEXT}>
          Agendar consulta
        </Button>
      </nav>
    </>
  );
}
