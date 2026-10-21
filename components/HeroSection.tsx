import PortraitScanner from "@/components/PortraitScanner";
import HeroClock from "@/components/HeroClock";

export default function HeroSection() {
  return (
    <section id="sistema" className="border-b border-border bg-background scroll-mt-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Celda Principal: Hero & Propuesta de Valor (8 columnas) */}
        <div className="lg:col-span-8 px-8 sm:px-12 lg:px-16 pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-12 border-b lg:border-b-0 lg:border-r border-border flex flex-col justify-between">
          {/* Bloque de Contenido: Ancho de medida expandido para escala monumental */}
          <div className="max-w-[760px]">
            {/* Nivel 1: Titular Protagonista a Escala Monumental (Awwwards SOTD) */}
            <div className="overflow-hidden">
              <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-bold tracking-[-0.03em] leading-[0.98] text-foreground">
                Franco Sosa — desarrollador full stack.
              </h1>
            </div>

            {/* Nivel 2: Bajada en 20-24px orientada a Software & Procesos */}
            <p className="text-xl sm:text-2xl text-foreground/90 font-normal leading-snug mt-4 sm:mt-5">
              Desarrollo software, automatizo procesos y modelo sistemas de gestión.
            </p>

            {/* Párrafo Conciso sin degradados ni bugs de contraste (2 líneas, #A1A1AA, 17-18px) */}
            <p className="text-[17px] sm:text-lg text-[#A1A1AA] leading-[1.6] mt-6 sm:mt-8">
              Estudiante de Ingeniería en Sistemas de Información (UTN). Construyo soluciones para ordenar procesos de negocio: interfaces rápidas, validación rigurosa de esquemas y flujos autónomos de eventos.
            </p>
          </div>

          {/* Línea Inferior Sobria: Coordenadas Reales & Reloj Oficial */}
          <div className="mt-16 sm:mt-20 pt-6 flex items-center justify-between font-mono text-xs text-[#A1A1AA] tracking-[0.14em]">
            <HeroClock />
            <span className="text-[#A1A1AA]">Software & Procesos</span>
          </div>
        </div>

        {/* Celda Lateral: Retrato & Ficha Técnica Alineados al Titular (4 columnas) */}
        <aside className="lg:col-span-4 px-8 sm:px-10 lg:px-12 pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-12 flex flex-col justify-between bg-surface/20">
          {/* Módulo Superior: Retrato con Dither Shader & Escaneo Táctico en Canvas 2D */}
          <div className="w-full">
            <PortraitScanner />
          </div>

          {/* Ficha Técnica: Coordenadas Reales UTN */}
          <div className="mt-8 sm:mt-10 pt-6 font-mono text-xs space-y-2.5 text-[#D4D4D8]">
            <div className="flex justify-between items-baseline">
              <span className="text-[#A1A1AA]">Formación:</span>
              <span className="text-foreground font-medium text-right">Ing. en Sistemas (UTN)</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-[#A1A1AA]">Stack:</span>
              <span className="text-foreground font-medium text-right">Python, TypeScript, SQL, Node.js</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
