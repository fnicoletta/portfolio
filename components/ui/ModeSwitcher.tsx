"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/lib/mode-context";

export function ModeSwitcher() {
  const { mode, setMode, isLoading } = useMode();
  const [showTooltip, setShowTooltip] = useState(false);

  // Don't show if loading or no mode set yet
  if (isLoading || mode === null) {
    return null;
  }

  const toggleMode = () => {
    setMode(mode === "terminal" ? "gui" : "terminal");
  };

  const isTerminal = mode === "terminal";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-6 right-6 z-40"
    >
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute bottom-full right-0 mb-2 whitespace-nowrap rounded bg-coal px-3 py-1.5 font-terminal text-xs text-silver shadow-lg"
          >
            Switch to {isTerminal ? "Visual" : "Terminal"} mode
            <div className="absolute -bottom-1 right-4 h-2 w-2 rotate-45 bg-coal" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMode}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`group relative flex h-12 w-12 items-center justify-center rounded-full border-2 bg-shadow/80 backdrop-blur-sm transition-all ${
          isTerminal
            ? "border-terminal/50 hover:border-terminal hover:bg-terminal/10"
            : "border-cyan/50 hover:border-cyan hover:bg-cyan/10"
        }`}
        aria-label={`Switch to ${isTerminal ? "visual" : "terminal"} mode`}
      >
        {/* Icon */}
        <span
          className={`font-terminal text-lg transition-colors ${
            isTerminal
              ? "text-terminal/70 group-hover:text-terminal"
              : "text-cyan/70 group-hover:text-cyan"
          }`}
        >
          {isTerminal ? ">_" : "[]"}
        </span>

        {/* Glow ring on hover */}
        <motion.div
          className={`absolute inset-0 rounded-full opacity-0 transition-opacity group-hover:opacity-100 ${
            isTerminal ? "shadow-[0_0_15px_rgba(68,221,119,0.3)]" : "shadow-[0_0_15px_rgba(68,221,221,0.3)]"
          }`}
        />
      </motion.button>
    </motion.div>
  );
}
