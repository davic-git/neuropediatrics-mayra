import type { ReactNode } from "react";
import Badge from './Badge';

interface SectionTitleProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  onDark?: boolean;
  className?: string;
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  onDark = false,
  className = '',
}: SectionTitleProps) {
  return (
    <div className={className}>
      {eyebrow && <Badge onDark={onDark}>{eyebrow}</Badge>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
