import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import FloatingWhatsapp from './FloatingWhatsapp';

describe('FloatingWhatsapp', () => {
  it('exposes a safe and descriptive external link', () => {
    render(<FloatingWhatsapp />);

    const link = screen.getByRole('link', {
      name: 'Falar com a Dra. Mayra pelo WhatsApp (abre em nova aba)',
    });
    expect(link).toHaveAttribute('href', expect.stringMatching(/^https:\/\/wa\.me\/5524999459027\?text=/));
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
