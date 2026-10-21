"use client";

import { useState } from "react";
import { ArrowUpRight, Check, CheckCircle2, Copy, Send } from "lucide-react";
import ScrambleText from "./ScrambleText";

type ContactReason = "rol" | "proyecto" | "consulta";

export default function FooterSection() {
  const [reason, setReason] = useState<ContactReason>("rol");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const directEmail = "francososa.dev@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(directEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
    }
  };

  const reasonPlaceholders: Record<ContactReason, string> = {
    rol: "Detalles del puesto, tecnologías principales del stack y modalidad de trabajo (remoto o híbrido)...",
    proyecto: "Breve descripción de la necesidad u objetivo del sistema, tiempos previstos y alcance...",
    consulta: "Escribe tu consulta técnica, propuesta de colaboración o duda profesional...",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage("Por favor completa todos los campos del formulario.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          reason,
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(
          typeof data.error === "string"
            ? data.error
            : "No se pudo despachar el mensaje. Por favor intente nuevamente o utilice el correo directo."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Hubo un error de conexión al despachar el mensaje. Puedes escribirme directamente a " + directEmail
      );
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <footer id="contacto" className="bg-background scroll-mt-14 border-t border-border">
      {/* 1. Header de Sección Editorial */}
      <div className="p-8 sm:px-12 lg:px-16 py-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <ScrambleText
            text="04 / CONTACTO & CONSOLA DIRECTA"
            className="font-mono text-xs uppercase tracking-wider text-[#A1A1AA] font-medium hover:text-foreground transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-[#3D7BFF]">
          <span className="h-2 w-2 rounded-full bg-[#3D7BFF] animate-pulse" aria-hidden="true" />
          <span>Respuesta técnica habitual &lt; 24hs</span>
        </div>
      </div>

      {/* 2. Grilla Principal Asimétrica 7/5 (Espejo del Hero) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-border">
        {/* Columna Izquierda: Consola de Despacho Técnico (7 columnas) */}
        <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-border bg-background">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground leading-tight mb-4">
              Iniciemos una conversación técnica.
            </h2>
            <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed mb-8">
              Completa el formulario para consultar disponibilidad para roles Full Stack, arquitectura de sistemas web o desarrollo de software a medida.
            </p>

            {status === "success" ? (
              <div className="p-8 border border-[#3D7BFF]/40 bg-[#3D7BFF]/10 text-foreground">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-[#3D7BFF]" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Mensaje recibido y validado correctamente
                  </h3>
                </div>
                <p className="text-sm text-[#D4D4D8] leading-relaxed mb-6">
                  Gracias por tu contacto, <span className="text-white font-medium">{name}</span>. Tus requerimientos fueron registrados en el sistema. Franco te responderá a <span className="text-white font-medium">{email}</span> dentro de las próximas 24 horas hábiles.
                </p>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-5 py-2.5 bg-foreground text-background font-mono text-xs uppercase tracking-wider font-semibold hover:bg-white transition-colors cursor-pointer"
                  >
                    Enviar otro mensaje
                  </button>
                  <a
                    href={`mailto:${directEmail}?subject=Seguimiento%20de%20contacto%20-%20${encodeURIComponent(name)}`}
                    className="text-xs font-mono text-[#3D7BFF] hover:underline"
                  >
                    Abrir en cliente de correo local ↗
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Selector de Motivo de Contacto (Chips de 1 clic) */}
                <div>
                  <label className="block font-mono text-xs text-[#A1A1AA] uppercase tracking-wider mb-2.5">
                    Motivo de contacto:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setReason("rol")}
                      className={`px-3.5 py-2 text-xs font-mono transition-all cursor-pointer border ${
                        reason === "rol"
                          ? "border-[#3D7BFF] bg-[#3D7BFF]/15 text-blue-300 font-semibold"
                          : "border-border bg-surface/50 text-[#A1A1AA] hover:text-foreground hover:border-white/20"
                      }`}
                    >
                      Oportunidad Laboral / Rol Técnico
                    </button>
                    <button
                      type="button"
                      onClick={() => setReason("proyecto")}
                      className={`px-3.5 py-2 text-xs font-mono transition-all cursor-pointer border ${
                        reason === "proyecto"
                          ? "border-[#3D7BFF] bg-[#3D7BFF]/15 text-blue-300 font-semibold"
                          : "border-border bg-surface/50 text-[#A1A1AA] hover:text-foreground hover:border-white/20"
                      }`}
                    >
                      Proyecto a Medida
                    </button>
                    <button
                      type="button"
                      onClick={() => setReason("consulta")}
                      className={`px-3.5 py-2 text-xs font-mono transition-all cursor-pointer border ${
                        reason === "consulta"
                          ? "border-[#3D7BFF] bg-[#3D7BFF]/15 text-blue-300 font-semibold"
                          : "border-border bg-surface/50 text-[#A1A1AA] hover:text-foreground hover:border-white/20"
                      }`}
                    >
                      Consulta General
                    </button>
                  </div>
                </div>

                {/* Campos de Entrada Integrados en la Retícula */}
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-mono text-xs text-[#A1A1AA] uppercase tracking-wider mb-2"
                    >
                      Tu nombre u organización <span className="text-[#3D7BFF]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. Sofía Martínez · FinTech Soluciones"
                      className="w-full bg-[#08090D] border border-border px-4 py-3 text-sm text-foreground placeholder:text-zinc-600 focus:outline-none focus:border-[#3D7BFF] transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-mono text-xs text-[#A1A1AA] uppercase tracking-wider mb-2"
                    >
                      Correo electrónico de respuesta <span className="text-[#3D7BFF]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nombre@empresa.com"
                      className="w-full bg-[#08090D] border border-border px-4 py-3 text-sm text-foreground placeholder:text-zinc-600 focus:outline-none focus:border-[#3D7BFF] transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block font-mono text-xs text-[#A1A1AA] uppercase tracking-wider mb-2"
                    >
                      Mensaje o requerimiento técnico <span className="text-[#3D7BFF]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={reasonPlaceholders[reason]}
                      className="w-full bg-[#08090D] border border-border px-4 py-3 text-sm text-foreground placeholder:text-zinc-600 focus:outline-none focus:border-[#3D7BFF] transition-colors resize-y min-h-[110px]"
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3 border border-red-500/40 bg-red-950/20 text-red-300 font-mono text-xs">
                    {errorMessage}
                  </div>
                )}

                {/* Botón de Despacho Asertivo */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-foreground text-background font-mono text-xs uppercase tracking-wider font-semibold hover:bg-white transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {status === "submitting" ? (
                      <>
                        <Send className="w-4 h-4 animate-spin text-background" />
                        <span>Despachando mensaje...</span>
                      </>
                    ) : (
                      <>
                        <span>Despachar mensaje directo</span>
                        <ArrowUpRight className="w-4 h-4 text-background group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>

                  <span className="font-mono text-[11px] text-[#A1A1AA]">
                    Validado con tipado estricto Zod
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Columna Derecha: Ficha de Disponibilidad & Canales Directos (5 columnas) */}
        <div className="lg:col-span-5 p-8 sm:p-12 lg:p-16 flex flex-col justify-between bg-surface/20">
          <div>
            <div className="pb-4 mb-6 border-b border-border">
              <span className="font-mono text-xs uppercase tracking-wider text-foreground font-semibold">
                Ficha Técnica & Coordenadas
              </span>
            </div>

            {/* Datos Clave de Disponibilidad */}
            <div className="font-mono text-xs space-y-3 pb-6 border-b border-border-subtle text-[#D4D4D8]">
              <div className="flex justify-between items-baseline">
                <span className="text-[#A1A1AA]">Titular:</span>
                <span className="text-foreground font-medium text-right">Franco Emiliano Sosa</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[#A1A1AA]">Especialidad:</span>
                <span className="text-foreground font-medium text-right">Software, Datos & Procesos</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[#A1A1AA]">Formación:</span>
                <span className="text-foreground font-medium text-right">Ing. en Sistemas (UTN)</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[#A1A1AA]">Ubicación:</span>
                <span className="text-foreground font-medium text-right">Gran La Plata (Berisso), Bs. As.</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[#A1A1AA]">Zona Horaria:</span>
                <span className="text-foreground font-medium text-right">ART (UTC-3)</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[#A1A1AA]">Modalidad:</span>
                <span className="text-foreground font-medium text-right">Remoto / Híbrido</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[#A1A1AA]">Disponibilidad:</span>
                <span className="text-[#3D7BFF] font-medium text-right">● Inmediata</span>
              </div>
            </div>

            {/* Canales Directos Verificados */}
            <div className="pt-6">
              <span className="font-mono text-xs text-[#A1A1AA] uppercase tracking-wider block mb-3 font-medium">
                Canales directos alternativos:
              </span>

              <div className="space-y-2">
                {/* Correo Electrónico Directo con Copiado Rápido Integrado */}
                <div className="p-3.5 border border-border bg-surface/40 flex items-center justify-between font-mono text-xs group">
                  <div className="overflow-hidden mr-2">
                    <span className="text-[10px] text-[#A1A1AA] block uppercase">Correo Electrónico</span>
                    <a
                      href={`mailto:${directEmail}`}
                      className="text-foreground hover:text-[#3D7BFF] transition-colors truncate block"
                    >
                      {directEmail}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label={copiedEmail ? "Correo copiado" : "Copiar dirección de correo"}
                    className="p-1.5 border border-border-subtle bg-background text-[#A1A1AA] hover:text-foreground hover:border-white/20 transition-all cursor-pointer flex-shrink-0"
                  >
                    {copiedEmail ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <a
                  href="https://www.linkedin.com/in/francososa21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 border border-border bg-surface/40 flex items-center justify-between font-mono text-xs text-foreground hover:border-[#3D7BFF] hover:text-[#3D7BFF] transition-colors group"
                >
                  <div>
                    <span className="text-[10px] text-[#A1A1AA] block uppercase">Red Profesional</span>
                    <span>LinkedIn · francososa21</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#A1A1AA] group-hover:text-[#3D7BFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="https://github.com/sosafrn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 border border-border bg-surface/40 flex items-center justify-between font-mono text-xs text-foreground hover:border-[#3D7BFF] hover:text-[#3D7BFF] transition-colors group"
                >
                  <div>
                    <span className="text-[10px] text-[#A1A1AA] block uppercase">Código Abierto</span>
                    <span>GitHub · sosafrn</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#A1A1AA] group-hover:text-[#3D7BFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="/cv-franco-sosa.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 border border-border bg-surface/40 flex items-center justify-between font-mono text-xs text-foreground hover:border-[#3D7BFF] hover:text-[#3D7BFF] transition-colors group"
                >
                  <div>
                    <span className="text-[10px] text-[#A1A1AA] block uppercase">Documento</span>
                    <span>Curriculum Vitae (PDF)</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#A1A1AA] group-hover:text-[#3D7BFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Garantía de Privacidad */}
          <div className="mt-8 pt-4 border-t border-border-subtle font-mono text-[11px] text-[#A1A1AA] leading-relaxed">
            Privacidad: Los datos ingresados se emplean exclusivamente para responder consultas profesionales. Cero spam, comunicación directa entre partes.
          </div>
        </div>
      </div>

      {/* 3. Barra de Cierre Editorial */}
      <div className="p-6 sm:px-12 flex items-center justify-between font-mono text-xs text-[#A1A1AA]">
        <div>
          <span className="text-foreground font-semibold">FRESS</span> — Franco Emiliano Sosa · Argentina
        </div>
      </div>
    </footer>
  );
}
