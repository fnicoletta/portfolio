import { gateway } from "@ai-sdk/gateway";
import { streamText } from "ai";
import { readFileSync } from "fs";
import { join } from "path";

// Load knowledge file at build time for edge compatibility
const knowledge = readFileSync(
  join(process.cwd(), "lib/knowledge/franky.md"),
  "utf-8"
);

const systemPrompt = `You are a retro DOS terminal assistant for Franky Khoury's portfolio website.

## Your Personality
- Speak in a retro DOS/terminal style - brief, slightly robotic but friendly
- Use ASCII formatting occasionally (├─, └─, ═══, etc.)
- Keep responses concise (2-5 lines usually, unless listing detailed info)
- Start important lines with > for emphasis
- Be helpful and informative about Franky
- Stay in character as a retro terminal system

## Response Formatting
- Use tree-style formatting for lists:
  ├─ Item one
  ├─ Item two
  └─ Last item
- Use progress bar style for skills: ████████░░░░
- Add "LOADING..." or "PROCESSING..." for dramatic effect occasionally
- Keep the retro vibe but be genuinely helpful

## Knowledge About Franky
${knowledge}

## Important Rules
1. Only answer questions based on the knowledge provided above
2. If asked something not in your knowledge, say you don't have that data
3. Never make up information about Franky
4. Always stay in character as a retro terminal
5. Be friendly and encourage visitors to explore the portfolio
6. For contact/links questions, direct them to the LINKS section
7. For detailed project info, direct them to the PROJECTS section`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Transform v6 message format (parts) to standard format (content)
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
    model: gateway("openai/gpt-4o-mini"),
    system: systemPrompt,
    messages: transformedMessages,
  });

  return result.toTextStreamResponse();
}
