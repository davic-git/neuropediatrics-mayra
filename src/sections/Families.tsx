import CTA from '../components/CTA';
import Container from '../components/ui/Container';
import IconBadge from '../components/ui/IconBadge';
import PhotoSlot from '../components/ui/PhotoSlot';
import dnaImage400 from '../assets/images/families/imagem-dna-400.avif';
import dnaImage800 from '../assets/images/families/imagem-dna-800.avif';
import dnaImage from '../assets/images/families/imagem-dna.avif';
import { useReveal } from '../hooks/useReveal';
import { Puzzle } from "lucide-react";

export default function Families() {
  const [headRef, headRevealClass] = useReveal<HTMLDivElement>();
  const [rowRef, rowRevealClass] = useReveal<HTMLDivElement>();
  const [ctaRef, ctaRevealClass] = useReveal<HTMLDivElement>();

  return (
    <section className="section familias" id="para-familias">
      <Container>
        <div ref={headRef} className={`familias-head ${headRevealClass}`}>
          <h2>Para famílias</h2>
          <p>Cada dúvida importa. Veja como facilitamos os primeiros passos da sua família nessa jornada.</p>
        </div>

        <div ref={rowRef} className={`familias-row ${rowRevealClass}`}>
          <article className="familia-card">
            <IconBadge icon={Puzzle} className="familia-icon" />
            <h3>Como funciona a primeira consulta?</h3>
            <p>
              Na primeira consulta é realizada uma avaliação detalhada do desenvolvimento, histórico
              clínico e necessidades da criança, sempre com escuta atenta da família.
            </p>
          </article>

          <PhotoSlot
            className="familia-figure"
            src={dnaImage}
            srcSet={`${dnaImage400} 400w, ${dnaImage800} 800w, ${dnaImage} 1086w`}
            sizes="(max-width: 768px) calc(100vw - 44px), (max-width: 1100px) 200px, 360px"
            alt="Ilustração de uma dupla hélice de DNA"
            label="imagem-dna.avif"
            width={1086}
            height={1448}
          />

          <article className="familia-card">
            <IconBadge icon={Puzzle} className="familia-icon" />
            <h3>Como posso me preparar?</h3>
            <p>
              Traga exames anteriores, relatórios escolares, receitas médicas e, se possível,
              anotações sobre os principais comportamentos observados.
            </p>
          </article>
        </div>

        <div ref={ctaRef} className={`familias-cta ${ctaRevealClass}`}>
          <CTA
            text="Ainda com dúvidas sobre o próximo passo?"
            buttonLabel="Conversar no WhatsApp"
            whatsappText="Olá! Tenho algumas dúvidas antes de agendar a consulta."
            variant="outline-light"
          />
        </div>
      </Container>
    </section>
  );
}
