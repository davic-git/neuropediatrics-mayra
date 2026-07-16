import Badge from '../components/ui/Badge';
import PhotoSlot from '../components/ui/PhotoSlot';
import { useReveal } from '../hooks/useReveal';
import {
  Puzzle,
  Brain,
  Sprout,
  MessageCircle,
  Zap,
  Moon
}  from "lucide-react";

const CONDITIONS = [
  {
    icon: Puzzle,
    title: 'Transtorno do Espectro Autista',
    text: 'Avaliação dos sinais do desenvolvimento social, comunicação e comportamento para orientação individualizada.',
  },
  {
    icon: Brain,
    title: 'TDAH',
    text: 'Investigação de dificuldades de atenção, impulsividade e hiperatividade em diferentes fases da infância.',
  },
  {
    icon: Sprout,
    title: 'Atraso no Desenvolvimento',
    text: 'Avaliação do desenvolvimento motor, cognitivo, da linguagem e das habilidades sociais.',
  },
  {
    icon: MessageCircle,
    title: 'Atraso na Fala e Linguagem',
    text: 'Identificação das possíveis causas e definição do melhor acompanhamento para cada criança.',
  },
  {
    icon: Zap,
    title: 'Epilepsia',
    text: 'Diagnóstico, acompanhamento e controle de crises epilépticas na infância.',
  },
  {
    icon: Moon,
    title: 'Distúrbios do Sono',
    text: 'Investigação de alterações do sono que podem impactar o desenvolvimento infantil.',
  },
];

export default function Conditions() {
  const side = useReveal<HTMLDivElement>();
  const cards = useReveal<HTMLDivElement>();

  return (
    <section className="section condicoes" id="condicoes">
      <div className="condicoes-pattern" aria-hidden="true"></div>
      <div className="container condicoes-grid">
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
      </div>
    </section>
  );
}
