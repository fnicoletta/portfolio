"use client";

import { motion } from "framer-motion";
import { work } from "@/lib/data";
import { WorkCard } from "@/components/ui/WorkCard";

export function WorkSection() {
  return (
    <section id="work" className="mb-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)] mb-6"
      >
        Work
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {work.map((entry, i) => (
          <WorkCard key={entry.id} entry={entry} index={i} />
        ))}
      </div>
    </section>
  );
}
