import { useRef, useState } from 'react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import { FAQ_ITEMS } from '../data/faq';
import { useReveal } from '../hooks/useReveal';
import { ArrowRight } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const side = useReveal<HTMLDivElement>();
  const list = useReveal<HTMLDivElement>();
  const answerRefs = useRef<Array<HTMLDivElement | null>>([]);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="section faq" id="faq">
      <Container className="faq-grid">
        <div ref={side.ref} className={`faq-side ${side.className}`}>
          <Badge>FAQ&apos;s</Badge>
          <h2>Perguntas frequentes</h2>
          <Button variant="primary" whatsappText="Olá! Tenho uma dúvida sobre o atendimento.">
            Fale conosco
          </Button>
        </div>

        <div ref={list.ref} className={`faq-list ${list.className}`}>
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div className={`faq-item${isOpen ? ' is-open' : ''}`} key={item.question}>
                <button className="faq-question" aria-expanded={isOpen} onClick={() => toggle(index)}>
                  <span>{item.question}</span>
                  <span className="faq-chevron" style={{ backgroundImage: `url(${ArrowRight})` }}></span>
                </button>
                <div
                  className="faq-answer"
                  style={{ maxHeight: isOpen ? `${answerRefs.current[index]?.scrollHeight ?? 0}px` : '0px' }}
                >
                  <div
                    className="faq-answer-inner"
                    ref={(node) => {
                      answerRefs.current[index] = node;
                    }}
                  >
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
