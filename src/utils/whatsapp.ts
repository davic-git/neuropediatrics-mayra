export const WHATSAPP_NUMBER = '5524999459027';

export function buildWhatsAppLink(text?: string): string {
  const message = text || 'Olá! Gostaria de mais informações.';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
