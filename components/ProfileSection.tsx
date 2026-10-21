import { ArrowUpRight } from "lucide-react";
import ScrambleText from "./ScrambleText";

export default function ProfileSection() {
  const cvPath = `${process.env.NODE_ENV === "production" ? "/franco-sosa-porfolio" : ""}/cv-franco-sosa.pdf`;
  const engineeringPrinciples = [
    {
      number: "01",
      title: "Persistencia Relacional & Integridad de Datos",
      description:
        "Diseño y normalización de bases de datos con MySQL y PostgreSQL. Esquemas tipados con TypeScript y validación estricta para garantizar consistencia transaccional y cero excepciones en tiempo de ejecución.",
    },
    {
      number: "02",
      title: "Automatización de Procesos & Trazabilidad",
      description:
        "Orquestación de flujos desacoplados con n8n, webhooks y APIs REST. Optimización de tiempos operativos, trazabilidad de eventos y sincronización en tiempo real para negocios y centros de servicios.",
    },
    {
      number: "03",
      title: "Arquitectura Modular & Rendimiento Web",
      description:
        "Construcción de interfaces ultrarrápidas en Next.js y React con semántica nativa, carga instantánea, cero layout shifts (CLS = 0) y contraste estricto bajo estándares internacionales WCAG AA.",
    },
  ];

  return (
    <section id="sobre-mi" className="border-b border-border bg-background scroll-mt-14">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Celda Izquierda: Manifiesto & Formación UTN (6 columnas) */}
        <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-border flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <ScrambleText
                text="02 / SOBRE MÍ & ENFOQUE DE INGENIERÍA"
                className="font-mono text-xs uppercase tracking-wider text-[#A1A1AA] font-medium hover:text-foreground transition-colors"
              />
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground leading-tight mb-6">
              Ingeniería de software aplicada a procesos y sistemas reales.
            </h2>

            <div className="space-y-4 text-base sm:text-[17px] text-[#A1A1AA] leading-relaxed max-w-xl">
              <p>
                Soy desarrollador de software y estudiante de Ingeniería en Sistemas de Información en la Universidad Tecnológica Nacional (UTN). Cuento además con formación técnica en administración de bases de datos relacionales, programación en Python y operaciones logísticas.
              </p>
              <p>
                Mi enfoque combina el desarrollo de aplicaciones (Python, Node.js, TypeScript) con la optimización de procesos de negocio: construir sistemas de gestión, ordenar la persistencia de datos y erradicar cuellos de botella manuales mediante automatizaciones robustas.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <a
              href={cvPath}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Descargar Curriculum Vitae en formato PDF"
              className="inline-flex items-center gap-3 px-5 py-3 border border-border text-foreground hover:bg-surface hover:border-white/30 transition-colors text-xs font-mono tracking-wider uppercase font-medium group"
            >
              <span>Descargar Curriculum Vitae (PDF)</span>
              <ArrowUpRight className="w-4 h-4 text-[#3D7BFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
            </a>
            <span className="font-mono text-xs text-[#A1A1AA] tracking-wider">
              UTN — SISTEMAS · EN CURSO
            </span>
          </div>
        </div>

        {/* Celda Derecha: Principios de Ingeniería & Metodología (6 columnas) */}
        <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-between bg-surface/20">
          <div>
            <div className="pb-4 mb-6 border-b border-border">
              <span className="font-mono text-xs uppercase tracking-wider text-foreground font-semibold">
                Principios Operativos
              </span>
            </div>

            <div className="space-y-6">
              {engineeringPrinciples.map((item, idx) => (
                <div key={idx} className="group">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs text-[#3D7BFF] font-semibold">
                      {item.number}
                    </span>
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed pl-6">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-4 border-t border-border-subtle font-mono text-[11px] text-[#A1A1AA] tracking-wider flex items-center justify-between">
            <span>MODALIDAD: REMOTO / HÍBRIDO</span>
            <span className="text-[#3D7BFF]">DISPONIBILIDAD INMEDIATA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
