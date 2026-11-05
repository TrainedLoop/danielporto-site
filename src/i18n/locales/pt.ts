// Portuguese texts (default language): the UI, page titles, home and résumé content, the
// pixel-art story and the credits. Content keys: profile and home.achievements (home), glance
// (résumé summary), experience, projects and skillGroups (full résumé, also used by llms.txt).
// Source: the revised LinkedIn profile (linkdin-update/linkedin-ptbr.md) and the old résumé.

const profile = {
  name: "Daniel Porto",
  role: "Desenvolvedor Full Stack Sênior",
  company: "Purple Metrics",
  location: "Rio de Janeiro, Brasil",
  headline: "React, TypeScript e C#/.NET · IA aplicada: LLMs, agentes e visão computacional",
  intro:
    "Desenvolvedor full stack sênior com mais de 10 anos de experiência criando produtos digitais, do back-end em C#/.NET ao front-end em React e TypeScript. Hoje me especializo em levar inteligência artificial para produtos usados por clientes, com os cuidados que uma empresa exige: cada usuário só acessa os dados que tem permissão para ver, o custo de cada resposta é controlado, dados pessoais são protegidos e a qualidade é medida com dados reais.",
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

/** A résumé project: no dates, clients or employers, on purpose. `did` and `result` may contain `**…**`. */
export type Project = {
  id: "data-agent" | "computer-vision" | "confidence-extraction";
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
  /** Optional case study the card links to instead of the résumé. */
  caseStudy?: CaseId;
};

export type CaseId = "ai-chat" | "cicd-design-system" | "ocr-extraction" | "sealdown" | "mailhub-mcp" | "ai-workflow";

/**
 * A case study page. `result`, `decisions[].text` and `outcome[]` may contain `**…**`;
 * `resumeTarget` is the résumé anchor id (a job id, "projects" or "personal-project"). The OCR
 * case is anonymous: its text must not name a company, client, year or "freelance" (checked at
 * build time). `image` and `links` are optional (only the personal project has them).
 */
export type CaseStudy = {
  id: CaseId;
  title: string;
  /** One plain sentence saying what it is, shown on the /projetos/ cards. */
  summary: string;
  result: string;
  role: string;
  stack: string[];
  context: string;
  problem: string;
  decisions: { title: string; text: string }[];
  flow: string[];
  outcome: string[];
  resumeTarget: string;
  /** A screenshot shown at the top of the page; `src` and `srcSmall` (800px wide) are paths from the site root (public/). */
  image?: { src: string; srcSmall?: string; width: number; height: number; alt: string };
  /** Public links (the live app, the code...), opened in a new tab; the first one is the primary button. */
  links?: { label: string; href: string }[];
};

export type SkillGroup = { label: string; items: string[] };

/** Experience, from the most recent to the oldest. */
const experience: Job[] = [
  {
    id: "purple-metrics-desenvolvedor-full-stack-senior",
    company: "Purple Metrics",
    role: "Desenvolvedor Full Stack Sênior",
    period: "09/2022 – atualmente",
    description:
      "Plataforma de Marketing Mix Modeling (MMM): mostra às marcas quanto cada canal de mídia gera em vendas, para orientar onde investir.",
    bullets: [
      "Desenvolvi a interface, a integração com a LLM (o modelo de IA) e os prompts do **copiloto de IA** do dashboard, que responde, em linguagem natural, perguntas dos clientes sobre os próprios dados. Ele nasceu de um protótipo construído pelo meu time em **3 dias** num hackathon interno e hoje está **em produção**.",
      "Propus a arquitetura que permite ao copiloto **navegar e executar ações** no dashboard (abrir páginas, mudar filtros, montar gráficos), em vez de só responder em texto. A implementação inicial foi de outra pessoa do time; hoje eu evoluo e mantenho essa parte.",
      "Criei a prova de conceito do **servidor MCP** da Purple. O MCP é um padrão aberto para conectar assistentes de IA, como o Claude, a outros sistemas; com ele, esses assistentes consultam a plataforma diretamente.",
      "Desenvolvo as telas do dashboard, como planejamento e otimização de orçamento, simulação de cenários e configuração dos dados do cliente.",
      "Liderei a adoção de **agentes de IA** (assistentes que escrevem código, como Claude Code e Cursor) pelo time de desenvolvimento, com regras compartilhadas e um fluxo de trabalho em etapas (especificação, plano e execução) integrado ao Linear, a ferramenta de gestão de tarefas do time.",
      "Transformei os componentes visuais do produto num **design system**, uma biblioteca própria reutilizada pelos produtos da empresa, que passaram a ter a mesma aparência; sou o principal contribuidor.",
      "Criei a **esteira de CI/CD** do front-end, o processo automático que testa, revisa e publica cada mudança (testes de ponta a ponta com Playwright, ambientes de teste sob demanda, publicação na AWS). Resultado: **muito menos erros chegando à produção**.",
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
    period: "08/2019 – 06/2023",
    description: "Empresa de visão computacional aplicada: soluções que usam IA para analisar imagens.",
    bullets: [
      "Criei as APIs do **SmartVision**, a plataforma da empresa para treinar modelos de visão computacional e aplicá-los em novas imagens, com uma fila de processamento (Hangfire, CQRS, MySQL e MongoDB).",
      "Desenvolvi o software que gerenciava as imagens e a navegação de um carro que percorria a cidade fotografando os postes da **Light**, a companhia de energia do Rio, para fazer o inventário desses postes. As fotos alimentavam o SmartAssets.",
      "Mantive e evoluí o **SmartAssets** (WebForms, DevExpress, MySQL), a plataforma em que o cliente via os resultados das análises de imagens vindas de várias fontes, entre elas o carro.",
      "Desenvolvi o app de mobilidade **Urban** (React Native, Google Maps) e telas do front-end do SmartVision (React, Redux).",
    ],
    stack: ["C# / .NET", "Hangfire", "MySQL", "MongoDB", "React", "Redux", "React Native"],
  },
  {
    id: "fulllab-retail-solutions-lider-tecnico",
    company: "Fulllab | retail solutions",
    role: "Desenvolvedor .NET e Líder técnico",
    period: "09/2015 – 08/2019",
    description:
      "Fábrica de software parceira da VTEX, plataforma de e-commerce, que criava apps e integrações para lojas virtuais. Entrei como desenvolvedor .NET e passei a líder técnico em 2017.",
    bullets: [
      "Liderei um time de **4 pessoas** que desenvolvia, de ponta a ponta, os apps das lojas VTEX.",
      "Integrei a VTEX antes de existir documentação pública.",
      "Reestruturei o **Mobfiq**, a plataforma de apps para lojas, com uma API única para todos os clientes, o que facilitou conectar novas plataformas de e-commerce.",
      "Criei um plugin em PHP para o Magento que controlava a interface e o fluxo de compra da loja no app.",
      "Integrei ao app lojas que não tinham API, como a Sephora, com robôs que liam os dados direto do site (web scraping com Selenium) e APIs em .NET Core e MongoDB.",
      "Migrei a planilha de distribuição internacional da **Danone** para um sistema: os gerentes passaram a preencher um painel mais fácil e mais rápido, que alimenta o ERP da empresa.",
    ],
    stack: [".NET", ".NET Core", "Entity Framework Core", "Dapper", "MySQL", "MongoDB", "React", "PHP", "Selenium"],
  },
  {
    id: "hebara-distribuidora-de-produtos-lotericos-programador-junior",
    company: "Hebara Distribuidora de Produtos Lotéricos",
    role: "Programador júnior",
    period: "09/2013 – 09/2015",
    bullets: [
      "Desenvolvi e mantive a intranet da empresa e criei novos sites e aplicações, como os sites da Raspadinha do Rio e do Rio de Prêmios (C#, .NET MVC, Oracle).",
    ],
    stack: ["C#", ".NET MVC", "Oracle"],
  },
];

/** Résumé projects. Never add dates, clients, employers or the word "freelance". */
const projects: Project[] = [
  {
    id: "data-agent",
    title: "Agente de dados com permissões e LGPD",
    did: "Agente de IA que responde perguntas sobre os dados de uma plataforma de análise. Ele só acessa o que a pessoa que pergunta pode ver, não tem permissão para alterar dados e esconde dados pessoais antes de enviá-los ao modelo.",
    result: "custo de cada pergunta limitado e dados pessoais fora do alcance do modelo.",
    stack: ["Google ADK", "Gemini"],
  },
  {
    id: "computer-vision",
    title: "Visão computacional em produção",
    did: "Modelos de IA que reconhecem objetos em imagens (YOLO), treinados com cerca de **50 mil imagens**, rodando na AWS e retreinados com as correções dos operadores.",
    result: "**~95%** de acerto (precisão e recall) na validação.",
    stack: ["YOLO", "ONNX", "AWS"],
  },
  {
    id: "confidence-extraction",
    title: "Extração de dados por nível de confiança",
    did: "Sistema que lê automaticamente os valores de telas de medição em fotos. Usa primeiro a leitura de texto mais barata (OCR) e só recorre a um modelo de IA (LLM) quando necessário.",
    result: "**377 de 380** campos lidos corretamente, nenhuma leitura errada, e o serviço pago usado em menos de **3%** dos campos.",
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

/** Professional summary of the résumé (also the home pitch): two sentences. */
const glance = {
  pitch: [
    "Desenvolvedor full stack sênior com mais de 10 anos de experiência criando produtos digitais, do back-end em C#/.NET ao front-end em React e TypeScript.",
    "Hoje me especializo em levar inteligência artificial para produtos usados por clientes, com os cuidados que uma empresa exige: cada usuário só acessa os dados que tem permissão para ver, o custo de cada resposta é controlado, dados pessoais são protegidos e a qualidade é medida com dados reais.",
  ],
};

/** Fixed UI texts (top bar, home, résumé and credits), translated along with the content. */
const ui = {
  nav: { label: "Navegação", story: "história", resume: "currículo", projects: "projetos", language: "Idioma" },
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
        result: "**em produção**, usado pelos clientes",
        title: "Copiloto de IA no dashboard",
        text: "Desenvolvi a interface, a integração com a LLM (o modelo de IA) e os prompts de um copiloto de IA que responde perguntas dos clientes sobre os próprios dados. Ele nasceu de um protótipo de **3 dias** num hackathon interno do time.",
        target: "purple-metrics-desenvolvedor-full-stack-senior",
        caseStudy: "ai-chat",
      },
      {
        id: "ai-agents",
        result: "**especificação → plano → execução**",
        title: "Agentes de IA no time",
        text: "Liderei a adoção de agentes de IA (assistentes que escrevem código, como Claude Code e Cursor) pelo time de desenvolvimento, com regras compartilhadas e um fluxo integrado ao Linear.",
        target: "purple-metrics-desenvolvedor-full-stack-senior",
        caseStudy: "ai-workflow",
      },
      {
        id: "computer-vision",
        result: "**~95%** de acerto (precisão e recall)",
        title: "Visão computacional em produção",
        text: "Modelos de IA que reconhecem objetos em imagens (YOLO), treinados com cerca de 50 mil imagens, em produção e retreinados com as correções dos operadores.",
        target: "projects",
      },
    ] satisfies Achievement[],
  },
  resume: {
    roleAt: "na",
    playStory: "▶ jogar a história",
    printPdf: "imprimir / salvar PDF",
    pdfTitle: "Daniel Porto - Currículo",
    glanceTitle: "Resumo profissional",
    experience: "Experiência",
    projects: "Projetos",
    // Label before each project card's result.
    projectResult: "Resultado",
    // Kept apart from the résumé projects (never inside them); each links to its case study.
    personalProjects: {
      title: "Projetos pessoais",
      items: [
        {
          case: "sealdown",
          text: "Sealdown — compartilhamento de documentos por link, criptografados no navegador.",
        },
        {
          case: "mailhub-mcp",
          text: "mailhub-mcp — conecta o Claude a várias caixas de e-mail, sem poder enviar nem apagar.",
        },
      ] satisfies { case: CaseId; text: string }[],
    },
    caseStudyLink: "ler o estudo de caso",
    contact: "Contato",
    skills: "Competências",
    contactCta: "Falar comigo no LinkedIn",
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
  // Unknown paths (src/pages/NotFound.tsx).
  notFound: {
    title: "GAME OVER",
    text: "Página não encontrada.",
    hint: "Este endereço não existe no site. Que tal começar de novo?",
    home: "voltar ao início",
    resume: "ver o currículo",
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
    startHintTouch: "toque para começar",
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
  projects: {
    name: "Projetos",
    title: "Projetos · Daniel Porto · Desenvolvedor Full Stack Sênior",
    description:
      "Seis projetos do problema ao resultado: copiloto de IA, CI/CD e design system, extração por confiança, Sealdown, mailhub-mcp e agentes de IA.",
  },
  "case-ai-chat": {
    name: "Copiloto de IA no dashboard",
    title: "Copiloto de IA no dashboard · Daniel Porto",
    description:
      "Como um copiloto de IA que responde perguntas dos clientes e age no dashboard passou de um protótipo de 3 dias à produção: problema, decisões e resultado.",
  },
  "case-cicd-design-system": {
    name: "CI/CD e design system",
    title: "CI/CD e design system · Daniel Porto",
    description:
      "O processo automático que testa e publica cada mudança do front-end e a biblioteca de componentes compartilhada pelos produtos: problema, decisões e resultado.",
  },
  "case-ocr-extraction": {
    name: "Extração de dados por nível de confiança",
    title: "Extração de dados por nível de confiança · Daniel Porto",
    description:
      "377 de 380 campos corretos, nenhuma leitura errada e serviço pago em menos de 3% dos campos: OCR e LLM em cascata para ler medições em imagens.",
  },
  "case-sealdown": {
    name: "Sealdown",
    title: "Sealdown: documentos criptografados no navegador · Daniel Porto",
    description:
      "Markdown e JSON compartilhados por link e editados em tempo real, criptografados no navegador: o servidor nunca lê o conteúdo. Problema, decisões e resultado.",
  },
  "case-mailhub-mcp": {
    name: "mailhub-mcp",
    title: "mailhub-mcp: e-mail seguro para agentes de IA · Daniel Porto",
    description:
      "Servidor MCP que dá ao Claude várias caixas de e-mail num só conector, sem enviar nem apagar, com mudanças reversíveis e defesas contra prompt injection.",
  },
  "case-ai-workflow": {
    name: "Desenvolvimento de software com agentes de IA",
    title: "Desenvolvimento de software com agentes de IA · Daniel Porto",
    description:
      "Como uso agentes de IA para escrever código com método: especificação, plano, um agente por tarefa, revisão e testes automáticos antes de cada mudança entrar.",
  },
  credits: {
    name: "Créditos",
    title: "Créditos dos sprites e da fonte · Daniel Porto",
    description:
      "Autores e licenças da arte em pixel art do site do Daniel Porto: sprites do Liberated Pixel Cup e do OpenGameArt e a fonte Press Start 2P.",
  },
  // The not-found screen (dist/404.html): not a page of its own, so not in the sitemap or llms.txt.
  "not-found": {
    name: "Página não encontrada",
    title: "Página não encontrada · Daniel Porto",
    description:
      "Este endereço não existe no site do Daniel Porto. Volte ao início para ver o currículo, os projetos e a história em pixel art.",
  },
};

/** Case studies (/projetos/), in navigation order. */
const caseStudies = {
  indexTitle: "Projetos",
  indexIntro: "Seis projetos contados do problema ao resultado: as decisões, como funciona e o que mudou.",
  labels: {
    breadcrumb: "Projetos",
    role: "Papel",
    stack: "Stack",
    context: "Contexto",
    problem: "O problema",
    decisions: "Decisões",
    flow: "Como funciona",
    outcome: "Resultado",
    previous: "Projeto anterior",
    next: "Próximo projeto",
    resume: "ver no currículo",
  },
  items: [
    {
      id: "ai-chat",
      title: "Copiloto de IA no dashboard",
      summary:
        "Copiloto que responde perguntas dos clientes da Purple Metrics sobre os próprios dados e executa ações no dashboard.",
      result:
        "Um copiloto de IA **usado pelos clientes** da Purple Metrics, que responde perguntas sobre os dados deles e **executa ações** no dashboard.",
      role: "Desenvolvi a interface, a integração com a LLM e os prompts (refinados com o time de dados) e propus a arquitetura de ações, que hoje evoluo e mantenho.",
      stack: ["React", "TypeScript", "Python", "Claude"],
      context:
        "A Purple Metrics é uma plataforma de Marketing Mix Modeling: mostra às marcas quanto cada canal de mídia gera em vendas, para orientar onde investir. Antes do copiloto, para tirar uma dúvida, o cliente consultava os gráficos do dashboard ou pedia ajuda ao time de atendimento (CS).",
      problem:
        "Os dados estavam no dashboard, mas a resposta para muitas perguntas ficava espalhada em gráficos e páginas diferentes. Para chegar a ela, o cliente precisava cruzar as informações sozinho ou esperar o time de CS, o que tornava as análises mais lentas e aumentava a dependência do atendimento.",
      decisions: [
        {
          title: "Começar por um protótipo.",
          text: "O copiloto nasceu de um protótipo que meu time construiu em **3 dias** num hackathon interno, já pensado para esse problema. Testar a ideia rapidamente mostrou que ela funcionava antes de investir no produto completo.",
        },
        {
          title: "Dar ao copiloto o contexto de cada cliente.",
          text: "Desde a primeira versão, o copiloto conhece os dados de cada cliente, para responder sobre a conta dele, e não de forma genérica.",
        },
        {
          title: "Fazer o copiloto agir, não só responder.",
          text: "Propus uma arquitetura em que o copiloto sabe em qual página do dashboard está aberto e pode **executar ações**, como abrir uma página, mudar um filtro ou montar um gráfico. Assim o cliente chega direto à informação, em vez de receber só um texto. A primeira versão foi implementada por outra pessoa do time; hoje eu evoluo e mantenho essa parte.",
        },
        {
          title: "Responder com os dados reais.",
          text: "Para responder, o copiloto consulta o banco de dados do cliente (gerando consultas SQL) e as APIs da plataforma, e devolve análises e gráficos.",
        },
      ],
      flow: [
        "Pergunta do cliente + página aberta",
        "Servidor",
        "A LLM decide: consultar os dados ou executar uma ação",
        "O dashboard aplica a ação (abrir uma página, mudar um filtro, montar um gráfico)",
      ],
      outcome: [
        "Os clientes adotaram o copiloto **rapidamente** e passaram a chegar às respostas com menos dependência do time de CS.",
        "Os clientes ficaram satisfeitos com as respostas do copiloto.",
        "As perguntas feitas ao copiloto revelaram **dúvidas que o time não sabia que os clientes tinham**, o que ajuda a decidir o que melhorar no produto.",
        "A estrutura de ações virou a base das novas funcionalidades do copiloto, que são criadas sem refazer a arquitetura.",
      ],
      resumeTarget: "purple-metrics-desenvolvedor-full-stack-senior",
    },
    {
      id: "cicd-design-system",
      title: "CI/CD e design system",
      summary:
        "O processo automático que testa e publica cada mudança do front-end, e a biblioteca de componentes compartilhada pelos produtos.",
      result: "**Muito menos erros** chegando à produção, e produtos com **a mesma aparência**.",
      role: "Criei a esteira de CI/CD do front-end e transformei os componentes do produto num design system, do qual sou o principal contribuidor.",
      stack: ["GitHub Actions", "AWS (ECR/ECS)", "Terraform", "Playwright", "React", "Radix UI", "Storybook"],
      context:
        "CI/CD é o processo automático que testa, revisa e publica cada mudança no código; um design system é uma biblioteca de componentes visuais compartilhada pelos produtos. Um sistema único (um monólito) foi se dividindo em vários projetos parecidos, que não garantiam componentes iguais.",
      problem:
        "Produtos com componentes diferentes para a mesma coisa, e um processo de entrega que precisava de ambientes de teste mais flexíveis, testes no momento certo e publicações rastreáveis.",
      decisions: [
        {
          title: "Publicar o design system como pacote próprio.",
          text: "Um pacote npm próprio facilita a distribuição entre os produtos, inclusive para pessoas que não programam e querem criar um protótipo ou um projeto rápido com IA usando os componentes oficiais.",
        },
        {
          title: "Testar no momento certo.",
          text: "Os testes rodam quando a mudança é proposta (no pull request), e os testes de ponta a ponta com Playwright, que simulam o uso real do produto, rodam antes da publicação, da forma mais rápida possível.",
        },
        {
          title: "Criar ambientes de teste sob demanda.",
          text: "Cada mudança tem um ambiente de teste próprio antes de ir para produção.",
        },
        {
          title: "Rodar testes rápidos em clientes reais.",
          text: "Testes rápidos de verificação (smoke tests) rodam em clientes reais, para achar erros antes que o cliente os encontre.",
        },
      ],
      flow: [
        "Mudança proposta, com testes",
        "Ambiente de teste sob demanda",
        "Testes de ponta a ponta antes da publicação",
        "Publicação rastreável",
        "Smoke tests em clientes reais",
      ],
      outcome: [
        "Publicações mais frequentes e rastreáveis.",
        "Menos bugs chegando ao cliente.",
        "Produtos com a mesma aparência: o design system igualou os componentes.",
        "Pessoas de outras áreas criando protótipos com os componentes oficiais, sem depender do time de desenvolvimento.",
      ],
      resumeTarget: "purple-metrics-desenvolvedor-full-stack-senior",
    },
    {
      id: "ocr-extraction",
      title: "Extração de dados por nível de confiança",
      summary: "Sistema que lê valores de telas de medição em fotos, combinando OCR e IA com custo baixo.",
      result: "**377 de 380** campos corretos, nenhuma leitura errada, e o serviço pago acionado em **menos de 3%** dos campos.",
      role: "Projetei e construí o sistema e treinei os dois modelos de visão computacional (recorte e classificação).",
      stack: ["YOLO", "OCR", "AWS Lambda", "Amazon Bedrock"],
      context:
        "Pessoas preenchiam planilhas e recortavam imagens à mão para registrar leituras de balanças e outros equipamentos de medição, em volumes de **milhares de imagens por dia**.",
      problem: "Automatizar a leitura com custo baixo e alta confiança, num volume de milhares de imagens por dia.",
      decisions: [
        {
          title: "Recortar como as pessoas recortavam.",
          text: "Um modelo de visão computacional (YOLO) recorta a imagem do jeito que os usuários já faziam à mão.",
        },
        {
          title: "Saber o que é a imagem antes de ler.",
          text: "Um segundo modelo, de **4 classes**, identifica o tipo de imagem (item, post-it, balança e medidor de dimensões).",
        },
        {
          title: "Ler em cascata, por custo e confiança.",
          text: "A leitura passa por etapas, da mais barata à mais cara, e só avança quando a anterior não basta. Primeiro, um OCR (leitura automática de texto) próprio numa Lambda pequena na AWS; se o resultado não passa nas regras, OCR em nuvem mais robusto; se ainda falha, uma LLM com o contexto de tudo o que aconteceu antes. Mandar tudo direto para a LLM sairia caro nesse volume, e as camadas davam **mais confiança** do que a LLM sozinha.",
        },
        {
          title: "Definir regras por tipo de equipamento.",
          text: "Cada tipo de balança ou medidor tem seu conjunto de regras para decidir se a leitura é válida ou se passa para a próxima etapa.",
        },
      ],
      flow: [
        "Recorte (YOLO)",
        "Tipo de imagem (YOLO, 4 classes)",
        "OCR em Lambda",
        "OCR em nuvem",
        "LLM com contexto",
        "Validação humana (alimenta o retreino)",
      ],
      outcome: [
        "Trabalho de **dias ou semanas** virou uma avaliação de **minutos**: as pessoas deixaram de preencher planilha e recortar imagens e passaram só a validar.",
        "A validação humana serve de **retreino** para os modelos.",
        "**377 de 380** campos corretos na leitura de telas de medição (os 3 restantes ficaram em branco, sem nenhuma leitura errada), com o serviço pago em **menos de 3%** dos campos.",
      ],
      resumeTarget: "projects",
    },
    {
      id: "sealdown",
      title: "Sealdown: documentos que só quem tem o link lê",
      summary: "App para compartilhar documentos por link, criptografados no navegador: nem o servidor consegue ler.",
      result:
        "Markdown e JSON compartilhados por link e editados em tempo real, **criptografados no navegador**: o servidor **nunca lê** o conteúdo.",
      role: "Projeto pessoal: concebi e construí sozinho, com o Claude Code.",
      stack: ["React", "TypeScript", "CodeMirror", "Yjs", "Web Crypto", "Supabase (Postgres, Realtime)", "Playwright", "Claude Code"],
      context:
        "Eu precisava compartilhar documentos em Markdown (texto com formatação), com diagramas Mermaid, por um link privado, de graça e sem criar conta.",
      problem:
        "Por princípio, ninguém deveria conseguir ler um documento sem permissão, nem o servidor que o guarda. E, nos documentos ao vivo, quem tem só o link de leitura não pode conseguir escrever.",
      decisions: [
        {
          title: "Criptografar no navegador.",
          text: "Todo documento é embaralhado (criptografado) no navegador antes de ser enviado; a chave fica só no link. Tecnicamente: AES-GCM, com a chave no fragmento do link (depois do #), que nunca é enviado a um servidor. O Supabase só guarda texto cifrado.",
        },
        {
          title: "Proteger com senha, sem a chave no link.",
          text: "Com senha, nem a senha nem a chave vão no link: a chave é gerada a partir da senha no próprio navegador (PBKDF2, **600 mil iterações**).",
        },
        {
          title: "Impedir que o link de leitura edite.",
          text: "Só quem tem o link de edição consegue alterar um documento ao vivo. Cada edição de um documento ao vivo é assinada com uma chave **Ed25519** derivada do token de edição, que só existe no link de edição. O link de leitura tem só a chave pública: confere as edições, mas não consegue criar uma válida. O servidor guarda apenas o hash do token.",
        },
        {
          title: "Editar em tempo real sem servidor próprio.",
          text: "Várias pessoas podem editar o mesmo documento ao mesmo tempo. No Markdown, isso usa Yjs, e as edições trafegam cifradas e assinadas pelo Supabase Realtime. No JSON, o documento salva depois de uma pausa e combina as mudanças campo a campo, só pedindo uma escolha quando duas pessoas mudaram o mesmo valor.",
        },
        {
          title: "Desenvolver com IA e com método.",
          text: "Construí com o Claude Code no fluxo especificação → plano → execução: **7 especificações e 7 planos**, um por fase do projeto.",
        },
      ],
      flow: [
        "Documento no navegador",
        "Criptografa (AES-GCM)",
        "Link com a chave depois do #",
        "Supabase guarda só o cifrado",
        "Quem tem o link decifra no navegador",
      ],
      outcome: [
        "No ar, com o código aberto no GitHub.",
        "**116 commits** (registros de alteração no código) em 6 dias de trabalho, todos com o Claude Code.",
        "**Cerca de 430 testes automáticos**: ~220 unitários, ~209 de ponta a ponta (E2E), mais testes visuais e de banco de dados.",
        "Edição em tempo real, histórico com versões nomeadas e modo JSON, sem contas e sem o servidor ler nada.",
      ],
      resumeTarget: "personal-project",
      image: {
        src: "projects/sealdown.webp",
        srcSmall: "projects/sealdown-800.webp",
        width: 1920,
        height: 1200,
        alt: "O Sealdown no modo dividido: à esquerda o Markdown de exemplo, à direita o texto renderizado com um diagrama Mermaid (Write → Seal → Share).",
      },
      links: [
        { label: "Abrir", href: "https://trainedloop.github.io/sealdown/" },
        { label: "Código", href: "https://github.com/TrainedLoop/sealdown" },
      ],
    },
    {
      id: "mailhub-mcp",
      title: "mailhub-mcp: e-mail seguro para agentes de IA",
      summary: "Conecta o Claude a várias caixas de e-mail com segurança: não envia, não apaga e toda mudança pode ser desfeita.",
      result:
        "Um servidor MCP (padrão aberto que conecta assistentes de IA a outros sistemas) que dá ao Claude **várias caixas de e-mail num só conector**, sem poder **enviar nem apagar** nada, e com toda mudança reversível.",
      role: "Projeto pessoal e open source: concebi e construí sozinho, com o Claude Code.",
      stack: ["Python", "FastMCP", "Gmail API", "OAuth", "Docker", "Tailscale Funnel", "GitHub Actions"],
      context:
        "Eu precisava de um resumo diário do que exige atenção em todas as minhas caixas de e-mail. O conector nativo do Gmail aceita uma conta por vez, e eu não queria entregar meus acessos a um serviço de terceiros. Por isso, criei um servidor próprio.",
      problem:
        "Um agente que lê e-mail lê texto escrito por qualquer pessoa, e qualquer mensagem pode trazer instruções escondidas (prompt injection). O servidor precisa continuar seguro mesmo quando o modelo for enganado.",
      decisions: [
        {
          title: "Impedir o envio e a exclusão de e-mails.",
          text: "O código nunca chama as APIs de envio, lixeira ou exclusão, e **um teste varre o código** para garantir isso. Rascunhos só como resposta a quem já está na conversa.",
        },
        {
          title: "Tornar toda mudança reversível.",
          text: "Toda mudança pode ser desfeita. Marcadores (labels), arquivamento e status de leitura ficam registrados num histórico (journal) com o estado anterior de cada mensagem, o que permite desfazer um lote ou tudo desde um horário. Mudanças em massa mostram uma prévia antes e têm limite diário.",
        },
        {
          title: "Tratar o e-mail como entrada não confiável.",
          text: "O conteúdo de cada e-mail é limpo e isolado antes de chegar ao modelo. Texto escondido no HTML e caracteres invisíveis são removidos, o conteúdo vai entre marcadores com um código aleatório (nonce), e prováveis tentativas de injection são sinalizadas em vez de executadas.",
        },
        {
          title: "Exigir aprovação fora do chat.",
          text: "Preferências que aumentam a atenção valem na hora; as que diminuem, como ignorar um remetente, viram uma proposta que só eu aprovo, fora do alcance do assistente. As caixas são vinculadas numa página de admin separada.",
        },
        {
          title: "Reconhecer o limite de cada camada.",
          text: "O lado do servidor está mitigado e segue evoluindo. O risco que sobra está no agente cliente: se outra ferramenta da mesma sessão acessa a máquina ou a internet, um e-mail malicioso pode tentar usá-la. Por isso as rotinas automáticas usam uma **instância só de leitura**.",
        },
      ],
      flow: [
        "Pedido do Claude",
        "Login Google com lista de permitidos",
        "Ferramenta: ler ou organizar",
        "Conteúdo limpo e marcado como não confiável",
        "Mudança registrada no journal, reversível",
      ],
      outcome: [
        "Uso **todo dia em 5 caixas de e-mail**.",
        "**156 commits**, todos com o Claude Code.",
        "**1151 testes automáticos**, incluindo o que proíbe as chamadas de envio e exclusão.",
        "**18 ferramentas** (11 só de leitura), open source (MIT), em beta, com imagem Docker multi-arquitetura publicada e um site com instalação passo a passo.",
      ],
      resumeTarget: "personal-project",
      image: {
        src: "projects/mailhub-mcp.webp",
        srcSmall: "projects/mailhub-mcp-800.webp",
        width: 1280,
        height: 900,
        alt: "A página de admin do mailhub-mcp com dados de exemplo: quatro caixas de e-mail vinculadas, com o estado de cada uma e os botões de vincular de novo e remover.",
      },
      links: [
        { label: "Abrir", href: "https://trainedloop.github.io/mailhub-mcp/" },
        { label: "Código", href: "https://github.com/TrainedLoop/mailhub-mcp" },
      ],
    },
    {
      id: "ai-workflow",
      title: "Desenvolvimento de software com agentes de IA",
      summary:
        "O método que uso para que agentes de IA escrevam código com qualidade: especificação, plano, revisão e testes automáticos.",
      result:
        "Um método de trabalho em que agentes de IA escrevem o código e eu defino o que fazer, **reviso cada etapa** e garanto a qualidade com **testes automáticos**.",
      role: "Liderei a adoção no time da Purple Metrics e uso o mesmo método nos meus projetos pessoais, cujo código é público.",
      stack: ["Claude Code", "Cursor", "Linear", "GitHub Actions", "Playwright"],
      context:
        "Agentes de IA, como o Claude Code e o Cursor, são assistentes que escrevem código a partir de instruções. Na Purple Metrics, liderei a adoção dessas ferramentas pelo time de desenvolvimento, com regras compartilhadas e um fluxo integrado ao Linear, a ferramenta de gestão de tarefas do time. Nos projetos pessoais uso o mesmo método, e todo o processo pode ser conferido no código.",
      problem:
        "Um agente escreve código rapidamente, mas sem método essa velocidade vira retrabalho: decisões se perdem de uma conversa para outra, o código não é revisado com cuidado e o agente esquece regras combinadas.",
      decisions: [
        {
          title: "Especificar antes de programar.",
          text: "Cada mudança começa por uma especificação escrita com o agente: o que muda, por que e o que fica de fora. Eu reviso e corrijo essa especificação antes de qualquer código ser escrito.",
        },
        {
          title: "Dividir o trabalho em tarefas pequenas.",
          text: "A especificação vira um plano com tarefas pequenas, cada uma com os arquivos envolvidos e a forma de verificar se ficou correta.",
        },
        {
          title: "Usar um agente por tarefa, com revisão.",
          text: "Cada tarefa é executada por um agente separado, que começa sem o histórico das anteriores, e o resultado é revisado antes da próxima.",
        },
        {
          title: "Transformar regras em testes automáticos.",
          text: "O que o agente pode esquecer vira um teste automático. Neste site, a publicação é bloqueada se aparecer um texto confidencial, e **mais de 100 testes** simulam o uso real das páginas a cada mudança.",
        },
        {
          title: "Manter a decisão final comigo.",
          text: "O agente prepara a mudança para revisão; eu testo, reviso e decido se ela entra.",
        },
      ],
      flow: [
        "Especificação revisada por mim",
        "Plano em tarefas pequenas",
        "Um agente por tarefa, com revisão",
        "Testes automáticos",
        "Teste final e aprovação (eu)",
      ],
      outcome: [
        "**Sealdown:** **7 especificações e 7 planos** públicos, **116 commits** (registros de alteração no código) e cerca de **430 testes automáticos**.",
        "**mailhub-mcp:** **156 commits** e **1151 testes automáticos**, com os documentos de projeto públicos.",
        "**Este site:** mais de **25 mudanças revisadas**, cada uma verificada por mais de **100 testes automáticos**.",
        "**Na Purple Metrics:** regras compartilhadas pelo time, com o fluxo especificação → plano → execução integrado ao Linear.",
      ],
      resumeTarget: "purple-metrics-desenvolvedor-full-stack-senior",
      links: [
        { label: "Especificações do Sealdown", href: "https://github.com/TrainedLoop/sealdown/tree/main/docs/superpowers" },
        { label: "Código do site", href: "https://github.com/TrainedLoop/danielporto-site" },
      ],
    },
  ] satisfies CaseStudy[],
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

const pt = { ...ui, meta, caseStudies, share, llms, story, profile, experience, projects, skillGroups, languages };

/** The shape of the messages: en.ts must have exactly the same keys. */
export type Messages = typeof pt;
export default pt;
