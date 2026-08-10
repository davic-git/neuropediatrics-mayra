import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Button from './Button';

describe('Button analytics', () => {
  it('tracks a regular WhatsApp CTA without preventing navigation', () => {
    render(<Button whatsappText="Mensagem de teste">Conversar no WhatsApp</Button>);

    const link = screen.getByRole('link', { name: /Conversar no WhatsApp/ });
    const clickWasNotCancelled = fireEvent.click(link);

    expect(link).toHaveAttribute('data-analytics-event', 'click_whatsapp');
    expect(clickWasNotCancelled).toBe(true);
  });

  it('tracks appointment CTAs with the dedicated event', () => {
    render(
      <Button whatsappText="Mensagem de teste" analyticsEvent="click_agendar_consulta">
        Agendar consulta
      </Button>,
    );

    fireEvent.click(screen.getByRole('link', { name: /Agendar consulta/ }));

    expect(screen.getByRole('link', { name: /Agendar consulta/ })).toHaveAttribute(
      'data-analytics-event',
      'click_agendar_consulta',
    );
  });
});
