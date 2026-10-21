import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-xl w-full border border-[var(--border)] p-8 sm:p-12 relative">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border)] font-mono text-xs text-[var(--muted)]">
          <span>ERROR DE ENRUTAMIENTO</span>
          <span className="text-[var(--accent)] font-medium">HTTP 404</span>
        </div>

        <h1 className="text-6xl sm:text-7xl font-semibold tracking-[-0.04em] mb-4 font-mono">
          404
        </h1>

        <p className="text-base text-[var(--muted)] mb-8 leading-relaxed">
          El recurso solicitado no fue encontrado o la ruta fue reestructurada durante la última compilación.
        </p>

        <div className="pt-6 border-t border-[var(--border)] flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-xs tracking-wider bg-[var(--foreground)] text-[var(--background)] px-5 py-3 font-medium hover:bg-[var(--accent)] hover:text-white transition-colors duration-200"
          >
            ← VOLVER AL INICIO
          </Link>
          <span className="font-mono text-[11px] text-[var(--muted)]/50">
            FRESS // SYSTEM
          </span>
        </div>
      </div>
    </main>
  );
}
