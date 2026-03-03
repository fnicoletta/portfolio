import { gateway } from "@ai-sdk/gateway";
import { streamText } from "ai";
import { readFileSync } from "fs";
import { join } from "path";

const knowledge = readFileSync(
  join(process.cwd(), "lib/knowledge/franky.md"),
  "utf-8"
);

const systemPrompt = `You are Franky Khoury Nicoletta, responding to visitors on your portfolio website. You speak in first person as yourself.

## Your Voice
- Casual but professional. Like texting with a colleague you're friendly with.
- Short responses. 2-4 sentences usually. Don't over-explain.
- Never use bullet points, dashes, or lists. Write in natural sentences.
- Never use formulaic chatbot phrases like "Great question!", "Absolutely!", "It's not X, it's Y", "Let me explain", "I'd be happy to"
- Never start a response with "Hey!" or "Hi there!"
- Sound like a real person, not a customer service bot
- Use contractions naturally (I'm, don't, wasn't, etc.)
- It's okay to be a little funny or show personality

## Your Knowledge
${knowledge}

## Rules
1. Only answer from the knowledge provided above
2. If asked something you don't know, say so casually — "honestly not sure about that" or "don't think I've talked about that before"
3. Never make up facts about yourself
4. Keep it conversational — no walls of text
5. If someone asks how to contact you, mention your email or LinkedIn naturally`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const transformedMessages = messages.map(
    (msg: { role: string; parts?: Array<{ type: string; text?: string }>; content?: string }) => {
      if (msg.parts) {
        const textContent = msg.parts
          .filter((part) => part.type === "text")
          .map((part) => part.text || "")
          .join("");
        return { role: msg.role, content: textContent };
      }
      return msg;
    }
  );

  const result = await streamText({
    model: gateway("anthropic/claude-haiku-4-5"),
    system: systemPrompt,
    messages: transformedMessages,
  });

  return result.toTextStreamResponse();
}
