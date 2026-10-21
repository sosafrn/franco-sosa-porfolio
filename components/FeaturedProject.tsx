"use client";

import { useState } from "react";
import { ArrowUpRight, Play, Terminal, Activity, Check } from "lucide-react";
import ScrambleText from "./ScrambleText";

export default function FeaturedProject() {
  const [activePhase, setActivePhase] = useState(0);
  const [viewMode, setViewMode] = useState<"telemetry" | "diagram">("telemetry");
  const [isTesting, setIsTesting] = useState(false);
  const [measuredLatency, setMeasuredLatency] = useState<number | null>(null);

  const pipeline = [
    {
      step: "01",
      title: "Captación y Rendimiento Web",
      shortDesc: "Interfaz móvil orientada a conversión inmediata",
      fullDesc:
        "Interfaz web móvil de carga ultrarrápida (FCP < 0.8s) construida en Next.js. Elimina fricciones en el contacto inicial y captura datos estructurados del paciente.",
      method: "GET /turnos-online",
      baseLatency: 180,
      badge: "PRODUCCIÓN ACTIVA",
      payload: {
        bundleSize: "42.8 KB",
        fcp: "0.4s",
        mobileScore: "99/100",
        conversionRate: "+38% vs atención manual",
      },
    },
    {
      step: "02",
      title: "Reglas de Negocio & Filtro IA",
      shortDesc: "Triage y clasificación de consultas frecuentes",
      fullDesc:
        "Estructuración de base de conocimiento y límites de respuesta con modelos de lenguaje para calificar prospectos, validar mutuales y responder consultas 24/7.",
      method: "POST /api/v1/ai/triage",
      baseLatency: 310,
      badge: "TRIAGE AUTOMÁTICO",
      payload: {
        intent: "AGENDAR_CONSULTA",
        confidence: 0.992,
        specialty: "Odontología General",
        routingAction: "OPEN_CALENDAR_SLOT",
      },
    },
    {
      step: "03",
      title: "Middleware & Webhooks",
      shortDesc: "Orquestación desacoplada WhatsApp Cloud API",
      fullDesc:
        "Tubería de eventos en Node.js que procesa webhooks entrantes de WhatsApp con validación estricta en Zod y reenvío asíncrono a flujos de automatización.",
      method: "POST /api/webhooks/whatsapp",
      baseLatency: 120,
      badge: "WEBHOOK FIRMADO",
      payload: {
        event: "messages.received",
        signatureSha256: "verified_valid",
        latency: "118ms",
        orchestrator: "n8n_worker_instance",
      },
    },
    {
      step: "04",
      title: "Sincronización de Agenda",
      shortDesc: "Disponibilidad real en Google Calendar",
      fullDesc:
        "Coordinación bidireccional directa con calendarios de especialistas médicos. Generación de confirmaciones instantáneas y recordatorios programados por cron.",
      method: "PATCH /api/calendar/sync",
      baseLatency: 240,
      badge: "CALENDAR CONECTADO",
      payload: {
        calendarEventId: "evt_localflow_8921",
        slotConfirmed: "16:30 ART",
        reminderCronJob: "T-24H_WHATSAPP_DISPATCHED",
        noShowReduction: "-62%",
      },
    },
  ];

  const current = pipeline[activePhase];

  const handleRunSimulation = () => {
    setIsTesting(true);
    setMeasuredLatency(null);

    // Simular tiempo de respuesta de red con jitter hiper-realista
    const jitter = Math.floor(Math.random() * 24) - 12;
    const latencyResult = Math.max(80, current.baseLatency + jitter);

    setTimeout(() => {
      setIsTesting(false);
      setMeasuredLatency(latencyResult);
    }, latencyResult);
  };

  const stackTags = [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "WhatsApp Cloud API",
    "Google Calendar",
    "Zod",
    "n8n",
    "Vercel",
  ];

  return (
    <section id="proyectos" className="border-b border-border bg-background scroll-mt-14">
      {/* Transición editorial entre Hero y Proyectos */}
      <div className="pt-16 sm:pt-20 border-b border-border-subtle px-8 sm:px-12 lg:px-16 pb-5 flex items-center justify-between">
        <ScrambleText
          text="01 / PROYECTOS & CASOS DE ESTUDIO"
          className="text-xs text-[#A1A1AA] tracking-wider uppercase font-medium hover:text-foreground transition-colors"
        />
        <div className="flex items-center gap-2 font-mono text-xs text-[#3D7BFF]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3D7BFF] animate-ping" />
          <span>Telemetría Activa</span>
        </div>
      </div>

      {/* 1. Cabecera del Caso de Estudio */}
      <div className="p-8 sm:p-12 lg:p-16 border-b border-border">
        <div className="max-w-3xl">
          <span className="text-xs font-mono text-accent font-medium mb-3 block">
            Caso de Estudio Destacado
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground leading-tight mb-4">
            LocalFlow 360™ Technologies
          </h2>
          <p className="text-base sm:text-lg text-foreground/90 font-normal leading-relaxed mb-4 border-l border-accent/60 pl-4">
            Ecosistema web de captación y automatización conversacional para clínicas médicas y centros de servicios profesionales.
          </p>
          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
            Los centros de salud locales pierden hasta un 40% de consultas por falta de atención inmediata fuera de horario comercial. LocalFlow 360™ resuelve este cuello de botella integrando una interfaz web ligera con agentes conectados a WhatsApp Cloud API y Google Calendar, asegurando confirmación instantánea de turnos y recordatorios automáticos.
          </p>
        </div>
      </div>

      {/* 2. Artefacto de Ingeniería: Simulador de Pipeline Técnico */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-border">
        {/* Selector de Fases (5 columnas) */}
        <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-border divide-y divide-border">
          <div className="p-4 sm:px-8 sm:py-5 bg-surface/30 flex items-center justify-between font-mono text-xs text-[#A1A1AA]">
            <span>Flujo de integración</span>
            <span>4 fases</span>
          </div>

          {pipeline.map((p, idx) => {
            const isActive = activePhase === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setActivePhase(idx);
                  setMeasuredLatency(null);
                }}
                className={`w-full text-left p-6 sm:p-7 transition-all flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? "bg-surface/90 border-l-2 border-l-accent text-foreground"
                    : "hover:bg-surface/30 text-[#A1A1AA] hover:text-foreground"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-mono text-xs font-semibold text-accent">
                    Fase {p.step}
                  </span>
                  <span
                    className={`font-mono text-[10px] px-2 py-0.5 border ${
                      isActive
                        ? "border-[#3D7BFF]/60 bg-[#3D7BFF]/20 text-blue-300 font-semibold"
                        : "border-border-subtle text-[#A1A1AA]"
                    }`}
                  >
                    {p.badge}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1">
                  {p.title}
                </h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  {p.shortDesc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Consola Técnica Interactiva / Inspector de Eventos (7 columnas) */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-[#08090D] relative overflow-hidden">
          <div>
            {/* Barra superior de la consola con selector de modo */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-border-subtle font-mono text-xs gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-foreground">
                  <Terminal className="w-4 h-4 text-accent" />
                  <span className="font-semibold">telemetry_inspector.log</span>
                </div>

                {/* Selector de Modo: JSON vs Diagrama de Flujo */}
                <div className="flex items-center border border-border-subtle bg-surface/60 p-0.5 text-[10px]">
                  <button
                    type="button"
                    onClick={() => setViewMode("telemetry")}
                    className={`px-2 py-0.5 transition-colors cursor-pointer ${
                      viewMode === "telemetry"
                        ? "bg-[#3D7BFF]/25 text-blue-200 font-semibold"
                        : "text-[#A1A1AA] hover:text-foreground"
                    }`}
                  >
                    JSON
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("diagram")}
                    className={`px-2 py-0.5 transition-colors cursor-pointer ${
                      viewMode === "diagram"
                        ? "bg-[#3D7BFF]/25 text-blue-200 font-semibold"
                        : "text-[#A1A1AA] hover:text-foreground"
                    }`}
                  >
                    Diagrama
                  </button>
                </div>
              </div>

              {/* Botón de Disparo de Prueba en Vivo */}
              <button
                type="button"
                onClick={handleRunSimulation}
                disabled={isTesting}
                aria-label="Ejecutar prueba de latencia en tiempo real para esta fase"
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface border border-border text-[#D4D4D8] hover:border-[#3D7BFF] hover:text-[#3D7BFF] text-[11px] font-mono transition-all cursor-pointer disabled:opacity-50"
              >
                {isTesting ? (
                  <>
                    <Activity className="w-3.5 h-3.5 animate-spin text-[#3D7BFF]" />
                    <span>Resolviendo ping...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#3D7BFF]" />
                    <span>Testear Latencia</span>
                  </>
                )}
              </button>
            </div>

            {/* Descripción técnica de la fase activa */}
            <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-6">
              {current.fullDesc}
            </p>

            {viewMode === "diagram" ? (
              /* Vista Diagrama de Flujo Interactivo con Data Packet Tracer */
              <div className="p-4 sm:p-6 border border-border-subtle bg-[#050608] font-mono text-xs mb-6">
                <div className="text-[#A1A1AA] text-[11px] mb-3 flex items-center justify-between">
                  <span>{"// Tubería de eventos en tiempo real (clic para inspeccionar nodo):"}</span>
                  <span className="text-blue-300 font-medium">Tubería e2e</span>
                </div>

                {/* Canal de Telemetría Dinámico con Trazador de Paquetes */}
                <div className="relative mb-5 p-3.5 border border-border-subtle bg-[#08090D] overflow-hidden">
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-2 font-mono">
                    <span>F01: INGEST</span>
                    <span>F02: TRIAGE</span>
                    <span>F03: DISPATCH</span>
                    <span>F04: PERSIST</span>
                  </div>

                  <div className="relative h-2 w-full bg-surface border border-border-subtle overflow-hidden">
                    {/* Riel de transmisión */}
                    <div
                      className="absolute top-0 bottom-0 left-0 bg-[#3D7BFF] transition-all duration-300"
                      style={{ width: `${((activePhase + 1) / 4) * 100}%` }}
                    />
                    {/* Paquete de datos en tránsito si isTesting está activo */}
                    {isTesting && (
                      <div className="absolute top-0 bottom-0 w-16 bg-gradient-to-r from-transparent via-white to-transparent animate-tracer" />
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  {pipeline.map((p, idx) => {
                    const isSelected = activePhase === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          setActivePhase(idx);
                          setMeasuredLatency(null);
                        }}
                        className={`p-3.5 border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                          isSelected
                            ? "border-[#3D7BFF] bg-[#3D7BFF]/15 text-white"
                            : "border-border-subtle bg-surface/40 hover:border-border text-[#A1A1AA] hover:text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-mono text-xs font-bold px-1.5 py-0.5 border ${
                              isSelected
                                ? "border-[#3D7BFF] bg-[#3D7BFF]/25 text-blue-200"
                                : "border-border-subtle text-zinc-500"
                            }`}
                          >
                            {p.step}
                          </span>
                          <div>
                            <span className="font-semibold text-xs text-foreground block">
                              {p.title}
                            </span>
                            <span className="text-[11px] text-[#A1A1AA]">
                              {p.method}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-[10px]">
                          <span className="px-2 py-0.5 border border-border-subtle bg-background text-zinc-400">
                            {p.badge}
                          </span>
                          {isSelected && (
                            <span className="text-emerald-400 font-semibold flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              ACTIVO
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 pt-3 border-t border-border-subtle text-[11px] text-[#A1A1AA] flex items-center justify-between">
                  <span>Protocolo: Webhooks HTTPS + Validación Zod</span>
                  <span className="text-blue-300 font-medium">Fase {current.step} en foco</span>
                </div>
              </div>
            ) : (
              /* Vista Telemetría JSON */
              <>
                {/* Endpoint / Petición simulada */}
                <div className="p-4 border border-border-subtle bg-surface/50 font-mono text-xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 bg-[#3D7BFF]/25 text-blue-200 font-bold text-[11px]">
                      {current.method.split(" ")[0]}
                    </span>
                    <span className="text-foreground font-medium">
                      {current.method.split(" ")[1]}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isTesting ? (
                      <span className="text-amber-400 font-medium text-[11px] animate-pulse">
                        EN PROCESO...
                      </span>
                    ) : measuredLatency ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-[11px] bg-emerald-950/30 px-2 py-0.5 border border-emerald-500/30">
                        <Check className="w-3 h-3" />
                        200 OK · {measuredLatency}ms REAL
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-medium text-[11px]">
                        200 OK · {current.baseLatency}ms
                      </span>
                    )}
                  </div>
                </div>

                {/* Payload JSON de salida */}
                <div className="p-5 border border-border-subtle bg-[#050608] font-mono text-xs overflow-x-auto relative">
                  {isTesting && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#3D7BFF] to-transparent animate-pulse" />
                  )}
                  <div className="flex items-center justify-between text-[#A1A1AA] mb-2 font-semibold text-[11px]">
                    <span>{"// Contrato de datos verificado:"}</span>
                    <span className="text-[10px] text-zinc-500 font-normal">
                      {measuredLatency
                        ? `Latencia medida: ${measuredLatency}ms`
                        : "Estado: Sincronizado"}
                    </span>
                  </div>
                  <pre className="text-emerald-400/90 text-xs leading-relaxed">
                    {JSON.stringify(current.payload, null, 2)}
                  </pre>
                </div>
              </>
            )}
          </div>

          <div className="mt-8 pt-4 border-t border-border-subtle font-mono text-[11px] text-[#A1A1AA] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>SISTEMA: OPERATIVO</span>
            </span>
            <span className="text-accent font-semibold">FASE {current.step} SELECCIONADA</span>
          </div>
        </div>
      </div>

      {/* 3. Ficha Técnica Editorial & Acciones */}
      <div className="p-8 sm:px-12 lg:px-16 py-8 bg-background flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-border">
        <div>
          <span className="font-mono text-xs text-[#A1A1AA] block mb-2">
            Tecnologías aplicadas en el caso de estudio:
          </span>
          <p className="font-mono text-xs text-foreground/90 tracking-wide">
            {stackTags.join(" · ")}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <a
            href="#contacto"
            className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 border border-border bg-surface text-xs font-sans font-medium text-foreground hover:border-accent transition-colors"
          >
            <span>Consultar Arquitectura</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#A1A1AA]" aria-hidden="true" />
          </a>

          <a
            href="#contacto"
            className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 border border-accent bg-accent text-xs font-sans font-semibold text-background hover:bg-white hover:border-white transition-colors"
          >
            <span>Solicitar Demo</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-background" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* 4. Arquitecturas de Proyectos Secundarios (Esquemas Reales en Desarrollo) */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        {/* Proyecto 02: Sistema de Gestión & Logística */}
        <div className="p-8 sm:p-12 bg-surface/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#A1A1AA] mb-3">
              <span className="text-blue-300 font-semibold">02 // ARQUITECTURA EN CURSO</span>
              <span className="px-2 py-0.5 border border-border-subtle bg-surface text-[10px] text-zinc-400">
                FASE: DESARROLLO
              </span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Sistema de Gestión & Logística Operativa
            </h3>
            <p className="text-sm text-[#A1A1AA] leading-relaxed mb-5">
              Plataforma web modular para seguimiento de stock crítico, control de proveedores y despacho logístico con trazabilidad de eventos.
            </p>

            {/* Esquema Arquitectónico Monoespaciado */}
            <div className="p-3.5 border border-border-subtle bg-[#08090D] font-mono text-[11px] text-[#D4D4D8] mb-4">
              <div className="text-[#A1A1AA] text-[10px] uppercase mb-1.5">
                {"// Tubería de flujo:"}
              </div>
              <div className="text-blue-300 truncate">
                [UI Next.js] ➔ [Validación Zod] ➔ [PostgreSQL Pool]
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border-subtle font-mono text-xs text-[#A1A1AA] flex items-center justify-between">
            <span>Stack: React · TypeScript · PostgreSQL</span>
            <span className="text-[11px] text-zinc-500">API REST</span>
          </div>
        </div>

        {/* Proyecto 03: Motor de Integración de Datos */}
        <div className="p-8 sm:p-12 bg-surface/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#A1A1AA] mb-3">
              <span className="text-blue-300 font-semibold">03 // ESPECIFICACIÓN TÉCNICA</span>
              <span className="px-2 py-0.5 border border-border-subtle bg-surface text-[10px] text-zinc-400">
                FASE: PROTOTIPO
              </span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Motor de Integración & Ingesta de Datos
            </h3>
            <p className="text-sm text-[#A1A1AA] leading-relaxed mb-5">
              Servicios backend desacoplados para sincronización entre sistemas legados de facturación y bases relacionales mediante colas asíncronas.
            </p>

            {/* Esquema Arquitectónico Monoespaciado */}
            <div className="p-3.5 border border-border-subtle bg-[#08090D] font-mono text-[11px] text-[#D4D4D8] mb-4">
              <div className="text-[#A1A1AA] text-[10px] uppercase mb-1.5">
                {"// Contrato de ingestión:"}
              </div>
              <div className="text-blue-300 truncate">
                POST /v1/ingest ➔ [Queue Workers] ➔ [Sink Relacional]
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border-subtle font-mono text-xs text-[#A1A1AA] flex items-center justify-between">
            <span>Stack: Node.js · Express · Docker</span>
            <span className="text-[11px] text-zinc-500">OpenAPI 3.1</span>
          </div>
        </div>
      </div>
    </section>
  );
}
