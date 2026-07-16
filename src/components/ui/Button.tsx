import type { MouseEventHandler, ReactNode } from "react";
import { buildWhatsAppLink } from '../../utils/whatsapp';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'outline-light';
  href?: string;
  whatsappText?: string;
  className?: string;
  onClick?: MouseEventHandler;
  type?: 'button' | 'submit';
}

export default function Button({
  children,
  variant = 'primary',
  href,
  whatsappText,
  className = '',
  onClick,
  type = 'button',
}: ButtonProps) {
  const classes = `btn btn-${variant}${whatsappText ? ' btn-whatsapp' : ''} ${className}`.trim();

  if (whatsappText) {
    return (
      <a href={buildWhatsAppLink(whatsappText)} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
