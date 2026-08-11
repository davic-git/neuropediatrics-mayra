import Badge from '../components/ui/Badge';
import Container from '../components/ui/Container';
import IconBadge from '../components/ui/IconBadge';
import PhotoSlot from '../components/ui/PhotoSlot';
import { ABOUT_CARDS } from '../data/about';
import { useReveal } from '../hooks/useReveal';
import aboutPhoto480 from '../assets/images/about/foto-mayra-benicio-480.avif';
import aboutPhoto720 from '../assets/images/about/foto-mayra-benicio-720.avif';
import aboutPhoto960 from '../assets/images/about/foto-mayra-benicio-960.avif';

export default function About() {
  const [photoRef, photoRevealClass] = useReveal<HTMLDivElement>();
  const [contentRef, contentRevealClass] = useReveal<HTMLDivElement>();
  const [cardsRef, cardsRevealClass] = useReveal<HTMLDivElement>();

  return (
    <section className="section sobre" id="sobre">
      <Container className="sobre-grid">
        <div ref={photoRef} className={`sobre-photo-wrap ${photoRevealClass}`}>
          <PhotoSlot
            className="sobre-photo"
            src={aboutPhoto960}
            srcSet={`${aboutPhoto480} 480w, ${aboutPhoto720} 720w, ${aboutPhoto960} 960w`}
            sizes="(max-width: 860px) calc(100vw - 44px), min(44vw, 560px)"
            alt="Dra. Mayra Martins com seu filho Benício"
            label="foto-mayra-benicio.avif"
            width={960}
            height={1280}
            fetchPriority="low"
          />
          <div className="sobre-badge">
            <span className="sobre-badge-number">8+</span>
            <span className="sobre-badge-label">anos de experiência</span>
          </div>
        </div>

        <div ref={contentRef} className={`sobre-content ${contentRevealClass}`}>
          <Badge>Sobre a Dra. Mayra</Badge>
          <h2>Conheça a Dra. Mayra Martins</h2>

          <div className="sobre-story">
            <p>
              A Dra. Mayra Martins traz para sua prática uma experiência que vai além da formação
              médica. Ela é mãe neuroatípica de um menino no espectro autista, entre os níveis 1 e 2
              de suporte, e sabe de perto como é estar do outro lado: lidar com dúvidas, medos e com
              o peso que um diagnóstico pode trazer para uma família.
            </p>
            <p>
              A própria Dra. Mayra também é neuroatípica, com TDAH moderado, dislexia e
              disortografia. Foi alfabetizada apenas aos 10 anos, com o apoio de profissionais que
              fizeram diferença em sua trajetória. Essas vivências lhe proporcionam um olhar mais
              atento, empático e sensível às dificuldades de cada criança e de sua família.
            </p>
            <p>
              Unindo experiência pessoal e conhecimento médico, busca se manter constantemente
              atualizada sobre tratamentos, terapias e novas evidências, sempre com o objetivo de
              oferecer um acompanhamento individualizado, cuidadoso e baseado em ciência.
            </p>
            <p>
              <strong>Afinal, cada história, cada dor e cada família é única!</strong>
            </p>
          </div>

        </div>

        <div ref={cardsRef} className={`sobre-cards ${cardsRevealClass}`}>
          {ABOUT_CARDS.map((card) => (
            <div className="mini-card" key={card.title}>
              <IconBadge icon={card.icon} className="mini-icon" />
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
