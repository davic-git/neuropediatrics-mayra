import horizontalLogo360 from '../../assets/images/logos/logo-horizontal-mayra-360.webp';
import horizontalLogo720 from '../../assets/images/logos/logo-horizontal-mayra-720.webp';
import symbolLogo112 from '../../assets/images/logos/logo-symbol-mayra-112.webp';
import symbolLogo224 from '../../assets/images/logos/logo-symbol-mayra-224.webp';

interface BrandLogoProps {
  placement: 'header' | 'footer';
}

export default function BrandLogo({ placement }: BrandLogoProps) {
  return (
    <picture className={`brand-logo brand-logo-${placement}`}>
      {placement === 'header' ? (
        <source
          media="(max-width: 991px)"
          srcSet={`${symbolLogo112} 112w, ${symbolLogo224} 224w`}
          sizes="(max-width: 480px) 50px, 56px"
        />
      ) : null}
      <img
        src={horizontalLogo360}
        srcSet={`${horizontalLogo360} 360w, ${horizontalLogo720} 720w`}
        sizes={placement === 'header' ? '180px' : '170px'}
        alt="Mayra Martins Neuropediatria"
        width={720}
        height={221}
        loading={placement === 'footer' ? 'lazy' : 'eager'}
        decoding={placement === 'footer' ? 'async' : 'sync'}
        fetchPriority={placement === 'footer' ? 'low' : 'auto'}
      />
    </picture>
  );
}
