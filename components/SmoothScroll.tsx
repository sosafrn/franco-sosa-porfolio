"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    // Respetar estrictamente preferencia de reducción de movimiento (WCAG AA)
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.08, // Inercia mecánica seca suiza
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      infinite: false,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
