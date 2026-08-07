import { useEffect, useRef } from 'react';

export function usePinnedCarousel(itemCount: number) {
  const stickyWrapRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const indicatorRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const stickyWrap = stickyWrapRef.current;
    if (!stickyWrap) return;

    const setStickyHeight = () => {
      stickyWrap.style.height = `${itemCount * 100}vh`;
    };

    let ticking = false;

    const updateCarousel = () => {
      ticking = false;

      const rect = stickyWrap.getBoundingClientRect();
      const total = stickyWrap.offsetHeight - window.innerHeight;
      if (total <= 0) return;

      const progress = Math.min(Math.max(-rect.top / total, 0), 1);
      const activeFloat = progress * (itemCount - 1);
      const activeIndex = Math.round(activeFloat);

      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const distance = index - activeFloat;

        if (distance <= -1.4 || distance >= 1.4) {
          item.style.opacity = '0';
          item.style.transform = `translateX(${distance > 0 ? 140 : -140}%) rotate(${distance > 0 ? 12 : -12}deg)`;
          item.style.zIndex = '1';
          item.style.pointerEvents = 'none';
          return;
        }

        const absoluteDistance = Math.abs(distance);
        const translateX = distance * 62;
        const translateY = absoluteDistance * 26;
        const rotate = distance * 11;
        const scale = 1 - absoluteDistance * 0.12;
        const opacity = 1 - absoluteDistance * 0.82;

        item.style.opacity = String(Math.max(opacity, 0));
        item.style.transform = `translateX(${translateX}%) translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`;
        item.style.zIndex = String(100 - Math.round(absoluteDistance * 10));
        item.style.pointerEvents = absoluteDistance < 0.5 ? 'auto' : 'none';
      });

      indicatorRefs.current.forEach((indicator, index) => {
        indicator?.classList.toggle('is-active', index === activeIndex);
      });
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateCarousel);
        ticking = true;
      }
    };

    setStickyHeight();
    updateCarousel();

    window.addEventListener('resize', setStickyHeight);
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      window.removeEventListener('resize', setStickyHeight);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [itemCount]);

  return { stickyWrapRef, itemRefs, indicatorRefs };
}
