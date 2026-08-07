import { describe, expect, it } from 'vitest';
import { buildWhatsAppLink } from './whatsapp';

describe('buildWhatsAppLink', () => {
  it('encodes the message without changing the configured phone number', () => {
    expect(buildWhatsAppLink('Olá & tudo bem?')).toBe(
      'https://wa.me/5524999459027?text=Ol%C3%A1%20%26%20tudo%20bem%3F',
    );
  });
});
