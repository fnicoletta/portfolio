"use client";

interface CursorProps {
  className?: string;
  character?: string;
}

export function Cursor({ className = "", character = "_" }: CursorProps) {
  return (
    <span
      className={`inline-block animate-cursor-blink text-terminal ${className}`}
      aria-hidden="true"
    >
      {character}
    </span>
  );
}
