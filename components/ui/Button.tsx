"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  accentColor?: "terminal" | "cyan" | "magenta" | "yellow";
  className?: string;
  disabled?: boolean;
  download?: boolean;
}

export function Button({
  children,
  onClick,
  href,
  variant = "primary",
  accentColor = "terminal",
  className = "",
  disabled = false,
  download = false,
}: ButtonProps) {
  const colorMap = {
    terminal: {
      bg: "bg-terminal",
      text: "text-void",
      border: "border-terminal",
      glow: "hover:shadow-[0_0_20px_rgba(0,255,0,0.5)]",
    },
    cyan: {
      bg: "bg-cyan",
      text: "text-void",
      border: "border-cyan",
      glow: "hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]",
    },
    magenta: {
      bg: "bg-magenta",
      text: "text-void",
      border: "border-magenta",
      glow: "hover:shadow-[0_0_20px_rgba(255,0,255,0.5)]",
    },
    yellow: {
      bg: "bg-yellow",
      text: "text-void",
      border: "border-yellow",
      glow: "hover:shadow-[0_0_20px_rgba(255,255,0,0.5)]",
    },
  };

  const colors = colorMap[accentColor];

  const baseStyles = `
    font-pixel text-xs uppercase tracking-wider
    px-6 py-3
    transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-void
  `;

  const variantStyles = {
    primary: `
      ${colors.bg} ${colors.text}
      border-2 ${colors.border}
      ${colors.glow}
      hover:brightness-110
      active:scale-95
    `,
    secondary: `
      bg-transparent ${colors.border} border-2
      text-[color:var(--${accentColor})]
      hover:${colors.bg} hover:${colors.text}
      ${colors.glow}
    `,
    ghost: `
      bg-transparent border-transparent
      text-[color:var(--${accentColor})]
      hover:bg-coal
      hover:border-ash border-2
    `,
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  const MotionComponent = href ? motion.a : motion.button;

  return (
    <MotionComponent
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      href={href}
      download={download}
      disabled={disabled}
      className={combinedStyles}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </MotionComponent>
  );
}
