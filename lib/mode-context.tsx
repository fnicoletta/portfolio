"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Mode = "terminal" | "gui";

interface ModeContextType {
  mode: Mode | null;
  setMode: (mode: Mode) => void;
  isLoading: boolean;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

const STORAGE_KEY = "portfolio-mode";

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Read from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "terminal" || stored === "gui") {
      setModeState(stored);
    }
    setIsLoading(false);
  }, []);

  // Write to localStorage when mode changes
  const setMode = (newMode: Mode) => {
    setModeState(newMode);
    localStorage.setItem(STORAGE_KEY, newMode);
  };

  return (
    <ModeContext.Provider value={{ mode, setMode, isLoading }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
}
