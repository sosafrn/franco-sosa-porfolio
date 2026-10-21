# Directrices Operativas del Proyecto (FRESS Portfolio)

Este archivo actúa como la fuente de verdad (Single Source of Truth) para Claude Code, Antigravity y cualquier agente de IA que opere sobre este repositorio. Define las reglas no negociables de diseño, tokens, tipografía y flujo de verificación.

---

## 1. Stack Tecnológico

* **Framework:** Next.js (App Router con Turbopack, React 19).
* **Lenguaje:** TypeScript (validación estricta, tipos explícitos).
* **Estilos:** Tailwind CSS v4 (`@import "tailwindcss"` con directiva `@theme`).
* **Animaciones:** Motion (`motion/react`).
* **Calidad y Testing:** Playwright (inspección visual headless), ESLint, Lighthouse.

---

## 2. Filosofía de Diseño & Contenido

* **Estilo:** *Swiss Technical / Editorial Grid*.
* **Idioma:** **Español al 100%** en todo el portafolio (títulos, subtítulos, etiquetas técnicas, botones y metadatos). Prohibido mezclar con Spanglish o dejar etiquetas sueltas en inglés.
* **Modo:** **Oscuro únicamente** (Dark neutral / Carbono con tinte frío). No implementar modo claro.
* **Jerarquía:** Un solo elemento "protagonista" visual por pantalla.
* **Estructura Bento Reticulada:**
  * Módulos rectangulares delimitados por bordes visibles y delgados de `1px` (`border-border`).
  * Gutters exteriores en cero (`gutters: 0`). Las celdas se tocan exactamente en sus bordes.
  * El aire y espacio negativo se aplican estrictamente **dentro** de cada celda.
* **Datos Reales Verificados (Cero claims sin respaldo):**
  * Titular: *"Soy Franco Sosa, desarrollador full stack. Construyo aplicaciones web y sistemas de gestión para empresas y organismos que necesitan ordenar sus procesos."*
  * Formación: Estudiante de Ingeniería en Sistemas de Información — Universidad Tecnológica Nacional (UTN).
  * Ubicación: Berisso / Gran La Plata, Buenos Aires, Argentina.
  * GitHub: `https://github.com/sosafrn`
  * LinkedIn: `https://www.linkedin.com/in/francososa21`
  * Email: `francososa.dev@gmail.com`

---

## 3. Tokens de Color Oficiales

| Rol | Hex / Valor | Uso |
|---|---|---|
| `background` | `#0A0C10` | Fondo general. Negro con leve matiz frío/azul |
| `surface` | `#10131A` | Celdas secundarias del bento, tarjetas y aside |
| `surface-hover` | `#181D26` | Estado hover de tarjetas y celdas interactivas |
| `border` | `rgb(255 255 255 / 0.10)` | Líneas de 1px de la grilla principal |
| `border-subtle` | `rgb(255 255 255 / 0.05)` | Divisores secundarios de 1px |
| `foreground` | `#E8ECF4` | Titulares y texto principal (alto contraste) |
| `muted` | `rgba(232, 236, 244, 0.55)` | Metadatos, labels y texto secundario |
| `accent` | `#3D7BFF` | Etiqueta del hero, dot de disponibilidad, selección y hover |
| `accent-soft` | `#6FA0FF` | Hover o estado activo del acento |
| `accent-dim` | `rgba(61, 123, 255, 0.15)` | Fondo sutil de chips o celdas destacadas |

### Configuración de Tailwind v4 (`app/globals.css`)
```css
@theme {
  --color-background: #0A0C10;
  --color-surface: #10131A;
  --color-surface-hover: #181D26;
  --color-border: rgb(255 255 255 / 0.10);
  --color-border-subtle: rgb(255 255 255 / 0.05);
  --color-foreground: #E8ECF4;
  --color-muted: rgba(232, 236, 244, 0.55);
  --color-accent: #3D7BFF;
  --color-accent-soft: #6FA0FF;
  --color-accent-dim: rgba(61, 123, 255, 0.15);
}
```

> [!CAUTION]
> **PROHIBIDO USAR CÓDIGOS HEXADECIMALES SUELTOS EN LOS COMPONENTES JSX:**
> Utilizar siempre las clases semánticas de Tailwind (`bg-background`, `bg-surface`, `bg-surface-hover`, `text-foreground`, `text-muted`, `text-accent`, `border-border`, `border-border-subtle`, `selection:bg-accent`, etc.).

---

## 4. Tipografía y Microtipografía

* **Titulares y Cuerpo:** `Inter` cargada vía `next/font/google`.
  * Titulares: Peso Medium (500) o SemiBold (600) con `tracking-[-0.02em]` (`letter-spacing: -0.02em`).
* **Telemetría y Metadatos:** `Geist Mono` o monospace.
  * Mayúsculas sostenidas (`uppercase`) con tracking amplio (`tracking-[0.2em]`).
  * Logo / Wordmark: `FRESS` con `tracking-[0.25em]`.
  * Mayúsculas amplias reservadas **exclusivamente** para logo, badges de estado y telemetría técnica.

---

## 5. Restricciones Absolutas (Lo que está ESTRICTAMENTE PROHIBIDO)

* ❌ **NO usar bordes redondeados estándar:** Prohibido `rounded-xl`, `rounded-2xl`, `rounded-full` (salvo dot de status/reloj). Todo es ortogonal y recto (`rounded-none`).
* ❌ **NO usar sombras difusas:** Prohibido `box-shadow`, `shadow-lg`, etc. La profundidad la otorgan los bordes de 1px y los saltos tonales entre `background` y `surface`.
* ❌ **NO usar gradientes:** Prohibido gradientes multicolor, degradados pastel o fondos difuminados.
* ❌ **NO usar glow artificial:** Nada de resplandores o halos de neón tipo template genérico de IA.
* ❌ **NO usar un segundo color de acento:** No agregar verde, violeta o naranja. Todo elemento de foco usa exclusivamente el azul `#3D7BFF`.
* ❌ **Regla del 5%:** El color de acento azul (`#3D7BFF`) ocupa **estrictamente menos del 5%** de la superficie de la pantalla. No usar en párrafos ni en fondos amplios.
* ❌ **Tratamiento gráfico:** Dithering o tramas técnicas en **duotono** (`#0A0C10` y `#3D7BFF`).

---

## 6. Animaciones, Movimiento y Accesibilidad

* **Tokens Centralizados (`lib/motion.ts`):** Todas las duraciones, el único easing (`[0.16, 1, 0.3, 1]`) y los offsets provienen estrictamente de `lib/motion.ts`.
* **Regla de Separación:**
  * CSS para hover (`transition-colors`, `hover:bg-surface-hover`), pulso del badge de disponibilidad (`animate-pulse`) y transiciones simples de 150-200ms.
  * Motion ÚNICAMENTE para el reveal por scroll del Hero (una sola vez) y entradas de 400-600ms.
* **Propiedades Permitidas:** Estrictamente `opacity` y `transform` (sin repaints ni layouts costosos).
* **Respeto a `prefers-reduced-motion`:** En toda animación (incluyendo `WordReveal` con Motion), si el usuario tiene activado movimiento reducido, renderizar el estado estático visible de inmediato.
* **Scroll Reveal:** Opacidad mínima base de `0.35` (nunca inferior a 0.3) para garantizar contraste accesible WCAG en lectura rápida o lectores de pantalla.
* **Contraste de Texto sobre Acento:** Todo botón o badge con fondo `bg-accent` (`#3D7BFF`) debe llevar texto oscuro `text-background` (`#0A0C10`) para mantener un ratio de contraste de `5.56:1`, superando la exigencia WCAG AA (`4.5:1`).
* **Relojes en vivo:** Dinámicos con `Intl.DateTimeFormat` e intervalo de 1s (prohibido hardcodear offsets estáticos como `UTC-3`).

---

## 7. Protocolo de Verificación Obligatorio

Antes de dar por finalizada cualquier tarea de UI o cambio de layout:
1. **Compilación Limpia:** Ejecutar `npm run build` (Turbopack debe compilar sin errores de tipos).
2. **Linter:** Ejecutar `npm run lint` (0 errores y 0 warnings).
3. **Auditoría de Cero Hex:** Verificar que no existan hex residuales en JSX (`grep -rn "#0d0d0d\|#ff3333" app components`).
4. **Capturas Visuales Responsive:** Verificar en un navegador real con Playwright a 3 resoluciones críticas:
   * **Mobile:** `375px × 667px`
   * **Tablet:** `768px × 1024px`
   * **Desktop:** `1440px × 900px`
