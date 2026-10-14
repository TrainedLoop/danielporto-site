// Portuguese texts (default language): the UI, page titles, home and résumé content, the
// pixel-art story and the credits. Content keys: profile and home.achievements (home), glance
// (résumé summary), experience, earlyCareer, projects and skillGroups (full résumé, also used by
// llms.txt).
// Source: the revised LinkedIn profile (linkdin-update/linkedin-ptbr.md) and the old résumé.

const profile = {
  name: "Daniel Porto",
  role: "Desenvolvedor Full Stack Sênior",
  company: "Purple Metrics",
  location: "Rio de Janeiro, Brasil",
  headline: "React, TypeScript e C#/.NET · IA aplicada: LLMs, agentes e visão computacional",
  intro:
    "Desenvolvedor full stack sênior, com mais de 10 anos construindo produto. Levo IA para produção com o que uma empresa exige: permissão por usuário, controle de custo, proteção de dados pessoais e qualidade medida em dados reais.",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/daniel-porto/" },
    { label: "GitHub", href: "https://github.com/TrainedLoop" },
    { label: "contato@danielporto.com.br", href: "mailto:contato@danielporto.com.br" },
  ],
};

export type Job = {
  /** Stable anchor on the résumé, the same in both languages (the story links to it). */
  id: string;
  company: string;
  role: string;
  period: string;
  description?: string;
  /** Short impact bullets; `**…**` marks the highlighted figure. */
  bullets: string[];
  stack: string[];
};

/** Older jobs, shown as a single line each (the ids are still story anchors). */
export type EarlyJob = {
  id: string;
  company: string;
  role: string;
  period: string;
  line: string;
};

/** A selected project: no dates, clients or employers, on purpose. `result` may contain `**…**`. */
export type Project = {
  id: "ai-copilot" | "computer-vision" | "confidence-extraction";
  title: string;
  did: string;
  result: string;
  stack: string[];
};

/**
 * A home page achievement card: never names a company. `result` and `text` may contain `**…**`;
 * `target` is the résumé anchor id (a job id or "projects").
 */
export type Achievement = {
  id: "ai-chat" | "ai-agents" | "computer-vision";
  result: string;
  title: string;
  text: string;
  target: string;
};

export type SkillGroup = { label: string; items: string[] };

/** Experience, from the most recent to the oldest. */
const experience: Job[] = [
  {
    id: "purple-metrics-desenvolvedor-full-stack-senior",
    company: "Purple Metrics",
    role: "Desenvolvedor Full Stack Sênior",
    period: "set 2022 – o momento",
    description:
      "Plataforma de Marketing Mix Modeling (MMM) que mostra a marcas quanto cada canal de mídia realmente gera de resultado.",
    bullets: [
      "Fui responsável pela interface, pela integração com a LLM e pelos prompts do **chat de IA** que responde perguntas sobre os dados do dashboard e está em produção com clientes; nasceu de um protótipo que meu time construiu em **3 dias** num hackathon interno.",
      "Propus a arquitetura que permite à IA **navegar e aplicar ações** no dashboard, base das novas funcionalidades do chat.",
      "Criei a prova de conceito do **servidor MCP** da Purple, conectando as APIs da plataforma a assistentes de IA.",
      "Desenvolvo o dashboard do produto: alocação e otimização de orçamento, simulação, curvas de saturação e data setup.",
      "Liderei a adoção de **agentes de IA** no desenvolvimento do time: skills e regras para Claude Code e Cursor, com fluxo spec → plano → execução integrado ao Linear.",
      "Extraí o **design system** para um pacote npm próprio, com **45+ versões** publicadas; sou o principal contribuidor.",
      "Criei a esteira de **CI/CD** do frontend (lint, ambientes de QA, revisão automatizada, E2E com Playwright, deploy em ECS): **800+ deploys** em produção.",
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
    role: "Desenvolvedor Full Stack Sênior",
    period: "ago 2019 – jun 2023",
    description: "Onde tive o primeiro contato sério com IA, antes do boom.",
    bullets: [
      "Criei as APIs do **SmartVision**, plataforma de treino e inferência de visão computacional, com a fila de treino e inferência em Hangfire e CQRS (MySQL na escrita, MongoDB na leitura).",
      "Participei do software de um carro que fotografava os postes da Light pela cidade, como os carros do Google.",
      "Colaborei no app de mobilidade **Urban** (React Native, Google Maps) e no front-end do SmartVision (React, Redux).",
      "Mantive e evoluí a plataforma SmartAssets (WebForms, DevExpress, MySQL).",
    ],
    stack: ["C# / .NET", "Hangfire", "MySQL", "MongoDB", "React", "Redux", "React Native"],
  },
  {
    id: "fulllab-retail-solutions-lider-tecnico",
    company: "Fulllab | retail solutions",
    role: "Líder técnico",
    period: "mai 2017 – ago 2019",
    description: "Líder técnico de um time de **4 pessoas**.",
    bullets: [
      "Reestruturei o **Mobfiq** com uma API comum a todos os clientes e injeção de dependência para novas plataformas.",
      "Criei um plugin em PHP para o Magento que controlava a interface da loja e o fluxo de compra.",
      "Portal de migração da **Danone**: regras de negócio sobre as planilhas dos gerentes para alimentar o ERP.",
      "Integrei lojas sem API por engenharia reversa (web scraping com Selenium), com APIs em .NET Core e MongoDB.",
    ],
    stack: [".NET Core", "Entity Framework Core", "MongoDB", "React", "PHP", "Selenium"],
  },
];

/** Early career: one line per job. */
const earlyCareer: EarlyJob[] = [
  {
    id: "fulllab-retail-solutions-desenvolvedor-net",
    company: "Fulllab | retail solutions",
    role: "Desenvolvedor .NET",
    period: "set 2015 – mai 2017",
    line: "Integração com a VTEX antes de existir documentação e integração da Sephora por web scraping (.NET, Dapper, MySQL, Selenium).",
  },
  {
    id: "hebara-distribuidora-de-produtos-lotericos-programador-junior",
    company: "Hebara Distribuidora de Produtos Lotéricos",
    role: "Programador júnior",
    period: "set 2013 – set 2015",
    line: "Intranet e portal da empresa, com meus primeiros deploys em produção (C#, .NET MVC, Oracle).",
  },
];

/** Selected projects. Never add dates, clients, employers or the word "freelance". */
const projects: Project[] = [
  {
    id: "ai-copilot",
    title: "Copiloto de IA com permissões e LGPD",
    did: "Agente que consulta dados de uma plataforma analítica com as permissões de quem pergunta, só na réplica de leitura, mascarando dados pessoais antes de chegarem ao modelo.",
    result: "Custo limitado por pergunta.",
    stack: ["Google ADK", "Gemini"],
  },
  {
    id: "computer-vision",
    title: "Visão computacional em produção",
    did: "Modelos YOLO treinados com **~50 mil imagens**, servidos em ONNX na AWS e retreinados com as correções dos operadores.",
    result: "**~95%** de precisão e recall na validação.",
    stack: ["YOLO", "ONNX", "AWS"],
  },
  {
    id: "confidence-extraction",
    title: "Extração de dados por nível de confiança",
    did: "OCR local, OCR em nuvem e LLM em cascata para ler telas de medição.",
    result: "**377 de 380** campos corretos, nenhuma leitura errada, serviço pago em **< 3%** dos campos.",
    stack: ["OCR", "Amazon Bedrock"],
  },
];

/** Skills by group; the flat list (home, JSON-LD) is derived from these (src/content/skills.ts). */
const skillGroups: SkillGroup[] = [
  {
    label: "IA",
    items: [
      "Agentes de IA",
      "Model Context Protocol (MCP)",
      "Google ADK",
      "Amazon Bedrock",
      "Visão computacional",
      "YOLO",
      "OCR",
      "LGPD / privacidade em IA",
      "Claude Code",
      "Cursor",
    ],
  },
  { label: "Frontend", items: ["React", "TypeScript", "Design Systems"] },
  { label: "Backend", items: ["C# / .NET", "Python", "FastAPI", "PostgreSQL", "SQL Server"] },
  { label: "Infra e qualidade", items: ["CI/CD", "GitHub Actions", "AWS", "Terraform", "Playwright"] },
];

// code: BCP 47, for the structured data (knowsLanguage); not shown on the page.
const languages = [
  { name: "Português", code: "pt-BR" },
  { name: "Inglês", code: "en" },
];

/** At-a-glance block of the résumé: two pitch sentences and three headline figures. */
const glance = {
  pitch: [
    "Desenvolvedor full stack sênior, com mais de 10 anos construindo produto: do back-end em C#/.NET ao front-end em React e TypeScript.",
    "Levo IA para produção com o que uma empresa exige: permissão por usuário, controle de custo, proteção de dados pessoais e qualidade medida em dados reais.",
  ],
  stats: [
    { value: "10+", label: "anos construindo produto" },
    { value: "800+", label: "deploys em produção da esteira que criei" },
    { value: "45+", label: "versões publicadas do design system que extraí" },
  ],
};

/** Fixed UI texts (top bar, home, résumé and credits), translated along with the content. */
const ui = {
  nav: { label: "Navegação", story: "história", resume: "currículo", language: "Idioma" },
  footerCredits: "créditos dos sprites e da fonte",
  // Shown in the footer and on the story's ending screen (the story page has no footer).
  privacyNotice: "Este site registra visitas e sessões anônimas, sem cookies, para melhorar o conteúdo.",
  home: {
    avatarAlt: "Daniel em pixel art",
    hello: "Olá, eu sou",
    roleAt: "na",
    viewResume: "Ver currículo",
    achievementsLabel: "Conquistas",
    achievementLink: "ver no currículo",
    storyTitle: "Prefere conhecer jogando?",
    storyText: "Da casa da minha avó até a IA em produção, em 8 fases de pixel art. Uns 5 minutos.",
    storyCta: "Jogar a história",
    achievements: [
      {
        id: "ai-chat",
        result: "**em produção** com clientes",
        title: "Chat de IA em produção",
        text: "Fui responsável pela interface, pela integração com a LLM e pelos prompts de um chat de IA que responde perguntas sobre os dados do produto; nasceu de um protótipo de **3 dias** num hackathon interno do time.",
        target: "purple-metrics-desenvolvedor-full-stack-senior",
      },
      {
        id: "ai-agents",
        result: "**spec → plano → execução**",
        title: "Agentes de IA no time",
        text: "Liderei a adoção de agentes de IA no desenvolvimento do time, com skills e regras para Claude Code e Cursor integradas ao Linear.",
        target: "purple-metrics-desenvolvedor-full-stack-senior",
      },
      {
        id: "computer-vision",
        result: "**~95%** de precisão e recall",
        title: "Visão computacional em produção",
        text: "Modelos YOLO treinados com ~50 mil imagens, servidos em produção e retreinados com as correções dos operadores.",
        target: "projects",
      },
    ] satisfies Achievement[],
  },
  resume: {
    roleAt: "na",
    playStory: "▶ jogar a história",
    downloadPdf: "baixar PDF",
    pdfTitle: "Daniel Porto - Currículo",
    glanceTitle: "Em 30 segundos",
    experience: "Experiência",
    earlyCareer: "Início de carreira",
    projects: "Projetos selecionados",
    contact: "Contato",
    skills: "Competências",
    contactCta: "Falar comigo",
    contactSubject: "Contato pelo site",
    glance,
    // {{date}}: the date the content last changed, in the page's language (src/content/pages.ts).
    updated: "Atualizado em {{date}}",
  },
  credits: {
    title: "Créditos",
    // <lpc> becomes the link to the character generator (Trans component, in src/pages/Credits.tsx).
    intro:
      "Os personagens foram montados a partir do <lpc>Universal LPC Spritesheet Character Generator</lpc>, com arte do Liberated Pixel Cup e da comunidade do OpenGameArt. Cenários, objetos e telas foram desenhados para este site. Os textos nas telas usam a fonte Press Start 2P, de CodeMan38; os diálogos e as dicas da história, a VT323, de Peter Hull; e o texto corrido, a Inter, de Rasmus Andersson. As três estão sob a SIL Open Font License.",
    downloadCsv: "Baixar a lista completa (CSV)",
  },
};

/** Story UI: the scene (src/engine/Scene.tsx), the ending and the inventory. */
const storyUi = {
  scene: {
    loading: "carregando…",
    loadError: "ERRO AO CARREGAR",
    loadErrorHint: "As imagens desta fase não carregaram.",
    retry: "tentar de novo",
    skipPhase: "pular fase",
    pressStart: "PRESS START",
    startHint: "clique, ou aperte Enter",
    continue: "continuar",
    finish: "concluir",
    skip: "pular",
    phaseClear: "FASE COMPLETA",
    replay: "ver de novo",
    nextPhase: "próxima fase",
    seeOnResume: "ver no currículo",
  },
  ending: {
    title: "CONTINUA…",
    text: "Hoje sou desenvolvedor full stack sênior na Purple Metrics, levando IA para produção.",
    resume: "ler o currículo",
    home: "voltar ao início",
    credits: "créditos",
    restart: "jogar de novo",
  },
  inventory: { label: "Inventário", title: "ITENS" },
};

/**
 * Texts of each phase: the title (counter and screen readers), the scene description for
 * screen readers, the name of the item earned and the beats (dialogue lines). Each beat has
 * an id; the order and timing of each one live in the phase file (src/phases), and
 * definePhase checks, at the type level, that the ids there are exactly the ones here.
 */
const phases = {
  phase0: {
    title: "Fase 0: a casa da avó",
    description:
      "Uma criança em frente a um computador bege com Windows 95, no quarto da casa da avó, ao lado de uma pilha de revistas CD-ROM.",
    item: "CD-ROM",
    beats: {
      holidays: "Anos 90. Eu tinha uns 8 anos e passava as férias na casa da minha avó.",
      unclePc: "Lá tinha o PC do meu tio, com Windows 95. Eu ficava horas nele.",
      cdrom:
        "Ele comprava a revista CD-ROM, que vinha com um CD cheio de programas e jogos. Foi ali que tudo começou.",
    },
  },
  phase1: {
    title: "Fase 1: o primeiro PC",
    description:
      "Um adolescente sentado em frente ao computador com Windows XP na sala de casa. Um amigo entrega uma apostila de HTML. Na tela, um fã-site de Final Fantasy feito em casa e um alerta escrito Olá, mundo.",
    item: "Apostila de HTML",
    beats: {
      firstPc: "2004. Meu primeiro PC, na sala de casa. Bem parecido com o do meu tio, mas agora com Windows XP.",
      workbook: "Um amigo me emprestou uma apostila de HTML do colégio dele.",
      firstSites:
        "Comecei a fazer os meus primeiros sites, como um fã-site de Final Fantasy que nunca chegou a ir pro ar.",
      javascript: "Depois veio o JavaScript, com o primeiro alert(). E o som do MSN tocando o tempo todo.",
    },
  },
  phase2: {
    title: "Fase 2: o técnico da rua",
    description:
      "Um adolescente montou uma bancada de conserto de computadores na garagem de casa. Vizinhos chegam com gabinetes; ele troca memória e HD, formata o Windows e sai com a caixa de ferramentas para atender na casa de um cliente.",
    item: "Chave de fenda",
    beats: {
      courses: "Aos 16 anos fiz cursos de montagem e manutenção de micro e de pacote Office.",
      neighborhood: "Virei o técnico da rua: todo PC da vizinhança passava pela minha mão.",
      repairs: "Formatava o Windows e trocava peças, como HD e memória.",
      houseCalls: "Às vezes na minha casa, às vezes na casa do cliente.",
    },
  },
  phase3: {
    title: "Fase 3: suporte e faculdade",
    description:
      "De dia, um rapaz atende ligações no suporte de um provedor de internet a rádio e conserta a conexão de um cliente por acesso remoto. À noite, assiste aula de C++ na faculdade de Sistemas de Informação e, de madrugada, termina um curso online de C#.",
    item: "Headset do suporte",
    beats: {
      support: "Trabalhando no suporte de um provedor de internet a rádio, eu atendia as ligações dos clientes…",
      remoteAccess: "…e resolvia os problemas por acesso remoto.",
      college: "À noite, a faculdade de Sistemas de Informação. Foi lá que conheci C e C++.",
      csharpCourse: "No meio da faculdade, fiz um curso online de C#.",
    },
  },
  phase4: {
    title: "Fase 4: Hebara, o primeiro emprego como dev",
    description:
      "Um rapaz de moicano entra num escritório com pôsteres de raspadinha e pega o crachá do primeiro emprego. No monitor, escreve o código da intranet em C#, faz o primeiro deploy em produção e raspa uma raspadinha que revela: site novo.",
    item: "Crachá do primeiro emprego",
    beats: {
      firstJob: "Em 2013, um curso de C# me levou ao primeiro emprego como programador júnior, na Hebara.",
      intranet: "Comecei desenvolvendo a intranet da empresa, com C#, .NET MVC, WebForms e banco Oracle.",
      firstDeploys: "E vieram os meus primeiros deploys em produção.",
      lotterySites: "Também ajudei a reestruturar os sites da Raspadinha do Rio e do Rio de Prêmios.",
    },
  },
  phase5: {
    title: "Fase 5: Fulllab, e-commerce e mobile",
    description:
      "Num escritório aberto, um rapaz de moicano descobre os endpoints da API da VTEX com uma lupa, liga o app a lojas como Sephora e Magento por uma API e, rodeado por um time de quatro pessoas, sobe de nível para líder técnico.",
    item: "Celular com o app",
    beats: {
      fulllab: "Em 2015 fui para a Fulllab, trabalhar com e-commerce e aplicativos mobile.",
      vtex: "Integrei a VTEX por engenharia reversa, quando ainda não tinha documentação.",
      apis: "Criei as APIs dos apps, um plugin para Magento e robôs com Selenium para lojas sem API, como a Sephora.",
      techLead: "Em 2017 virei líder técnico, com um time de 4 pessoas.",
    },
  },
  phase6: {
    title: "Fase 6: Fu2re e a visão computacional",
    description:
      "Num escritório com aquário, um homem de barba trabalha na SmartVision, uma plataforma que treina modelos de visão computacional. Na rua, um carro com uma câmera no teto fotografa os postes da Light, que ganham caixas de detecção. Por fim, uma caixa-preta escrita IA se abre.",
    item: "Caixa-preta da IA, aberta",
    beats: {
      fu2re: "Em 2019 fui para a Fu2re, onde ouvi falar de IA a sério, antes do boom.",
      smartVision:
        "Na SmartVision, a plataforma de visão computacional da empresa, fiz das APIs com fila de treino à interface em React.",
      polesCar:
        "Participei do software de um carro que fotografava os postes da Light pela cidade, como os do Google.",
      blackBox: "E fui abrindo a caixa-preta para entender como se treina um modelo.",
    },
  },
  phase7: {
    title: "Fase 7: Purple Metrics, tudo se conecta",
    description:
      "No home office com o Pão de Açúcar na janela, um homem de barba troca o C# pelo React e TypeScript e vê a esteira de CI/CD passar dos 800 deploys. Os itens da jornada se juntam numa estrela, IA aplicada. Com ela vem o chat de IA do produto, construído junto com o time numa chamada de vídeo, e um terminal conectando o MCP e os agentes de IA.",
    item: "IA aplicada",
    beats: {
      purple:
        "Em 2022 entrei na Purple Metrics, trabalhando de casa, e mudei de stack: do back-end para o front-end, com React e TypeScript.",
      pipeline: "Criei a esteira de CI/CD do front, com mais de 800 deploys em produção.",
      appliedAi: "Aí tudo se conectou: tudo o que juntei pelo caminho virou IA aplicada.",
      chat: "Com isso, criei a primeira versão do chat conversacional da Purple.",
      today: "Hoje continuo construindo a versão atual junto com o time, já em produção com clientes.",
      mcp: "Também criei a primeira prova de conceito de MCP da Purple e ajudo o time a desenvolver com agentes de IA.",
    },
  },
};

const story = { ...storyUi, phases };

/**
 * Title and description of each page, written into each route's static HTML at build time.
 * The build fails if a title is outside 15–70 characters or a description outside 70–160
 * (scripts/prerender.js). `name` is the short name used in breadcrumbs and in llms.txt.
 */
const meta = {
  home: {
    name: "Início",
    title: "Daniel Porto · Desenvolvedor Full Stack Sênior · IA aplicada",
    description:
      "Desenvolvedor full stack sênior na Purple Metrics: LLMs, agentes e visão computacional em produção, React e C#/.NET. Currículo e história em pixel art.",
  },
  story: {
    name: "História",
    title: "A história em pixel art · Daniel Porto",
    description:
      "A trajetória do Daniel Porto contada como um jogo em pixel art: 8 fases, da casa da avó até a IA em produção na Purple Metrics.",
  },
  resume: {
    name: "Currículo",
    title: "Currículo · Daniel Porto · Desenvolvedor Full Stack Sênior",
    description:
      "Currículo do Daniel Porto, desenvolvedor full stack sênior na Purple Metrics: IA em produção, React, TypeScript, C#/.NET e mais de 10 anos de experiência.",
  },
  credits: {
    name: "Créditos",
    title: "Créditos dos sprites e da fonte · Daniel Porto",
    description:
      "Autores e licenças da arte em pixel art do site do Daniel Porto: sprites do Liberated Pixel Cup e do OpenGameArt e a fonte Press Start 2P.",
  },
};

/** Sharing: alt text of the Open Graph image (public/og-image.png). */
const share = {
  imageAlt: "Cartão em pixel art com o avatar do Daniel Porto, o cargo e os itens da história.",
};

/** Texts of /llms.txt and /llms-full.txt, the plain-text versions of the site for AI tools (src/content/llms.ts). */
const llms = {
  languageName: "Português",
  pages: "Páginas em português",
  contact: "Contato",
  email: "E-mail",
  fullResume: "Currículo completo em Markdown",
  fullResumeHint: "o currículo inteiro em texto, em inglês e em português",
  fullIntro: "Currículo completo do Daniel Porto, gerado a partir do mesmo conteúdo do site.",
  online: "Versão on-line",
};

const pt = { ...ui, meta, share, llms, story, profile, experience, earlyCareer, projects, skillGroups, languages };

/** The shape of the messages: en.ts must have exactly the same keys. */
export type Messages = typeof pt;
export default pt;
