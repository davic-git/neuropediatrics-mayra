import Badge from '../components/ui/Badge';
import Container from '../components/ui/Container';
import IconBadge from '../components/ui/IconBadge';
import { CONDITIONS } from '../data/conditions';
import { useReveal } from '../hooks/useReveal';

export default function Conditions() {
  const [sideRef, sideRevealClass] = useReveal<HTMLDivElement>();
  const [cardsRef, cardsRevealClass] = useReveal<HTMLDivElement>();

  return (
    <section className="section condicoes" id="condicoes">
      <div className="condicoes-pattern" aria-hidden="true"></div>
      <Container className="condicoes-grid">
        <div ref={sideRef} className={`condicoes-side ${sideRevealClass}`}>
          <Badge>Condições atendidas</Badge>
          <h2>Se sua criança tiver</h2>
          <p className="condicoes-intro">
            Acompanhamento especializado para diferentes necessidades do desenvolvimento infantil.
          </p>

          <div className="blobs-grid">
            <div className="blob blob-blue" aria-hidden="true"></div>
            <div className="blob blob-yellow" aria-hidden="true"></div>
            <div className="blob blob-red" aria-hidden="true"></div>
          </div>
        </div>

        <div ref={cardsRef} className={`conditions-cards ${cardsRevealClass}`}>
          {CONDITIONS.map((condition) => (
            <div className="condition-card" key={condition.title}>
              <IconBadge icon={condition.icon} className="cond-icon" />
              <h3>{condition.title}</h3>
              <p>{condition.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
