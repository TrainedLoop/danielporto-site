// Conteúdo do portfólio: a home usa um resumo e a versão em texto é o currículo completo.
// Fonte: o perfil do LinkedIn revisado (linkdin-update/linkedin-ptbr.md) e o currículo antigo.

export const profile = {
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

/** Resumo do currículo (o "Sobre" do LinkedIn). */
export const summary = {
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

/** Destaques curtos para a home. */
export const highlights = [
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
  company: string;
  role: string;
  period: string;
  description?: string;
  bullets: string[];
};

/** Experiência, da mais recente para a mais antiga. */
export const experience: Job[] = [
  {
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
    company: "Fulllab | retail solutions",
    role: "Desenvolvedor .NET",
    period: "set 2015 – mai 2017",
    bullets: [
      "Mobfiq (V1): API de integração com a VTEX em .NET 4.5, Dapper e MySQL, estudando o comportamento da plataforma por engenharia reversa, quando ainda não havia documentação; endpoints para o aplicativo mobile.",
      "Mobfiq (Sephora): web scraper com .NET 4.5 e Selenium para integrar a loja da Sephora, que não tinha API nem documentação.",
    ],
  },
  {
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

/** Competências (as cinco primeiras são as principais). */
export const skills = [
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

export const languages = [
  { name: "Português", level: "nativo" },
  { name: "Inglês", level: "intermediário" },
];

/** Textos fixos da interface (topo, home e currículo), traduzidos junto com o conteúdo. */
export const ui = {
  nav: { label: "Navegação", story: "história", resume: "currículo" },
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
    summary: "Resumo",
    experience: "Experiência",
    skills: "Competências",
    languages: "Idiomas",
  },
};

/** Tudo o que a home e o currículo mostram, num objeto só: cada idioma tem o seu. */
export const content = { profile, summary, highlights, experience, skills, languages, ui };
export type Content = typeof content;
