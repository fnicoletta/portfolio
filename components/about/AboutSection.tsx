"use client";

import { motion } from "framer-motion";
import { SKILLS, ABOUT_TEXT } from "@/lib/constants";

// Colored skill bar component
function ColoredSkillBar({ level, category }: { level: number; category: string }) {
  const total = 12;
  const filled = level;
  const empty = total - level;

  // Color based on category
  const colorClass = {
    language: "text-cyan",
    framework: "text-magenta",
    tool: "text-yellow",
    other: "text-terminal",
  }[category] || "text-terminal";

  return (
    <span className="font-terminal text-[10px]">
      <span className="text-ash">[</span>
      <span className={colorClass}>{"█".repeat(filled)}</span>
      <span className="text-ash">{"░".repeat(empty)}</span>
      <span className="text-ash">]</span>
    </span>
  );
}

export function AboutSection() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Bio */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex flex-col"
      >
        <div className="mb-4 font-terminal text-xs">
          <span className="text-cyan">C:\FRANKY\</span>
          <span className="text-magenta">ABOUT.TXT</span>
        </div>

        <div className="flex-1 border border-ash bg-coal p-4">
          <div className="mb-4 flex items-center gap-2 border-b border-ash pb-2">
            <span className="font-terminal text-[10px] text-smoke">
              ─── FILE CONTENTS ───
            </span>
          </div>

          <div className="whitespace-pre-wrap font-terminal text-sm leading-relaxed text-silver">
            {ABOUT_TEXT}
          </div>
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex flex-col"
      >
        <div className="mb-4 font-terminal text-xs">
          <span className="text-cyan">C:\FRANKY\</span>
          <span className="text-yellow">SKILLS.DAT</span>
        </div>

        <div className="flex-1 border border-ash bg-coal p-4">
          <div className="mb-4 flex items-center gap-2 border-b border-ash pb-2">
            <span className="font-terminal text-[10px] text-smoke">
              ─── SKILL LEVELS ───
            </span>
          </div>

          <div className="space-y-3">
            {SKILLS.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-terminal text-xs text-silver">
                    {skill.name}
                  </span>
                  <ColoredSkillBar level={skill.level} category={skill.category} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-4 border-t border-ash pt-3">
            <div className="font-terminal text-[10px] text-smoke">
              <span className="text-cyan">█</span> Language{" "}
              <span className="text-magenta">█</span> Framework{" "}
              <span className="text-yellow">█</span> Tool{" "}
              <span className="text-terminal">█</span> Other
            </div>
          </div>
        </div>

        {/* Status */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-4 font-terminal text-xs"
        >
          <span className="text-smoke">STATUS: </span>
          <span className="text-terminal">Available for projects</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
