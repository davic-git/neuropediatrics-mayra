import { useState } from 'react';

interface PhotoSlotProps {
  src: string;
  alt: string;
  label: string;
  className?: string;
  caption?: string;
  width: number;
  height: number;
  loading?: 'eager' | 'lazy';
  decoding?: 'sync' | 'async' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
}

export default function PhotoSlot({
  src,
  alt,
  label,
  className = '',
  caption,
  width,
  height,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority = 'auto',
}: PhotoSlotProps) {
  const [isMissing, setIsMissing] = useState(false);

  return (
    <div className={`photo-slot ${className}`.trim()} data-label={label}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        className={isMissing ? 'is-missing' : ''}
        onError={() => setIsMissing(true)}
      />
      {caption && <span className="blob-caption">{caption}</span>}
    </div>
  );
}
