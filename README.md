<div align="center">

# FRESS // Portafolio Técnico de Ingeniería
### Franco Emiliano Sosa · Full Stack Developer & Automation Architect

[![Next.js 16](https://img.shields.io/badge/Next.js-16.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![CI/CD](https://img.shields.io/github/actions/workflow/status/sosafrn/franco-sosa-porfolio/deploy.yml?branch=main&label=Deploy%20Pages&style=flat-square)](https://github.com/sosafrn/franco-sosa-porfolio/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-gray?style=flat-square)](LICENSE)

[🌐 Explorar Portafolio en Vivo](https://sosafrn.github.io/franco-sosa-porfolio/) · [📄 Descargar CV (PDF)](https://sosafrn.github.io/franco-sosa-porfolio/cv-franco-sosa.pdf) · [💼 LinkedIn](https://www.linkedin.com/in/francososa21)

</div>

---

## 🧭 Descripción General

Portafolio digital y plataforma técnica de presentación profesional de **Franco Emiliano Sosa**, estudiante de Ingeniería en Sistemas de Información (Universidad Tecnológica Nacional - UTN) y desarrollador Full Stack especializado en arquitectura web moderna, persistencia relacional y automatización de procesos.

El sitio fue concebido bajo la filosofía de diseño **Swiss Technical / Editorial Grid**: una retícula ortogonal sin curvaturas decorativas innecesarias, con jerarquía visual tipográfica, telemetría de sistema en tiempo real y microinteracciones de alto rendimiento.

---

## ⚡ Principios de Ingeniería & Arquitectura

* **Swiss Bento Grid (0px Gutters):** Retícula modular de 1px (`rgb(255 255 255 / 0.10)`) inspirada en la tipografía editorial suiza y consolas técnicas de alta densidad de información.
* **Paleta Cromática de Contraste Controlado:** Base monocromática carbón (`#0A0C10`) con un único punto de atención en azul técnico (`#3D7BFF`) utilizado en menos del 5% del espacio visual.
* **Validación en Tiempo de Ejecución & Tipado Estricto:** Esquemas tipados de extremo a extremo utilizando TypeScript y Zod.
* **Canvas Halftone & Dithering Interactivo:** Renderizado en tiempo real sobre elemento `<canvas>` 2D para visualización de coordenadas de escaneo sin penalizar el hilo principal.
* **Despliegue Continuo Automatizado:** Pipeline CI/CD integrado mediante GitHub Actions para compilación estática y distribución global con GitHub Pages.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnologías | Propósito |
| :--- | :--- | :--- |
| **Frontend Core** | **Next.js 16 (App Router), React 19, TypeScript** | Renderizado estructurado, tipado estricto y componentes cliente/servidor |
| **Estilos & UI** | **Tailwind CSS v4 (Turbopack), Lucide Icons** | Motor de estilos de última generación y sistema iconográfico consistente |
| **Animación & Scroll** | **Motion, Lenis** | Desplazamiento cinético inercial y microinteracciones declarativas |
| **Backend & Validación** | **Node.js, Express, Prisma ORM, Zod** | APIs RESTful, tipado de payloads y mitigación de inyecciones |
| **Persistencia** | **PostgreSQL, SQLite** | Bases de datos relacionales normalizadas y migraciones controladas |
| **Infra & DevOps** | **Docker, GitHub Actions, GitHub Pages** | Contenedores reproducibles, integración continua y despliegues estáticos |

---

## 📂 Estructura del Repositorio

```text
franco-sosa-porfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Pipeline CI/CD para GitHub Pages
├── app/
│   ├── api/contact/route.ts    # Controlador de despacho y validación Zod
│   ├── favicon.ico             # Identidad gráfica
│   ├── globals.css             # Configuración base Tailwind CSS v4 & @theme
│   ├── layout.tsx              # Shell global con fuentes Geist y metadatos SEO
│   ├── not-found.tsx           # Pantalla técnica 404 personalizada
│   └── page.tsx                # Página principal ensamblada por secciones
├── components/
│   ├── FeaturedProject.tsx     # Caso de estudio: LocalFlow 360™
│   ├── FooterSection.tsx       # Consola de despacho, contacto y redes
│   ├── GridGuidesOverlay.tsx   # Retícula vectorial de fondo
│   ├── GridSpotlight.tsx       # Puntero lumínico interactivo
│   ├── Header.tsx              # Barra de navegación con indicador de estado
│   ├── HeroClock.tsx           # Reloj con telemetría horaria UTC-3
│   ├── HeroSection.tsx         # Portada editorial con tipografía de impacto
│   ├── ParticleFlock.tsx       # Simulación de partículas cinéticas ligeras
│   ├── PortraitScanner.tsx     # Retrato técnico con mira ortogonal y canvas
│   ├── ProfileSection.tsx      # Bio profesional, principios de ingeniería y CV
│   ├── ScrambleText.tsx        # Efecto de decodificación de texto al hover
│   ├── SmoothScroll.tsx        # Integración de scroll suave con Lenis
│   ├── TechStackSection.tsx    # Matriz clasificada de tecnologías y roles
│   └── TelemetryTicker.tsx     # Cinta horizontal infinita de telemetría
├── lib/
│   └── motion.ts               # Tokens de movimiento y curvas de animación
├── public/
│   ├── cv-franco-sosa.pdf      # Curriculum Vitae oficial descargable
│   └── *.png / *.svg           # Recursos visuales y retratos en semitono
├── next.config.ts              # Exportación estática, basePath y turbopack
├── package.json                # Dependencias del proyecto
└── tsconfig.json               # Configuración estricta de compilador TypeScript
```

---

## 🚀 Puesta en Marcha Local

### Prerrequisitos
* **Node.js**: `v20.x` o superior
* **npm**: `v10.x` o superior

### 1. Clonar el repositorio
```bash
git clone https://github.com/sosafrn/franco-sosa-porfolio.git
cd franco-sosa-porfolio
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar servidor de desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador para interactuar con la aplicación.

### 4. Compilar para producción (Exportación estática)
```bash
npm run build
```
Los archivos optimizados y listos para producción se generan en la carpeta `/out`.

---

## 📡 Pipeline de Despliegue (CI/CD)

Cada actualización confirmada en la rama `main` ejecuta automáticamente el flujo definido en [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. **Instalación limpia:** Ejecución de `npm ci` sobre entorno Ubuntu.
2. **Compilación estática:** `next build` genera el artefacto en `./out` con rutas base relativas al repositorio.
3. **Distribución:** Publicación directa en los servidores perimetrales de **GitHub Pages**.

---

## 📬 Contacto & Canales Profesionales

* **Email:** [francososa.dev@gmail.com](mailto:francososa.dev@gmail.com)
* **LinkedIn:** [linkedin.com/in/francososa21](https://www.linkedin.com/in/francososa21)
* **GitHub:** [github.com/sosafrn](https://github.com/sosafrn)
* **Ubicación:** Argentina (UTC-3) · Disponibilidad para roles remotos e híbridos

---

<div align="center">
<sub>Diseñado y desarrollado bajo estándares de ingeniería de software por <b>Franco Emiliano Sosa (FRESS)</b>.</sub>
</div>
