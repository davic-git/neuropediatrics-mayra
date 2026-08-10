import * as Sentry from '@sentry/react';

const dsn = import.meta.env.VITE_SENTRY_DSN?.trim();

export const isSentryEnabled = Boolean(import.meta.env.PROD && typeof window !== 'undefined' && dsn);

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
    beforeSend(event) {
      delete event.user;

      if (event.request) {
        delete event.request.cookies;
        delete event.request.data;
        delete event.request.headers;
        delete event.request.query_string;
      }

      return event;
    },
  });
}

export const reactErrorHandlers = isSentryEnabled
  ? {
      onCaughtError: Sentry.reactErrorHandler(),
      onUncaughtError: Sentry.reactErrorHandler(),
      onRecoverableError: Sentry.reactErrorHandler(),
    }
  : undefined;
