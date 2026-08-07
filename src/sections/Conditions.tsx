import Badge from '../components/ui/Badge';
import Container from '../components/ui/Container';
import PhotoSlot from '../components/ui/PhotoSlot';
import { CONDITIONS } from '../data/conditions';
import { useReveal } from '../hooks/useReveal';

export default function Conditions() {
  const side = useReveal<HTMLDivElement>();
  const cards = useReveal<HTMLDivElement>();

  return (
    <section className="section condicoes" id="condicoes">
      <div className="condicoes-pattern" aria-hidden="true"></div>
      <Container className="condicoes-grid">
        <div ref={side.ref} className={`condicoes-side ${side.className}`}>
          <Badge>Condições atendidas</Badge>
          <h2>Se sua criança tiver</h2>
          <p className="condicoes-intro">
            Acompanhamento especializado para diferentes necessidades do desenvolvimento infantil.
          </p>

          <div className="blobs-grid">
            <div className="blob blob-blue" aria-hidden="true"></div>
            <div className="blob blob-yellow" aria-hidden="true"></div>
            <div className="blob blob-red" aria-hidden="true"></div>
            <PhotoSlot
              className="blob blob-green"
              src="/images/foto-pacientes.jpg"
              alt="Crianças acompanhadas pela Dra. Mayra Martins"
              label="foto-pacientes.jpg"
              caption="Foto de pacientes"
            />
          </div>
        </div>

        <div ref={cards.ref} className={`conditions-cards ${cards.className}`}>
          {CONDITIONS.map((condition) => (
            <div className="condition-card" key={condition.title}>
              <span className="cond-icon" style={{ backgroundImage: `url(${condition.icon})` }}></span>
              <h3>{condition.title}</h3>
              <p>{condition.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
