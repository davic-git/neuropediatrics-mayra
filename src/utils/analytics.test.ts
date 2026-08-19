import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { initializeAnalytics, trackAnalyticsEvent } from './analytics';
import { ANALYTICS_EVENTS } from './analytics-events';

const TEST_MEASUREMENT_ID = 'G-TEST123456';
const runImmediately = (task: () => void) => task();

function initializeTestAnalytics(
  measurementId: string | undefined = TEST_MEASUREMENT_ID,
  isProduction = true,
) {
  return initializeAnalytics({ measurementId, isProduction, scheduleScript: runImmediately });
}

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
      expect(
        initializeAnalytics({
          measurementId,
          isProduction: true,
          scheduleScript: runImmediately,
        }),
      ).toBe(false);
      expect(document.getElementById('ga4-gtag')).not.toBeInTheDocument();
      expect(window.dataLayer).toBeUndefined();
      expect(window.gtag).toBeUndefined();
    },
  );

  it('creates dataLayer, defines gtag and sends the official js and config commands', () => {
    expect(initializeTestAnalytics()).toBe(true);

    expect(window.dataLayer).toBeInstanceOf(Array);
    expect(window.gtag).toBeTypeOf('function');
    expect(Array.isArray(window.dataLayer?.[0])).toBe(false);
    expect(Object.prototype.toString.call(window.dataLayer?.[0])).toBe('[object Arguments]');
    expect(window.dataLayer?.[0]?.[0]).toBe('js');
    expect(window.dataLayer?.[0]?.[1]).toBeInstanceOf(Date);
    expect(Array.from(window.dataLayer?.[1] ?? [])).toEqual([
      'config',
      TEST_MEASUREMENT_ID,
      {
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      },
    ]);
  });

  it('creates the async gtag.js script exactly once', () => {
    initializeTestAnalytics();
    initializeTestAnalytics();

    const scripts = document.querySelectorAll('#ga4-gtag');
    expect(scripts).toHaveLength(1);
    expect(scripts[0]).toHaveAttribute(
      'src',
      `https://www.googletagmanager.com/gtag/js?id=${TEST_MEASUREMENT_ID}`,
    );
    expect(scripts[0]).toHaveProperty('async', true);
  });

  it('does not duplicate js or config commands when initialized again', () => {
    initializeTestAnalytics();
    initializeTestAnalytics();

    expect(window.dataLayer?.filter(([command]) => command === 'js')).toHaveLength(1);
    expect(window.dataLayer?.filter(([command]) => command === 'config')).toHaveLength(1);
  });

  it.each(Object.values(ANALYTICS_EVENTS))(
    'sends the %s event without personal parameters',
    (eventName) => {
      initializeTestAnalytics();
      trackAnalyticsEvent(eventName);

      expect(Array.from(window.dataLayer?.at(-1) ?? [])).toEqual(['event', eventName]);
    },
  );

  it('keeps delegated click events centralized and does not duplicate them after reinitialization', () => {
    initializeTestAnalytics();
    initializeTestAnalytics();
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

  it('queues configuration and click events before loading the external script at idle', () => {
    let loadScript: (() => void) | undefined;
    const button = document.createElement('button');
    button.dataset.analyticsEvent = ANALYTICS_EVENTS.WHATSAPP;
    document.body.append(button);

    expect(
      initializeAnalytics({
        measurementId: TEST_MEASUREMENT_ID,
        isProduction: true,
        scheduleScript: (task) => {
          loadScript = task;
        },
      }),
    ).toBe(true);

    button.click();

    expect(document.getElementById('ga4-gtag')).not.toBeInTheDocument();
    expect(window.dataLayer?.map((command) => command[0])).toEqual(['js', 'config', 'event']);

    loadScript?.();
    expect(document.getElementById('ga4-gtag')).toBeInTheDocument();
    button.remove();
  });

  it('stays disabled outside production', () => {
    expect(initializeTestAnalytics(TEST_MEASUREMENT_ID, false)).toBe(false);
    expect(document.getElementById('ga4-gtag')).not.toBeInTheDocument();
    expect(window.dataLayer).toBeUndefined();
  });
});
