export type IdleTaskScheduler = (task: () => void) => void;

const IDLE_TIMEOUT_MS = 2_000;

export const scheduleIdleTask: IdleTaskScheduler = (task) => {
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(task, { timeout: IDLE_TIMEOUT_MS });
    return;
  }

  window.setTimeout(task, 0);
};
