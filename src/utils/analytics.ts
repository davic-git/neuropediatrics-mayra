import { isAnalyticsEventName, type AnalyticsEventName } from './analytics-events';

type GtagArguments =
  | ['js', Date]
  | [
      'config',
      string,
      {
        allow_ad_personalization_signals: false;
        allow_google_signals: false;
      },
    ]
  | ['event', AnalyticsEventName];

declare global {
  interface Window {
    dataLayer?: GtagArguments[];
    gtag?: (...args: GtagArguments) => void;
  }
}

interface AnalyticsOptions {
  measurementId?: string;
  isProduction: boolean;
}

const SCRIPT_ID = 'ga4-gtag';
const MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/i;

export function createAnalytics({ measurementId, isProduction }: AnalyticsOptions) {
  const normalizedMeasurementId = measurementId?.trim();
  let initialized = false;
  let eventTrackingStarted = false;

  const canInitialize = () =>
    Boolean(
      isProduction &&
        normalizedMeasurementId &&
        MEASUREMENT_ID_PATTERN.test(normalizedMeasurementId) &&
        typeof window !== 'undefined' &&
        typeof document !== 'undefined',
    );

  const initialize = (): boolean => {
    if (initialized || !canInitialize() || !normalizedMeasurementId) return false;

    window.dataLayer ??= [];
    window.gtag ??= (...args: GtagArguments) => {
      window.dataLayer?.push(args);
    };

    window.gtag('js', new Date());
    window.gtag('config', normalizedMeasurementId, {
      allow_ad_personalization_signals: false,
      allow_google_signals: false,
    });

    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(normalizedMeasurementId)}`;
      document.head.append(script);
    }

    initialized = true;
    return true;
  };

  const start = (): void => {
    if (!canInitialize()) return;

    if (!eventTrackingStarted) {
      document.addEventListener('click', (event) => {
        const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-analytics-event]') : null;
        const eventName = target?.dataset.analyticsEvent;

        if (isAnalyticsEventName(eventName)) trackEvent(eventName);
      });
      eventTrackingStarted = true;
    }

    const initializeAfterLoad = () => {
      window.setTimeout(initialize, 0);
    };

    if (document.readyState === 'complete') {
      initializeAfterLoad();
    } else {
      window.addEventListener('load', initializeAfterLoad, { once: true });
    }
  };

  const trackEvent = (eventName: AnalyticsEventName): void => {
    if (!initialized && !initialize()) return;
    window.gtag?.('event', eventName);
  };

  return { initialize, start, trackEvent };
}

const analytics = createAnalytics({
  measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID,
  isProduction: import.meta.env.PROD,
});

export const initializeAnalytics = analytics.start;
