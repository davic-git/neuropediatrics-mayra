import Badge from '../components/ui/Badge';
import IconBadge from '../components/ui/IconBadge';
import { SERVICE_STEPS } from '../data/services';
import { useReveal } from '../hooks/useReveal';
import { usePinnedCarousel } from '../hooks/usePinnedCarousel';

export default function Services() {
  const [headRef, headRevealClass] = useReveal<HTMLDivElement>();
  const cardCount = SERVICE_STEPS.length;
  const { stickyWrapRef, itemRefs: cardRefs, indicatorRefs: dotRefs } =
    usePinnedCarousel(cardCount);

  return (
    <section className="how-section" id="como-agimos">
      <div className="how-sticky-wrap" ref={stickyWrapRef}>
        <div className="how-stage">
          <div ref={headRef} className={`container how-head ${headRevealClass}`}>
            <Badge onDark>Como atuamos</Badge>
            <h2>Como podemos ajudar?</h2>
            <p>
              Um passo a passo pensado para acolher sua família com cuidado, clareza e ciência em
              cada etapa.
            </p>
          </div>

          <div className="how-cards">
            {SERVICE_STEPS.map((step, i) => (
              <article
                className="how-card"
                key={step.num}
                data-index={i}
                ref={(node: HTMLElement | null) => {
                  cardRefs.current[i] = node;
                }}
              >
                <span className="how-card-num">{step.num}</span>
                <IconBadge icon={step.icon} className="how-card-icon" />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>

          <div className="how-progress" aria-hidden="true">
            {SERVICE_STEPS.map((step, i) => (
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
