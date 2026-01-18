"use client";

import { motion } from "framer-motion";
import { SKILLS, ABOUT_TEXT } from "@/lib/constants";
import { ASCII_SKILL_BAR } from "@/lib/ascii-art";

export function AboutSection() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Bio */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="mb-4 font-terminal text-xs text-smoke">
          C:\FRANKY\ABOUT.TXT
        </div>

        <div className="border border-ash bg-coal p-4">
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
      >
        <div className="mb-4 font-terminal text-xs text-smoke">
          C:\FRANKY\SKILLS.DAT
        </div>

        <div className="border border-ash bg-coal p-4">
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
                  <span className="font-terminal text-[10px] text-smoke">
                    {ASCII_SKILL_BAR(skill.level)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-4 border-t border-ash pt-3">
            <div className="font-terminal text-[10px] text-smoke">
              LEGEND: █ = Proficient | ░ = Learning
            </div>
          </div>
        </div>

        {/* Status */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-4 font-terminal text-xs text-smoke"
        >
          STATUS: Available for projects
        </motion.div>
      </motion.div>
    </div>
  );
}
