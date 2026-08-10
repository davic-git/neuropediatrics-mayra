import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { initializeAnalytics, trackAnalyticsEvent } from './analytics';
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

  it.each([undefined, '', 'UA-123456', 'G-invalid-id'])(
    'does not initialize without a valid GA4 Measurement ID: %s',
    (measurementId) => {
      expect(initializeAnalytics({ measurementId, isProduction: true })).toBe(false);
      expect(document.getElementById('ga4-gtag')).not.toBeInTheDocument();
      expect(window.dataLayer).toBeUndefined();
      expect(window.gtag).toBeUndefined();
    },
  );

  it('creates dataLayer, defines gtag and sends the official js and config commands', () => {
    expect(initializeAnalytics({ measurementId: TEST_MEASUREMENT_ID, isProduction: true })).toBe(
      true,
    );

    expect(window.dataLayer).toBeInstanceOf(Array);
    expect(window.gtag).toBeTypeOf('function');
    expect(window.dataLayer?.[0]?.[0]).toBe('js');
    expect(window.dataLayer?.[0]?.[1]).toBeInstanceOf(Date);
    expect(window.dataLayer?.[1]).toEqual([
      'config',
      TEST_MEASUREMENT_ID,
      {
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      },
    ]);
  });

  it('creates the async gtag.js script exactly once', () => {
    initializeAnalytics({ measurementId: TEST_MEASUREMENT_ID, isProduction: true });
    initializeAnalytics({ measurementId: TEST_MEASUREMENT_ID, isProduction: true });

    const scripts = document.querySelectorAll('#ga4-gtag');
    expect(scripts).toHaveLength(1);
    expect(scripts[0]).toHaveAttribute(
      'src',
      `https://www.googletagmanager.com/gtag/js?id=${TEST_MEASUREMENT_ID}`,
    );
    expect(scripts[0]).toHaveProperty('async', true);
  });

  it('does not duplicate js or config commands when initialized again', () => {
    initializeAnalytics({ measurementId: TEST_MEASUREMENT_ID, isProduction: true });
    initializeAnalytics({ measurementId: TEST_MEASUREMENT_ID, isProduction: true });

    expect(window.dataLayer?.filter(([command]) => command === 'js')).toHaveLength(1);
    expect(window.dataLayer?.filter(([command]) => command === 'config')).toHaveLength(1);
  });

  it.each(Object.values(ANALYTICS_EVENTS))(
    'sends the %s event without personal parameters',
    (eventName) => {
      initializeAnalytics({ measurementId: TEST_MEASUREMENT_ID, isProduction: true });
      trackAnalyticsEvent(eventName);

      expect(window.dataLayer?.at(-1)).toEqual(['event', eventName]);
    },
  );

  it('keeps delegated click events centralized and does not duplicate them after reinitialization', () => {
    initializeAnalytics({ measurementId: TEST_MEASUREMENT_ID, isProduction: true });
    initializeAnalytics({ measurementId: TEST_MEASUREMENT_ID, isProduction: true });
    const button = document.createElement('button');
    button.dataset.analyticsEvent = ANALYTICS_EVENTS.WHATSAPP;
    document.body.append(button);

    button.click();

    expect(
      window.dataLayer?.filter(
        (command) => command[0] === 'event' && command[1] === ANALYTICS_EVENTS.WHATSAPP,
      ),
    ).toHaveLength(1);
    button.remove();
  });

  it('stays disabled outside production', () => {
    expect(
      initializeAnalytics({ measurementId: TEST_MEASUREMENT_ID, isProduction: false }),
    ).toBe(false);
    expect(document.getElementById('ga4-gtag')).not.toBeInTheDocument();
    expect(window.dataLayer).toBeUndefined();
  });
});
