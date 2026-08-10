import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { FAQ_ITEMS } from '../data/faq';
import FAQ from './FAQ';

describe('FAQ', () => {
  it('exposes accordion state and its controlled panel', async () => {
    const user = userEvent.setup();
    render(<FAQ />);

    const button = screen.getByRole('button', { name: FAQ_ITEMS[0].question });
    const panelId = button.getAttribute('aria-controls');
    const panel = panelId ? document.getElementById(panelId) : null;

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(panel).toHaveAttribute('aria-hidden', 'true');

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(panel).toHaveAttribute('aria-hidden', 'false');

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(panel).toHaveAttribute('aria-hidden', 'true');
  });
});
