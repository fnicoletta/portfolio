"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { work } from "@/lib/data";
import { WorkCard } from "@/components/ui/WorkCard";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function WorkSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section id="work" className="mb-12">
      <motion.h2
        initial={false}
        animate={mounted ? "visible" : "hidden"}
        variants={fadeUp}
        transition={{ duration: 0.4 }}
        className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)] mb-6"
      >
        Work
      </motion.h2>
      <div className="grid grid-cols-1 gap-4">
        {work.map((entry, i) => (
          <WorkCard key={entry.id} entry={entry} index={i} mounted={mounted} />
        ))}
      </div>
    </section>
  );
}
