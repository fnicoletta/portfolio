"use client";

import { motion } from "framer-motion";
import { CRTScreen } from "@/components/layout/CRTScreen";
import { Navigation } from "@/components/layout/Navigation";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { AboutSection } from "@/components/about/AboutSection";
import { LinksSection } from "@/components/links/LinksSection";
import { ModeSelector } from "@/components/ui/ModeSelector";
import { ModeSwitcher } from "@/components/ui/ModeSwitcher";
import { NormalHero } from "@/components/hero/NormalHero";
import { useMode } from "@/lib/mode-context";

export default function Home() {
  const { mode, isLoading } = useMode();

  // Show loading state briefly
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-void">
        <div className="font-terminal text-sm text-smoke">Loading...</div>
      </div>
    );
  }

  // Terminal mode: Full screen terminal only
  if (mode === "terminal") {
    return (
      <CRTScreen showScanlines showVignette>
        <ModeSelector />
        <ModeSwitcher />
        <div className="flex h-screen flex-col">
          {/* Terminal Header */}
          <header className="flex items-center justify-between border-b border-ash bg-coal px-4 py-2">
            <span className="font-terminal text-xs text-smoke">
              PORTFOLIO.SYS - Franky Khoury
            </span>
            <span className="font-pixel text-[10px] text-terminal">
              TERMINAL MODE
            </span>
            <span className="font-terminal text-[10px] text-ash">
              [640K RAM FREE]
            </span>
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

          {/* Terminal Footer */}
          <footer className="border-t border-ash bg-coal px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="font-terminal text-[10px] text-ash">
                Type &quot;help&quot; for commands
              </div>
              <div className="font-terminal text-[10px] text-smoke">
                <span className="text-cyan">C:\&gt;</span> Franky Khoury <span className="text-terminal">© {new Date().getFullYear()}</span>
              </div>
            </div>
          </footer>
        </div>
      </CRTScreen>
    );
  }

  // GUI mode: Visual portfolio with all sections
  return (
    <CRTScreen showScanlines showVignette>
      <ModeSelector />
      <ModeSwitcher />
      <Navigation />

      <main id="main-content" className="relative">
        {/* ═══════════════════════════════════════════════════════════════
            SECTION 1: HERO
            ═══════════════════════════════════════════════════════════════ */}
        <section
          id="hero"
          className="section-chat px-4 pt-20 pb-8"
        >
          <div className="mx-auto max-w-4xl">
            <NormalHero />

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-4 text-center"
            >
              <div className="inline-flex flex-col items-center gap-2 text-smoke">
                <span className="font-terminal text-xs">
                  Scroll to explore
                </span>
                <motion.span
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-cyan"
                >
                  ▼
                </motion.span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section Divider - Hero to Projects */}
        <div className="px-4 py-8">
          <div className="mx-auto max-w-4xl h-px bg-gradient-to-r from-transparent via-terminal/50 to-transparent" />
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2: PROJECTS
            ═══════════════════════════════════════════════════════════════ */}
        <section
          id="projects"
          className="section-projects px-4 py-12"
        >
          <div className="mx-auto max-w-6xl">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="mb-2 font-terminal text-lg text-cyan md:text-xl">
                ═══ PROJECTS ═══
              </h2>
              <p className="font-terminal text-sm text-smoke">
                A selection of things I&apos;ve built
              </p>
            </motion.div>

            <ProjectGrid />
          </div>
        </section>

        {/* Section Divider - Projects to About */}
        <div className="px-4 py-8">
          <div className="mx-auto max-w-4xl h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 3: ABOUT
            ═══════════════════════════════════════════════════════════════ */}
        <section
          id="about"
          className="section-about px-4 py-12"
        >
          <div className="mx-auto max-w-6xl">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="mb-2 font-terminal text-lg text-magenta md:text-xl">
                ═══ ABOUT ═══
              </h2>
              <p className="font-terminal text-sm text-smoke">
                The human behind the terminal
              </p>
            </motion.div>

            <AboutSection />
          </div>
        </section>

        {/* Section Divider - About to Links */}
        <div className="px-4 py-8">
          <div className="mx-auto max-w-4xl h-px bg-gradient-to-r from-transparent via-magenta/50 to-transparent" />
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 4: LINKS
            ═══════════════════════════════════════════════════════════════ */}
        <section
          id="links"
          className="section-links px-4 py-12"
        >
          <div className="mx-auto max-w-6xl">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="mb-2 font-terminal text-lg text-yellow md:text-xl">
                ═══ LINKS ═══
              </h2>
              <p className="font-terminal text-sm text-smoke">
                Connect & download
              </p>
            </motion.div>

            <LinksSection />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            FOOTER
            ═══════════════════════════════════════════════════════════════ */}
        <footer className="border-t border-yellow/30 bg-coal px-4 py-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
              <div className="font-terminal text-xs">
                <span className="text-cyan">C:\&gt;</span>
                <span className="text-smoke"> Franky Khoury </span>
                <span className="text-terminal">© {new Date().getFullYear()}</span>
              </div>

              <div className="font-terminal text-[10px] text-ash">
                Built with <span className="text-cyan">Next.js</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </CRTScreen>
  );
}
