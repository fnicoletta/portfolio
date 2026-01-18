"use client";

import { useState, useEffect, useCallback } from "react";

interface UseTypingEffectOptions {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export function useTypingEffect({
  text,
  speed = 30,
  delay = 0,
  onComplete,
}: UseTypingEffectOptions) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const reset = useCallback(() => {
    setDisplayedText("");
    setIsTyping(false);
    setIsComplete(false);
  }, []);

  useEffect(() => {
    reset();

    const delayTimeout = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;

      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [text, speed, delay, onComplete, reset]);

  return { displayedText, isTyping, isComplete, reset };
}

export function useTypingQueue() {
  const [queue, setQueue] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);

  const addToQueue = useCallback((lines: string | string[]) => {
    const newLines = Array.isArray(lines) ? lines : [lines];
    setQueue((prev) => [...prev, ...newLines]);
  }, []);

  const onLineComplete = useCallback(() => {
    if (currentIndex < queue.length) {
      setDisplayedLines((prev) => [...prev, queue[currentIndex]]);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, queue]);

  const reset = useCallback(() => {
    setQueue([]);
    setCurrentIndex(0);
    setDisplayedLines([]);
  }, []);

  const currentLine = queue[currentIndex] || "";
  const isQueueComplete = currentIndex >= queue.length && queue.length > 0;

  return {
    addToQueue,
    currentLine,
    displayedLines,
    isQueueComplete,
    onLineComplete,
    reset,
  };
}
