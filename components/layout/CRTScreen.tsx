"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CRTScreenProps {
  children: ReactNode;
  className?: string;
  showScanlines?: boolean;
  showVignette?: boolean;
  accentColor?: "terminal" | "cyan" | "magenta" | "yellow";
}

export function CRTScreen({
  children,
  className = "",
  showScanlines = true,
  showVignette = true,
  accentColor = "terminal",
}: CRTScreenProps) {
  const glowClass = {
    terminal: "crt-glow",
    cyan: "crt-glow-cyan",
    magenta: "crt-glow-magenta",
    yellow: "crt-glow-yellow",
  }[accentColor];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`
        relative min-h-screen w-full overflow-hidden
        ${glowClass}
        ${showScanlines ? "crt-scanlines" : ""}
        ${showVignette ? "crt-vignette" : ""}
        ${className}
      `}
    >
      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
