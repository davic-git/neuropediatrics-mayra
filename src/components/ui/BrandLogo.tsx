import horizontalLogo360 from '../../assets/images/logos/logo-horizontal-mayra-360.webp';
import horizontalLogo720 from '../../assets/images/logos/logo-horizontal-mayra-720.webp';

interface BrandLogoProps {
  placement: 'header' | 'footer';
}

export default function BrandLogo({ placement }: BrandLogoProps) {
  return (
    <picture className={`brand-logo brand-logo-${placement}`}>
      <img
        src={horizontalLogo360}
        srcSet={`${horizontalLogo360} 360w, ${horizontalLogo720} 720w`}
        sizes={
          placement === 'header'
            ? '(max-width: 480px) 105px, (max-width: 991px) 132px, 180px'
            : '170px'
        }
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
