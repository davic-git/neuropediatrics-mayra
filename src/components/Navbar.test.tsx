import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('opens, moves focus into the menu and closes with Escape', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const toggle = screen.getByRole('button', { name: 'Abrir menu' });
    await user.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    const mobileNav = screen.getByRole('navigation', { name: 'Navegação móvel' });
    expect(mobileNav).not.toHaveAttribute('hidden');
    await waitFor(() => expect(mobileNav.querySelector('a')).toHaveFocus());

    await user.keyboard('{Escape}');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await waitFor(() => expect(toggle).toHaveFocus());
  });
});
