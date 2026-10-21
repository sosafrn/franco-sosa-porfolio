"use client";

import { useEffect, useState } from "react";

export default function GridSpotlight() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Respeto a accesibilidad
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let rafId: number;
    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setOpacity(1);
    };

    const handlePointerLeave = () => {
      setOpacity(0);
    };

    const render = () => {
      // Inercia mecánica suave (lerp 0.12)
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      setPosition({
        x: Math.round(currentX),
        y: Math.round(currentY),
      });

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        opacity,
        background: `radial-gradient(550px circle at ${position.x}px ${position.y}px, rgba(61, 123, 255, 0.05), transparent 80%)`,
      }}
    />
  );
}
