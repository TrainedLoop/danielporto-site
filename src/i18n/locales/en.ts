// English texts: the same keys as pt.ts (the Messages type enforces it), including the
// pixel-art story and the credits.

import type { Achievement, EarlyJob, Job, Messages, Project, SkillGroup } from "./pt";

const profile = {
  name: "Daniel Porto",
  role: "Senior Full Stack Developer",
  company: "Purple Metrics",
  location: "Rio de Janeiro, Brazil",
  headline: "React, TypeScript and C#/.NET · Applied AI: LLMs, agents and computer vision",
  intro:
    "Senior full stack developer with over 10 years of experience building products. I take AI to production with what a company requires: per-user permissions, cost control, personal data protection and quality measured on real data.",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/daniel-porto/" },
    { label: "GitHub", href: "https://github.com/TrainedLoop" },
    { label: "contato@danielporto.com.br", href: "mailto:contato@danielporto.com.br" },
  ],
};

/** Experience, from the most recent to the oldest. */
const experience: Job[] = [
  {
    id: "purple-metrics-desenvolvedor-full-stack-senior",
    company: "Purple Metrics",
    role: "Senior Full Stack Developer",
    period: "Sep 2022 – present",
    description:
      "Marketing Mix Modeling (MMM) platform that shows brands how much each media channel actually drives results.",
    bullets: [
      "Responsible for the interface, the LLM integration and the prompts of the **AI chat** that answers questions about dashboard data and is in production with customers; it grew out of a prototype my team built in **3 days** at an internal hackathon.",
      "Proposed the architecture that lets the AI **navigate and take actions** in the dashboard, the basis of the chat's new features.",
      "Built Purple's proof of concept for the **MCP server**, connecting the platform's APIs to AI assistants.",
      "Develop the product dashboard: budget allocation and optimization, simulation, saturation curves and data setup.",
      "Led the adoption of **AI agents** in the team's development: skills and rules for Claude Code and Cursor, with a spec → plan → execution workflow integrated with Linear.",
      "Extracted the **design system** into its own npm package, with **45+ versions** published; I am the main contributor.",
      "Built the frontend **CI/CD** pipeline (lint, QA environments, automated review, E2E with Playwright, deploy to ECS): **800+ deploys** to production.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "TanStack Query",
      "Zustand",
      "Tailwind",
      "Recharts",
      "Radix UI",
      "Storybook",
      "GitHub Actions",
      "AWS",
      "Terraform",
      "Playwright",
    ],
  },
  {
    id: "fu2re-smart-solutions-desenvolvedor-full-stack-senior",
    company: "Fu2re Smart Solutions",
    role: "Senior Full Stack Developer",
    period: "Aug 2019 – Jun 2023",
    description: "Where I had my first serious contact with AI, before the boom.",
    bullets: [
      "Built the APIs of **SmartVision**, a computer vision training and inference platform, with the training and inference queue on Hangfire and CQRS (MySQL for writes, MongoDB for reads).",
      "Worked on the software for a car that photographed the utility poles of Light, Rio's power company, around the city, like Google's cars.",
      "Contributed to the **Urban** mobility app (React Native, Google Maps) and to the SmartVision front end (React, Redux).",
      "Maintained and extended the SmartAssets platform (WebForms, DevExpress, MySQL).",
    ],
    stack: ["C# / .NET", "Hangfire", "MySQL", "MongoDB", "React", "Redux", "React Native"],
  },
  {
    id: "fulllab-retail-solutions-lider-tecnico",
    company: "Fulllab | retail solutions",
    role: "Tech Lead",
    period: "May 2017 – Aug 2019",
    description: "Tech lead of a team of **4 people**.",
    bullets: [
      "Restructured **Mobfiq** with an API common to all customers and dependency injection for new platforms.",
      "Built a PHP plugin for Magento that controlled the store interface and the checkout flow.",
      "**Danone** migration portal: business rules applied to managers' spreadsheets to feed the ERP.",
      "Integrated stores without an API through reverse engineering (web scraping with Selenium), with APIs in .NET Core and MongoDB.",
    ],
    stack: [".NET Core", "Entity Framework Core", "MongoDB", "React", "PHP", "Selenium"],
  },
];

/** Early career: one line per job. */
const earlyCareer: EarlyJob[] = [
  {
    id: "fulllab-retail-solutions-desenvolvedor-net",
    company: "Fulllab | retail solutions",
    role: ".NET Developer",
    period: "Sep 2015 – May 2017",
    line: "VTEX integration before its documentation existed, and Sephora integration through web scraping (.NET, Dapper, MySQL, Selenium).",
  },
  {
    id: "hebara-distribuidora-de-produtos-lotericos-programador-junior",
    company: "Hebara Distribuidora de Produtos Lotéricos",
    role: "Junior Developer",
    period: "Sep 2013 – Sep 2015",
    line: "The company's intranet and portal, with my first production deploys (C#, .NET MVC, Oracle).",
  },
];

/** Selected projects. Never add dates, clients, employers or the word "freelance". */
const projects: Project[] = [
  {
    id: "ai-copilot",
    title: "AI copilot with permissions and LGPD (Brazil's data-protection law)",
    did: "An agent that queries an analytics platform's data with the permissions of the person asking, only on the read replica, masking personal data before it reaches the model.",
    result: "Cost capped per question.",
    stack: ["Google ADK", "Gemini"],
  },
  {
    id: "computer-vision",
    title: "Computer vision in production",
    did: "YOLO models trained on **~50,000 images**, served as ONNX on AWS and retrained with operators' corrections.",
    result: "**~95%** precision and recall on validation.",
    stack: ["YOLO", "ONNX", "AWS"],
  },
  {
    id: "confidence-extraction",
    title: "Confidence-based data extraction",
    did: "Local OCR, cloud OCR and an LLM in a cascade to read measurement screens.",
    result: "**377 of 380** fields correct, no wrong readings, paid service used on **< 3%** of fields.",
    stack: ["OCR", "Amazon Bedrock"],
  },
];

/** Skills by group; the flat list (home, JSON-LD) is derived from these (src/content/skills.ts). */
const skillGroups: SkillGroup[] = [
  {
    label: "AI",
    items: [
      "AI agents",
      "Model Context Protocol (MCP)",
      "Google ADK",
      "Amazon Bedrock",
      "Computer vision",
      "YOLO",
      "OCR",
      "LGPD / privacy in AI",
      "Claude Code",
      "Cursor",
    ],
  },
  { label: "Frontend", items: ["React", "TypeScript", "Design Systems"] },
  { label: "Backend", items: ["C# / .NET", "Python", "FastAPI", "PostgreSQL", "SQL Server"] },
  { label: "Infrastructure & quality", items: ["CI/CD", "GitHub Actions", "AWS", "Terraform", "Playwright"] },
];

// code: BCP 47, for the structured data (knowsLanguage); not shown on the page.
const languages = [
  { name: "Portuguese", code: "pt-BR" },
  { name: "English", code: "en" },
];

/** At-a-glance block of the résumé: two pitch sentences and three headline figures. */
const glance = {
  pitch: [
    "Senior full stack developer with over 10 years building products: from C#/.NET back ends to React and TypeScript front ends.",
    "I take AI to production with what a company requires: per-user permissions, cost control, personal data protection and quality measured on real data.",
  ],
  stats: [
    { value: "10+", label: "years building products" },
    { value: "800+", label: "production deploys from the pipeline I built" },
    { value: "45+", label: "published versions of the design system I extracted" },
  ],
};

/** Fixed UI texts (top bar, home, résumé and credits). */
const ui = {
  nav: { label: "Navigation", story: "story", resume: "résumé", language: "Language" },
  footerCredits: "sprite and font credits",
  privacyNotice: "This site records anonymous visits and sessions, without cookies, to improve its content.",
  home: {
    avatarAlt: "Daniel in pixel art",
    hello: "Hi, I'm",
    roleAt: "at",
    viewResume: "View résumé",
    achievementsLabel: "Highlights",
    achievementLink: "see on résumé",
    storyTitle: "Rather get to know me by playing?",
    storyText: "From my grandmother's house to AI in production, in 8 pixel-art levels. About 5 minutes.",
    storyCta: "Play the story",
    achievements: [
      {
        id: "ai-chat",
        result: "**in production** with customers",
        title: "AI chat in production",
        text: "I was responsible for the interface, the LLM integration and the prompts of an AI chat that answers questions about the product's data; it started as a **3-day** prototype at an internal team hackathon.",
        target: "purple-metrics-desenvolvedor-full-stack-senior",
      },
      {
        id: "ai-agents",
        result: "**spec → plan → execution**",
        title: "AI agents on the team",
        text: "I led the adoption of AI agents in the team's development, with skills and rules for Claude Code and Cursor integrated with Linear.",
        target: "purple-metrics-desenvolvedor-full-stack-senior",
      },
      {
        id: "computer-vision",
        result: "**~95%** precision and recall",
        title: "Computer vision in production",
        text: "YOLO models trained on ~50k images, served in production and retrained with the operators' corrections.",
        target: "projects",
      },
    ] satisfies Achievement[],
  },
  resume: {
    roleAt: "at",
    playStory: "▶ play the story",
    downloadPdf: "download PDF",
    pdfTitle: "Daniel Porto - Resume",
    glanceTitle: "At a glance",
    experience: "Experience",
    earlyCareer: "Early career",
    projects: "Selected projects",
    contact: "Contact",
    skills: "Skills",
    contactCta: "Contact me",
    contactSubject: "Contact from your website",
    glance,
    updated: "Updated {{date}}",
  },
  credits: {
    title: "Credits",
    intro:
      "The characters were put together with the <lpc>Universal LPC Spritesheet Character Generator</lpc>, using art from the Liberated Pixel Cup and the OpenGameArt community. Backgrounds, objects and screens were drawn for this site. On-screen text uses the Press Start 2P font by CodeMan38; the story's dialogue and hints use VT323 by Peter Hull; and body text uses Inter by Rasmus Andersson. All three are under the SIL Open Font License.",
    downloadCsv: "Download the full list (CSV)",
  },
};

/** Story UI: the scene, the ending and the inventory. */
const storyUi = {
  scene: {
    loading: "loading…",
    loadError: "LOADING FAILED",
    loadErrorHint: "The images for this level didn't load.",
    retry: "try again",
    skipPhase: "skip level",
    pressStart: "PRESS START",
    startHint: "click, or press Enter",
    continue: "continue",
    finish: "finish",
    skip: "skip",
    phaseClear: "LEVEL CLEAR",
    replay: "watch again",
    nextPhase: "next level",
    seeOnResume: "see it on my résumé",
  },
  ending: {
    title: "TO BE CONTINUED…",
    text: "Today I'm a senior full stack developer at Purple Metrics, taking AI to production.",
    resume: "read the résumé",
    home: "back to the start",
    credits: "credits",
    restart: "play again",
  },
  inventory: { label: "Inventory", title: "ITEMS" },
};

/** Texts of each phase, with the same beat ids as pt.ts. */
const phases: Messages["story"]["phases"] = {
  phase0: {
    title: "Level 0: Grandma's house",
    description:
      "A child sits at a beige Windows 95 computer in a bedroom at his grandmother's house, next to a stack of CD-ROM magazines.",
    item: "CD-ROM",
    beats: {
      holidays: "The '90s. I was about 8 and spent my school holidays at my grandma's house.",
      unclePc: "My uncle's PC was there, running Windows 95. I'd spend hours on it.",
      cdrom:
        "He used to buy a CD-ROM magazine that came with a disc full of programs and games. That's where it all began.",
    },
  },
  phase1: {
    title: "Level 1: My first PC",
    description:
      "A teenager sits at a Windows XP computer in the living room. A friend hands him an HTML workbook. On screen, a homemade Final Fantasy fan site and an alert that says Hello, world.",
    item: "HTML workbook",
    beats: {
      firstPc: "2004. My first PC, in our living room. A lot like my uncle's, but now with Windows XP.",
      workbook: "A friend lent me an HTML workbook from his school.",
      firstSites: "I started making my first websites, like a Final Fantasy fan site that never actually went live.",
      javascript: "Then came JavaScript and my first alert(). And the MSN Messenger sound going off all the time.",
    },
  },
  phase2: {
    title: "Level 2: The neighborhood tech guy",
    description:
      "A teenager has set up a computer repair bench in his family's garage. Neighbors show up carrying PC towers; he swaps memory and hard drives, reinstalls Windows and heads out with his toolbox to fix a computer at a customer's home.",
    item: "Screwdriver",
    beats: {
      courses: "At 16, I took courses in PC assembly and repair, and in Microsoft Office.",
      neighborhood: "I became the neighborhood tech guy: every PC on the block went through my hands.",
      repairs: "I wiped and reinstalled Windows and swapped parts, like hard drives and memory.",
      houseCalls: "Sometimes at my place, sometimes at the customer's.",
    },
  },
  phase3: {
    title: "Level 3: Tech support and college",
    description:
      "By day, a young man answers calls at a radio internet provider's support desk and fixes a customer's connection through remote access. At night, he sits in a C++ class in his Information Systems degree, and in the small hours he finishes an online C# course.",
    item: "Support headset",
    beats: {
      support: "Working tech support at a radio internet provider, I answered customers' calls…",
      remoteAccess: "…and fixed their problems through remote access.",
      college: "At night, college: Information Systems. That's where I met C and C++.",
      csharpCourse: "Halfway through college, I took an online C# course.",
    },
  },
  phase4: {
    title: "Level 4: Hebara, my first dev job",
    description:
      "A young man with a mohawk walks into an office with scratch-card posters and picks up the badge for his first job. On the monitor, he writes the intranet code in C#, makes his first production deploy and scratches a scratch card that reveals: new site.",
    item: "First job badge",
    beats: {
      firstJob: "In 2013, a C# course led me to my first job as a junior developer, at Hebara.",
      intranet: "I started by building the company intranet, with C#, .NET MVC, WebForms and an Oracle database.",
      firstDeploys: "Then came my first production deploys.",
      lotterySites: "I also helped restructure the Raspadinha do Rio and Rio de Prêmios websites.",
    },
  },
  phase5: {
    title: "Level 5: Fulllab, e-commerce and mobile",
    description:
      "In an open-plan office, a young man with a mohawk uncovers the VTEX API endpoints with a magnifying glass, connects the app to stores like Sephora and Magento through an API and, surrounded by a team of four, levels up to tech lead.",
    item: "Phone with the app",
    beats: {
      fulllab: "In 2015 I moved to Fulllab, to work on e-commerce and mobile apps.",
      vtex: "I integrated VTEX through reverse engineering, back when it had no documentation yet.",
      apis: "I built the apps' APIs, a Magento plugin and Selenium bots for stores with no API, like Sephora.",
      techLead: "In 2017 I became tech lead, with a team of 4.",
    },
  },
  phase6: {
    title: "Level 6: Fu2re and computer vision",
    description:
      "In an office with a fish tank, a bearded man works on SmartVision, a platform that trains computer vision models. Out on the street, a car with a camera on its roof photographs the utility poles of Light, Rio's power company, and they get detection boxes. Finally, a black box labeled AI opens up.",
    item: "The AI black box, opened",
    beats: {
      fu2re: "In 2019 I moved to Fu2re, where I first heard about AI for real, before the boom.",
      smartVision:
        "On SmartVision, the company's computer vision platform, I built everything from the APIs with the training queue to the React interface.",
      polesCar:
        "I worked on the software for a car that photographed the utility poles of Light, Rio's power company, around the city, like Google's cars.",
      blackBox: "And bit by bit I opened the black box to understand how a model gets trained.",
    },
  },
  phase7: {
    title: "Level 7: Purple Metrics, it all connects",
    description:
      "In a home office with Sugarloaf Mountain in the window, a bearded man swaps C# for React and TypeScript and watches the CI/CD pipeline pass 800 deploys. The items from the journey merge into a star: applied AI. With it comes the product's AI chat, built with the team on a video call, and a terminal connecting MCP and AI agents.",
    item: "Applied AI",
    beats: {
      purple:
        "In 2022 I joined Purple Metrics, working from home, and switched stacks: from back end to front end, with React and TypeScript.",
      pipeline: "I built the front end's CI/CD pipeline, with over 800 production deploys.",
      appliedAi: "Then it all clicked: everything I'd picked up along the way became applied AI.",
      chat: "With that, I built the first version of Purple's conversational chat.",
      today: "Today I keep building the current version with the team, already live with customers.",
      mcp: "I also built Purple's first MCP proof of concept, and I help the team develop with AI agents.",
    },
  },
};

const story = { ...storyUi, phases };

/** Title and description of each page, written into each route's static HTML at build time. */
const meta = {
  home: {
    name: "Home",
    title: "Daniel Porto · Senior Full Stack Developer · Applied AI",
    description:
      "Senior full stack developer at Purple Metrics: LLMs, agents and computer vision in production, React, TypeScript and C#/.NET. Résumé and pixel-art story.",
  },
  resume: {
    name: "Résumé",
    title: "Résumé · Daniel Porto · Senior Full Stack Developer",
    description:
      "Résumé of Daniel Porto, senior full stack developer at Purple Metrics: AI in production, React, TypeScript, C#/.NET and over 10 years of experience.",
  },
  story: {
    name: "Story",
    title: "The story in pixel art · Daniel Porto",
    description:
      "Daniel Porto's career told as a pixel-art game: 8 levels, from his grandmother's house to AI in production at Purple Metrics.",
  },
  credits: {
    name: "Credits",
    title: "Sprite and font credits · Daniel Porto",
    description:
      "Authors and licenses of the pixel art on Daniel Porto's site: sprites from the Liberated Pixel Cup and OpenGameArt, and the Press Start 2P font.",
  },
};

/** Sharing: alt text of the English Open Graph image (public/og-image.en.png). */
const share = {
  imageAlt: "Pixel-art card with Daniel Porto's avatar, his role and the items from the story.",
};

/** Texts of /llms.txt and /llms-full.txt (src/content/llms.ts). */
const llms = {
  languageName: "English",
  pages: "Pages in English",
  contact: "Contact",
  email: "Email",
  fullResume: "Full résumé in Markdown",
  fullResumeHint: "the whole résumé as text, in English and in Portuguese",
  fullIntro: "Daniel Porto's full résumé, generated from the same content as the site.",
  online: "Online version",
};

const en: Messages = { ...ui, meta, share, llms, story, profile, experience, earlyCareer, projects, skillGroups, languages };
export default en;
