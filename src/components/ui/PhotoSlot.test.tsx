import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PhotoSlot from './PhotoSlot';

describe('PhotoSlot', () => {
  it('keeps intrinsic dimensions and responsive loading hints', () => {
    render(
      <PhotoSlot
        src="/photo-960.avif"
        srcSet="/photo-480.avif 480w, /photo-960.avif 960w"
        sizes="(max-width: 600px) 100vw, 50vw"
        alt="Descrição da fotografia"
        label="photo.avif"
        width={960}
        height={1280}
      />,
    );

    const image = screen.getByRole('img', { name: 'Descrição da fotografia' });
    expect(image).toHaveAttribute('width', '960');
    expect(image).toHaveAttribute('height', '1280');
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('decoding', 'async');
    expect(image).toHaveAttribute('srcset', expect.stringContaining('480w'));
  });
});
