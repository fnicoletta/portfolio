"use client";

import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "@/lib/constants";

export function LinksSection() {
  return (
    <div className="mx-auto max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="border border-ash bg-coal"
      >
        {/* Terminal header */}
        <div className="flex items-center justify-between border-b border-ash bg-shadow px-4 py-2">
          <span className="font-terminal text-xs">
            <span className="text-cyan">C:\FRANKY\</span>
            <span className="text-yellow">LINKS.EXE</span>
          </span>
        </div>

        {/* Links list */}
        <div className="p-4">
          <div className="mb-4 font-terminal text-sm text-smoke">
            SELECT DESTINATION:
          </div>

          <div className="space-y-2">
            {SOCIAL_LINKS.map((link, index) => (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 5 }}
                className="group flex items-center gap-3 p-2 transition-all hover:bg-shadow"
              >
                <span className="font-terminal text-xs text-smoke">
                  [{index + 1}]
                </span>
                <span className="font-terminal text-sm text-silver group-hover:text-white">
                  {link.label}
                </span>
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-ash" />

          {/* Resume download */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 font-terminal text-sm text-smoke">
              DOWNLOAD:
            </div>

            <a
              href="/resume.pdf"
              download
              className="group flex items-center gap-3 border border-ash bg-shadow p-3 font-terminal text-sm text-silver transition-all hover:border-white hover:text-white"
            >
              <span>[4]</span>
              <span>RESUME.PDF</span>
              <span className="text-smoke">- Download CV</span>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* ASCII decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        viewport={{ once: true }}
        className="mt-8 text-center font-terminal text-xs"
      >
        <span className="text-smoke">Thanks for visiting. </span>
        <span className="text-terminal">Let&apos;s build something.</span>
      </motion.div>
    </div>
  );
}
