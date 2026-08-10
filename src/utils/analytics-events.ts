export const ANALYTICS_EVENTS = {
  APPOINTMENT: 'click_agendar_consulta',
  WHATSAPP: 'click_whatsapp',
  PHONE: 'click_phone',
  EMAIL: 'click_email',
} as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

const analyticsEventNames = new Set<string>(Object.values(ANALYTICS_EVENTS));

export function isAnalyticsEventName(value: string | undefined): value is AnalyticsEventName {
  return Boolean(value && analyticsEventNames.has(value));
}
