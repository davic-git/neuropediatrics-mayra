import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import { useReducedMotion } from './useMediaQuery';

export function useReveal<T extends HTMLElement>(linkedRef?: RefObject<T | null>) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = useReducedMotion();
  const supportsIntersectionObserver =
    typeof window !== 'undefined' && 'IntersectionObserver' in window;
  const revealRef = useCallback(
    (node: T | null) => {
      ref.current = node;
      if (linkedRef) linkedRef.current = node;
    },
    [linkedRef],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion || !supportsIntersectionObserver) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [reducedMotion, supportsIntersectionObserver]);

  const className = `reveal${isVisible || reducedMotion || !supportsIntersectionObserver ? ' is-visible' : ''}`;
  return [revealRef, className] as const;
}
