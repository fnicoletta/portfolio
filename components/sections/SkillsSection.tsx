"use client";

import { motion } from "framer-motion";
import { SkillsMarquee } from "@/components/ui/SkillsMarquee";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function SkillsSection() {
  return (
    <section id="skills" className="mb-12">
      <motion.h2
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.4 }}
        className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)] mb-6"
      >
        Skills
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <SkillsMarquee />
      </motion.div>
    </section>
  );
}
