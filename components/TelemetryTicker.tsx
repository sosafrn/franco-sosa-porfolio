"use client";

export default function TelemetryTicker() {
  const telemetryItems = [
    "SISTEMA: EN LÍNEA",
    "ZONA: BUENOS AIRES (UTC-3)",
    "FORMACIÓN: ING. EN SISTEMAS (UTN)",
    "PERSISTENCIA: MYSQL / POSTGRESQL POOL ACTIVO",
    "LATENCIA DE RED: ~18ms",
    "VALIDACIÓN: ESQUEMAS ZOD ESTRICTOS",
    "AUTOMATIZACIONES: n8n & WEBHOOKS",
    "FRAMEWORK: NEXT.JS APP ROUTER",
    "ESTADO: DISPONIBLE PARA NUEVOS PROYECTOS",
  ];

  const stream = telemetryItems.join("  —  ");

  return (
    <div
      aria-label="Telemetría técnica del sistema en tiempo real"
      className="relative w-full border-y border-border-subtle bg-[#08090D] overflow-hidden py-2 font-mono text-[11px] text-[#A1A1AA] select-none group"
    >
      <div className="flex w-max animate-ticker group-hover:[animation-play-state:paused]">
        <div className="flex items-center whitespace-nowrap gap-8 px-4">
          <span className="flex items-center gap-2 text-foreground font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            TELEMETRÍA EN VIVO
          </span>
          <span className="text-zinc-600">/</span>
          <span className="tracking-wider">{stream}</span>
          <span className="text-[#3D7BFF] font-semibold">●</span>
        </div>
        <div className="flex items-center whitespace-nowrap gap-8 px-4" aria-hidden="true">
          <span className="flex items-center gap-2 text-foreground font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            TELEMETRÍA EN VIVO
          </span>
          <span className="text-zinc-600">/</span>
          <span className="tracking-wider">{stream}</span>
          <span className="text-[#3D7BFF] font-semibold">●</span>
        </div>
      </div>
    </div>
  );
}
