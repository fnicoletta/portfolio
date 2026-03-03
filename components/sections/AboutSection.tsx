"use client";

import { motion } from "framer-motion";
import { about } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function AboutSection() {
  return (
    <section id="about" className="mb-12">
      <motion.h2
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.4 }}
        className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)] mb-6"
      >
        About
      </motion.h2>
      <div className="space-y-4">
        {about.paragraphs.map((paragraph, i) => (
          <motion.p
            key={i}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.4, delay: 0.1 * (i + 1) }}
            className="text-base leading-relaxed text-[var(--color-text-secondary)]"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
