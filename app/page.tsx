"use client";

import { motion } from "framer-motion";
import { CRTScreen } from "@/components/layout/CRTScreen";
import { Navigation } from "@/components/layout/Navigation";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { AboutSection } from "@/components/about/AboutSection";
import { LinksSection } from "@/components/links/LinksSection";
export default function Home() {
  return (
    <CRTScreen showScanlines showVignette>
      <Navigation />

      <main id="main-content" className="relative">
        {/* ═══════════════════════════════════════════════════════════════
            SECTION 1: CHAT (Hero)
            ═══════════════════════════════════════════════════════════════ */}
        <section
          id="chat"
          className="section-chat min-h-screen px-4 pt-20 pb-12"
        >
          <div className="mx-auto max-w-4xl">
            {/* Chat Terminal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="h-[600px] overflow-hidden border border-ash bg-shadow"
            >
              <ChatInterface />
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-8 text-center"
            >
              <div className="inline-flex flex-col items-center gap-2 text-smoke">
                <span className="font-terminal text-xs">
                  Scroll to explore more
                </span>
                <motion.span
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-terminal"
                >
                  ▼
                </motion.span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="px-4 py-12">
          <div className="mx-auto max-w-4xl border-t border-ash" />
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2: PROJECTS
            ═══════════════════════════════════════════════════════════════ */}
        <section
          id="projects"
          className="section-projects min-h-screen px-4 py-16"
        >
          <div className="mx-auto max-w-6xl">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-12"
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

        {/* Section Divider */}
        <div className="px-4 py-12">
          <div className="mx-auto max-w-4xl border-t border-ash" />
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 3: ABOUT
            ═══════════════════════════════════════════════════════════════ */}
        <section
          id="about"
          className="section-about min-h-screen px-4 py-16"
        >
          <div className="mx-auto max-w-6xl">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-12"
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

        {/* Section Divider */}
        <div className="px-4 py-12">
          <div className="mx-auto max-w-4xl border-t border-ash" />
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 4: LINKS
            ═══════════════════════════════════════════════════════════════ */}
        <section
          id="links"
          className="section-links min-h-screen px-4 py-16"
        >
          <div className="mx-auto max-w-6xl">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-12"
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
        <footer className="border-t border-ash bg-coal px-4 py-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
              <div className="font-terminal text-xs text-smoke">
                C:\&gt; Franky Khoury © {new Date().getFullYear()}
              </div>

              <div className="font-terminal text-[10px] text-ash">
                Built with Next.js
              </div>
            </div>
          </div>
        </footer>
      </main>
    </CRTScreen>
  );
}
