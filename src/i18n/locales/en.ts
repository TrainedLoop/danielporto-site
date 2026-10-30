// English texts: the same keys as pt.ts (the Messages type enforces it), including the
// pixel-art story and the credits.

import type { Achievement, CaseStudy, EarlyJob, Job, Messages, Project, SkillGroup } from "./pt";

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
        result: "**in production** with customers",
        title: "AI chat in production",
        text: "I was responsible for the interface, the LLM integration and the prompts of an AI chat that answers questions about the product's data; it started as a **3-day** prototype at an internal team hackathon.",
        target: "purple-metrics-desenvolvedor-full-stack-senior",
        caseStudy: "ai-chat",
      },
      {
        id: "ai-agents",
        result: "**spec → plan → execution**",
        title: "AI agents on the team",
        text: "I led the adoption of AI agents in the team's development, with skills and rules for Claude Code and Cursor integrated with Linear.",
        target: "purple-metrics-desenvolvedor-full-stack-senior",
        caseStudy: "ai-workflow",
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
    printPdf: "print / save as PDF",
    pdfTitle: "Daniel Porto - Resume",
    glanceTitle: "At a glance",
    experience: "Experience",
    earlyCareer: "Early career",
    projects: "Selected projects",
    personalProject: {
      title: "Personal project",
      text: "Sealdown — Markdown and JSON shared by link, encrypted in the browser and edited in real time.",
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
      "Five projects from problem to outcome: an AI chat, CI/CD and a design system, data extraction by confidence level, Sealdown and AI agents.",
  },
  "case-ai-chat": {
    name: "AI chat in production",
    title: "AI chat in production · Daniel Porto",
    description:
      "How an AI chat that understands the page and acts on the dashboard went from a 3-day prototype to production with customers: problem, decisions and outcome.",
  },
  "case-cicd-design-system": {
    name: "CI/CD and design system",
    title: "CI/CD and design system · Daniel Porto",
    description:
      "800+ production deploys and a design system with 45+ versions: the problem, the decisions and the outcome of the CI/CD pipeline and the component package.",
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
  "case-ai-workflow": {
    name: "Development with AI agents",
    title: "Development with AI agents · Daniel Porto",
    description:
      "How I use AI agents to write code with a process: spec, plan, one agent per task, review and tests that stop mistakes before the merge.",
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
  indexIntro: "Five projects told from problem to outcome: the decisions, how it works and what changed.",
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
      title: "AI chat in production",
      result: "An AI chat **in production with customers** that understands the page it is open on and acts on the dashboard.",
      role: "Interface, LLM integration and prompts (refined with the data team); proposed the actions architecture.",
      stack: ["React", "TypeScript", "Python", "Claude"],
      context:
        "Purple Metrics is a Marketing Mix Modeling platform that shows brands how much each media channel really delivers. Customers got their questions answered right in the dashboard, through the charts, or by asking the CS team.",
      problem:
        "The data already existed, but the insights were not easy to reach. Many questions could only be answered by combining data spread across different charts or pages.",
      decisions: [
        {
          title: "Start with a prototype.",
          text: "The chat grew out of a prototype my team built in **3 days** at an internal hackathon; I was responsible for the interface, the LLM integration and the prompts.",
        },
        {
          title: "Give the chat the customer's context.",
          text: "The first version was a standalone chat, already holding all of the customer's context.",
        },
        {
          title: "Move past the standalone chat.",
          text: "I proposed the architecture that gives the chat the **context of the page** it is open on and lets it **perform actions** on that page or outside it, instead of only answering in text.",
        },
        {
          title: "Answers backed by real data.",
          text: "The chat answers by generating SQL and calling Python APIs, with insights and charts.",
        },
      ],
      flow: [
        "Question + page context",
        "Backend",
        "LLM decides: query data or perform an action",
        "The dashboard applies the action (open a page, change a filter, build a chart)",
      ],
      outcome: [
        "Customers using it and **fast adoption**.",
        "Customers happy with the result.",
        "We discovered **questions we didn't know customers were asking**.",
        "Today the actions structure is the foundation for new chat features.",
      ],
      resumeTarget: "purple-metrics-desenvolvedor-full-stack-senior",
    },
    {
      id: "cicd-design-system",
      title: "CI/CD and design system",
      result: "**800+ deploys** to production and a design system with **45+ published versions**.",
      role: "I built the front end's CI/CD pipeline and extracted the design system; I'm the package's main contributor.",
      stack: ["GitHub Actions", "AWS (ECR/ECS)", "Terraform", "Playwright", "React", "Radix UI", "Storybook"],
      context: "A monolith kept turning into several similar projects that didn't guarantee matching components.",
      problem:
        "Products with different components for the same thing, and a delivery pipeline that needed more dynamic QA environments, tests at the right moment and traceable deploys.",
      decisions: [
        {
          title: "Design system as its own npm package.",
          text: "It makes distribution across products easier, including for people who aren't programmers and want to build a POC or a quick AI project with the official components.",
        },
        {
          title: "Tests at the right moment.",
          text: "Tests when the PR is opened and E2E with Playwright before the deploy, as fast as possible.",
        },
        { title: "On-demand QA environments.", text: "" },
        {
          title: "Smoke tests on real customers.",
          text: "To find errors before the customer does.",
        },
      ],
      flow: [
        "PR with tests",
        "On-demand QA environment",
        "E2E before the deploy",
        "Traceable deploy",
        "Smoke tests on real customers",
      ],
      outcome: [
        "**800+ deploys** to production, with more frequent and traceable deploys.",
        "Fewer bugs reaching customers.",
        "Products that look the same: the design system made the components match.",
        "People outside the development team building POCs with the design system.",
      ],
      resumeTarget: "purple-metrics-desenvolvedor-full-stack-senior",
    },
    {
      id: "ocr-extraction",
      title: "Data extraction by confidence level",
      result: "**377 of 380** fields correct, no wrong readings, and the paid service called on **under 3%** of fields.",
      role: "I designed and built the pipeline and trained the two vision models (cropping and classification).",
      stack: ["YOLO", "OCR", "AWS Lambda", "Amazon Bedrock"],
      context:
        "People filled in spreadsheets and cropped images by hand to record readings from scales and other measuring equipment, at volumes of **thousands of images per day**.",
      problem: "Automate the reading at low cost and high confidence, at a volume of thousands of images per day.",
      decisions: [
        {
          title: "Crop the way people cropped.",
          text: "A YOLO model crops the image the way users were already doing it by hand.",
        },
        {
          title: "Know what the image is before reading it.",
          text: "A second YOLO model, with **4 classes**, identifies the image type (item, sticky note, scale and dimensioning device).",
        },
        {
          title: "A cascade by cost and confidence.",
          text: "Our own OCR on a small AWS Lambda first; if the result doesn't pass the rules, a more robust cloud OCR; if it still fails, an LLM with the context of everything that happened before. Sending everything straight to the LLM would be expensive at this volume, and the layers gave **more confidence** than the LLM alone.",
        },
        {
          title: "Rules per equipment type.",
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
      result:
        "Markdown and JSON shared by link and edited in real time, **encrypted in the browser**: the server **never reads** the content.",
      role: "Personal project: I conceived and built it on my own, with Claude Code.",
      stack: ["React", "TypeScript", "CodeMirror", "Yjs", "Web Crypto", "Supabase (Postgres, Realtime)", "Playwright", "Claude Code"],
      context: "I wanted to share rendered Markdown, with Mermaid diagrams, through a private link, for free and without an account.",
      problem:
        "As a matter of principle, no one should be able to read a document without permission, not even the server that stores it. And in live documents, someone with only the read link must not be able to write.",
      decisions: [
        {
          title: "Encrypt in the browser.",
          text: "Every document is encrypted with AES-GCM before it leaves the browser. The key goes in the link's fragment (after the #), which is never sent to a server. Supabase only stores ciphertext.",
        },
        {
          title: "A password with no key in the link.",
          text: "With a password, the key is derived in the browser itself (PBKDF2, **600,000 iterations**). Neither the password nor the key goes in the link.",
        },
        {
          title: "Reading that can't write.",
          text: "Every edit to a live document is signed with an **Ed25519** key derived from the edit token, which exists only in the edit link. The read link has only the public key: it verifies edits but can't create a valid one. The server stores only the token's hash.",
        },
        {
          title: "Real time without a server of my own.",
          text: "In Markdown, several people edit at the same time with Yjs, and the edits travel encrypted and signed through Supabase Realtime. In JSON, the document saves after a pause and merges by path, asking for a choice only when two people changed the same value.",
        },
        {
          title: "AI with a process.",
          text: "I built it with Claude Code in a spec → plan → execution flow: **7 specs and 7 plans**, one per phase of the project.",
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
        "**116 commits** over 6 days of work, all with Claude Code.",
        "**About 430 tests**: ~220 unit, ~209 E2E, plus visual and database tests.",
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
      id: "ai-workflow",
      title: "Development with AI agents",
      result:
        "AI agents write the code; I decide what and why. A **spec → plan → execution** flow, with review at every step and tests that stop mistakes before the merge.",
      role: "I led the adoption on the Purple Metrics team and use the same flow in my own projects, where the whole process is public.",
      stack: ["Claude Code", "Cursor", "Linear", "GitHub Actions", "Playwright"],
      context:
        "At Purple Metrics, I led the adoption of AI agents in the team's development, with skills and rules for Claude Code and Cursor integrated with Linear. In my personal projects I use the same flow, and there everything is visible: the specs, the plans, the commits and the tests.",
      problem:
        "An agent writes code fast, but without a process that speed turns into rework: decisions lost between one conversation and the next, code nobody really reviewed, and rules the agent forgets.",
      decisions: [
        {
          title: "Spec before code.",
          text: "Every change starts with a spec built in conversation: what changes, why and what stays out. I review it and correct the facts before any line of code.",
        },
        {
          title: "A plan of small tasks.",
          text: "The spec becomes a plan of small tasks, each with the files it touches, the interfaces and how to check it worked.",
        },
        {
          title: "One agent per task, with review.",
          text: "Each task goes to a subagent with a clean context, and its result is reviewed before the next one.",
        },
        {
          title: "Rules become tests.",
          text: "Whatever the agent might forget becomes a test or a build check. On this site, the build fails if confidential text shows up or a title goes out of bounds, and **100+ E2E tests** run on every PR.",
        },
        {
          title: "The merge is mine.",
          text: "The agent opens the PR; I test it locally, review it and merge it.",
        },
      ],
      flow: [
        "Spec (reviewed by me)",
        "Plan of small tasks",
        "Subagent per task + review",
        "CI: lint, build and E2E tests",
        "Local test and merge (me)",
      ],
      outcome: [
        "**Sealdown**: **7 specs and 7 plans** public in the repository, **116 commits** over 6 days of work and about **430 tests**.",
        "**This site**: **25+ PRs**, each going through lint, a build with content checks and **100+ E2E tests**.",
        "On the Purple Metrics team: shared skills and rules for Claude Code and Cursor, with the spec → plan → execution flow integrated with Linear.",
        "The code of both personal projects is open: the specs, the commits and the tests can be checked.",
      ],
      resumeTarget: "purple-metrics-desenvolvedor-full-stack-senior",
      links: [
        { label: "Sealdown specs", href: "https://github.com/TrainedLoop/sealdown/tree/main/docs/superpowers" },
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

const en: Messages = { ...ui, meta, caseStudies, share, llms, story, profile, experience, earlyCareer, projects, skillGroups, languages };
export default en;
