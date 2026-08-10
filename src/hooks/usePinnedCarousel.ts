import { useEffect, useRef } from 'react';
import { useMediaQuery, useReducedMotion } from './useMediaQuery';

export function usePinnedCarousel(itemCount: number) {
  const stickyWrapRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const indicatorRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const reducedMotion = useReducedMotion();
  const hasShortViewport = useMediaQuery('(max-height: 650px)');
  const hasStaticViewport = useMediaQuery('(max-width: 991px)');
  const useStaticLayout = reducedMotion || hasShortViewport || hasStaticViewport;

  useEffect(() => {
    const stickyWrap = stickyWrapRef.current;
    if (!stickyWrap) return;

    let animationFrame: number | null = null;

    const setItemAccessibility = (activeIndex: number | null) => {
      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const isAccessible = activeIndex === null || index === activeIndex;
        item.inert = !isAccessible;
        item.setAttribute('aria-hidden', String(!isAccessible));
      });
    };

    if (useStaticLayout) {
      stickyWrap.style.height = 'auto';
      itemRefs.current.forEach((item) => {
        if (!item) return;
        item.style.opacity = '';
        item.style.transform = '';
        item.style.zIndex = '';
        item.style.pointerEvents = '';
      });
      indicatorRefs.current.forEach((indicator) => indicator?.classList.remove('is-active'));
      setItemAccessibility(null);

      return () => {
        stickyWrap.style.height = '';
      };
    }

    const setStickyHeight = () => {
      stickyWrap.style.height = `${itemCount * 100}svh`;
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
      setItemAccessibility(activeIndex);

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

    const scheduleUpdate = () => {
      if (!ticking) {
        animationFrame = window.requestAnimationFrame(() => {
          animationFrame = null;
          updateCarousel();
        });
        ticking = true;
      }
    };

    const onResize = () => {
      setStickyHeight();
      scheduleUpdate();
    };

    setStickyHeight();
    setItemAccessibility(0);
    scheduleUpdate();

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', onResize);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      stickyWrap.style.height = '';
      setItemAccessibility(null);
    };
  }, [itemCount, useStaticLayout]);

  return { stickyWrapRef, itemRefs, indicatorRefs };
}
