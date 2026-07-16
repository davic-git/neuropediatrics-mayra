import { useEffect, useRef } from 'react';
import Badge from '../components/ui/Badge';
import { useReveal } from '../hooks/useReveal';
import {
  MessageCircle,
  Brain,
  Puzzle,
  Sprout,
  Clock
} from "lucide-react";

const STEPS = [
  {
    num: '01',
    icon: MessageCircle,
    title: 'Escuta acolhedora',
    text: 'Começamos ouvindo a família com atenção e sem pressa, entendendo a história e as necessidades da criança.',
  },
  {
    num: '02',
    icon: Brain,
    title: 'Avaliação especializada',
    text: 'Investigação clínica detalhada do desenvolvimento neurológico, comportamental e cognitivo.',
  },
  {
    num: '03',
    icon: Puzzle,
    title: 'Diagnóstico claro',
    text: 'Explicações objetivas sobre o que foi identificado, sem jargões e com espaço para perguntas.',
  },
  {
    num: '04',
    icon: Sprout,
    title: 'Plano de cuidado',
    text: 'Orientações práticas e um plano de acompanhamento construído em conjunto com a família.',
  },
  {
    num: '05',
    icon: Clock,
    title: 'Acompanhamento contínuo',
    text: 'Retornos regulares para ajustar o plano de cuidado conforme o desenvolvimento avança.',
  },
];

export default function Services() {
  const head = useReveal<HTMLDivElement>();
  const stickyWrapRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const cardCount = STEPS.length;

  useEffect(() => {
    const stickyWrap = stickyWrapRef.current;
    if (!stickyWrap) return;

    const setStickyHeight = () => {
      stickyWrap.style.height = `${cardCount * 100}vh`;
    };

    let ticking = false;

    const updateCarousel = () => {
      ticking = false;

      const rect = stickyWrap.getBoundingClientRect();
      const total = stickyWrap.offsetHeight - window.innerHeight;
      if (total <= 0) return;

      const progress = Math.min(Math.max(-rect.top / total, 0), 1);
      const activeFloat = progress * (cardCount - 1);
      const activeIndex = Math.round(activeFloat);

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const d = i - activeFloat;

        if (d <= -1.4 || d >= 1.4) {
          card.style.opacity = '0';
          card.style.transform = `translateX(${d > 0 ? 140 : -140}%) rotate(${d > 0 ? 12 : -12}deg)`;
          card.style.zIndex = '1';
          card.style.pointerEvents = 'none';
          return;
        }

        const absD = Math.abs(d);
        const translateX = d * 62;
        const translateY = absD * 26;
        const rotate = d * 11;
        const scale = 1 - absD * 0.12;
        const opacity = 1 - absD * 0.82;

        card.style.opacity = String(Math.max(opacity, 0));
        card.style.transform = `translateX(${translateX}%) translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`;
        card.style.zIndex = String(100 - Math.round(absD * 10));
        card.style.pointerEvents = absD < 0.5 ? 'auto' : 'none';
      });

      dotRefs.current.forEach((dot, i) => dot?.classList.toggle('is-active', i === activeIndex));
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateCarousel);
        ticking = true;
      }
    };

    setStickyHeight();
    updateCarousel();

    window.addEventListener('resize', setStickyHeight);
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      window.removeEventListener('resize', setStickyHeight);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [cardCount]);

  return (
    <section className="how-section" id="como-agimos">
      <div className="how-sticky-wrap" ref={stickyWrapRef}>
        <div className="how-stage">
          <div ref={head.ref} className={`container how-head ${head.className}`}>
            <Badge onDark>Como atuamos</Badge>
            <h2>Como podemos ajudar?</h2>
            <p>
              Um passo a passo pensado para acolher sua família com cuidado, clareza e ciência em
              cada etapa.
            </p>
          </div>

          <div className="how-cards">
            {STEPS.map((step, i) => (
              <article
                className="how-card"
                key={step.num}
                data-index={i}
                ref={(node: HTMLElement | null) => {
                  cardRefs.current[i] = node;
                }}
              >
                <span className="how-card-num">{step.num}</span>
                <span className="how-card-icon" style={{ backgroundImage: `url(${step.icon})` }}></span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>

          <div className="how-progress" aria-hidden="true">
            {STEPS.map((step, i) => (
              <span
                key={step.num}
                ref={(node) => {
                  dotRefs.current[i] = node;
                }}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
