# danielporto.com.br

Portfólio do Daniel Porto: resumo, currículo e, opcionalmente, a trajetória contada
como um jogo em pixel art, da casa da avó até a IA em produção.

O site inteiro existe em português e em inglês:

| Página | Português | Inglês |
| --- | --- | --- |
| home para recrutador: quem sou, currículo e contato, 3 conquistas e o convite para a história | `/` | `/en/` |
| 8 fases em pixel art, uma por vez, com inventário | `/historia/` | `/en/story/` |
| o currículo em texto | `/curriculo/` | `/en/resume/` |
| autores e licenças dos sprites e da fonte | `/creditos/` | `/en/credits/` |

Link direto para uma fase: `/historia/?fase=3` ou `/en/story/?phase=3`. Link para um emprego no
currículo: `/curriculo/#<id do emprego>` (os ids são os mesmos nos dois idiomas). O seletor PT · EN
no topo leva para a mesma página no outro idioma, mantendo a fase da história e o emprego do
currículo.

Os links antigos continuam funcionando: os com hash (`#/curriculo`, `#/en/curriculo`) e o
`/en/curriculo/`, que ficou no ar por alguns minutos, levam para o caminho novo.

## Rodar

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # gera dist/, com o HTML de cada página já renderizado
pnpm preview  # serve o dist/ para conferir
```

A publicação é automática: cada push na `main` faz o build e publica no GitHub Pages
(`.github/workflows/deploy.yml`).

## Testes E2E

Testes de ponta a ponta com o [Playwright](https://playwright.dev) (só Chromium), em
`tests/e2e/`. Eles rodam sobre o build: o `playwright.config.ts` sobe o `pnpm preview` na porta
4173 servindo o `dist/` que já existe (não faz o build sozinho).

```bash
pnpm exec playwright install chromium   # uma vez (no Linux, --with-deps instala as libs do sistema)
VITE_POSTHOG_KEY=phc_ci_fake pnpm build # mesmo build do CI, com o PostHog ligado
pnpm test:e2e                           # ~10 s; relatório HTML: pnpm exec playwright show-report
```

O que é conferido: todas as páginas dos dois idiomas (a lista sai do `dist/sitemap.xml`) abrem
com o `<html lang>` certo, um único `h1` e sem erro no console nem aviso de hidratação; nenhuma
tem rolagem horizontal a 360 px; o seletor PT · EN no currículo e num estudo de caso; o PDF do
currículo (impressão em A4) com no máximo 2 páginas; os links da home e dos estudos de caso
para o currículo param logo abaixo da barra do topo; o estudo de caso de OCR não cita empresa
nem ano (nem no `<head>` e no JSON-LD); o link direto `/historia/?fase=3`; numa tela baixa
de notebook (1366×768), a coluna lateral do currículo rola junto com a página; os botões de
contato abrem o LinkedIn numa aba nova; a página não encontrada nos dois idiomas (o teste serve o
`404.html`, que o `vite preview` não serve); os links da barra do topo com 44 px de altura no
celular; na história, o inventário cabendo a 360 e 390 px, o diálogo livre do inventário com o
celular deitado, as dicas de teclado só fora das telas de toque e a tela final com contato e
currículo; o rodapé dos estudos de caso; e os créditos sem link para o endereço vazio do OpenGameArt. As requisições
para o PostHog são bloqueadas nos testes.

No CI (`.github/workflows/ci.yml`), os testes rodam depois do build em cada PR; se falharem, o
relatório HTML fica como artefato da execução (`playwright-report`).

## Como o site é feito

- React, TypeScript e Vite; animações com GSAP sobre um canvas de 320x180 ampliado sem suavizar.
- `src/engine/` — o motor das cenas: falas com texto digitado, animação por fala, botão de
  continuar, pular e inventário. Multiplicadores de velocidade em `src/engine/config.ts`
  (gerais) e em cada fala (`speed` e `textSpeed`).
- `src/phases/` — cada fase é só configuração: sprites, o tempo de cada fala e a função de
  desenho. O texto das falas fica nos locales (`story.phases.<fase>.beats`), com um id por fala;
  o `definePhase` confere no TypeScript que os ids da fase são exatamente os dos locales (faltar
  ou sobrar fala é erro de tipo). Sprites com texto desenhado são marcados com `withText(...)` e
  têm uma variante em inglês ao lado (`<nome>.en.png`).
- `src/i18n/` — traduções com i18next: `locales/pt.ts` e `locales/en.ts` têm a interface, o
  conteúdo da home e do currículo, a história (título, descrição da cena, item e falas de cada
  fase), os créditos e o título e a descrição de cada página (vão para o `<title>`, a meta
  description e o compartilhamento). As chaves são tipadas a partir do `pt.ts`, e o `en.ts`
  precisa ter as mesmas. O idioma vem da página (prefixo `/en/`), não do navegador.
- Rotas por caminho com a History API (`src/lib/route.ts`), sem biblioteca de rotas. No build,
  `scripts/prerender.js` renderiza cada rota com `react-dom/server` a partir dos componentes
  (`src/entry-server.ts`) e grava `dist/<rota>/index.html`, com título, descrição, canonical e
  `og:url` de cada página, `hreflang` apontando para a versão no outro idioma e, em inglês, a
  imagem de compartilhamento em inglês (`og-image.en.png`). Também grava o `dist/404.html` (com
  `noindex`), que o GitHub Pages serve em caminhos desconhecidos: uma tela "GAME OVER" de página
  não encontrada, no idioma do prefixo do caminho (`/en/...` em inglês), uma página que só redireciona em cada endereço antigo
  (`dist/en/curriculo/`) e o `dist/sitemap.xml`, com todas as páginas e as alternativas de
  idioma. O build falha se alguma fala estiver sem texto ou se faltar algum sprite. No
  navegador, o React hidrata o HTML que já veio pronto.
- Cada página leva dados estruturados (JSON-LD do schema.org) no idioma dela, gerados no build
  (`src/content/structuredData.ts`): o site (`WebSite`), a página (`ProfilePage` na home e no
  currículo, `WebPage` na história e nos créditos), a pessoa (`Person`, com cargo, empresa,
  competências (os grupos de `skillGroups`, achatados) e idiomas tirados dos locales) e, nas
  subpáginas, o caminho de volta para a home (`BreadcrumbList`).
- O build também grava o `/llms.txt` (quem é o Daniel e todas as páginas, nos dois idiomas, com
  a descrição de cada uma) e o `/llms-full.txt` (o currículo inteiro em Markdown, em inglês e
  em português), para ferramentas de IA, a partir dos mesmos locales
  (`src/content/llms.ts`, convenção de [llmstxt.org](https://llmstxt.org)).
- Data de atualização: o `vite.config.ts` pega a data do último commit que mexeu em
  `src/i18n/locales` (ou a data do build, sem git; nunca uma data futura) e a passa como
  constante de build. Ela aparece no currículo ("Atualizado em …"), no `dateModified` dos dados
  estruturados e no `lastmod` do sitemap. No CI o checkout é raso, então vale a data do commit
  que está sendo publicado.
- Títulos e descrições das páginas (`meta` nos locales): o build falha se um título tiver menos
  de 15 ou mais de 70 caracteres, ou uma descrição menos de 70 ou mais de 160.

## Métricas

O site usa o [PostHog](https://posthog.com) para saber como as pessoas navegam
(`src/lib/analytics.ts`). O `posthog-js` (com o gravador de sessão) vem num chunk separado, carregado só depois
que a página aparece (`requestIdleCallback`), então não pesa no bundle inicial.

A chave vem do build: `VITE_POSTHOG_KEY` e `VITE_POSTHOG_HOST` (padrão
`https://us.i.posthog.com`). No deploy, o workflow lê as duas das variáveis do
repositório (`vars.*`). Sem a chave (rodando local, num fork), nada é carregado nem
enviado. Para testar local: `VITE_POSTHOG_KEY=phc_... pnpm dev`.

Privacidade:

- nada de cookie, localStorage ou sessionStorage (`persistence: "memory"`): cada visita é
  um visitante anônimo novo e não precisa de banner de consentimento;
- gravação de sessão (session replay) ligada: o gravador vem no mesmo chunk do PostHog
  (`src/lib/posthog.ts`), nada é baixado do CDN deles. Campos de formulário são mascarados,
  headers, corpos de requisição e logs do console não entram; o texto das páginas é público e
  aparece como está. O `<canvas>` da história é gravado a 3 quadros por segundo, qualidade 0.4.
  A navegação interna não recarrega a página, então uma visita é uma gravação só. A gravação
  só começa se estiver ligada no projeto do PostHog (configuração remota, um JSON);
- o rodapé (e a tela final da história) avisa que visitas e sessões anônimas são registradas;
- sem autocapture (cliques e campos não são capturados automaticamente), sem heatmaps,
  surveys, feature flags ou scripts extras do PostHog;
- com Do Not Track ou Global Privacy Control ligado no navegador, o PostHog nem é carregado.

Eventos (todos levam também `lang`: `pt` \| `en`, o idioma da página):

| Evento | Quando | Propriedades |
| --- | --- | --- |
| `$pageview` | ao abrir o site e a cada troca de página | `route` (o caminho, ex.: `curriculo`, `en/story`) |
| `home_choice` | clique em "Ver currículo", "Falar comigo no LinkedIn" ou "Jogar a história" na home | `option`: `resume` \| `contact` \| `story` |
| `home_achievement` | clique em "ver no currículo" num card de conquista da home | `id`: `ai-chat` \| `ai-agents` \| `computer-vision` |
| `phase_started` | uma fase da história começa (inclusive "ver de novo") | `phase` (0 a 7), `phase_id` |
| `phase_completed` | a pessoa chega ao fim das falas de uma fase | `phase`, `phase_id` |
| `phase_skipped` | clique em "pular" | `phase`, `phase_id` |
| `story_completed` | a tela de encerramento ("CONTINUA…") aparece | — |
| `outbound_link` | clique em link para LinkedIn, GitHub ou email | `destination`: `linkedin` \| `github` \| `email`, `url` |

Até a troca do código para inglês, os eventos tinham nomes em português (`escolha_home`,
`fase_iniciada`, `fase_concluida`, `fase_pulada`, `historia_concluida`, `link_externo`, com
`rota`, `opcao`, `fase`, `fase_id` e `destino`); os dados antigos no PostHog ficam com esses nomes.

## Arte

Os sprites em `public/sprites/` são gerados pelos scripts em `tools/` (Python + Pillow):

- `tools/build_character.py` monta o personagem e os NPCs a partir das camadas do
  [Universal LPC Spritesheet Character Generator](https://github.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator)
  (clone em outra pasta; o script só lê os PNGs e JSONs) e gera o `CREDITS.csv`.
- `tools/build_props*.py` desenham em código os cenários, objetos e telas de cada fase. Com
  `--lang en`, desenham de novo em inglês e gravam só os sprites que mudaram (os que têm texto),
  como `<nome>.en.png`; a lista sai no terminal e precisa bater com os `withText(...)` da fase.
- `tools/build_share_assets.py` gera a imagem de compartilhamento e os ícones; com `--lang en`,
  só a `og-image.en.png`.

```bash
python -I tools/build_character.py <pasta-do-lpc> public/sprites/character
python -I tools/build_props.py public/sprites/phase0
python -I tools/build_props_phase1.py public/sprites/phase1   # e assim por diante até a fase 7
python -I tools/build_props_phase1.py public/sprites/phase1 --lang en   # variantes em inglês
python -I tools/build_share_assets.py public
python -I tools/build_share_assets.py public --lang en
```

## Licenças da arte

Os personagens usam arte do Liberated Pixel Cup e da comunidade do OpenGameArt
(CC-BY-SA 3.0, OGA-BY 3.0 e GPL 3.0); os autores estão em
`public/sprites/character/CREDITS.csv` e na página `/creditos/`.

As fontes Press Start 2P, VT323 e Inter são servidas pelo próprio site (arquivos
woff2 em `src/assets/fonts`, tirados dos pacotes do Fontsource) e estão sob a
SIL Open Font License 1.1. As licenças ficam ao lado dos arquivos:
`src/assets/fonts/PressStart2P-OFL.txt`, `VT323-OFL.txt` e `Inter-OFL.txt`
(a Press Start 2P também em `tools/fonts/OFL.txt`, junto do TTF usado pelos
scripts).
