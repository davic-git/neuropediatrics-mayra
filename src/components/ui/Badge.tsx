import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}

export default function Badge({ children, onDark = false, className = '' }: BadgeProps) {
  return (
    <span className={`eyebrow ${onDark ? 'eyebrow-on-dark' : ''} ${className}`.trim()}>
      {children}
    </span>
  );
}
