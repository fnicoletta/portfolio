"use client";

import { useTypingEffect } from "@/hooks/useTypingEffect";
import { Cursor } from "@/components/ui/Cursor";

interface TypingEffectProps {
  text: string;
  speed?: number;
  delay?: number;
  showCursor?: boolean;
  onComplete?: () => void;
  className?: string;
}

export function TypingEffect({
  text,
  speed = 30,
  delay = 0,
  showCursor = true,
  onComplete,
  className = "",
}: TypingEffectProps) {
  const { displayedText, isTyping, isComplete } = useTypingEffect({
    text,
    speed,
    delay,
    onComplete,
  });

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (isTyping || !isComplete) && <Cursor />}
    </span>
  );
}
