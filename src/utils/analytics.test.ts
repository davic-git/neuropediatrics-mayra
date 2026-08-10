import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createAnalytics } from './analytics';
import { ANALYTICS_EVENTS } from './analytics-events';

const TEST_MEASUREMENT_ID = 'G-TEST123456';

describe('analytics', () => {
  beforeEach(() => {
    document.getElementById('ga4-gtag')?.remove();
    delete window.dataLayer;
    delete window.gtag;
  });

  afterEach(() => {
    document.getElementById('ga4-gtag')?.remove();
  });

  it('does nothing without a measurement ID', () => {
    const analytics = createAnalytics({ measurementId: '', isProduction: true });

    expect(analytics.initialize()).toBe(false);
    analytics.trackEvent(ANALYTICS_EVENTS.WHATSAPP);

    expect(document.getElementById('ga4-gtag')).not.toBeInTheDocument();
    expect(window.dataLayer).toBeUndefined();
  });

  it('loads gtag asynchronously and initializes it only once in production', () => {
    const analytics = createAnalytics({ measurementId: TEST_MEASUREMENT_ID, isProduction: true });

    expect(analytics.initialize()).toBe(true);
    expect(analytics.initialize()).toBe(false);

    const script = document.getElementById('ga4-gtag');
    expect(script).toHaveAttribute(
      'src',
      `https://www.googletagmanager.com/gtag/js?id=${TEST_MEASUREMENT_ID}`,
    );
    expect(script).toHaveProperty('async', true);
    expect(document.querySelectorAll('#ga4-gtag')).toHaveLength(1);
    expect(window.dataLayer?.[0]?.[0]).toBe('js');
    expect(window.dataLayer?.[1]).toEqual([
      'config',
      TEST_MEASUREMENT_ID,
      {
        allow_ad_personalization_signals: false,
        allow_google_signals: false,
      },
    ]);
  });

  it.each(Object.values(ANALYTICS_EVENTS))('sends the %s event without personal parameters', (eventName) => {
    const analytics = createAnalytics({ measurementId: TEST_MEASUREMENT_ID, isProduction: true });

    analytics.trackEvent(eventName);

    expect(window.dataLayer?.at(-1)).toEqual(['event', eventName]);
  });

  it('stays disabled outside production', () => {
    const analytics = createAnalytics({ measurementId: TEST_MEASUREMENT_ID, isProduction: false });

    expect(analytics.initialize()).toBe(false);
    expect(document.getElementById('ga4-gtag')).not.toBeInTheDocument();
  });
});
