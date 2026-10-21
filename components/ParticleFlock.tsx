"use client";

import { useEffect, useRef } from "react";

interface Boid {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  maxSpeed: number;
  maxForce: number;
}

export default function ParticleFlock() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      active: false,
      speed: 0,
      lastX: -1000,
      lastY: -1000,
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - mouse.lastX;
      const dy = e.clientY - mouse.lastY;
      mouse.speed = Math.hypot(dx, dy);
      mouse.lastX = mouse.x = e.clientX;
      mouse.lastY = mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Inicializar cardumen (Boids)
    const BOID_COUNT = 55;
    const boids: Boid[] = [];
    const colors = [
      "rgba(61, 123, 255, 0.75)", // Azul técnico #3D7BFF
      "rgba(61, 123, 255, 0.45)",
      "rgba(161, 161, 170, 0.6)",  // Zinc #A1A1AA
      "rgba(212, 212, 216, 0.7)",  // Plata #D4D4D8
    ];

    for (let i = 0; i < BOID_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.0 + Math.random() * 1.5;
      boids.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1.2 + Math.random() * 1.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        maxSpeed: 2.2 + Math.random() * 0.8,
        maxForce: 0.06,
      });
    }

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Parámetros de cardumen (Reynolds Boids)
      const visualRange = 75;
      const separationDist = 25;

      for (let i = 0; i < boids.length; i++) {
        const b = boids[i];

        let sepX = 0, sepY = 0;
        let alignX = 0, alignY = 0;
        let cohX = 0, cohY = 0;
        let neighbors = 0;

        for (let j = 0; j < boids.length; j++) {
          if (i === j) continue;
          const other = boids[j];
          const dx = other.x - b.x;
          const dy = other.y - b.y;
          const dist = Math.hypot(dx, dy);

          if (dist < visualRange) {
            // Alineación & Cohesión
            alignX += other.vx;
            alignY += other.vy;
            cohX += other.x;
            cohY += other.y;
            neighbors++;

            // Separación
            if (dist < separationDist && dist > 0) {
              sepX -= (dx / dist) * (1 - dist / separationDist);
              sepY -= (dy / dist) * (1 - dist / separationDist);
            }

            // Dibujar sutil constelación entre peces/estrellas cercanas
            if (dist < 55) {
              const alpha = (1 - dist / 55) * 0.15;
              ctx.strokeStyle = `rgba(61, 123, 255, ${alpha})`;
              ctx.lineWidth = 0.75;
              ctx.beginPath();
              ctx.moveTo(b.x, b.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          }
        }

        if (neighbors > 0) {
          alignX /= neighbors;
          alignY /= neighbors;
          cohX /= neighbors;
          cohY /= neighbors;

          // Fuerzas ponderadas
          b.vx += (alignX - b.vx) * 0.04;
          b.vy += (alignY - b.vy) * 0.04;
          b.vx += ((cohX - b.x) * 0.008);
          b.vy += ((cohY - b.y) * 0.008);
        }

        b.vx += sepX * 0.12;
        b.vy += sepY * 0.12;

        // Comportamiento reactivo al cursor (Cardumen reactivo)
        if (mouse.active) {
          const mdx = mouse.x - b.x;
          const mdy = mouse.y - b.y;
          const mDist = Math.hypot(mdx, mdy);

          if (mDist < 100) {
            // Dispersión / Evasión rápida si el cursor se acerca demasiado (como peces al pasar la mano)
            const repulseFactor = (1 - mDist / 100) * 0.28;
            b.vx -= (mdx / mDist) * repulseFactor * (1 + mouse.speed * 0.05);
            b.vy -= (mdy / mDist) * repulseFactor * (1 + mouse.speed * 0.05);
          } else if (mDist < 300) {
            // Atracción suave / Curiosidad de cardumen a media distancia
            const attractFactor = (1 - mDist / 300) * 0.035;
            b.vx += (mdx / mDist) * attractFactor;
            b.vy += (mdy / mDist) * attractFactor;
          }
        }

        // Suavizar límites de velocidad
        const currentSpeed = Math.hypot(b.vx, b.vy);
        if (currentSpeed > b.maxSpeed) {
          b.vx = (b.vx / currentSpeed) * b.maxSpeed;
          b.vy = (b.vy / currentSpeed) * b.maxSpeed;
        }

        // Actualizar posición
        b.x += b.vx;
        b.y += b.vy;

        // Envoltura toroidal suave en bordes de pantalla
        const margin = 20;
        if (b.x < -margin) b.x = width + margin;
        if (b.x > width + margin) b.x = -margin;
        if (b.y < -margin) b.y = height + margin;
        if (b.y > height + margin) b.y = -margin;

        // Dibujar el pez/estrella (punto táctico con micro-halo)
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.fill();

        // Destello extra sutil en partículas seleccionadas
        if (i % 5 === 0) {
          ctx.fillStyle = "rgba(61, 123, 255, 0.15)";
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.size * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-10 opacity-70"
    />
  );
}
