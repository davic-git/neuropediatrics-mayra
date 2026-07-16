import Badge from '../components/ui/Badge';
import PhotoSlot from '../components/ui/PhotoSlot';
import { useReveal } from '../hooks/useReveal';
import {
  Puzzle,
  Brain,
  Sprout,
  MessageCircle,
}  from "lucide-react";

const CARDS = [
  {
    icon: Puzzle,
    title: 'Atendimento personalizado',
    text: 'Cada plano de cuidado é pensado para as necessidades específicas do seu filho, não um modelo padrão.',
  },
  {
    icon: Brain,
    title: 'Avaliação do desenvolvimento',
    text: 'Acompanhamento detalhado dos marcos motores, cognitivos e comportamentais em cada fase.',
  },
  {
    icon: Sprout,
    title: 'Acompanhamento contínuo',
    text: 'O cuidado não termina na consulta: seguimos ao lado da família em cada etapa do desenvolvimento.',
  },
  {
    icon: MessageCircle,
    title: 'Escuta ativa das famílias',
    text: 'Espaço para dúvidas, receios e conquistas — porque vocês também fazem parte do processo.',
  },
];

export default function About() {
  const photo = useReveal<HTMLDivElement>();
  const content = useReveal<HTMLDivElement>();

  return (
    <section className="section sobre" id="sobre">
      <div className="container sobre-grid">
        <div ref={photo.ref} className={`sobre-photo-wrap ${photo.className}`}>
          <PhotoSlot
            className="sobre-photo"
            src="/images/foto-mayra-benicio.jpg"
            alt="Dra. Mayra Martins com seu filho Benício"
            label="foto-mayra-benicio.jpg"
          />
          <div className="sobre-badge">
            <span className="sobre-badge-number">8+</span>
            <span className="sobre-badge-label">anos de experiência</span>
          </div>
        </div>

        <div ref={content.ref} className={`sobre-content ${content.className}`}>
          <Badge>Sobre a Dra. Mayra</Badge>
          <h2>Porque nos escolher?</h2>

          <blockquote className="sobre-quote">
            Sou neuropediatra e, acima de tudo, alguém que entende de perto a jornada das famílias
            atípicas. Meu filho, Benício, é neurodivergente — e essa vivência me ensinou que cada
            criança tem seu próprio tempo e sua própria forma de ser compreendida. É esse olhar que
            trago para cada consulta: técnico, atualizado e, sobretudo, humano.
            <cite>— Dra. Mayra Martins</cite>
          </blockquote>

          <div className="sobre-cards">
            {CARDS.map((card) => (
              <div className="mini-card" key={card.title}>
                <span className="mini-icon" style={{ backgroundImage: `url(${card.icon})` }}></span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
