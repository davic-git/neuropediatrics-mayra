import Badge from '../components/ui/Badge';
import Container from '../components/ui/Container';
import IconBadge from '../components/ui/IconBadge';
import PhotoSlot from '../components/ui/PhotoSlot';
import { ABOUT_CARDS } from '../data/about';
import { useReveal } from '../hooks/useReveal';
import aboutPhoto from '../assets/images/about/foto-mayra-benicio.jpeg';

export default function About() {
  const [photoRef, photoRevealClass] = useReveal<HTMLDivElement>();
  const [contentRef, contentRevealClass] = useReveal<HTMLDivElement>();

  return (
    <section className="section sobre" id="sobre">
      <Container className="sobre-grid">
        <div ref={photoRef} className={`sobre-photo-wrap ${photoRevealClass}`}>
          <PhotoSlot
            className="sobre-photo"
            src={aboutPhoto}
            alt="Dra. Mayra Martins com seu filho Benício"
            label="foto-mayra-benicio.jpeg"
            width={960}
            height={1280}
          />
          <div className="sobre-badge">
            <span className="sobre-badge-number">8+</span>
            <span className="sobre-badge-label">anos de experiência</span>
          </div>
        </div>

        <div ref={contentRef} className={`sobre-content ${contentRevealClass}`}>
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
            {ABOUT_CARDS.map((card) => (
              <div className="mini-card" key={card.title}>
                <IconBadge icon={card.icon} className="mini-icon" />
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
