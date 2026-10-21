"use client";

import { useEffect, useState } from "react";

export default function HeroClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        new Intl.DateTimeFormat("es-AR", {
          timeZone: "America/Argentina/Buenos_Aires",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now)
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs text-[#A1A1AA] tracking-[0.14em]">
      <span>Argentina</span>
      <span className="text-zinc-600">·</span>
      <span className="text-foreground font-semibold min-w-[56px] tracking-normal">
        {time || "—:—:—"}
      </span>
      <span className="text-[10px] text-zinc-500">ART</span>
    </span>
  );
}
