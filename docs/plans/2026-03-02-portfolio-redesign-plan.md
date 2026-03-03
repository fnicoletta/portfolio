# Portfolio Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Complete rebuild of frankykhoury.com as a clean, professional split-panel portfolio with embedded AI chat, optimized for job hunting.

**Architecture:** Split-panel layout (left fixed, right scrolls) built with Next.js 16 App Router. Left panel contains identity, contact links, and AI chat. Right panel scrolls through About, Work, and Skills sections. Collapses to single-column on mobile. All old components/pages deleted and rebuilt from scratch.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, Framer Motion 12, Vercel AI SDK 6 with Claude via AI Gateway.

---

### Task 1: Clean Slate — Remove Old Components and Pages

**Files:**
- Delete: `app/page.tsx` (will recreate)
- Delete: `app/globals.css` (will recreate)
- Delete: `app/terminal/` (entire directory)
- Delete: `components/` (entire directory)
- Delete: `lib/constants.ts`
- Delete: `lib/ascii-art.ts`
- Delete: `lib/mock-responses.ts`
- Delete: `lib/window-manager.tsx`
- Delete: `lib/mode-context.tsx`
- Delete: `lib/kv.ts`
- Delete: `lib/content-filter.ts`
- Delete: `app/api/guestbook/` (entire directory)
- Delete: `public/wallpaper.jpg`
- Keep: `app/layout.tsx` (will modify)
- Keep: `app/api/chat/route.ts` (will modify)
- Keep: `lib/knowledge/franky.md` (will modify)
- Keep: `public/` svgs (may be useful)

**Step 1: Delete old files**

```bash
rm -rf app/terminal
rm -rf app/api/guestbook
rm -rf components
rm app/page.tsx
rm app/globals.css
rm lib/constants.ts lib/ascii-art.ts lib/mock-responses.ts lib/window-manager.tsx lib/mode-context.tsx lib/kv.ts lib/content-filter.ts
rm public/wallpaper.jpg
```

**Step 2: Remove howler dependency (no longer needed)**

```bash
npm uninstall howler @types/howler @upstash/redis
```

**Step 3: Verify clean state**

```bash
npm run build
```

Expected: Build will fail (page.tsx missing). That's fine — confirms clean slate.

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: clean slate for portfolio redesign - remove old retro theme"
```

---

### Task 2: Design System — Global CSS and Layout

**Files:**
- Create: `app/globals.css`
- Modify: `app/layout.tsx`

**Step 1: Create new globals.css**

Replace the retro CRT design system with a clean, light, professional design system.

```css
@import "tailwindcss";

@theme {
  --font-display: "Instrument Serif", Georgia, serif;
  --font-body: "Inter", system-ui, -apple-system, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, monospace;

  --color-bg: #fafaf9;
  --color-bg-panel: #ffffff;
  --color-text: #1a1a1a;
  --color-text-secondary: #6b7280;
  --color-text-tertiary: #9ca3af;
  --color-accent: #2563eb;
  --color-accent-light: #dbeafe;
  --color-border: #e5e7eb;
  --color-border-light: #f3f4f6;
  --color-tag-bg: #f3f4f6;
  --color-tag-text: #374151;
  --color-card-hover: #f9fafb;
  --color-current-badge: #dcfce7;
  --color-current-badge-text: #166534;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  background-color: var(--color-bg);
  color: var(--color-text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background-color: var(--color-accent);
  color: white;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-tertiary);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  html {
    scroll-behavior: auto;
  }
}
```

**Step 2: Update layout.tsx**

Replace fonts and metadata. Remove Providers wrapper, dark mode, retro fonts.

```tsx
import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Franky Khoury Nicoletta | CTO & Founding Engineer",
  description:
    "CTO & Founding Engineer building AI-powered products from zero to production. Full-stack TypeScript, React, Next.js, Node.js.",
  keywords: [
    "Franky Khoury",
    "CTO",
    "Founding Engineer",
    "Full Stack Developer",
    "TypeScript",
    "React",
    "Next.js",
    "AI Engineer",
  ],
  openGraph: {
    title: "Franky Khoury Nicoletta | CTO & Founding Engineer",
    description: "Building products from zero to one.",
    type: "website",
    url: "https://frankykhoury.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

**Step 3: Check that the Geist Mono font file exists**

The existing project used it. Verify path: `app/fonts/GeistMonoVF.woff`. If missing, we'll use Google Fonts fallback.

```bash
ls app/fonts/
```

**Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: new design system with light theme and professional typography"
```

---

### Task 3: Content Data — Constants and Knowledge Base

**Files:**
- Create: `lib/data.ts`
- Modify: `lib/knowledge/franky.md`

**Step 1: Create lib/data.ts with all portfolio content**

```ts
export interface WorkEntry {
  id: string;
  company: string;
  title: string;
  location: string;
  dateRange: string;
  description: string;
  tags: string[];
  highlight: string;
  current?: boolean;
}

export interface SkillCategory {
  label: string;
  skills: string[];
}

export const work: WorkEntry[] = [
  {
    id: "countant",
    company: "Countant",
    title: "CTO & Founding Engineer",
    location: "Remote",
    dateRange: "July 2025 – Present",
    description:
      "RCS AI financial assistant for expense tracking. Architected the entire product as the sole engineer — serverless backend, multi-model AI pipeline, and real-time message processing.",
    tags: ["TypeScript", "Next.js", "Express", "PostgreSQL", "Vercel AI SDK", "Claude", "Gemini", "Redis"],
    highlight: "Built a multi-model AI pipeline from zero as sole engineer",
    current: true,
  },
  {
    id: "textteddy",
    company: "TextTeddy",
    title: "Founding Engineer (Contract)",
    location: "Remote",
    dateRange: "January 2025 – July 2025",
    description:
      "AI-driven SMS platform for personalized text conversations. Built the backend, integrated LLMs with Twilio, and developed the mobile component library.",
    tags: ["React Native", "Node.js", "Firebase", "Twilio", "Genkit"],
    highlight: "Reduced average response latency by ~35% with LLM integration",
  },
  {
    id: "gatherup",
    company: "GatherUp",
    title: "Associate Software Engineer",
    location: "Remote",
    dateRange: "December 2021 – January 2025",
    description:
      "Reputation management SaaS. Built a modular UI library of 50+ components, integrated visual regression testing, and took on product ownership responsibilities.",
    tags: ["React", "TypeScript", "Storybook", "Playwright", "Chromatic"],
    highlight: "Reduced production bugs by 30% with visual regression testing",
  },
  {
    id: "eyerate",
    company: "EyeRate",
    title: "Founding Engineer",
    location: "Elk Grove, CA",
    dateRange: "April 2020 – November 2021",
    description:
      "Reputation management platform. Led product redesign, contributed to monolith-to-microservices migration, and co-led engineering hiring.",
    tags: ["Next.js", "Node.js", "React", "Microservices"],
    highlight: "Grew active users from 50 to 800+, helped scale to $15M valuation",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    label: "Frontend",
    skills: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind", "React Native", "TanStack", "Storybook"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express", "PostgreSQL", "Drizzle", "MongoDB", "Mongoose"],
  },
  {
    label: "AI / ML",
    skills: ["Vercel AI SDK", "Claude API", "Google Gemini", "Genkit"],
  },
  {
    label: "Cloud",
    skills: ["Vercel", "Neon", "Firebase", "Upstash Redis", "Twilio RCS"],
  },
  {
    label: "Testing",
    skills: ["Playwright", "Chromatic", "Jest", "Vitest", "React Testing Library"],
  },
];

export const about = {
  paragraphs: [
    "I'm Franky — a CTO and founding engineer based in California. I've spent the last 5 years building products from the ground up at early-stage startups. I care about clean architecture, thoughtful design decisions, and shipping things that actually work.",
    "I believe engineering is evolving — it's less about writing every line of code and more about designing systems, making the right decisions, and knowing how to turn an idea into something real.",
  ],
};

export const contact = {
  email: "email@frankykhoury.com",
  phone: "(408) 455-6870",
  linkedin: "https://linkedin.com/in/frankynicoletta",
  github: "https://github.com/fnicoletta",
  website: "https://frankykhoury.com",
};

export const chatPlaceholders = [
  "What's Franky's tech stack?",
  "Tell me about Countant...",
  "What's Franky's engineering philosophy?",
  "Is Franky open to work?",
  "What does Franky do outside of coding?",
  "What's Franky's favorite food?",
  "How does Franky use AI in his workflow?",
];

export const chatSuggestions = [
  "What's Countant?",
  "What's your stack?",
  "Open to work?",
];
```

**Step 2: Update knowledge base**

Replace `lib/knowledge/franky.md` with updated content from resume and personal info.

```markdown
# Franky Khoury Nicoletta - Knowledge Base

## Basic Info
- Name: Franky Khoury Nicoletta
- Role: CTO & Founding Engineer at Countant
- Location: Bay Area, California
- Experience: 5+ years building products at early-stage startups
- Engaged to: Veronica Valle
- Status: Open to new opportunities

## Professional Background
- Self-taught developer who started in high school
- Fell in love with coding through game development (Unity, C#)
- JavaScript/TypeScript became the primary language
- Been programming since before AI tools existed - can absolutely code without them
- Now uses AI as an integral part of the engineering workflow
- Every line still gets reviewed by human eyes before shipping

## Current Role: Countant (CTO & Founding Engineer, July 2025 – Present)
- Built an RCS AI financial assistant from zero as the sole engineer
- Two-person founding team (Franky handles all tech, CEO handles business)
- Serverless-first backend with Express.js, Neon PostgreSQL, Upstash Redis
- Multi-model AI pipeline: Gemini for intent classification, Claude for conversational quality
- Real-time RCS message processing with Redis buffering, execution locking, debouncing
- AI-powered receipt analysis, expense reports, mileage tracking
- Next.js dashboard with multi-currency support

## Previous: TextTeddy (Founding Engineer, Contract, January 2025 – July 2025)
- AI-driven SMS platform for personalized text conversations
- Node.js backend with Firebase Cloud Functions
- Integrated LLMs with Twilio via Genkit, reducing response latency by ~35%
- Built React Native component library, cutting feature dev time by 25%
- SEO-optimized landing page for 700+ user base

## Previous: GatherUp (Associate Software Engineer, December 2021 – January 2025)
- Reputation management SaaS platform
- Built modular UI library of 50+ reusable components using atomic design
- Integrated Chromatic visual regression testing, reducing production bugs by 30%
- Built Playwright end-to-end test suites
- Took on product ownership duties, managing sprints and cross-functional planning
- Coordinated delivery across distributed international teams

## Previous: EyeRate (Founding Engineer, April 2020 – November 2021)
- Reputation management platform, grew from pre-seed to $15M valuation
- Led product redesign growing active users from 50 to 800+
- Contributed to monolith-to-microservices migration, cutting latency ~60%
- Built Next.js landing page, raised Lighthouse SEO score from 62 to 94
- Co-led hiring of 4 engineers

## Technical Skills
### Expert Level
- TypeScript/JavaScript (5+ years)
- React & Next.js (frontend specialist)
- Node.js & Express
- Tailwind CSS
- Storybook & component library design

### Proficient
- PostgreSQL, MongoDB, Redis
- Firebase, Vercel, Neon
- Vercel AI SDK, Claude API, Google Gemini, Genkit
- Playwright, Chromatic, Jest, Vitest
- React Native
- Docker

## Engineering Philosophy
- Engineering is evolving. It's less about writing every line and more about architecture, system design, and making the right decisions
- Anti-overengineering: pragmatic solutions over overly abstracted code
- Believes code should be readable and easy to work with
- Hates `any` types with a passion
- Production-grade code always, never AI-generated slop
- "It's okay to be a little wet" — readability matters more than perfect DRY

## Hobbies & Personal
- Rock climbing
- Worldbuilding and linguistics
- Indie game development (Godot/GDScript)
- Favorite game genres: Roguelikes and horror
- Favorite games: Tiny Rogues, Resident Evil 7, The Finals
- Favorite food: Aunt Sonia's Mahshi
- Favorite colors: Green and black
- Code editor: Neovim (big vim guy)
- Favorite programming language (joke): Brainfuck

## Contact
- Email: email@frankykhoury.com
- Phone: (408) 455-6870
- LinkedIn: linkedin.com/in/frankynicoletta
- GitHub: github.com/fnicoletta
- Website: frankykhoury.com
```

**Step 3: Commit**

```bash
git add lib/data.ts lib/knowledge/franky.md
git commit -m "feat: add portfolio content data and updated knowledge base"
```

---

### Task 4: Split-Panel Layout Shell

**Files:**
- Create: `app/page.tsx`
- Create: `components/layout/LeftPanel.tsx`
- Create: `components/layout/RightPanel.tsx`

**Step 1: Create the main page with split-panel layout**

`app/page.tsx`:
```tsx
import { LeftPanel } from "@/components/layout/LeftPanel";
import { RightPanel } from "@/components/layout/RightPanel";

export default function Home() {
  return (
    <main className="min-h-screen lg:flex">
      <LeftPanel />
      <RightPanel />
    </main>
  );
}
```

**Step 2: Create LeftPanel shell**

`components/layout/LeftPanel.tsx`:
```tsx
export function LeftPanel() {
  return (
    <aside className="lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:w-[380px] lg:border-r border-[var(--color-border)] bg-[var(--color-bg-panel)] p-8 lg:p-10 flex flex-col">
      <div className="flex-1 flex flex-col">
        {/* Photo placeholder */}
        <div className="w-28 h-28 rounded-full bg-[var(--color-border)] mb-6" />

        <h1 className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl text-[var(--color-text)] leading-tight mb-2">
          Franky Khoury Nicoletta
        </h1>
        <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">
          CTO & Founding Engineer
        </p>
        <p className="text-sm italic text-[var(--color-text-tertiary)] mb-6">
          Building products from zero to one.
        </p>

        {/* Contact links placeholder */}
        <nav className="flex flex-col gap-2 mb-8 text-sm text-[var(--color-text-secondary)]">
          <span>Contact links here</span>
        </nav>
      </div>

      {/* Chat placeholder */}
      <div className="border-t border-[var(--color-border)] pt-4">
        <p className="text-xs text-[var(--color-text-tertiary)]">AI Chat coming soon</p>
      </div>
    </aside>
  );
}
```

**Step 3: Create RightPanel shell**

`components/layout/RightPanel.tsx`:
```tsx
export function RightPanel() {
  return (
    <div className="lg:ml-[380px] flex-1">
      <div className="max-w-3xl mx-auto px-6 py-12 lg:py-16 lg:px-12">
        {/* About placeholder */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">About</h2>
          <p className="text-[var(--color-text-secondary)]">About section here</p>
        </section>

        {/* Work placeholder */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Work</h2>
          <p className="text-[var(--color-text-secondary)]">Work section here</p>
        </section>

        {/* Skills placeholder */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          <p className="text-[var(--color-text-secondary)]">Skills section here</p>
        </section>
      </div>
    </div>
  );
}
```

**Step 4: Verify build and dev server**

```bash
npm run build
npm run dev
```

Expected: Clean build. Page renders with split-panel layout. Left panel fixed on desktop, stacked on mobile.

**Step 5: Commit**

```bash
git add app/page.tsx components/layout/LeftPanel.tsx components/layout/RightPanel.tsx
git commit -m "feat: split-panel layout shell with left fixed and right scrollable"
```

---

### Task 5: Left Panel — Identity, Contact Links, and Photo

**Files:**
- Modify: `components/layout/LeftPanel.tsx`
- Create: `components/ui/ContactLinks.tsx`

**Step 1: Create ContactLinks component**

`components/ui/ContactLinks.tsx`:
```tsx
import { contact } from "@/lib/data";

const links = [
  { label: "email@frankykhoury.com", href: `mailto:${contact.email}`, icon: "mail" },
  { label: "(408) 455-6870", href: `tel:+14084556870`, icon: "phone" },
  { label: "LinkedIn", href: contact.linkedin, icon: "linkedin", external: true },
  { label: "GitHub", href: contact.github, icon: "github", external: true },
  { label: "frankykhoury.com", href: contact.website, icon: "globe", external: true },
];

function LinkIcon({ type }: { type: string }) {
  // Simple SVG icons inline — no external dependency
  const icons: Record<string, React.ReactNode> = {
    mail: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
    ),
    phone: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
    ),
    linkedin: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
    ),
    github: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
    ),
    globe: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
    ),
  };

  return <span className="text-[var(--color-text-tertiary)]">{icons[type]}</span>;
}

export function ContactLinks() {
  return (
    <nav className="flex flex-col gap-2.5">
      {links.map((link) => (
        <a
          key={link.icon}
          href={link.href}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noopener noreferrer" : undefined}
          className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200"
        >
          <LinkIcon type={link.icon} />
          <span>{link.label}</span>
        </a>
      ))}
    </nav>
  );
}
```

**Step 2: Update LeftPanel with real contact links and photo placeholder**

Replace the placeholder content in `components/layout/LeftPanel.tsx` with the ContactLinks component and proper structure. Keep the photo as a placeholder div until the user provides their photo.

**Step 3: Verify visually**

```bash
npm run dev
```

Check that left panel shows name, title, tagline, and contact links with icons.

**Step 4: Commit**

```bash
git add components/ui/ContactLinks.tsx components/layout/LeftPanel.tsx
git commit -m "feat: left panel with identity, contact links, and photo placeholder"
```

---

### Task 6: Right Panel — About Section

**Files:**
- Create: `components/sections/AboutSection.tsx`
- Modify: `components/layout/RightPanel.tsx`

**Step 1: Create AboutSection with Framer Motion scroll animation**

`components/sections/AboutSection.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import { about } from "@/lib/data";

export function AboutSection() {
  return (
    <section id="about" className="mb-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)] mb-6"
      >
        About
      </motion.h2>
      <div className="space-y-4">
        {about.paragraphs.map((paragraph, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
            className="text-base leading-relaxed text-[var(--color-text-secondary)]"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
```

**Step 2: Update RightPanel to use AboutSection**

Replace the about placeholder in `RightPanel.tsx` with `<AboutSection />`.

**Step 3: Verify visually**

```bash
npm run dev
```

Scroll down to see fade-up animation on about section.

**Step 4: Commit**

```bash
git add components/sections/AboutSection.tsx components/layout/RightPanel.tsx
git commit -m "feat: about section with scroll-triggered animations"
```

---

### Task 7: Right Panel — Work Section with Cards

**Files:**
- Create: `components/sections/WorkSection.tsx`
- Create: `components/ui/WorkCard.tsx`
- Modify: `components/layout/RightPanel.tsx`

**Step 1: Create WorkCard component**

`components/ui/WorkCard.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import type { WorkEntry } from "@/lib/data";

export function WorkCard({ entry, index }: { entry: WorkEntry; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-6 transition-all duration-300 hover:border-[var(--color-text-tertiary)] hover:shadow-sm"
    >
      {/* Current badge */}
      {entry.current && (
        <span className="absolute top-4 right-4 text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--color-current-badge)] text-[var(--color-current-badge-text)]">
          Current
        </span>
      )}

      {/* Company & Title */}
      <h3 className="text-lg font-semibold text-[var(--color-text)] mb-0.5">
        {entry.company}
      </h3>
      <p className="text-sm text-[var(--color-text-secondary)] mb-1">
        {entry.title} · {entry.location}
      </p>
      <p className="text-xs text-[var(--color-text-tertiary)] mb-3">
        {entry.dateRange}
      </p>

      {/* Description */}
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
        {entry.description}
      </p>

      {/* Highlight */}
      <p className="text-sm font-medium text-[var(--color-text)] mb-4">
        {entry.highlight}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {entry.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-tag-bg)] text-[var(--color-tag-text)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
```

**Step 2: Create WorkSection**

`components/sections/WorkSection.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import { work } from "@/lib/data";
import { WorkCard } from "@/components/ui/WorkCard";

export function WorkSection() {
  return (
    <section id="work" className="mb-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)] mb-6"
      >
        Work
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {work.map((entry, i) => (
          <WorkCard key={entry.id} entry={entry} index={i} />
        ))}
      </div>
    </section>
  );
}
```

**Step 3: Update RightPanel to use WorkSection**

Replace work placeholder with `<WorkSection />`.

**Step 4: Verify visually**

```bash
npm run dev
```

Four cards in 2-column grid on desktop, stacked on mobile. Countant shows "Current" badge.

**Step 5: Commit**

```bash
git add components/sections/WorkSection.tsx components/ui/WorkCard.tsx components/layout/RightPanel.tsx
git commit -m "feat: work section with animated cards and tech tags"
```

---

### Task 8: Right Panel — Skills Marquee

**Files:**
- Create: `components/sections/SkillsSection.tsx`
- Create: `components/ui/SkillsMarquee.tsx`
- Modify: `components/layout/RightPanel.tsx`

**Step 1: Create SkillsMarquee component**

`components/ui/SkillsMarquee.tsx` — a pure CSS infinite scroll ticker. No JS animation libraries needed for this. Duplicates the list to create seamless loop.

```tsx
import { skillCategories } from "@/lib/data";

export function SkillsMarquee() {
  const allSkills = skillCategories.flatMap((cat) =>
    cat.skills.map((skill) => ({ skill, category: cat.label }))
  );

  return (
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[var(--color-bg)] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[var(--color-bg)] to-transparent z-10" />

      <div className="flex gap-3 animate-marquee">
        {/* Duplicate for seamless loop */}
        {[...allSkills, ...allSkills].map((item, i) => (
          <span
            key={`${item.skill}-${i}`}
            className="flex-none text-sm px-4 py-2 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] whitespace-nowrap hover:border-[var(--color-text-tertiary)] hover:text-[var(--color-text)] transition-colors duration-200"
          >
            {item.skill}
          </span>
        ))}
      </div>
    </div>
  );
}
```

**Step 2: Add marquee animation to globals.css**

Add to `globals.css`:
```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  animation: marquee 40s linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}
```

**Step 3: Create SkillsSection**

`components/sections/SkillsSection.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import { SkillsMarquee } from "@/components/ui/SkillsMarquee";

export function SkillsSection() {
  return (
    <section id="skills" className="mb-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)] mb-6"
      >
        Skills
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
      >
        <SkillsMarquee />
      </motion.div>
    </section>
  );
}
```

**Step 4: Update RightPanel to use SkillsSection**

Replace skills placeholder with `<SkillsSection />`.

**Step 5: Verify visually**

```bash
npm run dev
```

Skills scroll horizontally in a continuous loop. Pauses on hover. Faded edges on both sides.

**Step 6: Commit**

```bash
git add components/sections/SkillsSection.tsx components/ui/SkillsMarquee.tsx components/layout/RightPanel.tsx app/globals.css
git commit -m "feat: skills marquee with infinite scroll and hover pause"
```

---

### Task 9: AI Chat — API Route Update

**Files:**
- Modify: `app/api/chat/route.ts`

**Step 1: Update chat API to use Claude with new personality**

```ts
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
```

**Step 2: Verify API works**

```bash
npm run dev
# In another terminal:
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"What do you do?"}]}'
```

Expected: Streaming response in Franky's casual first-person voice.

**Step 3: Commit**

```bash
git add app/api/chat/route.ts
git commit -m "feat: update chat API to use Claude with natural conversational personality"
```

---

### Task 10: AI Chat — Chat UI Component

**Files:**
- Create: `components/chat/ChatWidget.tsx`
- Create: `components/chat/TypingPlaceholder.tsx`
- Modify: `components/layout/LeftPanel.tsx`

**Step 1: Create TypingPlaceholder component**

`components/chat/TypingPlaceholder.tsx` — cycles through placeholder prompts with a typing animation effect.

```tsx
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
```

**Step 2: Create ChatWidget component**

`components/chat/ChatWidget.tsx` — embedded chat in the left panel using Vercel AI SDK's `useChat` hook.

```tsx
"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import { TypingPlaceholder } from "./TypingPlaceholder";
import { chatSuggestions } from "@/lib/data";

export function ChatWidget() {
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    onFinish: () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    },
  });

  const handleSuggestionClick = (suggestion: string) => {
    setHasInteracted(true);
    handleInputChange({ target: { value: suggestion } } as React.ChangeEvent<HTMLInputElement>);
    // Submit on next tick after state updates
    setTimeout(() => {
      const form = inputRef.current?.closest("form");
      form?.requestSubmit();
    }, 0);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setHasInteracted(true);
    handleSubmit(e);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Chat messages area */}
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

      {/* Suggestion chips — only show before interaction */}
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

      {/* Input */}
      <form onSubmit={onSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          className="w-full text-sm px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-200"
          placeholder={hasInteracted ? "Ask me anything..." : ""}
          disabled={isLoading}
        />
        {/* Typing placeholder overlay when not interacted */}
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
```

**Step 3: Update LeftPanel to include ChatWidget**

Replace the chat placeholder in `LeftPanel.tsx` with the `ChatWidget` component. Wrap it in a `"use client"` boundary if needed (LeftPanel may need to become a client component, or the chat section can be isolated).

**Step 4: Verify visually and functionally**

```bash
npm run dev
```

- Typing placeholder cycles through prompts
- Suggestion chips visible before interaction
- Chat works with streaming responses
- Messages display in conversational format

**Step 5: Commit**

```bash
git add components/chat/ChatWidget.tsx components/chat/TypingPlaceholder.tsx components/layout/LeftPanel.tsx
git commit -m "feat: embedded AI chat with typing placeholder and suggestion chips"
```

---

### Task 11: Scroll Animations — Polish and Motion

**Files:**
- Modify: Various components for animation refinement

**Step 1: Add stagger animation to left panel elements on initial load**

Wrap left panel content items in Framer Motion `motion.div` with staggered delays (name → title → tagline → contact → chat). This creates the "text fades up with subtle stagger" effect from the design spec.

**Step 2: Add hover animations to work cards**

Enhance WorkCard with a subtle y-translate on hover (`group-hover:-translate-y-0.5`).

**Step 3: Add smooth scroll indicator or subtle scroll cue**

Optional: a small downward arrow or "scroll" text hint at the bottom of the visible right panel area on desktop, fading out once user scrolls.

**Step 4: Verify all animations respect `prefers-reduced-motion`**

Framer Motion handles this automatically, but verify the CSS marquee also stops.

Add to globals.css inside the `prefers-reduced-motion` block:
```css
.animate-marquee {
  animation: none !important;
}
```

**Step 5: Verify visually**

Full page walkthrough: load → left panel staggers in → scroll right panel → sections reveal → marquee scrolls → chat placeholder types.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: polish scroll animations, hover states, and reduced motion support"
```

---

### Task 12: Photo Integration

**Files:**
- Modify: `components/layout/LeftPanel.tsx`
- Add: `public/photo.jpg` (or whatever format the user provides)

**Step 1: Wait for user to add photo to Documents folder**

User said they will add a photo to Documents. Copy it to `public/photo.jpg`.

```bash
cp /home/wizard/Documents/<photo-filename> /home/wizard/Projects/portfolio/public/photo.jpg
```

**Step 2: Update LeftPanel photo placeholder**

Replace the gray circle div with a Next.js `Image` component:

```tsx
import Image from "next/image";

<Image
  src="/photo.jpg"
  alt="Franky Khoury Nicoletta"
  width={112}
  height={112}
  className="w-28 h-28 rounded-full object-cover"
  priority
/>
```

**Step 3: Commit**

```bash
git add public/photo.jpg components/layout/LeftPanel.tsx
git commit -m "feat: add profile photo to left panel"
```

---

### Task 13: Responsive Mobile Layout

**Files:**
- Modify: `components/layout/LeftPanel.tsx`
- Modify: `components/layout/RightPanel.tsx`
- Modify: `components/chat/ChatWidget.tsx`

**Step 1: Ensure left panel collapses properly on mobile**

The left panel should stack above the right panel on mobile (< lg breakpoint). It should show a condensed version: photo, name, title, tagline, contact links in a horizontal row, and a collapsible chat section.

**Step 2: Ensure right panel takes full width on mobile**

Remove the `lg:ml-[380px]` on mobile (it's already conditional with the `lg:` prefix).

**Step 3: Test on mobile viewport sizes**

```bash
npm run dev
```

Use browser dev tools to test at 375px, 414px, and 768px widths.

**Step 4: Ensure touch targets are at least 44x44px**

Verify all interactive elements (links, buttons, chips) meet minimum touch target sizes.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: responsive mobile layout with condensed left panel"
```

---

### Task 14: SEO, Metadata, and Final Polish

**Files:**
- Modify: `app/layout.tsx` (metadata)
- Create: `public/og-image.png` (optional — can generate or skip)
- Verify: Build and Lighthouse

**Step 1: Verify metadata in layout.tsx**

Already set in Task 2. Verify Open Graph tags work.

**Step 2: Add resume PDF to public folder**

```bash
cp "/home/wizard/Documents/Franky Khoury Nicoletta – Resume.pdf" /home/wizard/Projects/portfolio/public/resume.pdf
```

Add a "Resume" link to ContactLinks component.

**Step 3: Run production build**

```bash
npm run build
```

Fix any build errors or warnings.

**Step 4: Run Lighthouse audit**

```bash
npm run start
```

Check Lighthouse scores in browser for Performance, Accessibility, Best Practices, SEO.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: SEO metadata, resume download, and final polish"
```

---

## Summary

| Task | Description | Key Files |
|------|-------------|-----------|
| 1 | Clean slate | Delete old components and pages |
| 2 | Design system | globals.css, layout.tsx |
| 3 | Content data | lib/data.ts, franky.md |
| 4 | Split-panel layout | page.tsx, LeftPanel, RightPanel |
| 5 | Left panel identity | ContactLinks, photo placeholder |
| 6 | About section | AboutSection with scroll animation |
| 7 | Work section | WorkSection, WorkCard with tags |
| 8 | Skills marquee | SkillsMarquee with infinite scroll |
| 9 | Chat API | Update to Claude + new personality |
| 10 | Chat UI | ChatWidget, TypingPlaceholder |
| 11 | Animation polish | Stagger, hover, scroll cues |
| 12 | Photo | User provides, integrate |
| 13 | Mobile responsive | Collapse left panel, touch targets |
| 14 | SEO and final | Metadata, resume PDF, Lighthouse |
