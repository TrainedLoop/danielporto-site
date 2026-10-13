// Versão em inglês do conteúdo da home e do currículo (mesmo formato de profile.ts).
// A história em pixel art continua só em português.

import type { Content, Job } from "./profile";

export const profile = {
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

/** Resumo do currículo (o "Sobre" do LinkedIn). */
export const summary = {
  aiProjectsTitle: "AI projects I have built",
  aiProjects: [
    "Designed and built an AI copilot for an enterprise analytics platform (Google ADK, Gemini): the agent queries data with the permissions of the person asking, reads only from the read replica, masks personal data before it reaches the model (LGPD, Brazil's data protection law) and has a cost limit per question.",
    "Trained and deployed computer vision models (YOLO) on nearly 50,000 images, versioned and served as ONNX on AWS, with about 95% precision and recall on validation, and retrained with the corrections operators make in production.",
    "Built image data extraction that combines local OCR, cloud OCR and an LLM (Amazon Bedrock) by confidence level: when reading measurement screens, 377 of 380 fields were correct (the other 3 were left blank, with no wrong readings), with the paid service called for fewer than 3% of them.",
  ],
  dailyAi:
    "I also use AI in day-to-day development in a structured way: I write skills, rules and workflows for Claude Code and Cursor that the team uses, with a spec before code, a reviewed plan and tests.",
  stack:
    "My career started on the back end with C#/.NET and SQL Server. Today, at Purple Metrics, I work on the front end (React and TypeScript), AI in the product and the CI/CD pipeline. I use Python mainly in AI projects (FastAPI, LiteLLM). Day to day I also work with Docker, GitHub Actions, Azure DevOps and AWS.",
};

/** Destaques curtos para a home. */
export const highlights = [
  {
    title: "AI in production",
    text: "Purple's AI chat, a copilot with permissions and LGPD compliance, computer vision, MCP and agents in the team's daily work.",
  },
  {
    title: "Front end",
    text: "React and TypeScript in Purple's dashboard, an in-house design system and the CI/CD pipeline with over 800 deploys.",
  },
  {
    title: "Back end",
    text: "Career built on C#/.NET and SQL Server, with APIs, integrations and queues. Python in AI projects.",
  },
];

/** Experiência, da mais recente para a mais antiga. */
export const experience: Job[] = [
  {
    company: "Purple Metrics",
    role: "Senior Full Stack Developer",
    period: "Sep 2022 – present",
    description:
      "Marketing Mix Modeling (MMM) platform that shows brands how much each media channel actually drives results.",
    bullets: [
      "AI chat in production with customers: answers natural-language questions about dashboard data by generating SQL, calling Python APIs and replying with insights and charts. It grew out of a prototype my team built in 3 days at an internal hackathon; I was responsible for the interface, the LLM integration and the prompts (refined with the data team), and I keep building the current version with the team.",
      "Proposed the communication architecture between the AI chat and the dashboard, which lets the AI navigate and take actions in the interface; I now use this structure to build new features.",
      "Built Purple's proof of concept for an MCP (Model Context Protocol) server, connecting the platform's APIs to AI assistants.",
      "Develop the product dashboard (React, TypeScript, Vite, TanStack Query, Zustand, Tailwind, Recharts), including budget optimization and allocation, simulation, saturation curves and the data setup flow.",
      "Led the adoption of AI agents in the team's development, with decisions made together: set up the repository's skills and rules (Claude Code and Cursor), with a spec → plan → execution workflow integrated with Linear.",
      "Extracted the design system into its own npm package, with Radix UI, Storybook and automated releases; I am the main contributor and it has over 45 published versions.",
      "Built the frontend CI/CD pipeline on GitHub Actions (build, lint, deploy to ECR/ECS, QA environments, automated code review and E2E tests with Playwright), with over 800 production deploys, and maintain the AWS infrastructure (Terraform) together with the team.",
    ],
  },
  {
    company: "Fu2re Smart Solutions",
    role: "Senior Full Stack Developer",
    period: "Aug 2019 – Jun 2023",
    description: "Where I first worked seriously with AI, before the boom.",
    bullets: [
      "SmartVision, a platform for training and running computer vision models: built the APIs behind the React application, integrating the whole training and inference queue with Hangfire. Used CQRS, with data input in MySQL (making it easier for the vision team to query) and the front end's consolidated data served from MongoDB. Contributed to the front end with React, Redux and Styled Components.",
      "Worked on the software for a car that photographed the utility poles of Light (Rio's power company) around the city, like Google's Street View cars.",
      "Urban, an urban mobility app: contributed to the React Native app, with Styled Components, Redux and Google Maps integration.",
      "SmartAssets: maintenance and new features on the platform, with MySQL, WebForms and DevExpress.",
    ],
  },
  {
    company: "Fulllab | retail solutions",
    role: "Tech Lead",
    period: "May 2017 – Aug 2019",
    description: "Tech lead of a 4-person team.",
    bullets: [
      "Mobfiq (V2): restructured the project to meet new client demands and built an API shared by all of them, with dependency injection for new platforms and specific scenarios.",
      "Mobfiq (Magento): built a PHP plugin for the Magento platform that controlled the store interface and checkout flow.",
      "Danone migration portal: processed managers' spreadsheets with the business rules to feed the ERP, with .NET Core 2.2, Entity Framework Core and React.",
      "Moblite (Loja Integrada): e-commerce integration through reverse engineering, with a web scraper and Selenium, and .NET Core APIs with MongoDB.",
    ],
  },
  {
    company: "Fulllab | retail solutions",
    role: ".NET Developer",
    period: "Sep 2015 – May 2017",
    bullets: [
      "Mobfiq (V1): VTEX integration API in .NET 4.5, Dapper and MySQL, studying the platform's behavior through reverse engineering when there was no documentation yet; endpoints for the mobile app.",
      "Mobfiq (Sephora): web scraper with .NET 4.5 and Selenium to integrate Sephora's store, which had no API or documentation.",
    ],
  },
  {
    company: "Hebara Distribuidora de Produtos Lotéricos",
    role: "Junior Developer",
    period: "Sep 2013 – Sep 2015",
    bullets: [
      "Built the company intranet, with my first production deploys (C#, .NET MVC, WebForms, NHibernate, jQuery, Bootstrap and Oracle).",
      "Supported the internal system and added new features to the company's main portal.",
      "Restructured the Raspadinha do Rio and Rio de Prêmios websites.",
    ],
  },
];

/** Competências (as cinco primeiras são as principais). */
export const skills = [
  "Artificial intelligence (AI)",
  "React",
  "TypeScript",
  "C# / .NET",
  "Computer vision",
  "AI agents",
  "Model Context Protocol (MCP)",
  "Google ADK",
  "Claude Code",
  "Cursor",
  "Amazon Bedrock",
  "LGPD / privacy in AI",
  "OCR",
  "YOLO",
  "Python",
  "FastAPI",
  "Design Systems",
  "Playwright",
  "PostgreSQL",
  "SQL Server",
  "GitHub Actions",
  "CI/CD",
  "AWS",
  "Terraform",
];

export const languages = [
  { name: "Portuguese", level: "native" },
  { name: "English", level: "intermediate" },
];

/** Textos fixos da interface (topo, home e currículo). */
export const ui = {
  nav: { label: "Navigation", story: "story", resume: "résumé" },
  footerCredits: "sprite and font credits",
  home: {
    avatarAlt: "Daniel in pixel art",
    hello: "Hi, I'm",
    roleAt: "at",
    choiceTitle: "How would you like to get to know my career?",
    playLabel: "Play the story",
    playHint:
      "From my grandmother's house to AI in production, in 8 pixel-art levels. About 5 minutes. The story is in Portuguese.",
    resumeLabel: "Read the résumé",
    resumeHint: "The text version, straight to the point, starting with my current role.",
    highlightsLabel: "What I do",
    skillsLabel: "Skills",
  },
  resume: {
    roleAt: "at",
    playStory: "▶ play the story (in Portuguese)",
    summary: "Summary",
    experience: "Experience",
    skills: "Skills",
    languages: "Languages",
  },
};

export const content: Content = { profile, summary, highlights, experience, skills, languages, ui };
