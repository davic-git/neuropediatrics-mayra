import CTA from '../components/CTA';
import Container from '../components/ui/Container';
import PhotoSlot from '../components/ui/PhotoSlot';
import { useReveal } from '../hooks/useReveal';
import { Puzzle } from "lucide-react";

export default function Families() {
  const head = useReveal<HTMLDivElement>();
  const row = useReveal<HTMLDivElement>();
  const cta = useReveal<HTMLDivElement>();

  return (
    <section className="section familias" id="para-familias">
      <Container>
        <div ref={head.ref} className={`familias-head ${head.className}`}>
          <h2>Para famílias</h2>
          <p>Cada dúvida importa. Veja como facilitamos os primeiros passos da sua família nessa jornada.</p>
        </div>

        <div ref={row.ref} className={`familias-row ${row.className}`}>
          <article className="familia-card">
            <span className="familia-icon" style={{ backgroundImage: `url(${Puzzle})` }}></span>
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
          />

          <article className="familia-card">
            <span className="familia-icon" style={{ backgroundImage: `url(${Puzzle})` }}></span>
            <h3>Como posso me preparar?</h3>
            <p>
              Traga exames anteriores, relatórios escolares, receitas médicas e, se possível,
              anotações sobre os principais comportamentos observados.
            </p>
          </article>
        </div>

        <div ref={cta.ref} className={`familias-cta ${cta.className}`}>
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
