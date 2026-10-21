"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "sistema", label: "Sistema" },
  { id: "proyectos", label: "Proyectos" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "stack", label: "Stack" },
  { id: "contacto", label: "Contacto" },
];

export default function Header() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("sistema");
  const [gridActive, setGridActive] = useState<boolean>(false);

  const toggleGridGuides = () => {
    const nextState = !gridActive;
    setGridActive(nextState);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("toggle-grid-guides", { detail: { active: nextState } })
      );
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      // Identificar sección en foco en el viewport
      const sectionElements = SECTIONS.map((s) => ({
        id: s.id,
        el: document.getElementById(s.id),
      })).filter((s) => s.el !== null);

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el) {
          const rect = item.el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const activeItem = SECTIONS.find((s) => s.id === activeSection) || SECTIONS[0];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled
          ? "bg-[#08090D]/95 backdrop-blur-xl border-b border-border shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
          : "bg-background/80 backdrop-blur-md border-b border-border"
      }`}
    >
      {/* Enlace accesible para saltar la navegación con teclado (WCAG 2.4.1) */}
      <a
        href="#sistema"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#3D7BFF] focus:text-white font-mono text-xs uppercase tracking-wider"
      >
        Saltar al contenido principal
      </a>

      {/* Barra de progreso de lectura permanente (1.5px con halo lumínico en #3D7BFF) */}
      <div
        className="absolute bottom-0 left-0 h-[1.5px] bg-[#3D7BFF] shadow-[0_0_8px_rgba(61,123,255,0.7)] transition-[width] duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <div
        className={`max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between text-xs transition-all duration-300 ${
          isScrolled ? "h-12" : "h-14 sm:h-16"
        }`}
      >
        {/* Izquierda: Wordmark sobrio y limpio */}
        <div className="flex items-center">
          <a
            href="#top"
            className="font-mono text-sm tracking-[0.2em] uppercase font-bold text-foreground hover:text-accent transition-colors"
            title="FRESS — Ir al inicio"
          >
            FRESS
          </a>
        </div>

        {/* Centro (Desktop): Navegación tipográfica equilibrada con indicador de sección activa */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-7 lg:gap-10 text-[13px] font-sans tracking-normal"
        >
          {SECTIONS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`group relative inline-flex items-center gap-1.5 h-6 overflow-hidden leading-6 transition-colors ${
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-[#A1A1AA] hover:text-foreground"
                }`}
              >
                {/* Indicador de sección activa: micro-punto azul */}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-[#3D7BFF] shrink-0"
                  />
                )}

                {/* Contenedor de Kinetic Text Roll */}
                <span className="relative inline-block h-6 overflow-hidden">
                  <span className="block transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                    {item.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 block text-[#3D7BFF] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-full group-hover:translate-y-0"
                  >
                    {item.label}
                  </span>
                </span>
              </a>
            );
          })}
        </nav>

        {/* Centro (Mobile): Sección activa minimalista sin saturación */}
        <div className="md:hidden flex items-center gap-2 font-mono text-[11px] text-[#A1A1AA]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3D7BFF]" />
          <span className="text-foreground font-medium">{activeItem.label}</span>
        </div>

        {/* Derecha: Guías de Retícula + Estado de Disponibilidad */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Selector de Guías de Grilla Suiza */}
          <button
            type="button"
            onClick={toggleGridGuides}
            aria-pressed={gridActive}
            aria-label="Activar o desactivar guías de retícula matemática suiza"
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 border text-[11px] font-mono transition-all cursor-pointer ${
              gridActive
                ? "border-[#3D7BFF] bg-[#3D7BFF]/20 text-blue-300 font-semibold"
                : "border-border-subtle bg-surface/50 text-[#A1A1AA] hover:text-foreground hover:border-border"
            }`}
          >
            <span>GUÍAS</span>
            <span className="text-[10px] opacity-70">[{gridActive ? "ON" : "OFF"}]</span>
          </button>

          <div className="flex items-center gap-2 font-mono text-xs text-[#D4D4D8]">
            <span
              className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse"
              aria-hidden="true"
            />
            <span className="tracking-[0.12em] font-medium uppercase text-[11px] sm:text-xs">
              Disponible
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
