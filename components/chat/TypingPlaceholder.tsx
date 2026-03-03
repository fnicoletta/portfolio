"use client";

import { useState, useEffect, useCallback } from "react";
import { chatPlaceholders } from "@/lib/data";

export function TypingPlaceholder({ isActive }: { isActive: boolean }) {
  const [text, setText] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const currentPlaceholder = chatPlaceholders[placeholderIndex];

  const nextPlaceholder = useCallback(() => {
    setPlaceholderIndex((prev) => (prev + 1) % chatPlaceholders.length);
    setIsTyping(true);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    if (isTyping) {
      if (text.length < currentPlaceholder.length) {
        const timeout = setTimeout(() => {
          setText(currentPlaceholder.slice(0, text.length + 1));
        }, 50 + Math.random() * 30);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (text.length > 0) {
        const timeout = setTimeout(() => {
          setText(text.slice(0, -1));
        }, 25);
        return () => clearTimeout(timeout);
      } else {
        nextPlaceholder();
      }
    }
  }, [text, isTyping, isActive, currentPlaceholder, nextPlaceholder]);

  return <>{text}</>;
}
