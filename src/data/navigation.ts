export const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#como-agimos', label: 'Como agimos' },
  { href: '#condicoes', label: 'Condições' },
  { href: '#para-familias', label: 'Para famílias' },
  { href: '#faq', label: 'Perguntas frequentes' },
  { href: '#contato', label: 'Contato' },
] as const;

export const MAIN_NAV_LINKS = NAV_LINKS.filter((link) => link.href !== '#faq');
