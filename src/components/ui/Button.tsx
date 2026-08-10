import type { MouseEventHandler, ReactNode } from 'react';
import { ANALYTICS_EVENTS, type AnalyticsEventName } from '../../utils/analytics-events';
import { buildWhatsAppLink } from '../../utils/whatsapp';

interface CommonButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'outline-light';
  className?: string;
  analyticsEvent?: AnalyticsEventName;
}

interface NativeButtonProps extends CommonButtonProps {
  href?: never;
  whatsappText?: never;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit';
}

interface LinkButtonProps extends CommonButtonProps {
  href: string;
  whatsappText?: never;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  type?: never;
}

interface WhatsAppButtonProps extends CommonButtonProps {
  href?: never;
  whatsappText: string;
  onClick?: never;
  type?: never;
}

type ButtonProps = NativeButtonProps | LinkButtonProps | WhatsAppButtonProps;

export default function Button(props: ButtonProps) {
  const { children, variant = 'primary', className = '' } = props;
  const isWhatsApp = 'whatsappText' in props && typeof props.whatsappText === 'string';
  const classes = `btn btn-${variant}${isWhatsApp ? ' btn-whatsapp' : ''} ${className}`.trim();

  if (isWhatsApp) {
    return (
      <a
        href={buildWhatsAppLink(props.whatsappText)}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        data-analytics-event={props.analyticsEvent ?? ANALYTICS_EVENTS.WHATSAPP}
      >
        {children}
        <span className="visually-hidden"> (abre em nova aba)</span>
      </a>
    );
  }

  if ('href' in props && typeof props.href === 'string') {
    return (
      <a
        href={props.href}
        className={classes}
        data-analytics-event={props.analyticsEvent}
        onClick={props.onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? 'button'}
      className={classes}
      data-analytics-event={props.analyticsEvent}
      onClick={props.onClick}
    >
      {children}
    </button>
  );
}
