'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

declare global {
  interface Window { lenis?: Lenis; }
}

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2 });
    window.lenis = lenis;

    const rafIdRef = { current: 0 };
    function raf(time: number) {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }
    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return null;
}
