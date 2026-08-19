import { injectSpeedInsights } from '@vercel/speed-insights';
import { describe, expect, it, vi } from 'vitest';
import { initializeSpeedInsights } from './speed-insights';

vi.mock('@vercel/speed-insights', () => ({
  injectSpeedInsights: vi.fn(),
}));

describe('initializeSpeedInsights', () => {
  it('loads Speed Insights only when the scheduled idle task runs', async () => {
    let idleTask: (() => void) | undefined;

    initializeSpeedInsights((task) => {
      idleTask = task;
    });

    expect(injectSpeedInsights).not.toHaveBeenCalled();

    idleTask?.();
    await vi.waitFor(() => expect(injectSpeedInsights).toHaveBeenCalledOnce());
  });
});
