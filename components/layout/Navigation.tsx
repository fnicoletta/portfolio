"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NavItem {
  id: string;
  label: string;
  shortcut: string;
  color: "terminal" | "cyan" | "magenta" | "yellow";
}

const NAV_ITEMS: NavItem[] = [
  { id: "chat", label: "CHAT", shortcut: "1", color: "terminal" },
  { id: "projects", label: "PROJECTS", shortcut: "2", color: "cyan" },
  { id: "about", label: "ABOUT", shortcut: "3", color: "magenta" },
  { id: "links", label: "LINKS", shortcut: "4", color: "yellow" },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState("chat");
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for sticky nav background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = NAV_ITEMS.map((item) =>
        document.getElementById(item.id)
      );

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(NAV_ITEMS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const item = NAV_ITEMS.find((item) => item.shortcut === e.key);
      if (item) {
        e.preventDefault();
        document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const colorClasses = {
    terminal: "text-silver hover:text-terminal",
    cyan: "text-silver hover:text-cyan",
    magenta: "text-silver hover:text-magenta",
    yellow: "text-silver hover:text-yellow",
  };

  const activeColorClasses = {
    terminal: "text-terminal",
    cyan: "text-cyan",
    magenta: "text-magenta",
    yellow: "text-yellow",
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-void/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("chat")}
            className="font-terminal text-sm text-silver transition-all hover:text-white"
          >
            FK:\
          </button>

          {/* Nav Items */}
          <div className="flex items-center gap-1 sm:gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`group flex items-center gap-1 px-2 py-1 font-pixel text-[10px] transition-all sm:px-3 sm:text-xs ${
                  activeSection === item.id
                    ? activeColorClasses[item.color]
                    : colorClasses[item.color]
                }`}
              >
                <span className="hidden text-smoke group-hover:text-inherit sm:inline">
                  [{item.shortcut}]
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom border */}
      <div
        className={`h-px transition-opacity duration-300 ${
          isScrolled ? "bg-ash opacity-100" : "opacity-0"
        }`}
      />
    </motion.nav>
  );
}
