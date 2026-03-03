"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect } from "react";
import { TypingPlaceholder } from "./TypingPlaceholder";
import { chatSuggestions } from "@/lib/data";

export function ChatWidget() {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  const handleSuggestionClick = (suggestion: string) => {
    setHasInteracted(true);
    sendMessage({ text: suggestion });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setHasInteracted(true);
    sendMessage({ text: input });
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {hasInteracted && (
        <div className="flex-1 overflow-y-auto mb-3 space-y-3 max-h-[300px] lg:max-h-[40vh]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`text-sm leading-relaxed ${
                msg.role === "user"
                  ? "text-[var(--color-text)] font-medium"
                  : "text-[var(--color-text-secondary)]"
              }`}
            >
              {msg.role === "user" && (
                <span className="text-xs text-[var(--color-text-tertiary)] block mb-0.5">You</span>
              )}
              {msg.parts?.map((part, i) =>
                part.type === "text" ? <span key={i}>{part.text}</span> : null
              )}
            </div>
          ))}
          {isLoading && (
            <div className="text-sm text-[var(--color-text-tertiary)]">
              <span className="inline-flex gap-1">
                <span className="animate-pulse">·</span>
                <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>·</span>
                <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>·</span>
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {!hasInteracted && (
        <div className="flex flex-wrap gap-2 mb-3">
          {chatSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-xs px-3 py-1.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-200 cursor-pointer"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={onSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full text-sm px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-200"
          placeholder={hasInteracted ? "Ask me anything..." : ""}
          disabled={isLoading}
        />
        {!hasInteracted && !input && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[var(--color-text-tertiary)] pointer-events-none">
            <TypingPlaceholder isActive={!hasInteracted} />
            <span className="animate-pulse">|</span>
          </div>
        )}
      </form>
    </div>
  );
}
