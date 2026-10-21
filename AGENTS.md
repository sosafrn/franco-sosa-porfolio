# Directrices del Proyecto: Portafolio Técnico FRESS

Este documento actúa como la fuente de verdad (Single Source of Truth) para la arquitectura de código, diseño e interacción del portafolio técnico de **Franco Emiliano Sosa (FRESS)**.

---

## 1. Filosofía de Diseño: *Swiss Technical / Editorial Grid*

* **Estructura Bento Reticulada:**
  * La pantalla se divide en módulos rectangulares mediante bordes visibles y delgados de `1px` (`rgba(255, 255, 255, 0.10)`).
  * Gutters exteriores en cero (`gutters: 0`). Las celdas se tocan exactamente en los bordes.
  * El espacio negativo (*whitespace*) se aplica estrictamente **dentro** de cada celda (padding amplio y coherente).
* **Paleta Cromática Estricta (Tokens Tailwind v4):**
  * Fondo base (`background`): `#0A0C10` (Negro con leve tinte azul/frío)
  * Superficies y contenedores (`surface`): `#10131A`
  * Hover sutil (`surface-hover`): `#181D26`
  * Bordes principales (`border`): `rgb(255 255 255 / 0.10)`
  * Bordes secundarios (`border-subtle`): `rgb(255 255 255 / 0.05)`
  * Texto primario (`foreground`): `#E8ECF4` (Off-white con alto contraste)
  * Texto secundario/metadatos (`muted`): `rgba(232, 236, 244, 0.55)`
  * **Único color de acento (`accent`):** `#3D7BFF` (Azul técnico / Contraste 5:1 WCAG AA). Reservado exclusivamente para:
    * Tag superior del hero.
    * Indicador pulsante de disponibilidad (`● OPEN TO WORK`).
    * Selección de texto (`::selection`).
    * Micro-detalles de estado crítico o foco intencional.
  * Acento interactivo (`accent-soft`): `#6FA0FF`
  * Acento tenue (`accent-dim`): `rgba(61, 123, 255, 0.15)`
* **Regla de Oro del Acento:**
  * El color azul (`#3D7BFF`) ocupa **estrictamente menos del 5%** de la pantalla. No se utiliza en fondos grandes ni en párrafos.
  * El resto es rigurosa escala de carbón y blanco roto.
  * Dithering o texturas técnicas en **duotono** (`#0A0C10` y `#3D7BFF`).
* **Lo que está ESTRICTAMENTE PROHIBIDO:**
  * ❌ NO usar bordes redondeados estándar (`rounded-xl`, `rounded-2xl`, etc.). Todo debe ser recto (`rounded-none`) o mínimo funcional (`rounded-xs`/`rounded-sm` solo si es un botón específico o píldora de badge).
  * ❌ NO usar sombras difusas (`box-shadow`, `shadow-lg`, etc.). La profundidad la dan los bordes de 1px y los contrastes de tono.
  * ❌ NO usar gradientes azul-violeta, glow artificial o degradados pastel.
  * ❌ NO usar más de un color de acento.
  * ❌ NO hardcodear códigos hexadecimales (`#0d0d0d`, `#ff3333`, etc.) en componentes JSX: usar siempre clases semánticas o variables de tokens.

---

## 2. Tipografía y Microtipografía

* **Titulares y Cuerpo:** `Inter` (cargada con `next/font/google`).
  * Titulares de impacto: Peso Medium (500) o SemiBold (600) con `letter-spacing: -0.02em` (`tracking-[-0.02em]`) para lograr el porte denso de Neue Montreal.
* **Telemetría, Metadatos y Badges:** `Geist Mono` o fuente monospace.
  * Mayúsculas sostenidas (`uppercase`) con tracking amplio (`tracking-[0.2em]` o `0.25em`).
  * Logo / Wordmark: `FRESS` en mayúsculas con `tracking-[0.25em]`.

---

## 3. Dinamismo y Animaciones Funcionales

* **Librería estándar:** `motion` (`motion/react`) en Next.js App Router (requiere `"use client"`).
* **Scroll Reveal:**
  * Utilizado una sola vez en el subtítulo del Hero (`WordReveal`).
  * Opacidad base mínima de `0.35` (garantizando contraste accesible WCAG para personas que leen rápido o usan lectores).
  * Respeto a `prefers-reduced-motion`: Si el usuario prefiere movimiento reducido, el texto se muestra con opacidad 1 inmediatamente.
* **Relojes y Husos Horarios Dinámicos:**
  * Prohibido hardcodear textos como `UTC-3` o horas estáticas.
  * Implementar con `Intl.DateTimeFormat` y actualizar con un intervalo de 1 segundo para mostrar horas reales sincronizadas con el reloj mundial.

---

## 4. Breakpoints y Verificación Responsive

Todo componente debe verse perfecto en:
* **Mobile (375px - 480px):** Las celdas colapsan verticalmente manteniendo los divisores de 1px entre filas.
* **Tablet (768px - 1024px):** Disposición intermedia simétrica.
* **Desktop (1280px - 1440px+):** Bento Grid completo de 12 columnas.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
