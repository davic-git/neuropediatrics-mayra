import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { SERVICE_STEPS } from '../data/services';
import Services from './Services';

describe('Services carousel', () => {
  it('advances and returns one card at a time with explicit controls', async () => {
    const user = userEvent.setup();
    render(<Services />);

    const previous = screen.getByRole('button', { name: 'Etapa anterior' });
    const next = screen.getByRole('button', { name: 'Próxima etapa' });

    expect(screen.getAllByRole('article')).toHaveLength(SERVICE_STEPS.length);
    expect(previous).toBeDisabled();
    expect(screen.getByText('1 de 5')).toBeInTheDocument();

    await user.click(next);
    expect(screen.getByText('2 de 5')).toBeInTheDocument();
    expect(previous).toBeEnabled();

    await user.click(previous);
    expect(screen.getByText('1 de 5')).toBeInTheDocument();
  });
});
