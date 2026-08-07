import { Brain, Clock, MessageCircle, Puzzle, Sprout } from 'lucide-react';
import type { NumberedIconContentItem } from '../types/content';

export const SERVICE_STEPS: ReadonlyArray<NumberedIconContentItem> = [
  {
    num: '01',
    icon: MessageCircle,
    title: 'Escuta acolhedora',
    text: 'Começamos ouvindo a família com atenção e sem pressa, entendendo a história e as necessidades da criança.',
  },
  {
    num: '02',
    icon: Brain,
    title: 'Avaliação especializada',
    text: 'Investigação clínica detalhada do desenvolvimento neurológico, comportamental e cognitivo.',
  },
  {
    num: '03',
    icon: Puzzle,
    title: 'Diagnóstico claro',
    text: 'Explicações objetivas sobre o que foi identificado, sem jargões e com espaço para perguntas.',
  },
  {
    num: '04',
    icon: Sprout,
    title: 'Plano de cuidado',
    text: 'Orientações práticas e um plano de acompanhamento construído em conjunto com a família.',
  },
  {
    num: '05',
    icon: Clock,
    title: 'Acompanhamento contínuo',
    text: 'Retornos regulares para ajustar o plano de cuidado conforme o desenvolvimento avança.',
  },
];
