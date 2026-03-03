"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ContactLinks } from "@/components/ui/ContactLinks";
import { ChatWidget } from "@/components/chat/ChatWidget";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export function LeftPanel() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <aside className="lg:sticky lg:top-0 lg:h-screen lg:border-r border-[var(--color-border)] bg-[var(--color-bg-panel)] p-6 lg:p-8 flex flex-col lg:overflow-y-auto glow-border">
      <div className="flex-1 flex flex-col">
        <motion.div
          className="mb-4"
          initial={false}
          animate={mounted ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.4, delay: 0 }}
        >
          <Image
            src="/photo.jpg"
            alt="Franky Khoury Nicoletta"
            width={112}
            height={112}
            className="w-28 h-28 rounded-full object-cover ring-2 ring-[var(--color-accent)]/20 shadow-[0_0_16px_rgba(0,255,136,0.1)]"
            priority
          />
        </motion.div>
        <motion.h1
          initial={false}
          animate={mounted ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl text-[var(--color-text)] leading-tight mb-2"
        >
          Franky Khoury Nicoletta
        </motion.h1>
        <motion.p
          initial={false}
          animate={mounted ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-sm font-medium text-[var(--color-text-secondary)] mb-1"
        >
          Product Engineer
        </motion.p>
        <motion.p
          initial={false}
          animate={mounted ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-sm italic text-[var(--color-text-tertiary)] mb-4"
        >
          Building products from zero to one.
        </motion.p>
        <motion.div
          initial={false}
          animate={mounted ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <ContactLinks />
        </motion.div>
      </div>
      <motion.div
        className="border-t border-[var(--color-border)] pt-4 mt-6"
        initial={false}
        animate={mounted ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <ChatWidget />
      </motion.div>
    </aside>
  );
}
