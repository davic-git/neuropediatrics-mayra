import { isAnalyticsEventName, type AnalyticsEventName } from './analytics-events';
import { scheduleIdleTask, type IdleTaskScheduler } from './idle-task';

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

type DataLayerCommand = GtagArguments | IArguments;
type GtagFunction = (...args: GtagArguments) => void;

declare global {
  interface Window {
    dataLayer?: DataLayerCommand[];
    gtag?: GtagFunction;
  }
}

interface AnalyticsOptions {
  measurementId?: string;
  isProduction?: boolean;
  scheduleScript?: IdleTaskScheduler;
}

const SCRIPT_ID = 'ga4-gtag';
const MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/;
const eventTrackingDocuments = new WeakSet<Document>();
const scheduledScriptDocuments = new WeakSet<Document>();

export function trackAnalyticsEvent(eventName: AnalyticsEventName): void {
  window.gtag?.('event', eventName);
}

function enableAnalyticsEvents(): void {
  if (eventTrackingDocuments.has(document)) return;

  document.addEventListener('click', (event) => {
    const target =
      event.target instanceof Element
        ? event.target.closest<HTMLElement>('[data-analytics-event]')
        : null;
    const eventName = target?.dataset.analyticsEvent;

    if (isAnalyticsEventName(eventName)) trackAnalyticsEvent(eventName);
  });
  eventTrackingDocuments.add(document);
}

export function initializeAnalytics(options: AnalyticsOptions = {}): boolean {
  const measurementId = (options.measurementId ?? import.meta.env.VITE_GA_MEASUREMENT_ID)?.trim();
  const isProduction = options.isProduction ?? import.meta.env.PROD;
  const scheduleScript = options.scheduleScript ?? scheduleIdleTask;

  if (
    !isProduction ||
    !measurementId ||
    !MEASUREMENT_ID_PATTERN.test(measurementId) ||
    typeof window === 'undefined' ||
    typeof document === 'undefined'
  ) {
    return false;
  }

  window.dataLayer = window.dataLayer || [];

  const gtag: GtagFunction = function () {
    // The official gtag.js command queue requires the function's array-like Arguments object.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };

  window.gtag = gtag;

  if (!document.getElementById(SCRIPT_ID) && !scheduledScriptDocuments.has(document)) {
    scheduledScriptDocuments.add(document);
    scheduleScript(() => {
      scheduledScriptDocuments.delete(document);
      if (document.getElementById(SCRIPT_ID)) return;

      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.append(script);
    });
  }

  const alreadyConfigured = window.dataLayer.some(
    (command) => command[0] === 'config' && command[1] === measurementId,
  );

  if (!alreadyConfigured) {
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
  }

  enableAnalyticsEvents();
  return true;
}
