// Portuguese texts (default language): the UI, page titles, home and résumé content, the
// pixel-art story and the credits. The home page uses a summary; the text version is the
// full résumé.
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

/** Résumé summary (the LinkedIn "About"). */
const summary = {
  aiProjectsTitle: "Projetos de IA que desenvolvi",
  aiProjects: [
    "Projetei e implementei um copiloto de IA para uma plataforma analítica corporativa (Google ADK, Gemini): o agente consulta os dados com as permissões de quem pergunta, só lê da réplica de leitura, mascara dados pessoais antes de chegarem ao modelo (LGPD) e tem limite de custo por pergunta.",
    "Treinei e coloquei em produção modelos de visão computacional (YOLO) com quase 50 mil imagens, versionados e servidos em ONNX na AWS, com cerca de 95% de precisão e recall na validação, e retreinados com as correções que os operadores fazem em produção.",
    "Construí a extração de dados de imagens combinando OCR local, OCR em nuvem e LLM (Amazon Bedrock) por nível de confiança: na leitura de telas de medição, 377 de 380 campos corretos (os 3 restantes ficaram em branco, sem nenhuma leitura errada), com o serviço pago acionado em menos de 3% deles.",
  ],
  dailyAi:
    "Também uso IA no desenvolvimento do dia a dia, de forma estruturada: escrevo skills, regras e fluxos para Claude Code e Cursor que o time usa, com especificação antes do código, plano revisado e testes.",
  stack:
    "Minha carreira começou no back-end com C#/.NET e SQL Server. Hoje, na Purple Metrics, trabalho com front-end (React e TypeScript), IA no produto e a esteira de CI/CD. Uso Python principalmente nos projetos de IA (FastAPI, LiteLLM). No dia a dia também lido com Docker, GitHub Actions, Azure DevOps e AWS.",
};

/** Short highlights for the home page. */
const highlights = [
  {
    title: "IA em produção",
    text: "O chat de IA da Purple, um copiloto com permissões e LGPD, visão computacional, MCP e agentes no dia a dia do time.",
  },
  {
    title: "Front-end",
    text: "React e TypeScript no dashboard da Purple, um design system próprio e a esteira de CI/CD com mais de 800 deploys.",
  },
  {
    title: "Back-end",
    text: "Carreira construída em C#/.NET e SQL Server, com APIs, integrações e filas. Python nos projetos de IA.",
  },
];

export type Job = {
  /** Stable anchor on the résumé, the same in both languages (the story links to it). */
  id: string;
  company: string;
  role: string;
  period: string;
  description?: string;
  bullets: string[];
};

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
      "Chat de IA em produção com clientes: responde perguntas em linguagem natural sobre os dados do dashboard, gerando SQL, chamando APIs em Python e respondendo com insights e gráficos. Nasceu de um protótipo que meu time construiu em 3 dias num hackathon interno; fui responsável pela interface, pela integração com a LLM e pelos prompts (refinados com o time de dados) e sigo construindo a versão atual com o time.",
      "Propus a arquitetura de comunicação entre o chat de IA e o dashboard, que permite à IA navegar e aplicar ações na interface; hoje uso essa estrutura para implementar novas funcionalidades.",
      "Criei a prova de conceito de servidor MCP (Model Context Protocol) da Purple, conectando as APIs da plataforma a assistentes de IA.",
      "Desenvolvo o dashboard do produto (React, TypeScript, Vite, TanStack Query, Zustand, Tailwind, Recharts), incluindo otimização e alocação de orçamento, simulação, curvas de saturação e o fluxo de data setup.",
      "Liderei a adoção de agentes de IA no desenvolvimento do time, com as decisões tomadas em conjunto: montei a estrutura de skills e regras (Claude Code e Cursor) do repositório, com fluxo spec → plano → execução integrado ao Linear.",
      "Extraí o design system para um pacote npm próprio, com Radix UI, Storybook e releases automatizados; sou o principal contribuidor e ele já tem mais de 45 versões publicadas.",
      "Criei a esteira de CI/CD do frontend no GitHub Actions (build, lint, deploy em ECR/ECS, ambientes de QA, revisão de código automatizada e testes E2E com Playwright), com mais de 800 deploys em produção, e faço manutenções na infraestrutura AWS (Terraform) junto ao time.",
    ],
  },
  {
    id: "fu2re-smart-solutions-desenvolvedor-full-stack-senior",
    company: "Fu2re Smart Solutions",
    role: "Desenvolvedor Full Stack Sênior",
    period: "ago 2019 – jun 2023",
    description: "Onde tive o primeiro contato sério com IA, antes do boom.",
    bullets: [
      "SmartVision, plataforma de treino e inferência de modelos de visão computacional: criei as APIs que dão suporte à aplicação React, integrando toda a fila de treino e inferência com Hangfire. Usei CQRS, com a entrada de dados no MySQL (facilitando a consulta da equipe de visão) e a consulta dos dados consolidados do front num MongoDB. Colaborei no front-end com React, Redux e Styled Components.",
      "Participei do software de um carro que fotografava os postes da Light pela cidade, como os carros do Google.",
      "Urban, aplicativo de mobilidade urbana: colaborei no app em React Native, com Styled Components, Redux e integração com o Google Maps.",
      "SmartAssets: manutenção e novas funcionalidades na plataforma, com MySQL, WebForms e DevExpress.",
    ],
  },
  {
    id: "fulllab-retail-solutions-lider-tecnico",
    company: "Fulllab | retail solutions",
    role: "Líder técnico",
    period: "mai 2017 – ago 2019",
    description: "Líder técnico de um time de 4 pessoas.",
    bullets: [
      "Mobfiq (V2): reestruturei o projeto para atender às novas demandas dos clientes e implementei uma API comum a todos eles, com injeção de dependência para novas plataformas e cenários específicos.",
      "Mobfiq (Magento): criei um plugin em PHP para a plataforma Magento, que controlava a interface da loja e o fluxo de compra.",
      "Portal de migração da Danone: processamento das planilhas dos gerentes com as regras de negócio para alimentar o ERP, com .NET Core 2.2, Entity Framework Core e React.",
      "Moblite (Loja Integrada): integração de e-commerce por engenharia reversa, com web scraper e Selenium, e APIs em .NET Core com MongoDB.",
    ],
  },
  {
    id: "fulllab-retail-solutions-desenvolvedor-net",
    company: "Fulllab | retail solutions",
    role: "Desenvolvedor .NET",
    period: "set 2015 – mai 2017",
    bullets: [
      "Mobfiq (V1): API de integração com a VTEX em .NET 4.5, Dapper e MySQL, estudando o comportamento da plataforma por engenharia reversa, quando ainda não havia documentação; endpoints para o aplicativo mobile.",
      "Mobfiq (Sephora): web scraper com .NET 4.5 e Selenium para integrar a loja da Sephora, que não tinha API nem documentação.",
    ],
  },
  {
    id: "hebara-distribuidora-de-produtos-lotericos-programador-junior",
    company: "Hebara Distribuidora de Produtos Lotéricos",
    role: "Programador júnior",
    period: "set 2013 – set 2015",
    bullets: [
      "Desenvolvimento da intranet da empresa, com os primeiros deploys em produção (C#, .NET MVC, WebForms, NHibernate, jQuery, Bootstrap e Oracle).",
      "Suporte ao sistema interno e novas funcionalidades no portal principal da empresa.",
      "Reestruturação dos sites da Raspadinha do Rio e do Rio de Prêmios.",
    ],
  },
];

/** Skills (the first five are the main ones). */
const skills = [
  "Inteligência artificial (IA)",
  "React",
  "TypeScript",
  "C# / .NET",
  "Visão computacional",
  "Agentes de IA",
  "Model Context Protocol (MCP)",
  "Google ADK",
  "Claude Code",
  "Cursor",
  "Amazon Bedrock",
  "LGPD / privacidade em IA",
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

const languages = [
  // code: BCP 47, for the structured data (knowsLanguage); not shown on the page.
  { name: "Português", level: "nativo", code: "pt-BR" },
  { name: "Inglês", level: "intermediário", code: "en" },
];

/** Fixed UI texts (top bar, home, résumé and credits), translated along with the content. */
const ui = {
  nav: { label: "Navegação", story: "história", resume: "currículo", language: "Idioma" },
  footerCredits: "créditos dos sprites e da fonte",
  home: {
    avatarAlt: "Daniel em pixel art",
    hello: "Olá, eu sou",
    roleAt: "na",
    choiceTitle: "Como você quer conhecer a minha trajetória?",
    playLabel: "Jogar a história",
    playHint: "Da casa da minha avó até a IA em produção, em 8 fases de pixel art. Uns 5 minutos.",
    resumeLabel: "Ler o currículo",
    resumeHint: "A versão em texto, direta ao ponto, começando pela experiência atual.",
    highlightsLabel: "O que eu faço",
    skillsLabel: "Competências",
  },
  resume: {
    roleAt: "na",
    playStory: "▶ jogar a história",
    downloadPdf: "baixar PDF",
    pdfTitle: "Daniel Porto - Currículo",
    summary: "Resumo",
    experience: "Experiência",
    skills: "Competências",
    languages: "Idiomas",
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

const pt = { ...ui, meta, share, llms, story, profile, summary, highlights, experience, skills, languages };

/** The shape of the messages: en.ts must have exactly the same keys. */
export type Messages = typeof pt;
export default pt;
