"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ContactLinks } from "@/components/ui/ContactLinks";
import { ChatWidget } from "@/components/chat/ChatWidget";

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function LeftPanel() {
  return (
    <aside className="lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:w-[380px] lg:border-r border-[var(--color-border)] bg-[var(--color-bg-panel)] p-8 lg:p-10 flex flex-col lg:overflow-y-auto">
      <motion.div
        className="flex-1 flex flex-col"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp} className="mb-6">
          <Image
            src="/photo.jpg"
            alt="Franky Khoury Nicoletta"
            width={112}
            height={112}
            className="w-28 h-28 rounded-full object-cover"
            priority
          />
        </motion.div>
        <motion.h1
          variants={fadeUp}
          className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl text-[var(--color-text)] leading-tight mb-2"
        >
          Franky Khoury Nicoletta
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="text-sm font-medium text-[var(--color-text-secondary)] mb-1"
        >
          CTO & Founding Engineer
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="text-sm italic text-[var(--color-text-tertiary)] mb-6"
        >
          Building products from zero to one.
        </motion.p>
        <motion.div variants={fadeUp}>
          <ContactLinks />
        </motion.div>
      </motion.div>
      <motion.div
        className="border-t border-[var(--color-border)] pt-4 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <ChatWidget />
      </motion.div>
    </aside>
  );
}
