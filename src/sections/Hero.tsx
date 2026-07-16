import { useEffect, useRef } from 'react';
import Button from '../components/ui/Button';
import PhotoSlot from '../components/ui/PhotoSlot';
import { useReveal } from '../hooks/useReveal';

export default function Hero() {
  const copy = useReveal<HTMLDivElement>();
  const visual = useReveal<HTMLDivElement>();
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.matchMedia('(min-width: 861px)').matches) return;

    const onScroll = () => {
      const el = parallaxRef.current;
      if (!el) return;
      const offset = Math.min(window.scrollY * 0.08, 40);
      el.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="section hero" id="inicio">
      <div className="container hero-grid">
        <div ref={copy.ref} className={`hero-copy ${copy.className}`}>
          <h1 className="hero-title">
            Cuidado especializado para o desenvolvimento neurológico do <span>seu filho</span>
          </h1>
          <p className="hero-text">
            Acolhimento, conhecimento avançado.
            <br />
            Apoio em <strong>cada etapa.</strong>
          </p>
          <div className="hero-actions">
            <Button variant="primary" href="#sobre">
              Saiba mais
            </Button>
          </div>
        </div>

        <div
          ref={(node) => {
            visual.ref.current = node;
            parallaxRef.current = node;
          }}
          className={`hero-visual ${visual.className}`}
        >
          <div className="hero-blob hero-blob-sage" aria-hidden="true"></div>
          <div className="hero-blob hero-blob-gold" aria-hidden="true"></div>
          <div className="hero-blob hero-blob-sky" aria-hidden="true"></div>
          <PhotoSlot
            className="hero-photo"
            src="/images/hero-consulta.jpg"
            alt="Dra. Mayra Martins durante consulta com criança e mãe"
            label="hero-consulta.jpg"
          />
        </div>
      </div>
    </section>
  );
}
