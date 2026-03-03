export interface WorkEntry {
  id: string;
  company: string;
  title: string;
  location: string;
  dateRange: string;
  description: string;
  tags: string[];
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
      "RCS AI financial assistant for expense tracking. Architected the entire product as the sole engineer: serverless backend, multi-model AI pipeline, and real-time message processing.",
    tags: ["TypeScript", "Next.js", "Express", "PostgreSQL", "Vercel AI SDK", "Claude", "Redis"],
    current: true,
  },
  {
    id: "textteddy",
    company: "TextTeddy",
    title: "Product Engineer (Contract)",
    location: "Remote",
    dateRange: "January 2025 – July 2025",
    description:
      "Note-taking app for saving and sharing media (movies, books, podcasts) with an AI assistant called Teddy via SMS. Built the landing page, implemented accessibility with font size scaling, fixed bugs, and created UI components.",
    tags: ["React Native", "Node.js", "Firebase", "Twilio", "Genkit"],
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
  },
  {
    id: "eyerate",
    company: "EyeRate",
    title: "Founding Engineer",
    location: "Elk Grove, CA",
    dateRange: "April 2020 – November 2021",
    description:
      "Reputation management platform. Led product redesign, contributed to monolith-to-microservices migration, and co-led engineering hiring.",
    tags: ["Next.js", "Node.js", "React", "MongoDB", "Express", "AWS"],
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
    "I'm Franky, a product engineer based in California. I've spent the last 6 years building products from the ground up at early-stage startups. I care about clean architecture, thoughtful design decisions, and shipping things that actually work.",
    "I believe engineering is evolving. It's less about writing every line of code and more about designing systems, making the right decisions, and knowing how to turn an idea into something real.",
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

