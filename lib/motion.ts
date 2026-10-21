/**
 * lib/motion.ts
 *
 * Single Source of Truth (SSOT) para tokens de movimiento y animaciones.
 * Estilo: Swiss Technical / Editorial Grid.
 *
 * REGLAS DEL SISTEMA:
 * 1. CSS para hover, pulso y transiciones simples de estado.
 * 2. Motion ÚNICAMENTE para el reveal por scroll.
 * 3. Propiedades animadas: estrictamente `opacity` y `transform` (sin repaints de layout).
 * 4. Un único easing (`EASING`) compartido en todo el sistema.
 * 5. Duraciones centralizadas y tipadas (`DURATION`).
 * 6. Respeto absoluto a `prefers-reduced-motion`.
 */

import type { UseScrollOptions } from "motion/react";

// 1. Un único easing para todo el sistema (curva técnica suiza: aceleración limpia y desaceleración nítida)
export const EASING = [0.16, 1, 0.3, 1] as const;
export const EASING_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";

// 2. Duraciones fijas (en segundos)
export const DURATION = {
  micro: 0.15,
  fast: 0.2,
  base: 0.35,
  reveal: 0.45,
} as const;

// 3. Offsets de scroll para sincronización con el viewport
export type ScrollOffsetType = NonNullable<UseScrollOptions["offset"]>;

export const SCROLL_OFFSETS = {
  hero: ["start 85%", "end 55%"] as ScrollOffsetType,
  section: ["start 90%", "end 60%"] as ScrollOffsetType,
  card: ["start 92%", "end 65%"] as ScrollOffsetType,
};

// 4. Rangos de transformación para Scroll Reveal (Solo opacity y transform)
export const MOTION_RANGES = {
  opacity: {
    initial: 0.35, // Opacidad base con contraste legible accesible
    target: 1.0,
  },
  transformY: {
    initial: 6, // Desplazamiento sutil de 6px en el eje Y
    target: 0,
  },
} as const;

// 5. Configuración de transición compartida
export const MOTION_TRANSITION = {
  duration: DURATION.base,
  ease: EASING,
} as const;
