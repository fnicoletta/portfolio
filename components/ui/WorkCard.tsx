"use client";

import { motion } from "framer-motion";
import type { WorkEntry } from "@/lib/data";

export function WorkCard({ entry, index }: { entry: WorkEntry; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-6 transition-all duration-300 hover:border-[var(--color-text-tertiary)] hover:shadow-sm"
    >
      {/* Current badge */}
      {entry.current && (
        <span className="absolute top-4 right-4 text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--color-current-badge)] text-[var(--color-current-badge-text)]">
          Current
        </span>
      )}

      {/* Company & Title */}
      <h3 className="text-lg font-semibold text-[var(--color-text)] mb-0.5">
        {entry.company}
      </h3>
      <p className="text-sm text-[var(--color-text-secondary)] mb-1">
        {entry.title} · {entry.location}
      </p>
      <p className="text-xs text-[var(--color-text-tertiary)] mb-3">
        {entry.dateRange}
      </p>

      {/* Description */}
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
        {entry.description}
      </p>

      {/* Highlight */}
      <p className="text-sm font-medium text-[var(--color-text)] mb-4">
        {entry.highlight}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {entry.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-tag-bg)] text-[var(--color-tag-text)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
