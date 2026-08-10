import { useState } from 'react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import IconBadge from '../components/ui/IconBadge';
import { FAQ_ITEMS } from '../data/faq';
import { useReveal } from '../hooks/useReveal';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [sideRef, sideRevealClass] = useReveal<HTMLDivElement>();
  const [listRef, listRevealClass] = useReveal<HTMLDivElement>();

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="section faq" id="faq">
      <Container className="faq-grid">
        <div ref={sideRef} className={`faq-side ${sideRevealClass}`}>
          <Badge>FAQ&apos;s</Badge>
          <h2>Perguntas frequentes</h2>
          <Button variant="primary" whatsappText="Olá! Tenho uma dúvida sobre o atendimento.">
            Fale conosco
          </Button>
        </div>

        <div ref={listRef} className={`faq-list ${listRevealClass}`}>
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-question-${index}`;
            const panelId = `faq-answer-${index}`;
            return (
              <div className={`faq-item${isOpen ? ' is-open' : ''}`} key={item.question}>
                <button
                  id={buttonId}
                  className="faq-question"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                >
                  <span>{item.question}</span>
                  <IconBadge
                    icon={ChevronDown}
                    className="faq-chevron"
                  />
                </button>
                <div
                  id={panelId}
                  className="faq-answer"
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                >
                  <div className="faq-answer-inner">{item.answer}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
