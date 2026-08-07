import { useEffect, useRef } from 'react';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import PhotoSlot from '../components/ui/PhotoSlot';
import { useMediaQuery, useReducedMotion } from '../hooks/useMediaQuery';
import { useReveal } from '../hooks/useReveal';
import heroPhoto from '../assets/images/hero/foto-mayra-neuropediatra.jpeg';

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const [copyRef, copyRevealClass] = useReveal<HTMLDivElement>();
  const [visualRef, visualRevealClass] = useReveal<HTMLDivElement>(parallaxRef);
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = parallaxRef.current;
    if (!element) return;

    if (!isDesktop || reducedMotion) {
      element.style.transform = '';
      return;
    }

    let animationFrame: number | null = null;

    const onScroll = () => {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(() => {
        const offset = Math.min(window.scrollY * 0.08, 40);
        element.style.transform = `translateY(${offset}px)`;
        animationFrame = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      element.style.transform = '';
    };
  }, [isDesktop, reducedMotion]);

  return (
    <section className="section hero" id="inicio">
      <Container className="hero-grid">
        <div ref={copyRef} className={`hero-copy ${copyRevealClass}`}>
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

        <div ref={visualRef} className={`hero-visual ${visualRevealClass}`}>
          <div className="hero-blob hero-blob-sage" aria-hidden="true"></div>
          <div className="hero-blob hero-blob-gold" aria-hidden="true"></div>
          <div className="hero-blob hero-blob-sky" aria-hidden="true"></div>
          <PhotoSlot
            className="hero-photo"
            src={heroPhoto}
            alt="Dra. Mayra Martins em seu consultório"
            label="foto-mayra-neuropediatra.jpeg"
            width={853}
            height={1280}
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </Container>
    </section>
  );
}
