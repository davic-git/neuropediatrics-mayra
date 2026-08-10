import type { ReactNode } from 'react';
import type { AnalyticsEventName } from '../utils/analytics-events';
import Button from './ui/Button';

interface CTAProps {
  text: ReactNode;
  buttonLabel: string;
  whatsappText: string;
  variant?: 'primary' | 'outline-light';
  className?: string;
  analyticsEvent?: AnalyticsEventName;
}

export default function CTA({
  text,
  buttonLabel,
  whatsappText,
  variant = 'primary',
  className = '',
  analyticsEvent,
}: CTAProps) {
  return (
    <div className={className}>
      <p>{text}</p>
      <Button variant={variant} whatsappText={whatsappText} analyticsEvent={analyticsEvent}>
        {buttonLabel}
      </Button>
    </div>
  );
}
