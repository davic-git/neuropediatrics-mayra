import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the complete page structure', () => {
    const { container } = render(<App />);

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    for (const id of [
      'inicio',
      'sobre',
      'como-agimos',
      'condicoes',
      'para-familias',
      'faq',
      'contato',
    ]) {
      expect(container.querySelector(`#${id}`)).toBeInTheDocument();
    }
    expect(screen.getByRole('navigation', { name: 'Navegação principal' })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(<App />);
    const results = await axe.run(container, {
      rules: {
        'color-contrast': { enabled: false },
      },
    });

    expect(results.violations).toEqual([]);
  });
});
