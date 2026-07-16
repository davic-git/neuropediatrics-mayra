interface DividerProps {
  className?: string;
}

export default function Divider({ className = '' }: DividerProps) {
  return <hr className={`ui-divider ${className}`.trim()} aria-hidden="true" />;
}
