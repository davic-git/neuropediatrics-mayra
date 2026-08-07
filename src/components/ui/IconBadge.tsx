import type { LucideIcon } from 'lucide-react';

interface IconBadgeProps {
  icon: LucideIcon;
  className: string;
}

export default function IconBadge({ icon: Icon, className }: IconBadgeProps) {
  return (
    <span className={`ui-icon ${className}`} aria-hidden="true">
      <Icon />
    </span>
  );
}
