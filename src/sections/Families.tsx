import CTA from '../components/CTA';
import Container from '../components/ui/Container';
import IconBadge from '../components/ui/IconBadge';
import PhotoSlot from '../components/ui/PhotoSlot';
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
            src="/images/imagem-dna.png"
            alt="Ilustração de dupla hélice de DNA"
            label="imagem-dna.png"
            caption="Imagem dna"
            width={1000}
            height={1300}
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
