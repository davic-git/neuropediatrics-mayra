import { useState } from 'react';

interface PhotoSlotProps {
  src: string;
  alt: string;
  label: string;
  className?: string;
  caption?: string;
}

export default function PhotoSlot({ src, alt, label, className = '', caption }: PhotoSlotProps) {
  const [isMissing, setIsMissing] = useState(false);

  return (
    <div className={`photo-slot ${className}`.trim()} data-label={label}>
      <img
        src={src}
        alt={alt}
        className={isMissing ? 'is-missing' : ''}
        onError={() => setIsMissing(true)}
      />
      {caption && <span className="blob-caption">{caption}</span>}
    </div>
  );
}
