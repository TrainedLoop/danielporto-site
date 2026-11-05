// English texts: the same keys as pt.ts (the Messages type enforces it), including the
// pixel-art story and the credits.

import type { Achievement, CaseId, CaseStudy, Job, Messages, Project, SkillGroup } from "./pt";

const profile = {
  name: "Daniel Porto",
  role: "Senior Full Stack Developer",
  company: "Purple Metrics",
  location: "Rio de Janeiro, Brazil",
  headline: "React, TypeScript and C#/.NET · Applied AI: LLMs, agents and computer vision",
  intro:
    "Senior full stack developer with over 10 years of experience building digital products, from C#/.NET back ends to React and TypeScript front ends. I now specialize in bringing artificial intelligence into customer-facing products with the safeguards a company needs: each user only reaches the data they are allowed to see, the cost of each answer is controlled, personal data is protected and quality is measured on real data.",
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
    period: "09/2022 – present",
    description:
      "Marketing Mix Modeling (MMM) platform: it shows brands how much each media channel drives in sales, to guide where to invest.",
    bullets: [
      "Developed the interface, the LLM (AI model) integration and the prompts of the dashboard's **AI copilot**, which answers customers' questions about their own data in plain language. It grew out of a prototype my team built in **3 days** at an internal hackathon and is now **in production**.",
      "Proposed the architecture that lets the copilot **navigate and take actions** in the dashboard (open pages, change filters, build charts) instead of only answering in text. The initial implementation was done by another team member; I now evolve and maintain it.",
      "Built Purple's proof of concept for an **MCP server**. MCP is an open standard for connecting AI assistants, such as Claude, to other systems; with it, those assistants query the platform directly.",
      "Develop the dashboard's screens, such as budget planning and optimization, scenario simulation and customer data setup.",
      "Led the development team's adoption of **AI agents** (assistants that write code, such as Claude Code and Cursor), with shared rules and a step-by-step workflow (specification, plan and execution) integrated with Linear, the team's task management tool.",
      "Turned the product's visual components into a **design system**, an in-house library reused across the company's products, which now share the same look; I am its main contributor.",
      "Built the front end's **CI/CD pipeline**, the automated process that tests, reviews and publishes every change (end-to-end tests with Playwright, on-demand test environments, deployment to AWS). Result: **far fewer errors reaching production**.",
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
    period: "08/2019 – 06/2023",
    description: "Applied computer vision company: solutions that use AI to analyze images.",
    bullets: [
      "Built the APIs of **SmartVision**, the company's platform for training computer vision models and applying them to new images, with a processing queue (Hangfire, CQRS, MySQL and MongoDB).",
      "Developed the software that managed the images and the route of a car that drove around the city photographing the utility poles of **Light**, Rio's power company, to build an inventory of those poles. The photos fed SmartAssets.",
      "Maintained and extended **SmartAssets** (WebForms, DevExpress, MySQL), the platform where the customer saw the results of image analyses from several sources, the car among them.",
      "Developed the **Urban** mobility app (React Native, Google Maps) and SmartVision front-end screens (React, Redux).",
    ],
    stack: ["C# / .NET", "Hangfire", "MySQL", "MongoDB", "React", "Redux", "React Native"],
  },
  {
    id: "fulllab-retail-solutions-lider-tecnico",
    company: "Fulllab | retail solutions",
    role: ".NET Developer and Tech Lead",
    period: "09/2015 – 08/2019",
    description:
      "Software house partnered with VTEX, an e-commerce platform, building apps and integrations for online stores. I joined as a .NET developer and became tech lead in 2017.",
    bullets: [
      "Led a team of **4 people** that developed the VTEX stores' apps end to end.",
      "Integrated with VTEX before any public documentation existed.",
      "Restructured **Mobfiq**, the app platform for stores, around a single API for all customers, which made it easier to connect new e-commerce platforms.",
      "Built a PHP plugin for Magento that controlled the store's interface and checkout flow in the app.",
      "Brought stores without an API, such as Sephora, into the app, with bots that read data straight from the website (web scraping with Selenium) and APIs in .NET Core and MongoDB.",
      "Moved **Danone**'s international distribution spreadsheet into a system: managers now fill in an easier, faster panel that feeds the company's ERP.",
    ],
    stack: [".NET", ".NET Core", "Entity Framework Core", "Dapper", "MySQL", "MongoDB", "React", "PHP", "Selenium"],
  },
  {
    id: "hebara-distribuidora-de-produtos-lotericos-programador-junior",
    company: "Hebara Distribuidora de Produtos Lotéricos",
    role: "Junior Developer",
    period: "09/2013 – 09/2015",
    description: "Distributor of lottery products.",
    bullets: [
      "Developed and maintained the company intranet and built new websites and applications, such as the Raspadinha do Rio and Rio de Prêmios websites (C#, .NET MVC, Oracle).",
    ],
    stack: ["C#", ".NET MVC", "Oracle"],
  },
];

/** Résumé projects. Never add dates, clients, employers or the word "freelance". */
const projects: Project[] = [
  {
    id: "data-agent",
    title: "Data agent with permissions and LGPD (Brazil's data-protection law)",
    did: "AI agent that answers questions about an analytics platform's data. It only reaches what the person asking is allowed to see, has no permission to change data and hides personal data before sending it to the model.",
    result: "the cost of each question is capped and personal data stays out of the model's reach.",
    stack: ["Google ADK", "Gemini"],
  },
  {
    id: "computer-vision",
    title: "Computer vision in production",
    did: "AI models that recognize objects in images (YOLO), trained on about **50,000 images**, running on AWS and retrained with operators' corrections.",
    result: "**~95%** accuracy (precision and recall) on validation.",
    stack: ["YOLO", "ONNX", "AWS"],
  },
  {
    id: "confidence-extraction",
    title: "Data extraction by confidence level",
    did: "System that automatically reads the values on measuring-device screens in photos. It first uses the cheapest text reading (OCR) and only turns to an AI model (LLM) when needed.",
    result: "**377 of 380** fields read correctly, no wrong readings, and the paid service used on under **3%** of fields.",
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

/** Professional summary of the résumé (also the home pitch): two sentences. */
const glance = {
  pitch: [
    "Senior full stack developer with over 10 years of experience building digital products, from C#/.NET back ends to React and TypeScript front ends.",
    "I now specialize in bringing artificial intelligence into customer-facing products with the safeguards a company needs: each user only reaches the data they are allowed to see, the cost of each answer is controlled, personal data is protected and quality is measured on real data.",
  ],
};

/** Fixed UI texts (top bar, home, résumé and credits). */
const ui = {
  langSuggestion: {
    label: "Language",
    text: "This page is also available in English.",
    link: "Read in English",
    close: "Close",
  },
  nav: { label: "Navigation", story: "story", resume: "résumé", projects: "projects", language: "Language" },
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
        result: "**in production**, used by customers",
        title: "AI copilot in the dashboard",
        text: "I developed the interface, the LLM (AI model) integration and the prompts of an AI copilot that answers customers' questions about their own data. It grew out of a **3-day** prototype at an internal team hackathon.",
        target: "purple-metrics-desenvolvedor-full-stack-senior",
        caseStudy: "ai-chat",
      },
      {
        id: "ai-agents",
        result: "**specification → plan → execution**",
        title: "AI agents on the team",
        text: "I led the development team's adoption of AI agents (assistants that write code, such as Claude Code and Cursor), with shared rules and a workflow integrated with Linear.",
        target: "purple-metrics-desenvolvedor-full-stack-senior",
        caseStudy: "ai-workflow",
      },
      {
        id: "computer-vision",
        result: "**~95%** accuracy (precision and recall)",
        title: "Computer vision in production",
        text: "AI models that recognize objects in images (YOLO), trained on about 50,000 images, in production and retrained with the operators' corrections.",
        target: "projects",
      },
    ] satisfies Achievement[],
  },
  resume: {
    roleAt: "at",
    playStory: "▶ play the story",
    printPdf: "print / save as PDF",
    pdfTitle: "Daniel Porto - Resume",
    glanceTitle: "Professional summary",
    experience: "Experience",
    projects: "Projects",
    projectResult: "Result",
    personalProjects: {
      title: "Personal projects",
      items: [
        {
          case: "sealdown",
          text: "Sealdown — document sharing by link, encrypted in the browser.",
        },
        {
          case: "mailhub-mcp",
          text: "mailhub-mcp — connects Claude to several mailboxes, with no way to send or delete.",
        },
      ] satisfies { case: CaseId; text: string }[],
    },
    caseStudyLink: "read the case study",
    contact: "Contact",
    skills: "Skills",
    contactCta: "Message me on LinkedIn",
    glance,
    updated: "Updated {{date}}",
  },
  credits: {
    title: "Credits",
    intro:
      "The characters were put together with the <lpc>Universal LPC Spritesheet Character Generator</lpc>, using art from the Liberated Pixel Cup and the OpenGameArt community. Backgrounds, objects and screens were drawn for this site. On-screen text uses the Press Start 2P font by CodeMan38; the story's dialogue and hints use VT323 by Peter Hull; and body text uses Inter by Rasmus Andersson. All three are under the SIL Open Font License.",
    downloadCsv: "Download the full list (CSV)",
  },
  notFound: {
    title: "GAME OVER",
    text: "Page not found.",
    hint: "This address doesn't exist on the site. How about starting over?",
    home: "back to the start",
    resume: "see the résumé",
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
    startHintTouch: "tap to start",
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
  projects: {
    name: "Projects",
    title: "Projects · Daniel Porto · Senior Full Stack Developer",
    description:
      "Six projects from problem to outcome: an AI copilot, CI/CD and a design system, extraction by confidence, Sealdown, mailhub-mcp and AI agents.",
  },
  "case-ai-chat": {
    name: "AI copilot in the dashboard",
    title: "AI copilot in the dashboard · Daniel Porto",
    description:
      "How an AI copilot that answers customers' questions and acts on the dashboard went from a 3-day prototype to production: problem, decisions and outcome.",
  },
  "case-cicd-design-system": {
    name: "CI/CD and design system",
    title: "CI/CD and design system · Daniel Porto",
    description:
      "The automated process that tests and publishes every front-end change, and the component library shared by the products: problem, decisions and outcome.",
  },
  "case-ocr-extraction": {
    name: "Data extraction by confidence level",
    title: "Data extraction by confidence level · Daniel Porto",
    description:
      "377 of 380 fields correct, no wrong readings and the paid service on under 3% of fields: cascading OCR and LLM to read measurements from images.",
  },
  "case-sealdown": {
    name: "Sealdown",
    title: "Sealdown: documents encrypted in the browser · Daniel Porto",
    description:
      "Markdown and JSON shared by link and edited in real time, encrypted in the browser: the server never reads the content. Problem, decisions and outcome.",
  },
  "case-mailhub-mcp": {
    name: "mailhub-mcp",
    title: "mailhub-mcp: safe email for AI agents · Daniel Porto",
    description:
      "An MCP server that gives Claude several mailboxes through one connector, with no sending or deleting, undoable changes and prompt-injection defenses.",
  },
  "case-ai-workflow": {
    name: "Software development with AI agents",
    title: "Software development with AI agents · Daniel Porto",
    description:
      "How I use AI agents to write code with a method: specification, plan, one agent per task, review and automated tests before any change goes in.",
  },
  credits: {
    name: "Credits",
    title: "Sprite and font credits · Daniel Porto",
    description:
      "Authors and licenses of the pixel art on Daniel Porto's site: sprites from the Liberated Pixel Cup and OpenGameArt, and the Press Start 2P font.",
  },
  "not-found": {
    name: "Page not found",
    title: "Page not found · Daniel Porto",
    description:
      "This address doesn't exist on Daniel Porto's site. Go back to the start for the résumé, the projects and the pixel-art story.",
  },
};

/** Case studies (/en/projects/), in navigation order; same shape as the Portuguese ones. */
const caseStudies = {
  indexTitle: "Projects",
  indexIntro: "Six projects told from problem to outcome: the decisions, how it works and what changed.",
  labels: {
    breadcrumb: "Projects",
    role: "Role",
    stack: "Stack",
    context: "Context",
    problem: "The problem",
    decisions: "Decisions",
    flow: "How it works",
    outcome: "Outcome",
    previous: "Previous project",
    next: "Next project",
    resume: "see on résumé",
  },
  items: [
    {
      id: "ai-chat",
      title: "AI copilot in the dashboard",
      summary:
        "A copilot that answers Purple Metrics customers' questions about their own data and takes actions in the dashboard.",
      result:
        "An AI copilot **used by Purple Metrics customers** that answers questions about their data and **takes actions** in the dashboard.",
      role: "I developed the interface, the LLM integration and the prompts (refined with the data team) and proposed the actions architecture, which I now evolve and maintain.",
      stack: ["React", "TypeScript", "Python", "Claude"],
      context:
        "Purple Metrics is a Marketing Mix Modeling platform: it shows brands how much each media channel drives in sales, to guide where to invest. Before the copilot, to answer a question, customers looked through the dashboard's charts or asked the customer success (CS) team for help.",
      problem:
        "The data was in the dashboard, but the answer to many questions was spread across different charts and pages. To get to it, customers had to combine the information on their own or wait for the CS team, which slowed their analyses down and increased their reliance on support.",
      decisions: [
        {
          title: "Start with a prototype.",
          text: "The copilot grew out of a prototype my team built in **3 days** at an internal hackathon, designed for this problem from the start. Testing the idea quickly showed it worked before investing in the full product.",
        },
        {
          title: "Give the copilot each customer's context.",
          text: "From the first version, the copilot knows each customer's data, so it answers about that customer's account rather than in general terms.",
        },
        {
          title: "Make the copilot act, not just answer.",
          text: "I proposed an architecture in which the copilot knows which dashboard page it is open on and can **take actions**, such as opening a page, changing a filter or building a chart. That way the customer goes straight to the information instead of only getting text. The first version was implemented by another team member; I now evolve and maintain it.",
        },
        {
          title: "Answer with the real data.",
          text: "To answer, the copilot queries the customer's database (by generating SQL queries) and the platform's APIs, and returns analyses and charts.",
        },
      ],
      flow: [
        "Customer's question + the open page",
        "Server",
        "The LLM decides: query the data or take an action",
        "The dashboard applies the action (open a page, change a filter, build a chart)",
      ],
      outcome: [
        "Customers adopted the copilot **quickly** and now reach answers with less reliance on the CS team.",
        "Customers were satisfied with the copilot's answers.",
        "The questions asked to the copilot revealed **doubts the team didn't know customers had**, which helps decide what to improve in the product.",
        "The actions structure became the foundation for the copilot's new features, which are built without redoing the architecture.",
      ],
      resumeTarget: "purple-metrics-desenvolvedor-full-stack-senior",
    },
    {
      id: "cicd-design-system",
      title: "CI/CD and design system",
      summary:
        "The automated process that tests and publishes every front-end change, and the component library shared by the products.",
      result: "**Far fewer errors** reaching production, and products with **the same look**.",
      role: "I built the front end's CI/CD pipeline and turned the product's components into a design system, of which I am the main contributor.",
      stack: ["GitHub Actions", "AWS (ECR/ECS)", "Terraform", "Playwright", "React", "Radix UI", "Storybook"],
      context:
        "CI/CD is the automated process that tests, reviews and publishes every code change; a design system is a library of visual components shared by the products. A single system (a monolith) kept splitting into several similar projects that didn't guarantee matching components.",
      problem:
        "Products with different components for the same thing, and a delivery process that needed more flexible test environments, tests at the right moment and traceable releases.",
      decisions: [
        {
          title: "Publish the design system as its own package.",
          text: "Its own npm package makes distribution across products easier, including for people who don't code and want to build a prototype or a quick AI project with the official components.",
        },
        {
          title: "Test at the right moment.",
          text: "Tests run when a change is proposed (in the pull request), and the end-to-end tests with Playwright, which simulate real use of the product, run before release, as fast as possible.",
        },
        {
          title: "Create test environments on demand.",
          text: "Every change gets its own test environment before it goes to production.",
        },
        {
          title: "Run quick checks on real customers.",
          text: "Quick verification tests (smoke tests) run on real customers, to find errors before the customer does.",
        },
      ],
      flow: [
        "Change proposed, with tests",
        "Test environment on demand",
        "End-to-end tests before release",
        "Traceable release",
        "Smoke tests on real customers",
      ],
      outcome: [
        "More frequent, traceable releases.",
        "Fewer bugs reaching customers.",
        "Products with the same look: the design system made the components match.",
        "People from other areas building prototypes with the official components, without depending on the development team.",
      ],
      resumeTarget: "purple-metrics-desenvolvedor-full-stack-senior",
    },
    {
      id: "ocr-extraction",
      title: "Data extraction by confidence level",
      summary: "A system that reads values from measuring-device screens in photos, combining OCR and AI at low cost.",
      result: "**377 of 380** fields correct, no wrong readings, and the paid service called on **under 3%** of fields.",
      role: "I designed and built the system and trained the two computer vision models (cropping and classification).",
      stack: ["YOLO", "OCR", "AWS Lambda", "Amazon Bedrock"],
      context:
        "People filled in spreadsheets and cropped images by hand to record readings from scales and other measuring equipment, at volumes of **thousands of images per day**.",
      problem: "Automate the reading at low cost and high confidence, at a volume of thousands of images per day.",
      decisions: [
        {
          title: "Crop the way people cropped.",
          text: "A computer vision model (YOLO) crops the image the way users were already doing it by hand.",
        },
        {
          title: "Know what the image is before reading it.",
          text: "A second model, with **4 classes**, identifies the image type (item, sticky note, scale and dimensioning device).",
        },
        {
          title: "Read in a cascade, by cost and confidence.",
          text: "Reading goes through steps, from the cheapest to the most expensive, and only moves on when the previous one isn't enough. First, our own OCR (automatic text reading) on a small AWS Lambda; if the result doesn't pass the rules, a more robust cloud OCR; if it still fails, an LLM with the context of everything that happened before. Sending everything straight to the LLM would be expensive at this volume, and the layers gave **more confidence** than the LLM alone.",
        },
        {
          title: "Define rules per equipment type.",
          text: "Each type of scale or measuring device has its own set of rules to decide whether a reading is valid or moves on to the next step.",
        },
      ],
      flow: [
        "Crop (YOLO)",
        "Image type (YOLO, 4 classes)",
        "OCR on Lambda",
        "Cloud OCR",
        "LLM with context",
        "Human validation (feeds retraining)",
      ],
      outcome: [
        "Work that took **days or weeks** became a review of **minutes**: people stopped filling in spreadsheets and cropping images and now only validate.",
        "Human validation serves as **retraining** data for the models.",
        "**377 of 380** fields correct when reading measuring-device screens (the other 3 were left blank, with no wrong readings), with the paid service on **under 3%** of fields.",
      ],
      resumeTarget: "projects",
    },
    {
      id: "sealdown",
      title: "Sealdown: documents only people with the link can read",
      summary: "An app for sharing documents by link, encrypted in the browser: not even the server can read them.",
      result:
        "Markdown and JSON shared by link and edited in real time, **encrypted in the browser**: the server **never reads** the content.",
      role: "Personal project: I conceived and built it on my own, with Claude Code.",
      stack: ["React", "TypeScript", "CodeMirror", "Yjs", "Web Crypto", "Supabase (Postgres, Realtime)", "Playwright", "Claude Code"],
      context:
        "I needed to share Markdown documents (formatted text), with Mermaid diagrams, through a private link, for free and without creating an account.",
      problem:
        "As a matter of principle, no one should be able to read a document without permission, not even the server that stores it. And in live documents, someone with only the read link must not be able to write.",
      decisions: [
        {
          title: "Encrypt in the browser.",
          text: "Every document is scrambled (encrypted) in the browser before it is sent; the key stays only in the link. Technically: AES-GCM, with the key in the link's fragment (after the #), which is never sent to a server. Supabase only stores ciphertext.",
        },
        {
          title: "Protect with a password, with no key in the link.",
          text: "With a password, neither the password nor the key goes in the link: the key is generated from the password in the browser itself (PBKDF2, **600,000 iterations**).",
        },
        {
          title: "Stop the read link from editing.",
          text: "Only someone with the edit link can change a live document. Every edit to a live document is signed with an **Ed25519** key derived from the edit token, which exists only in the edit link. The read link has only the public key: it verifies edits but can't create a valid one. The server stores only the token's hash.",
        },
        {
          title: "Edit in real time without a server of my own.",
          text: "Several people can edit the same document at the same time. In Markdown, this uses Yjs, and the edits travel encrypted and signed through Supabase Realtime. In JSON, the document saves after a pause and combines the changes field by field, asking for a choice only when two people changed the same value.",
        },
        {
          title: "Develop with AI and with a method.",
          text: "I built it with Claude Code in a specification → plan → execution flow: **7 specifications and 7 plans**, one per phase of the project.",
        },
      ],
      flow: [
        "Document in the browser",
        "Encrypt (AES-GCM)",
        "Link with the key after the #",
        "Supabase stores only ciphertext",
        "Whoever has the link decrypts in the browser",
      ],
      outcome: [
        "Live, with the code open on GitHub.",
        "**116 commits** (recorded code changes) over 6 days of work, all with Claude Code.",
        "**About 430 automated tests**: ~220 unit, ~209 end-to-end (E2E), plus visual and database tests.",
        "Real-time editing, history with named versions and a JSON mode, with no accounts and no server reading anything.",
      ],
      resumeTarget: "personal-project",
      image: {
        src: "projects/sealdown.webp",
        srcSmall: "projects/sealdown-800.webp",
        width: 1920,
        height: 1200,
        alt: "Sealdown in split mode: the sample Markdown on the left, and on the right the rendered text with a Mermaid diagram (Write → Seal → Share).",
      },
      links: [
        { label: "Open", href: "https://trainedloop.github.io/sealdown/" },
        { label: "Code", href: "https://github.com/TrainedLoop/sealdown" },
      ],
    },
    {
      id: "mailhub-mcp",
      title: "mailhub-mcp: safe email for AI agents",
      summary: "Connects Claude to several mailboxes safely: it doesn't send, doesn't delete, and every change can be undone.",
      result:
        "An MCP server (an open standard that connects AI assistants to other systems) that gives Claude **several mailboxes through one connector**, with no way to **send or delete** anything, and every change undoable.",
      role: "Personal, open source project: I conceived and built it on my own, with Claude Code.",
      stack: ["Python", "FastMCP", "Gmail API", "OAuth", "Docker", "Tailscale Funnel", "GitHub Actions"],
      context:
        "I needed a daily summary of what requires attention across all my mailboxes. The native Gmail connector takes one account at a time, and I didn't want to hand my credentials to a third-party service. So I built a server of my own.",
      problem:
        "An agent that reads email reads text written by anyone, and any message can carry hidden instructions (prompt injection). The server has to stay safe even when the model is fooled.",
      decisions: [
        {
          title: "Block sending and deleting email.",
          text: "The code never calls the send, trash or delete APIs, and **a test scans the code** to enforce it. Drafts only as replies to people already in the thread.",
        },
        {
          title: "Make every change reversible.",
          text: "Every change can be undone. Labels, archiving and read status are recorded in a history (journal) with each message's previous state, so one batch, or everything since a given time, can be undone. Bulk changes show a preview first and have a daily cap.",
        },
        {
          title: "Treat email as untrusted input.",
          text: "The content of each email is cleaned and isolated before it reaches the model. Hidden HTML text and invisible characters are removed, the content is wrapped in markers with a random code (nonce), and likely injection attempts are flagged instead of acted on.",
        },
        {
          title: "Require approval outside the chat.",
          text: "Preferences that raise attention apply right away; those that lower it, like ignoring a sender, become a proposal only I can approve, out of the assistant's reach. Mailboxes are linked on a separate admin page.",
        },
        {
          title: "Recognize each layer's limits.",
          text: "The server side is mitigated and keeps improving. The remaining risk sits in the client agent: if another tool in the same session can reach the machine or the internet, a malicious email can try to use it. That's why scheduled routines use a **read-only instance**.",
        },
      ],
      flow: [
        "Claude's request",
        "Google login with an allowlist",
        "Tool: read or organize",
        "Content cleaned and marked as untrusted",
        "Change recorded in the journal, undoable",
      ],
      outcome: [
        "I use it **every day on 5 mailboxes**.",
        "**156 commits**, all with Claude Code.",
        "**1,151 automated tests**, including the one that forbids the send and delete calls.",
        "**18 tools** (11 read-only), open source (MIT), in beta, with a published multi-architecture Docker image and a site with step-by-step install.",
      ],
      resumeTarget: "personal-project",
      image: {
        src: "projects/mailhub-mcp.webp",
        srcSmall: "projects/mailhub-mcp-800.webp",
        width: 1280,
        height: 900,
        alt: "The mailhub-mcp admin page with sample data: four linked mailboxes, each with its state and buttons to re-link and remove.",
      },
      links: [
        { label: "Open", href: "https://trainedloop.github.io/mailhub-mcp/" },
        { label: "Code", href: "https://github.com/TrainedLoop/mailhub-mcp" },
      ],
    },
    {
      id: "ai-workflow",
      title: "Software development with AI agents",
      summary:
        "The method I use so that AI agents write quality code: specification, plan, review and automated tests.",
      result:
        "A way of working in which AI agents write the code while I define what to do, **review every step** and ensure quality with **automated tests**.",
      role: "I led the adoption on the Purple Metrics team and use the same method in my personal projects, whose code is public.",
      stack: ["Claude Code", "Cursor", "Linear", "GitHub Actions", "Playwright"],
      context:
        "AI agents, such as Claude Code and Cursor, are assistants that write code from instructions. At Purple Metrics, I led the development team's adoption of these tools, with shared rules and a workflow integrated with Linear, the team's task management tool. In my personal projects I use the same method, and the whole process can be checked in the code.",
      problem:
        "An agent writes code quickly, but without a method that speed turns into rework: decisions get lost from one conversation to the next, the code isn't reviewed carefully and the agent forgets agreed rules.",
      decisions: [
        {
          title: "Specify before coding.",
          text: "Every change starts with a specification written with the agent: what changes, why and what stays out. I review and correct that specification before any code is written.",
        },
        {
          title: "Split the work into small tasks.",
          text: "The specification becomes a plan of small tasks, each with the files involved and how to check that it is correct.",
        },
        {
          title: "Use one agent per task, with review.",
          text: "Each task is carried out by a separate agent that starts without the history of the previous ones, and the result is reviewed before the next one.",
        },
        {
          title: "Turn rules into automated tests.",
          text: "Whatever the agent might forget becomes an automated test. On this site, publishing is blocked if confidential text shows up, and **over 100 tests** simulate real use of the pages on every change.",
        },
        {
          title: "Keep the final decision with me.",
          text: "The agent prepares the change for review; I test it, review it and decide whether it goes in.",
        },
      ],
      flow: [
        "Specification reviewed by me",
        "Plan of small tasks",
        "One agent per task, with review",
        "Automated tests",
        "Final test and approval (me)",
      ],
      outcome: [
        "**Sealdown:** **7 specifications and 7 plans** made public, **116 commits** (recorded code changes) and about **430 automated tests**.",
        "**mailhub-mcp:** **156 commits** and **1,151 automated tests**, with the design documents public.",
        "**This site:** over **25 reviewed changes**, each checked by over **100 automated tests**.",
        "**At Purple Metrics:** rules shared by the team, with the specification → plan → execution workflow integrated with Linear.",
      ],
      resumeTarget: "purple-metrics-desenvolvedor-full-stack-senior",
      links: [
        { label: "Sealdown specifications", href: "https://github.com/TrainedLoop/sealdown/tree/main/docs/superpowers" },
        { label: "Site code", href: "https://github.com/TrainedLoop/danielporto-site" },
      ],
    },
  ] satisfies CaseStudy[],
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

const en: Messages = { ...ui, meta, caseStudies, share, llms, story, profile, experience, projects, skillGroups, languages };
export default en;
