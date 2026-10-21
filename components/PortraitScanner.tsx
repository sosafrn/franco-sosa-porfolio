"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function PortraitScanner() {
  const basePath = process.env.NODE_ENV === "production" ? "/franco-sosa-porfolio" : "";
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  // Redimensionar el canvas con resolución exacta 1:1
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current && canvasRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        canvasRef.current.width = rect.width;
        canvasRef.current.height = rect.height;
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Dibujar la trama dithered reactiva al cursor
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (coords) {
      const mouseX = coords.x * canvas.width;
      const mouseY = coords.y * canvas.height;
      const radius = 135;
      const step = 14;

      // 1. Matriz de semitonos reactiva (Dither Halftone)
      ctx.fillStyle = "#3D7BFF";
      const startX = Math.max(0, Math.floor((mouseX - radius) / step) * step);
      const endX = Math.min(canvas.width, Math.ceil((mouseX + radius) / step) * step);
      const startY = Math.max(0, Math.floor((mouseY - radius) / step) * step);
      const endY = Math.min(canvas.height, Math.ceil((mouseY + radius) / step) * step);

      for (let x = startX; x <= endX; x += step) {
        for (let y = startY; y <= endY; y += step) {
          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < radius) {
            const intensity = 1 - dist / radius;
            ctx.globalAlpha = intensity * 0.75;
            const pointRadius = Math.max(1, intensity * 2.5);
            ctx.beginPath();
            ctx.arc(x, y, pointRadius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 2. Guías ortogonales (Mira X / Y de 1px)
      ctx.strokeStyle = "rgba(61, 123, 255, 0.55)";
      ctx.lineWidth = 1;
      ctx.globalAlpha = 1;

      // Línea horizontal
      ctx.beginPath();
      ctx.moveTo(0, mouseY);
      ctx.lineTo(canvas.width, mouseY);
      ctx.stroke();

      // Línea vertical
      ctx.beginPath();
      ctx.moveTo(mouseX, 0);
      ctx.lineTo(mouseX, canvas.height);
      ctx.stroke();

      // Micro-mira en el cursor
      ctx.strokeStyle = "#3D7BFF";
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 9, 0, Math.PI * 2);
      ctx.stroke();
    }
  }, [coords]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setCoords({ x, y });
  };

  const handlePointerLeave = () => {
    setCoords(null);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative aspect-[4/5] w-full border border-border bg-[#050608] overflow-hidden group cursor-crosshair select-none"
    >
      <Image
        src={`${basePath}/franco-sosa-portrait-bw.png`}
        alt="Franco Sosa — Desarrollador Full Stack"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 360px"
        className={`object-cover object-center transition-all duration-300 ${
          coords ? "scale-[1.03] contrast-105" : "scale-100"
        }`}
      />

      {/* Lienzo Canvas 2D ultra-liviano para semitono interactivo */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Lectura táctica de coordenadas en tiempo real */}
      {coords && (
        <div className="absolute bottom-2 left-2 z-20 px-2 py-1 bg-background/90 backdrop-blur-md border border-[#3D7BFF]/40 font-mono text-[9px] text-blue-300 tracking-wider">
          X: {(coords.x * 100).toFixed(0)}% · Y: {(coords.y * 100).toFixed(0)}%
        </div>
      )}
    </div>
  );
}
