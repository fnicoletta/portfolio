"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ASCII_LOGO = `
 ███████╗██╗  ██╗
 ██╔════╝██║ ██╔╝
 █████╗  █████╔╝
 ██╔══╝  ██╔═██╗
 ██║     ██║  ██╗
 ╚═╝     ╚═╝  ╚═╝
`;

const TAGLINES = [
  "Building production-grade software",
  "5+ years of coding experience",
  "AI-assisted, human-reviewed code",
  "Full-stack web & game development",
];

export function NormalHero() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayedTagline, setDisplayedTagline] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Cycling tagline with typing effect
  useEffect(() => {
    const tagline = TAGLINES[taglineIndex];

    if (isTyping) {
      if (displayedTagline.length < tagline.length) {
        const timeout = setTimeout(() => {
          setDisplayedTagline(tagline.slice(0, displayedTagline.length + 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        // Wait before starting to delete
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayedTagline.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedTagline(displayedTagline.slice(0, -1));
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        // Move to next tagline
        setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
        setIsTyping(true);
      }
    }
  }, [displayedTagline, isTyping, taglineIndex]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 py-12">
      {/* Floating pixels decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-terminal/30"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0,
            }}
            animate={{
              y: [null, "-20%"],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* ASCII Logo */}
      <motion.pre
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 text-center font-terminal text-[8px] leading-tight text-terminal sm:text-[10px] md:text-xs"
        style={{ textShadow: "0 0 10px rgba(68, 221, 119, 0.5)" }}
      >
        {ASCII_LOGO}
      </motion.pre>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-2 text-center"
      >
        <span className="font-pixel text-2xl text-white sm:text-3xl md:text-4xl">
          FRANKY{" "}
        </span>
        <span className="font-pixel text-2xl text-cyan sm:text-3xl md:text-4xl">
          KHOURY
        </span>
      </motion.h1>

      {/* Title */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6 font-terminal text-lg text-smoke sm:text-xl"
      >
        <span className="text-magenta">Project Engineer</span>
        <span className="text-ash"> // </span>
        <span className="text-yellow">Game Dev</span>
      </motion.p>

      {/* Animated tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-8 h-6"
      >
        <p className="font-terminal text-sm text-silver">
          &gt; {displayedTagline}
          <span className="animate-cursor-blink text-terminal">_</span>
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-wrap justify-center gap-4"
      >
        <button
          onClick={() => scrollToSection("projects")}
          className="group relative overflow-hidden border-2 border-cyan bg-transparent px-6 py-3 font-terminal text-sm text-cyan transition-all hover:bg-cyan/10"
        >
          <span className="relative z-10">[ VIEW PROJECTS ]</span>
          <motion.div
            className="absolute inset-0 bg-cyan/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>

        <button
          onClick={() => scrollToSection("about")}
          className="group relative overflow-hidden border-2 border-magenta bg-transparent px-6 py-3 font-terminal text-sm text-magenta transition-all hover:bg-magenta/10"
        >
          <span className="relative z-10">[ ABOUT ME ]</span>
          <motion.div
            className="absolute inset-0 bg-magenta/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>

        <button
          onClick={() => scrollToSection("links")}
          className="group relative overflow-hidden border-2 border-yellow bg-transparent px-6 py-3 font-terminal text-sm text-yellow transition-all hover:bg-yellow/10"
        >
          <span className="relative z-10">[ CONTACT ]</span>
          <motion.div
            className="absolute inset-0 bg-yellow/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </motion.div>

      {/* Decorative border lines */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute left-0 top-1/4 h-px w-1/4 origin-left bg-gradient-to-r from-transparent via-terminal/50 to-transparent"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute right-0 top-1/3 h-px w-1/4 origin-right bg-gradient-to-l from-transparent via-cyan/50 to-transparent"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute bottom-1/4 left-0 h-px w-1/3 origin-left bg-gradient-to-r from-transparent via-magenta/50 to-transparent"
      />
    </div>
  );
}
