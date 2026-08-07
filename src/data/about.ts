import { Brain, MessageCircle, Puzzle, Sprout } from 'lucide-react';
import type { IconContentItem } from '../types/content';

export const ABOUT_CARDS: ReadonlyArray<IconContentItem> = [
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
