import horizontalLogo from '../../assets/images/logos/logo-horizontal-mayra.png';
import symbolLogo from '../../assets/images/logos/logo-symbol-mayra.png';

interface BrandLogoProps {
  placement: 'header' | 'footer';
}

export default function BrandLogo({ placement }: BrandLogoProps) {
  return (
    <picture className={`brand-logo brand-logo-${placement}`}>
      {placement === 'header' ? (
        <source media="(max-width: 991px)" srcSet={symbolLogo} />
      ) : null}
      <img
        src={horizontalLogo}
        alt="Mayra Martins Neuropediatria"
        width={1536}
        height={1024}
      />
    </picture>
  );
}
