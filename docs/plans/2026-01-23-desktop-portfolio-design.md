# Desktop Portfolio Redesign

## Overview

Remake the non-terminal portfolio view as a fully interactive retro computer desktop experience. Dark mode Win95/CRT aesthetic with draggable windows, taskbar, and desktop icons.

## Core Concept

- **Single viewport** - No scrolling on desktop
- **Desktop metaphor** - Icons, windows, taskbar
- **Fully interactive** - Drag, resize, minimize, maximize, close windows
- **CRT aesthetic** - Scanlines, vignette, phosphor glow (existing effects)

---

## Boot Sequence

**Phase 1 (0-1s):** Black screen, text appears line by line
```
PORTFOLIO BIOS v2.0
Checking memory... 640K OK
Loading system files...
FRANKY_OS initialized.

Starting PORTFOLIO.SYS...
```

**Phase 2 (1-1.5s):** Desktop fade-in
- Background appears
- Icons stagger-animate in (pop one by one)

**Phase 3 (1.5-2s):** Auto-launch
- PROJECTS.exe window opens with scale-up animation

**Notes:**
- Only plays on first visit (or via "Reboot" in Start menu)
- `prefers-reduced-motion` users skip to desktop with window open

---

## Desktop Icons

| Icon | Filename | Action |
|------|----------|--------|
| 📁 | `PROJECTS.exe` | Opens file directory window |
| 👤 | `ABOUT.exe` | Opens MySpace-style profile |
| 📊 | `SKILLS.dat` | Opens skills viewer |
| 📎 | `RESUME.pdf` | Downloads resume |
| 🔗 | `GITHUB.lnk` | Opens GitHub in new tab |
| 🔗 | `LINKEDIN.lnk` | Opens LinkedIn in new tab |
| 💻 | `TERMINAL.exe` | Switches to terminal chat mode |
| 🗑️ | `RECYCLE.bin` | Easter egg |

**Icon behavior:**
- Double-click to open
- Arranged in grid on desktop
- Subtle hover effect

---

## Window System

### Chrome
```
┌─────────────────────────────────────────────┐
│ ▄ WINDOW_NAME                       _ □ ✕  │
├─────────────────────────────────────────────┤
│                                             │
│            (window content)                 │
│                                             │
└─────────────────────────────────────────────┘
```

- `▄` - Colored icon indicator
- `_` - Minimize to taskbar
- `□` - Maximize/restore
- `✕` - Close window

### Behaviors
- **Drag** - By title bar, constrained to viewport
- **Resize** - Drag edges/corners (minimum size enforced)
- **Focus** - Click anywhere to bring to front (z-index)
- **Double-click title** - Maximize/restore toggle
- **Session persistence** - Windows remember position during session

### Styling
- Border: 1px solid ash, inset shadow
- Title bar: Coal background, terminal font
- Active: Brighter title bar, colored accent
- Inactive: Dimmed title bar

---

## PROJECTS.exe

File directory listing style:

```
┌─────────────────────────────────────────────────────────────┐
│ ▄ PROJECTS.exe                                      _ □ ✕  │
├─────────────────────────────────────────────────────────────┤
│  C:\FRANKY\PROJECTS>                                        │
│ ─────────────────────────────────────────────────────────── │
│  NAME                    TYPE      TECH              YEAR   │
│ ─────────────────────────────────────────────────────────── │
│ ▸ E-Commerce Platform    PROJECT   Next.js,Stripe    2024  │
│ ▸ Senior Dev @ Acme Co   WORK      React,Node        2023  │
│ ▸ Dungeon Crawler        PROJECT   JS,Canvas         2023  │
│ ─────────────────────────────────────────────────────────── │
│  6 item(s)                                    FREE: 640K   │
└─────────────────────────────────────────────────────────────┘
```

- `PROJECT` label in cyan
- `WORK` label in magenta
- Rows highlight on hover
- Click row to open detail popup

### Detail Popup (Project)
```
┌───────────────────────────────────────────────────┐
│ ▄ E-Commerce Platform                     _ □ ✕  │
├───────────────────────────────────────────────────┤
│  TYPE: PROJECT                        YEAR: 2024 │
│ ─────────────────────────────────────────────────│
│  Full-stack e-commerce solution with real-time   │
│  inventory, payment processing, and admin        │
│  dashboard.                                      │
│ ─────────────────────────────────────────────────│
│  TECH: [Next.js] [TypeScript] [PostgreSQL]       │
│ ─────────────────────────────────────────────────│
│  [ ◆ VIEW LIVE ]          [ ◇ VIEW SOURCE ]     │
└───────────────────────────────────────────────────┘
```

### Detail Popup (Work)
```
┌───────────────────────────────────────────────────┐
│ ▄ Senior Dev @ Acme Co                    _ □ ✕  │
├───────────────────────────────────────────────────┤
│  TYPE: WORK                      2022 - 2024     │
│ ─────────────────────────────────────────────────│
│  Led development of customer-facing dashboard.   │
│  Reduced load times by 40%.                      │
│ ─────────────────────────────────────────────────│
│  TECH: [React] [Node.js] [AWS]                   │
│ ─────────────────────────────────────────────────│
│  [ ◆ VISIT COMPANY ]                             │
└───────────────────────────────────────────────────┘
```

---

## ABOUT.exe (MySpace Profile)

Ironic cringe - full MySpace aesthetic with professional content.

```
┌──────────────────────────────────────────────────────────────┐
│ ▄ EXPLORER.exe - Franky's Space                      _ □ ✕  │
├──────────────────────────────────────────────────────────────┤
│ ← → ⟳ 🏠 │ http://myspace.com/xX_franky_Xx            │ ⭐ │
├──────────────────────────────────────────────────────────────┤
│ ✨･ﾟ✧ FRANKYS SPACE ✧･ﾟ✨                                  │
│ ─────────────────────────────────────────────────────────────│
│ [GIF]  ♪ Now Playing: Linkin Park - In The End              │
│        ────────●───── 2:47 ▶                                │
│ ─────────────────────────────────────────────────────────────│
│ │ Profile pic │  FRANKY, 2X, Lebanon                        │
│ │             │  "I'm not like other developers"            │
│ │             │  Status: ✨ coding rn brb ✨                │
│ ─────────────────────────────────────────────────────────────│
│ ★ ABOUT ME ★ (marquee: ~*~thanks 4 visiting~*~)            │
│                                                              │
│ (Actual professional bio with occasional sparkles)          │
│                                                              │
│ ─────────────────────────────────────────────────────────────│
│ ★ TOP 8 ★ (tech stack as "friends")                        │
│ [React]  [Node]  [TypeScript]  [Next.js]                    │
│ [Python] [Git]   [PostgreSQL]  [Docker]                     │
│ ─────────────────────────────────────────────────────────────│
│ 📊 Visitors: 999,999 | 💌 Comments: 420                     │
│ [Guestbook] [Quiz Results] [Add 2 Friends]                  │
└──────────────────────────────────────────────────────────────┘
```

**Elements:**
- Tiled sparkly/star background (subtle)
- Blinking "online now!" indicator
- Fake music player (song display, optional click-to-play)
- Top 8 = tech stack with icons
- Fake visitor counter
- Blinkies/badges ("Best viewed in Netscape", etc.)
- Marquee text

---

## SKILLS.dat

```
┌─────────────────────────────────────┐
│ ▄ SKILLS.dat                _ □ ✕  │
├─────────────────────────────────────┤
│ JavaScript/TS  [████████████░] 11  │
│ React/Next.js  [███████████░░] 10  │
│ Node.js        [███████████░░] 10  │
│ Python         [█████████░░░░]  8  │
│ PostgreSQL     [█████████░░░░]  8  │
│ Git/GitHub     [███████████░░] 10  │
│ Docker         [████████░░░░░]  7  │
│ Game Dev       [███████░░░░░░]  6  │
├─────────────────────────────────────┤
│ █ Lang  █ Framework  █ Tool        │
└─────────────────────────────────────┘
```

- Colored bars by category (cyan/magenta/yellow/green)
- Compact, functional

---

## Taskbar

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [⊞ START] │ ▄ PROJECTS │ ▄ ABOUT │           │ 🟢 Online  12:34 PM │
└─────────────────────────────────────────────────────────────────────────┘
```

**Left:** Start button (opens menu)
**Middle:** Open window buttons (click to focus/restore)
**Right:** System tray (status, clock)

### Start Menu
```
┌──────────────────────┐
│ ▸ Programs        ▶ │
│ ▸ Documents       ▶ │
│ ───────────────────  │
│ ▸ Terminal Mode      │
│ ▸ Reboot             │
│ ───────────────────  │
│ ⏻ Shut Down...       │
└──────────────────────┘
```

- "Shut Down" → joke BSOD or "Thanks for visiting"
- "Reboot" → replay boot sequence

---

## Mobile Experience (< 768px)

**Desktop:**
- Tighter icon grid, larger touch targets
- Minimal/no taskbar
- Tap icon to open full-screen window

**Windows:**
- Full-screen only (no drag/resize)
- Swipe down or tap X to close
- One window at a time

**Boot sequence:**
- Faster (~1.5s)
- Still auto-opens PROJECTS.exe

---

## Data Model Updates

Add work experience to constants:

```typescript
export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  companyUrl?: string;
  description: string;
  tags: string[];
  startYear: number;
  endYear?: number; // undefined = present
}

export const WORK_EXPERIENCE: WorkExperience[] = [
  // ...
];
```

Update Project interface:
```typescript
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  type: "web" | "game" | "tool";
  year: number;
}
```

---

## Component Structure

```
components/
  desktop/
    Desktop.tsx           # Main desktop container
    DesktopIcon.tsx       # Individual icon
    Taskbar.tsx           # Bottom taskbar
    StartMenu.tsx         # Start menu dropdown
    BootSequence.tsx      # Boot animation
  window/
    Window.tsx            # Base draggable/resizable window
    WindowManager.tsx     # Handles z-index, open windows state
    TitleBar.tsx          # Window chrome
  apps/
    ProjectsApp.tsx       # File directory view
    ProjectDetail.tsx     # Detail popup
    AboutApp.tsx          # MySpace profile
    SkillsApp.tsx         # Skills viewer
```

---

## Implementation Notes

- Use Framer Motion for drag, animations
- Window state managed via React context or zustand
- Z-index tracked in state, incremented on focus
- localStorage to skip boot on repeat visits (optional)
- All existing CRT effects (scanlines, vignette) remain
