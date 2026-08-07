import { Brain, MessageCircle, Moon, Puzzle, Sprout, Zap } from 'lucide-react';
import type { IconContentItem } from '../types/content';

export const CONDITIONS: ReadonlyArray<IconContentItem> = [
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
