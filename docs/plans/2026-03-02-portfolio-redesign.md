# Portfolio Redesign — Design Document

## Overview

Complete redesign of frankykhoury.com as a clean, professional portfolio optimized for job hunting. Split-panel layout with a signature AI chat feature. Built with Next.js 16, React 19, Tailwind 4, Framer Motion, and Vercel AI SDK.

## Layout

**Split-panel:** Left panel fixed, right panel scrolls. Collapses to single-column on mobile.

### Left Panel (Fixed)

Always visible on desktop. Contains:

1. **Photo** — professional headshot
2. **Name** — "Franky Khoury Nicoletta" in a distinctive display font
3. **Title** — "CTO & Founding Engineer"
4. **Tagline** — "Building products from zero to one."
5. **Contact links** — email, LinkedIn, GitHub, phone, frankykhoury.com (icons + text)
6. **AI Chat** — compact chat interface embedded in the left panel
   - Input with rotating placeholder text (typing animation cycling through prompts)
   - Suggested question chips above input
   - Expands into conversational thread when used
   - Placeholder prompts rotate between professional and personal questions:
     - "What's Franky's tech stack?"
     - "Tell me about Countant..."
     - "What's Franky's engineering philosophy?"
     - "Is Franky open to work?"
     - "What does Franky do outside of coding?"

### Right Panel (Scrolls)

1. **About Section**
   - Two short first-person paragraphs
   - Who Franky is, what he cares about as an engineer
   - Philosophy: engineering is evolving — architecture, design decisions, and systems thinking over just writing code
   - Warm, human tone — like meeting someone at a coffee shop

2. **Work Section**
   - Header: "Work"
   - Four cards in a grid (2 per row desktop, 1 per row mobile):
     - **Countant** — CTO & Founding Engineer, July 2025 – Present
     - **TextTeddy** — Founding Engineer (Contract), January 2025 – July 2025
     - **GatherUp** — Associate Software Engineer, December 2021 – January 2025
     - **EyeRate** — Founding Engineer, April 2020 – November 2021
   - Each card contains:
     - Company name + title
     - Date range
     - One sentence describing the product
     - 3-4 tech tags as small pills
     - One standout metric/achievement in bold
   - Countant gets top-left position with subtle visual emphasis (current role)

3. **Skills Section**
   - Horizontal marquee/ticker of tech logos
   - Grouped by category (Frontend, Backend, AI, Cloud)
   - Slow continuous scroll animation
   - Minimal vertical space

## Aesthetic

- **Foundation:** Clean, light, professional
- **Background:** White or very light neutral
- **Text:** Dark, high contrast
- **Accent:** One accent color (TBD during implementation)
- **Typography:** Distinctive display font for name, clean sans-serif for body
- **Whitespace:** Generous — confidence in simplicity
- **No:** Particles, gradients, dark mode (unless toggled), clutter

## Animation

- Subtle fade-up with stagger on scroll for right panel sections
- Smooth scroll-triggered reveals as elements enter viewport
- Hover states on cards and buttons that feel responsive
- Skills marquee continuous horizontal motion
- Chat input placeholder typing animation cycling through prompts
- Chat widget subtle breathing pulse before first interaction
- `prefers-reduced-motion` respected throughout

## AI Chat

- **Model:** Claude via Vercel AI SDK
- **Personality:** Speaks as Franky in first person. Casual but professional. Natural conversational tone.
- **Rules:**
  - No bullet lists in responses
  - No dashes for lists
  - No formulaic chatbot phrases ("Great question!", "It's not X, it's Y")
  - Short, conversational responses
  - Speaks like texting with someone about their work
- **Knowledge base:** Built from resume content, project details, personal info
- **Starter chips:** 2-3 clickable suggested questions

## Mobile

- Left panel collapses into a header/top section
- Right panel becomes the main scrollable content
- Chat becomes a section in the single-column flow (or expandable from header)
- Work cards stack single column
- Skills marquee continues to work
- All touch-friendly tap targets

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Framer Motion (scroll animations, transitions)
- Vercel AI SDK + Claude (chat)
- Deployed on Vercel

## Content Source

All content pulled from the updated resume:
- `/home/wizard/Documents/Franky_Khoury_Resume.html`
- `/home/wizard/Projects/countant` (for Countant project details)
