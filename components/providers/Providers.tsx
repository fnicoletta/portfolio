"use client";

import { ReactNode } from "react";
import { ModeProvider } from "@/lib/mode-context";

export function Providers({ children }: { children: ReactNode }) {
  return <ModeProvider>{children}</ModeProvider>;
}
