import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
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
  const dragRef = useRef({ pointerId: -1, startX: 0, startScrollLeft: 0 });
  const showsTwoCards = useMediaQuery('(min-width: 992px)');
  const reducedMotion = useReducedMotion();
  const cardCount = SERVICE_STEPS.length;
  const visibleCount = showsTwoCards ? 2 : 1;
  const previousVisibleCountRef = useRef(visibleCount);
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

  const getNearestIndex = () => {
    const viewport = viewportRef.current;
    const firstCardOffset = cardRefs.current[0]?.offsetLeft ?? 0;
    if (!viewport) return activeIndex;

    return cardRefs.current.reduce((nearestIndex, card, index) => {
      if (!card || index > lastIndex) return nearestIndex;
      const cardPosition = card.offsetLeft - firstCardOffset;
      const nearestCard = cardRefs.current[nearestIndex];
      const nearestPosition = (nearestCard?.offsetLeft ?? firstCardOffset) - firstCardOffset;
      return Math.abs(cardPosition - viewport.scrollLeft) <
        Math.abs(nearestPosition - viewport.scrollLeft)
        ? index
        : nearestIndex;
    }, 0);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch' || event.button !== 0) return;

    const viewport = viewportRef.current;
    if (!viewport) return;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: viewport.scrollLeft,
    };
    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add('is-dragging');
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport || dragRef.current.pointerId !== event.pointerId) return;
    viewport.scrollLeft = dragRef.current.startScrollLeft + dragRef.current.startX - event.clientX;
  };

  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport || dragRef.current.pointerId !== event.pointerId) return;

    dragRef.current.pointerId = -1;
    viewport.classList.remove('is-dragging');
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    moveTo(getNearestIndex());
  };

  useEffect(() => {
    if (previousVisibleCountRef.current === visibleCount) return;
    previousVisibleCountRef.current = visibleCount;

    const viewport = viewportRef.current;
    const card = cardRefs.current[activeIndex];
    const firstCardOffset = cardRefs.current[0]?.offsetLeft ?? 0;
    viewport?.scrollTo?.({ left: (card?.offsetLeft ?? firstCardOffset) - firstCardOffset, behavior: 'auto' });
  }, [activeIndex, visibleCount]);

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
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onScroll={() => setCurrentIndex(getNearestIndex())}
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
