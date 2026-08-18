import type { ErrorEvent } from '@sentry/react';
import { describe, expect, it } from 'vitest';
import { filterAndScrubSentryEvent } from './sentry';

const androidInAppBrowserMessage = 'Error invoking postMessage: Java object is gone';
const androidInAppBrowserFilename = 'iabjs://navigation_performance_logger_android/runtime.js';

function createEvent(value: string, filename: string): ErrorEvent {
  return {
    type: undefined,
    exception: {
      values: [
        {
          value,
          stacktrace: {
            frames: [{ filename }],
          },
        },
      ],
    },
  };
}

describe('filterAndScrubSentryEvent', () => {
  it('ignores only the known Android in-app browser postMessage error', () => {
    const event = createEvent(androidInAppBrowserMessage, androidInAppBrowserFilename);

    expect(filterAndScrubSentryEvent(event)).toBeNull();
  });

  it.each([
    ['the same message from application code', androidInAppBrowserMessage, 'https://www.dramayramartins.com.br/assets/index.js'],
    ['a different error from the external script', 'A real application error', androidInAppBrowserFilename],
  ])('keeps %s', (_description, value, filename) => {
    const event = createEvent(value, filename);

    expect(filterAndScrubSentryEvent(event)).toBe(event);
  });

  it('keeps an event when the message and external frame belong to different exceptions', () => {
    const event: ErrorEvent = {
      type: undefined,
      exception: {
        values: [
          {
            value: androidInAppBrowserMessage,
            stacktrace: { frames: [{ filename: 'https://www.dramayramartins.com.br/app.js' }] },
          },
          {
            value: 'A different error',
            stacktrace: { frames: [{ filename: androidInAppBrowserFilename }] },
          },
        ],
      },
    };

    expect(filterAndScrubSentryEvent(event)).toBe(event);
  });

  it('keeps real errors while preserving the existing privacy scrub', () => {
    const event: ErrorEvent = {
      type: undefined,
      exception: { values: [{ value: 'A real application error' }] },
      user: { id: 'patient-id' },
      request: {
        cookies: { session: 'secret' },
        data: { medical: 'private' },
        headers: { authorization: 'secret' },
        query_string: 'patient=private',
        url: 'https://www.dramayramartins.com.br/',
      },
    };

    expect(filterAndScrubSentryEvent(event)).toBe(event);
    expect(event.user).toBeUndefined();
    expect(event.request).toEqual({ url: 'https://www.dramayramartins.com.br/' });
  });
});
