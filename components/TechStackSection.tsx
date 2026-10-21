import ScrambleText from "./ScrambleText";

export default function TechStackSection() {
  const stackColumns = [
    {
      layer: "Capa 01",
      tag: "LÓGICA & BACKEND",
      title: "Backend & Lógica de Negocio",
      description:
        "Desarrollo de servicios robustos, lógica orientada a procesos y APIs RESTful con validación estricta de esquemas y tipado seguro.",
      skills: [
        { name: "Python & Node.js", role: "Runtime de servicios, scripts de datos y APIs REST" },
        { name: "TypeScript & JavaScript", role: "Tipado estricto, interfaces y desarrollo full stack" },
        { name: "APIs REST & Webhooks", role: "Arquitectura orientada a eventos e integración" },
        { name: "Validación Zod", role: "Contratos de datos rigurosos y control de excepciones" },
        { name: "Express & Frameworks", role: "Arquitecturas modulares para microservicios" },
      ],
      footerLeft: "SERVICIOS & APIS",
      footerRight: "TIPADO ESTRICTO",
    },
    {
      layer: "Capa 02",
      tag: "PERSISTENCIA & DATOS",
      title: "Bases de Datos & Persistencia",
      description:
        "Modelado relacional, consultas SQL optimizadas y administración de persistencia con foco en integridad referencial y consistencia.",
      skills: [
        { name: "MySQL & PostgreSQL", role: "Modelado relacional, consultas complejas y vistas" },
        { name: "Administración de Bases de Datos", role: "Consistencia transaccional, normalización y respaldo" },
        { name: "Prisma ORM", role: "Capa de acceso y mapeo de datos con tipado estático" },
        { name: "Estructuras de Datos & Algoritmos", role: "Bases teóricas sólidas y análisis de complejidad" },
        { name: "Trazabilidad de Negocio", role: "Modelado de inventario, stock y flujos de pago" },
      ],
      footerLeft: "SQL & MODELADO",
      footerRight: "INTEGRIDAD DE DATOS",
    },
    {
      layer: "Capa 03",
      tag: "INTERFACES & AUTOMATIZACIÓN",
      title: "Interfaces Web & Procesos",
      description:
        "Construcción de dashboards de gestión en Next.js, orquestación de tareas con n8n y aplicación de metodologías ágiles en equipos.",
      skills: [
        { name: "React & Next.js (App Router)", role: "Paneles de gestión, dashboards y SSR ultrarrápido" },
        { name: "Tailwind CSS", role: "Maquetación sistemática, diseño responsivo y WCAG AA" },
        { name: "n8n & Automatizaciones", role: "Flujos autónomos de eventos y WhatsApp Cloud API" },
        { name: "Metodologías Ágiles (Scrum / Kanban)", role: "Ciclo de vida de software y coordinación operativa" },
        { name: "Git & Despliegues Vercel", role: "Control de versiones, pipelines y entrega continua" },
      ],
      footerLeft: "AUTOMATIZACIÓN & UX",
      footerRight: "METODOLOGÍAS ÁGILES",
    },
  ];

  return (
    <section id="stack" className="border-b border-border bg-background scroll-mt-14">
      {/* Header de la sección */}
      <div className="p-8 sm:p-12 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="mb-2">
            <ScrambleText
              text="03 / STACK TÉCNICO & ESPECIALIZACIÓN"
              className="font-mono text-xs uppercase tracking-wider text-[#A1A1AA] font-medium hover:text-foreground transition-colors"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
            Arquitectura y Herramientas de Desarrollo
          </h2>
        </div>
      </div>

      {/* 3 Columnas simétricas con divisores de 1px y tipografía abierta */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
        {stackColumns.map((col, idx) => (
          <div
            key={idx}
            className="p-8 sm:p-10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-border-subtle">
                <span className="font-mono text-xs text-[#3D7BFF] font-semibold tracking-wider">
                  {col.layer}
                </span>
                <span className="font-mono text-[11px] text-[#A1A1AA] tracking-wider">
                  {col.tag}
                </span>
              </div>

              <h3 className="font-mono text-sm tracking-wider uppercase font-semibold text-foreground mb-3">
                {col.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-6">
                {col.description}
              </p>

              {/* Lista Tipográfica Suiza Abierta con micro-interacción */}
              <div className="divide-y divide-border-subtle">
                {col.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="py-3 group/item flex flex-col transition-transform duration-200 hover:translate-x-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground group-hover/item:text-white transition-colors">
                        {skill.name}
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-border-subtle group-hover/item:bg-[#3D7BFF] transition-colors" />
                    </div>
                    <span className="text-xs text-[#A1A1AA] mt-0.5 leading-normal">
                      {skill.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-border-subtle font-mono text-[10px] text-[#A1A1AA] flex items-center justify-between">
              <span>{col.footerLeft}</span>
              <span>{col.footerRight}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
