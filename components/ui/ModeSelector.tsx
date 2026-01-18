"use client";

import { motion } from "framer-motion";
import { useMode, Mode } from "@/lib/mode-context";

const ASCII_TERMINAL = `
  ┌─────────────┐
  │ C:\\> _      │
  │             │
  │ > READY     │
  └─────────────┘
`;

const ASCII_GUI = `
  ┌─────────────┐
  │ ■ □ ○       │
  ├─────────────┤
  │ ▓▓▓   ════  │
  └─────────────┘
`;

export function ModeSelector() {
  const { mode, setMode, isLoading } = useMode();

  // Don't show if loading or mode is already set
  if (isLoading || mode !== null) {
    return null;
  }

  const handleSelect = (selectedMode: Mode) => {
    setMode(selectedMode);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-void/95 backdrop-blur-sm"
    >
      {/* CRT scanlines overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="relative z-10 mx-4 max-w-3xl"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-2 font-pixel text-lg text-terminal sm:text-xl"
          >
            SELECT MODE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-terminal text-sm text-smoke"
          >
            Choose your preferred experience
          </motion.p>
        </div>

        {/* Mode Options */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Terminal Mode */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect("terminal")}
            className="group relative overflow-hidden border-2 border-terminal/50 bg-shadow p-6 text-left transition-all hover:border-terminal hover:bg-coal"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-terminal/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <pre className="relative mb-4 font-terminal text-xs text-terminal">{ASCII_TERMINAL}</pre>

            <h2 className="relative mb-2 font-pixel text-sm text-terminal">
              TERMINAL
            </h2>
            <p className="relative font-terminal text-xs text-smoke">
              Classic DOS experience with command-line interface
            </p>

            {/* Corner decoration */}
            <div className="absolute bottom-2 right-2 font-terminal text-[10px] text-terminal/50">
              [ENTER]
            </div>
          </motion.button>

          {/* GUI Mode */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect("gui")}
            className="group relative overflow-hidden border-2 border-cyan/50 bg-shadow p-6 text-left transition-all hover:border-cyan hover:bg-coal"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <pre className="relative mb-4 font-terminal text-xs text-cyan">{ASCII_GUI}</pre>

            <h2 className="relative mb-2 font-pixel text-sm text-cyan">
              VISUAL
            </h2>
            <p className="relative font-terminal text-xs text-smoke">
              Modern visual portfolio with animated elements
            </p>

            {/* Corner decoration */}
            <div className="absolute bottom-2 right-2 font-terminal text-[10px] text-cyan/50">
              [ENTER]
            </div>
          </motion.button>
        </div>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center font-terminal text-[10px] text-ash"
        >
          You can switch modes anytime using the button in the corner
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
