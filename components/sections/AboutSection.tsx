"use client";

import { motion } from "framer-motion";
import { about } from "@/lib/data";

export function AboutSection() {
  return (
    <section id="about" className="mb-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)] mb-6"
      >
        About
      </motion.h2>
      <div className="space-y-4">
        {about.paragraphs.map((paragraph, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
            className="text-base leading-relaxed text-[var(--color-text-secondary)]"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
