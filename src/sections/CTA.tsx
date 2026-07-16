import type { ReactNode } from "react";
import Button from '../components/ui/Button';

interface CTAProps {
  text: ReactNode;
  buttonLabel: string;
  whatsappText: string;
  variant?: 'primary' | 'outline-light';
  className?: string;
}

export default function CTA({ text, buttonLabel, whatsappText, variant = 'primary', className = '' }: CTAProps) {
  return (
    <div className={className}>
      <p>{text}</p>
      <Button variant={variant} whatsappText={whatsappText}>
        {buttonLabel}
      </Button>
    </div>
  );
}
