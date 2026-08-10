import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Badge from '../components/ui/Badge';
import IconBadge from '../components/ui/IconBadge';
import { SERVICE_STEPS } from '../data/services';
import { useMediaQuery, useReducedMotion } from '../hooks/useMediaQuery';
import { useReveal } from '../hooks/useReveal';

export default function Services() {
  const [headRef, headRevealClass] = useReveal<HTMLDivElement>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const showsTwoCards = useMediaQuery('(min-width: 992px)');
  const reducedMotion = useReducedMotion();
  const cardCount = SERVICE_STEPS.length;
  const visibleCount = showsTwoCards ? 2 : 1;
  const lastIndex = cardCount - visibleCount;
  const activeIndex = Math.min(currentIndex, lastIndex);

  const moveTo = (index: number, behavior: ScrollBehavior = reducedMotion ? 'auto' : 'smooth') => {
    const nextIndex = Math.min(Math.max(index, 0), lastIndex);
    const firstCardOffset = cardRefs.current[0]?.offsetLeft ?? 0;
    setCurrentIndex(nextIndex);
    viewportRef.current?.scrollTo?.({
      left: (cardRefs.current[nextIndex]?.offsetLeft ?? firstCardOffset) - firstCardOffset,
      behavior,
    });
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    const card = cardRefs.current[activeIndex];
    const firstCardOffset = cardRefs.current[0]?.offsetLeft ?? 0;
    viewport?.scrollTo?.({ left: (card?.offsetLeft ?? firstCardOffset) - firstCardOffset, behavior: 'auto' });
  }, [activeIndex, showsTwoCards]);

  const rangeEnd = Math.min(activeIndex + visibleCount, cardCount);

  return (
    <section className="how-section" id="como-agimos">
      <div className="container how-stage">
        <div ref={headRef} className={`how-head ${headRevealClass}`}>
          <Badge onDark>Como atuamos</Badge>
          <h2>Como podemos ajudar?</h2>
          <p>
            Um passo a passo pensado para acolher sua família com cuidado, clareza e ciência em
            cada etapa.
          </p>
        </div>

        <div
          className="how-carousel-viewport"
          ref={viewportRef}
          role="region"
          aria-roledescription="carrossel"
          aria-label="Etapas do atendimento"
        >
          <div className="how-cards">
            {SERVICE_STEPS.map((step, index) => (
              <article
                className="how-card"
                key={step.num}
                aria-label={`${index + 1} de ${cardCount}`}
                ref={(node: HTMLElement | null) => {
                  cardRefs.current[index] = node;
                }}
              >
                <span className="how-card-num">{step.num}</span>
                <IconBadge icon={step.icon} className="how-card-icon" />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="how-controls">
          <button
            type="button"
            className="how-control"
            aria-label="Etapa anterior"
            disabled={activeIndex === 0}
            onClick={() => moveTo(activeIndex - 1)}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <span className="how-status" aria-live="polite">
            {showsTwoCards ? `${activeIndex + 1}–${rangeEnd}` : activeIndex + 1} de {cardCount}
          </span>
          <button
            type="button"
            className="how-control"
            aria-label="Próxima etapa"
            disabled={activeIndex === lastIndex}
            onClick={() => moveTo(activeIndex + 1)}
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
