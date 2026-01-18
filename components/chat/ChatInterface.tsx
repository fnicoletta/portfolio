"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { Cursor } from "@/components/ui/Cursor";

const WELCOME_MESSAGE = `BIOS v2.4.1 ... OK
Memory Test ... 640K OK
Loading PORTFOLIO.SYS ...

═══════════════════════════════════
  FRANKY KHOURY
  Project Engineer // Game Dev
═══════════════════════════════════

System Ready.
Type HELP for commands or ask me anything about Franky.`;

// Syntax highlighting for terminal output
function highlightText(text: string): React.ReactNode[] {
  const lines = text.split("\n");

  return lines.map((line, lineIndex) => {
    const parts: React.ReactNode[] = [];
    let remaining = line;
    let keyIndex = 0;

    // Pattern matching for different syntax elements
    const patterns: { regex: RegExp; className: string }[] = [
      // Status keywords
      { regex: /\b(OK|READY|SUCCESS|DONE|COMPLETE)\b/g, className: "text-terminal" },
      { regex: /\b(LOADING|PROCESSING|ACCESSING|ESTABLISHING)\b/g, className: "text-yellow" },
      { regex: /\b(ERROR|FAIL|WARNING)\b/g, className: "text-red" },
      // Section headers and labels
      { regex: /^(CORE SKILLS|SPECIALTIES|WEB PROJECTS|GAME DEV|CAREER TIMELINE|HELP MENU):/gm, className: "text-cyan font-bold" },
      { regex: /\[(.*?)\]/g, className: "text-yellow" },
      // Paths and commands
      { regex: /(C:\\[^\s]*|\/[^\s]+)/g, className: "text-cyan" },
      // Tree characters - keep them subtle
      { regex: /[├└│─═╔╗╚╝║]/g, className: "text-ash" },
      // Progress bars
      { regex: /[█▓░]/g, className: "text-terminal" },
      // Greater than prompt
      { regex: /^>/gm, className: "text-terminal" },
      // Numbers and years
      { regex: /\b(\d+\+?\s*years?|\d+K)\b/gi, className: "text-magenta" },
      // Tech stack items
      { regex: /\b(JavaScript|TypeScript|React|Next\.js|Node\.js|Python|PostgreSQL|MongoDB|AWS|Vercel)\b/g, className: "text-cyan" },
    ];

    // Simple approach: process line character by character, applying first matching pattern
    // For better performance, we'll use a simpler highlighting strategy
    const highlightLine = (line: string): React.ReactNode => {
      // Check for specific patterns and apply colors
      let result = line;

      // Status words
      if (/\b(OK|READY|System Ready)\b/.test(line)) {
        return <span className="text-terminal">{line}</span>;
      }
      if (/\b(LOADING|Processing|ACCESSING|ESTABLISHING)\b/i.test(line)) {
        return <span className="text-yellow">{line}</span>;
      }
      if (/^(CORE SKILLS|SPECIALTIES|WEB PROJECTS|CAREER TIMELINE|HELP MENU):?/i.test(line)) {
        return <span className="text-cyan">{line}</span>;
      }
      if (/^>/.test(line)) {
        return <><span className="text-terminal">&gt;</span><span className="text-silver">{line.slice(1)}</span></>;
      }
      if (/^[├└│─═]/.test(line)) {
        // Tree structure lines - colorize the tree chars and the content
        const match = line.match(/^([├└│─═╔╗╚╝║\s]+)(.*)$/);
        if (match) {
          return (
            <>
              <span className="text-ash">{match[1]}</span>
              <span className="text-silver">{match[2]}</span>
            </>
          );
        }
      }
      if (/[█▓░]{3,}/.test(line)) {
        // Progress bar lines
        return <span className="text-terminal">{line}</span>;
      }

      return <span className="text-silver">{line}</span>;
    };

    return (
      <span key={lineIndex}>
        {highlightLine(line)}
        {lineIndex < lines.length - 1 && "\n"}
      </span>
    );
  });
}

// Extract text content from message parts (v6 API)
function getMessageText(message: { parts: Array<{ type: string; text?: string }> }): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text || "")
    .join("");
}

export function ChatInterface() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [welcomeText, setWelcomeText] = useState("");
  const [welcomeComplete, setWelcomeComplete] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Vercel AI SDK chat hook
  const { messages, sendMessage, status } = useChat({
    transport: new TextStreamChatTransport({ api: "/api/chat" }),
  });

  const isLoading = status === "streaming" || status === "submitted";

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
        setWelcomeComplete(true);
      }
    }, 3);

    return () => clearInterval(typeInterval);
  }, []);

  // Auto-scroll within the messages container
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, welcomeText]);

  // Focus input when welcome is done
  useEffect(() => {
    if (welcomeComplete) {
      inputRef.current?.focus();
    }
  }, [welcomeComplete]);

  const suggestedQuestions = [
    "What are your skills?",
    "Tell me about your projects",
    "Who is Franky?",
    "How can I contact you?",
  ];

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");

    await sendMessage({ text: userMessage });

    // Refocus input after sending
    inputRef.current?.focus();
  };

  const handleSuggestionClick = async (question: string) => {
    if (isLoading) return;
    await sendMessage({ text: question });
    inputRef.current?.focus();
  };

  return (
    <div className="flex h-full flex-col">
      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-ash bg-coal px-3 py-2 sm:px-4">
        <span className="font-terminal text-xs text-smoke">
          PORTFOLIO.SYS - Franky Khoury
        </span>
        <span className="font-terminal text-[10px] text-smoke">
          [640K RAM FREE]
        </span>
      </div>

      {/* Messages Area */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-3 font-terminal text-sm leading-relaxed sm:p-4">
        {showWelcome ? (
          <div className="whitespace-pre-wrap text-silver">
            {welcomeText}
            <Cursor className="text-silver" />
          </div>
        ) : (
          <>
            {/* Welcome message (always shown first) */}
            <div className="mb-4 whitespace-pre-wrap text-silver">
              {highlightText(WELCOME_MESSAGE)}
            </div>

            {/* Chat messages */}
            <AnimatePresence mode="popLayout">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`mb-4 whitespace-pre-wrap ${
                    message.role === "user"
                      ? "text-white"
                      : "text-silver"
                  }`}
                >
                  {message.role === "user" && (
                    <span className="text-cyan">{"C:\\> "}</span>
                  )}
                  {message.role === "user" ? (
                    <span className="text-white">{getMessageText(message)}</span>
                  ) : (
                    highlightText(getMessageText(message))
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </>
        )}

        {isLoading && (
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
      {messages.length === 0 && !showWelcome && (
        <div className="border-t border-ash bg-coal px-3 py-2 sm:px-4 sm:py-3">
          <div className="mb-2 font-terminal text-[10px] text-smoke">
            TRY ASKING:
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => handleSuggestionClick(question)}
                className="font-terminal text-xs text-silver transition-colors hover:text-white"
              >
                [{question}]
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <form
        onSubmit={onFormSubmit}
        className="flex items-center gap-2 border-t border-ash bg-coal px-3 py-3 sm:px-4"
      >
        <span className="text-cyan">C:\&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={showWelcome}
          placeholder={showWelcome ? "Loading..." : isLoading ? "Waiting for response..." : "Ask me anything..."}
          className="flex-1 bg-transparent font-terminal text-sm text-white placeholder-smoke outline-none"
          autoComplete="off"
          spellCheck="false"
        />
        {!showWelcome && !isLoading && input.length === 0 && (
          <Cursor className="text-silver" />
        )}
      </form>
    </div>
  );
}
