export interface MockResponse {
  keywords: string[];
  response: string;
  priority?: number;
}

export const WELCOME_MESSAGE = `BIOS v2.4.1 ... OK
Memory Test ... 640K OK
Loading PORTFOLIO.SYS ...

╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   ███████╗██████╗  █████╗ ███╗   ██╗██╗  ██╗██╗   ██╗       ║
║   ██╔════╝██╔══██╗██╔══██╗████╗  ██║██║ ██╔╝╚██╗ ██╔╝       ║
║   █████╗  ██████╔╝███████║██╔██╗ ██║█████╔╝  ╚████╔╝        ║
║   ██╔══╝  ██╔══██╗██╔══██║██║╚██╗██║██╔═██╗   ╚██╔╝         ║
║   ██║     ██║  ██║██║  ██║██║ ╚████║██║  ██╗   ██║          ║
║   ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝   ╚═╝          ║
║                                                              ║
║   ██╗  ██╗██╗  ██╗ ██████╗ ██╗   ██╗██████╗ ██╗   ██╗       ║
║   ██║ ██╔╝██║  ██║██╔═══██╗██║   ██║██╔══██╗╚██╗ ██╔╝       ║
║   █████╔╝ ███████║██║   ██║██║   ██║██████╔╝ ╚████╔╝        ║
║   ██╔═██╗ ██╔══██║██║   ██║██║   ██║██╔══██╗  ╚██╔╝         ║
║   ██║  ██╗██║  ██║╚██████╔╝╚██████╔╝██║  ██║   ██║          ║
║   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝   ╚═╝          ║
║                                                              ║
║            PROJECT ENGINEER  //  GAME DEV HOBBYIST           ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

System Ready.
Type HELP for commands or ask me anything about Franky.`;

export const MOCK_RESPONSES: MockResponse[] = [
  {
    keywords: ["hello", "hi", "hey", "greetings", "sup", "yo"],
    response: `> Hello, traveler!
> I'm here to tell you about Franky Khoury.
> Ask me about skills, projects, experience, or anything else!`,
    priority: 1,
  },
  {
    keywords: ["skills", "tech", "technologies", "stack", "languages", "tools"],
    response: `> LOADING SKILL DATABASE...

CORE SKILLS:
├─ JavaScript/TypeScript ████████████ 5+ years
├─ React/Next.js         ███████████░ 4+ years
├─ Node.js               ███████████░ 4+ years
├─ Python                ████████░░░░ 3+ years
└─ Game Development      ███████░░░░░ Hobbyist

SPECIALTIES:
> Production-grade code architecture
> AI-assisted development (with human oversight)
> Full-stack web applications
> Indie game development`,
    priority: 2,
  },
  {
    keywords: ["project", "projects", "work", "portfolio", "made", "built"],
    response: `> ACCESSING PROJECT ARCHIVE...

Scroll down to the PROJECTS section to see my work.
Or ask about specific project types:

> "web projects" - Web applications
> "games" - Game development projects
> "tools" - Developer tools & utilities`,
    priority: 2,
  },
  {
    keywords: ["web", "website", "app", "application"],
    response: `> WEB PROJECTS:

I build full-stack web applications with:
├─ Next.js / React frontends
├─ Node.js / Python backends
├─ PostgreSQL / MongoDB databases
└─ Cloud deployment (Vercel, AWS)

Each project receives careful code review.
No AI slop - just clean, maintainable code.`,
    priority: 3,
  },
  {
    keywords: ["game", "games", "gaming", "gamedev", "itch"],
    response: `> GAME DEV MODE ACTIVATED...

I make indie games as a hobby!
Genres: Roguelikes, puzzle games, experimental

Find my games on itch.io (link in LINKS section)

Fun fact: This portfolio is styled after games
like Moonring and Tiny Rogues!`,
    priority: 3,
  },
  {
    keywords: ["contact", "email", "hire", "work with", "reach", "connect"],
    response: `> ESTABLISHING CONNECTION...

Best ways to reach me:
├─ LinkedIn: Check the LINKS section
├─ GitHub: See my code there
└─ itch.io: For game projects

Scroll to the LINKS section for direct access!`,
    priority: 2,
  },
  {
    keywords: ["about", "who", "background", "bio", "story"],
    response: `> LOADING PERSONAL DATA...

FRANKY KHOURY
├─ Role: Project Engineer
├─ Experience: 5+ years of coding
├─ Location: Building cool stuff
└─ Status: Available for projects

I write production-grade code.
I use AI as a tool, not a crutch.
Every line gets reviewed by human eyes.

Scroll to ABOUT for the full story.`,
    priority: 2,
  },
  {
    keywords: ["ai", "artificial", "intelligence", "chatgpt", "claude", "copilot"],
    response: `> PROCESSING AI QUERY...

My approach to AI in development:
├─ 5 years coding BEFORE AI tools
├─ I understand the code I ship
├─ AI assists, humans decide
└─ Every line reviewed manually

Result: Production-grade code,
not AI-generated slop.`,
    priority: 2,
  },
  {
    keywords: ["experience", "years", "history", "career"],
    response: `> CAREER TIMELINE:

[5+ YEARS] Software Development
├─ Full-stack web applications
├─ API design & integration
├─ Database architecture
└─ Production deployments

[ONGOING] Game Development
├─ Indie games on itch.io
├─ Roguelikes & puzzle games
└─ Experimental projects

Check PROJECTS section for examples!`,
    priority: 2,
  },
  {
    keywords: ["resume", "cv", "download", "pdf"],
    response: `> LOCATING RESUME FILE...

My resume is available for download!
Scroll to the LINKS section and click:

[DOWNLOAD RESUME]

It includes:
├─ Full work history
├─ Technical skills
├─ Project highlights
└─ Contact information`,
    priority: 2,
  },
  {
    keywords: ["help", "commands", "what can", "how to"],
    response: `> HELP MENU:

Try asking about:
├─ skills    - Technical abilities
├─ projects  - Work I've done
├─ about     - Who I am
├─ contact   - How to reach me
├─ games     - Game dev projects
├─ ai        - My AI approach
├─ resume    - Get my CV

Or just chat! I'm pretty friendly.`,
    priority: 1,
  },
];

export const FALLBACK_RESPONSES = [
  `> I'm not sure I understand that one.
> Try: skills, projects, about, or contact`,

  `> Command not recognized.
> Type "help" for a list of topics!`,

  `> Hmm, I don't have info on that.
> Ask about my skills, projects, or experience!`,
];

export function findResponse(input: string): string {
  const normalizedInput = input.toLowerCase().trim();

  // Sort by priority (higher = more specific)
  const sortedResponses = [...MOCK_RESPONSES].sort(
    (a, b) => (b.priority || 0) - (a.priority || 0)
  );

  for (const mock of sortedResponses) {
    if (mock.keywords.some((keyword) => normalizedInput.includes(keyword))) {
      return mock.response;
    }
  }

  // Return random fallback
  return FALLBACK_RESPONSES[
    Math.floor(Math.random() * FALLBACK_RESPONSES.length)
  ];
}
