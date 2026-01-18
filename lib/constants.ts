export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  type: "web" | "game" | "tool";
}

export const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    type: "web",
  },
  {
    id: "project-2",
    title: "Task Management API",
    description:
      "RESTful API service for task management with authentication, real-time updates, and team collaboration.",
    tags: ["Node.js", "Express", "MongoDB", "Socket.io"],
    type: "tool",
  },
  {
    id: "project-3",
    title: "Dungeon Crawler",
    description:
      "Procedurally generated roguelike dungeon crawler with permadeath and ASCII graphics.",
    tags: ["JavaScript", "Canvas", "Procedural Gen"],
    link: "https://itch.io",
    type: "game",
  },
  {
    id: "project-4",
    title: "Analytics Dashboard",
    description:
      "Real-time analytics dashboard with customizable widgets, data visualization, and export features.",
    tags: ["React", "D3.js", "Python", "FastAPI"],
    type: "web",
  },
  {
    id: "project-5",
    title: "CLI Dev Tools",
    description:
      "Collection of command-line tools for developers: project scaffolding, code generation, and automation.",
    tags: ["Node.js", "Commander", "Inquirer"],
    github: "https://github.com",
    type: "tool",
  },
  {
    id: "project-6",
    title: "Puzzle Platformer",
    description:
      "Minimalist puzzle platformer with time manipulation mechanics and hand-crafted levels.",
    tags: ["Godot", "GDScript", "Pixel Art"],
    link: "https://itch.io",
    type: "game",
  },
];

export interface Skill {
  name: string;
  level: number; // 1-12
  category: "language" | "framework" | "tool" | "other";
}

export const SKILLS: Skill[] = [
  { name: "JavaScript/TypeScript", level: 11, category: "language" },
  { name: "Python", level: 8, category: "language" },
  { name: "React/Next.js", level: 10, category: "framework" },
  { name: "Node.js", level: 10, category: "framework" },
  { name: "PostgreSQL/MongoDB", level: 8, category: "tool" },
  { name: "Git/GitHub", level: 10, category: "tool" },
  { name: "Docker", level: 7, category: "tool" },
  { name: "Game Development", level: 6, category: "other" },
];

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com",
    icon: "◆",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://linkedin.com",
    icon: "◇",
  },
  {
    id: "itchio",
    label: "itch.io",
    url: "https://itch.io",
    icon: "○",
  },
];

export const ABOUT_TEXT = `I'm a Project Engineer with 5+ years of hands-on coding experience.

I started programming before AI tools existed, which means I actually understand the code I write. Now I use AI as a powerful assistant to speed up my workflow - but every line of code gets reviewed by human eyes before it ships.

My clients get production-grade code, not AI-generated slop. I care about maintainability, performance, and doing things right.

When I'm not building web applications, you'll find me making indie games. I love roguelikes, puzzle games, and anything with interesting mechanics.`;
