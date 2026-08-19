import { scheduleIdleTask, type IdleTaskScheduler } from './idle-task';

export function initializeSpeedInsights(schedule: IdleTaskScheduler = scheduleIdleTask): void {
  schedule(() => {
    void import('@vercel/speed-insights')
      .then(({ injectSpeedInsights }) => injectSpeedInsights())
      .catch(() => undefined);
  });
}
