"use client";

import { useState, useCallback, useRef, useEffect } from "react";

const GLYPHS = "0123456789_#//&[]<>-+*";

interface ScrambleTextProps {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
}

export default function ScrambleText({
  text,
  className = "",
  triggerOnHover = true,
}: ScrambleTextProps) {
  const [prevText, setPrevText] = useState(text);
  const [displayText, setDisplayText] = useState(text);
  const isScrambling = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mantener displayText sincronizado si el prop text cambia sin triggers en effects
  if (prevText !== text) {
    setPrevText(text);
    setDisplayText(text);
  }

  const triggerScramble = useCallback(() => {
    if (isScrambling.current) return;

    // Respeto estricto a accesibilidad
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    isScrambling.current = true;
    let iteration = 0;
    const maxIterations = text.length * 2.5;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "/" || char === "·" || char === "—") {
              return char;
            }
            if (index < iteration / 2.5) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      iteration += 1;

      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        isScrambling.current = false;
      }
    }, 22);
  }, [text]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span
      onMouseEnter={triggerOnHover ? triggerScramble : undefined}
      className={`inline-block font-mono cursor-default select-none ${className}`}
    >
      {displayText}
    </span>
  );
}
