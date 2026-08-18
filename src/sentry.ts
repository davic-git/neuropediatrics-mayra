import * as Sentry from '@sentry/react';
import type { ErrorEvent } from '@sentry/react';

const dsn = import.meta.env.VITE_SENTRY_DSN?.trim();

export const isSentryEnabled = Boolean(import.meta.env.PROD && typeof window !== 'undefined' && dsn);

export function filterAndScrubSentryEvent(event: ErrorEvent): ErrorEvent | null {
  const isAndroidInAppBrowserNoise = event.exception?.values?.some(
    (exception) =>
      exception.value === 'Error invoking postMessage: Java object is gone' &&
      exception.stacktrace?.frames?.some((frame) =>
        frame.filename?.startsWith('iabjs://navigation_performance_logger_android'),
      ),
  );

  if (isAndroidInAppBrowserNoise) {
    return null;
  }

  delete event.user;

  if (event.request) {
    delete event.request.cookies;
    delete event.request.data;
    delete event.request.headers;
    delete event.request.query_string;
  }

  return event;
}

if (isSentryEnabled) {
  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    enableLogs: false,
    enableMetrics: false,
    maxBreadcrumbs: 0,
    dataCollection: {
      userInfo: false,
      cookies: false,
      httpHeaders: {
        request: false,
        response: false,
      },
      httpBodies: [],
      urlQueryParams: false,
      graphQL: {
        document: false,
        variables: false,
      },
      genAI: {
        inputs: false,
        outputs: false,
      },
      databaseQueryData: false,
      stackFrameVariables: false,
      frameContextLines: 0,
    },
    beforeSend: filterAndScrubSentryEvent,
  });
}

export const reactErrorHandlers = isSentryEnabled
  ? {
      onCaughtError: Sentry.reactErrorHandler(),
      onUncaughtError: Sentry.reactErrorHandler(),
      onRecoverableError: Sentry.reactErrorHandler(),
    }
  : undefined;
