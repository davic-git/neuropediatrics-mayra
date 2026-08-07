import type { LucideIcon } from 'lucide-react';

export interface IconContentItem {
  icon: LucideIcon;
  title: string;
  text: string;
}

export interface NumberedIconContentItem extends IconContentItem {
  num: string;
}
