"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cursor } from "@/components/ui/Cursor";
import { findResponse, WELCOME_MESSAGE } from "@/lib/mock-responses";

interface Message {
  id: string;
  type: "user" | "system";
  content: string;
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [welcomeText, setWelcomeText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Typing effect for welcome message
  useEffect(() => {
    let index = 0;
    const text = WELCOME_MESSAGE;

    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setWelcomeText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
        setShowWelcome(false);
        // Add welcome as first message
        setMessages([
          {
            id: "welcome",
            type: "system",
            content: WELCOME_MESSAGE,
            timestamp: new Date(),
          },
        ]);
      }
    }, 3);

    return () => clearInterval(typeInterval);
  }, []);

  // Auto-scroll within the messages container only (not the whole page)
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showWelcome && messages.length > 0 && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, showWelcome]);

  // Focus input on load
  useEffect(() => {
    if (!showWelcome) {
      inputRef.current?.focus();
    }
  }, [showWelcome]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || isTyping) return;

      const userMessage: Message = {
        id: `user-${Date.now()}`,
        type: "user",
        content: input.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsTyping(true);

      // Simulate thinking delay
      await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 500));

      const response = findResponse(input);

      const systemMessage: Message = {
        id: `system-${Date.now()}`,
        type: "system",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, systemMessage]);
      setIsTyping(false);
    },
    [input, isTyping]
  );

  const suggestedQuestions = [
    "skills",
    "projects",
    "about",
    "contact",
  ];

  return (
    <div className="flex h-full flex-col">
      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-ash bg-coal px-4 py-2">
        <span className="font-terminal text-xs text-smoke">
          PORTFOLIO.SYS - Franky Khoury
        </span>
        <span className="font-terminal text-[10px] text-smoke">
          [640K RAM FREE]
        </span>
      </div>

      {/* Messages Area */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 font-terminal text-sm leading-relaxed">
        {showWelcome ? (
          <div className="whitespace-pre-wrap text-silver">
            {welcomeText}
            <Cursor className="text-silver" />
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`mb-4 whitespace-pre-wrap ${
                  message.type === "user"
                    ? "text-white"
                    : "text-silver"
                }`}
              >
                {message.type === "user" && (
                  <span className="text-smoke">{"C:\\> "}</span>
                )}
                {message.content}
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-smoke"
          >
            <span className="animate-pulse">Processing request</span>
            <span className="animate-cursor-blink">_</span>
          </motion.div>
        )}

      </div>

      {/* Suggested Questions */}
      {messages.length <= 1 && !showWelcome && (
        <div className="border-t border-ash bg-coal px-4 py-3">
          <div className="mb-2 font-terminal text-[10px] text-smoke">
            TRY:
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                onClick={() => {
                  setInput(question);
                  inputRef.current?.focus();
                }}
                className="font-terminal text-xs text-silver transition-colors hover:text-white"
              >
                [{question.toUpperCase()}]
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-ash bg-coal px-4 py-3"
      >
        <span className="text-silver">C:\&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={showWelcome || isTyping}
          placeholder={showWelcome ? "Loading..." : ""}
          className="flex-1 bg-transparent font-terminal text-sm text-white placeholder-smoke outline-none"
          autoComplete="off"
          spellCheck="false"
        />
        {!showWelcome && !isTyping && input.length === 0 && (
          <Cursor className="text-silver" />
        )}
      </form>
    </div>
  );
}
