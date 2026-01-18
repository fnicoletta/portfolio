"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CRTScreen } from "@/components/layout/CRTScreen";
import { ChatInterface } from "@/components/chat/ChatInterface";

export default function TerminalPage() {
  return (
    <CRTScreen showScanlines showVignette>
      <div className="flex h-screen flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-ash bg-coal px-4 py-2">
          <Link
            href="/"
            className="font-terminal text-xs text-smoke transition-colors hover:text-terminal"
          >
            &lt; BACK TO PORTFOLIO
          </Link>
          <span className="font-pixel text-[10px] text-terminal">
            FULL TERMINAL MODE
          </span>
          <div className="font-terminal text-[10px] text-ash">
            [ESC] to exit
          </div>
        </header>

        {/* Full-screen Terminal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-hidden"
        >
          <ChatInterface />
        </motion.div>

        {/* Footer */}
        <footer className="border-t border-ash bg-coal px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="font-terminal text-[10px] text-ash">
              Type &quot;help&quot; for commands
            </div>
            <div className="font-terminal text-[10px] text-smoke">
              PORTFOLIO.SYS v2.0
            </div>
          </div>
        </footer>
      </div>
    </CRTScreen>
  );
}
