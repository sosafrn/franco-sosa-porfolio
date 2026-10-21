"use client";

import { useState, useEffect } from "react";

export default function GridGuidesOverlay() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleToggle = (e: CustomEvent<{ active: boolean }>) => {
      setActive(e.detail.active);
    };

    window.addEventListener("toggle-grid-guides" as unknown as keyof WindowEventMap, handleToggle as EventListener);
    return () => {
      window.removeEventListener("toggle-grid-guides" as unknown as keyof WindowEventMap, handleToggle as EventListener);
    };
  }, []);

  if (!active) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-40 flex justify-center px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-[1440px] w-full h-full grid grid-cols-6 sm:grid-cols-12 gap-0 border-x border-[#3D7BFF]/30">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`h-full border-r border-[#3D7BFF]/15 bg-[#3D7BFF]/[0.015] flex flex-col justify-between p-2 select-none font-mono text-[9px] text-[#3D7BFF]/60 ${
              i >= 6 ? "hidden sm:flex" : "flex"
            }`}
          >
            <div className="flex items-center justify-between">
              <span>C{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[8px] opacity-40">8.33%</span>
            </div>
            <div className="border-t border-[#3D7BFF]/20 pt-1 text-center text-[8px] opacity-50">
              12-COL GRID
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
