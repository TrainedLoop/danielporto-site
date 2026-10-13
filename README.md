# danielporto.com.br

Portfólio do Daniel Porto: resumo, currículo e, opcionalmente, a trajetória contada
como um jogo em pixel art, da casa da avó até a IA em produção.

- `#/` — home com o resumo e a escolha entre jogar a história ou ler o currículo
- `#/historia` — 8 fases em pixel art, uma por vez, com inventário
- `#/curriculo` — o currículo em texto
- `#/creditos` — autores e licenças dos sprites e da fonte

## Rodar

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # gera dist/
```

A publicação é automática: cada push na `main` faz o build e publica no GitHub Pages
(`.github/workflows/deploy.yml`).

## Como o site é feito

- React, TypeScript e Vite; animações com GSAP sobre um canvas de 320x180 ampliado sem suavizar.
- `src/engine/` — o motor das cenas: falas com texto digitado, animação por fala, botão de
  continuar, pular e inventário. Multiplicadores de velocidade em `src/engine/config.ts`
  (gerais) e em cada fala (`speed` e `textSpeed`).
- `src/phases/` — cada fase é só configuração: sprites, falas e a função de desenho.
- `src/content/profile.ts` — o conteúdo da home e do currículo.

## Métricas

O site usa o [PostHog](https://posthog.com) para saber como as pessoas navegam
(`src/lib/analytics.ts`). O `posthog-js` vem num chunk separado, carregado só depois
que a página aparece (`requestIdleCallback`), então não pesa no bundle inicial.

A chave vem do build: `VITE_POSTHOG_KEY` e `VITE_POSTHOG_HOST` (padrão
`https://us.i.posthog.com`). No deploy, o workflow lê as duas das variáveis do
repositório (`vars.*`). Sem a chave (rodando local, num fork), nada é carregado nem
enviado. Para testar local: `VITE_POSTHOG_KEY=phc_... pnpm dev`.

Privacidade:

- nada de cookie, localStorage ou sessionStorage (`persistence: "memory"`): cada visita é
  um visitante anônimo novo e não precisa de banner de consentimento;
- sem gravação de sessão, sem autocapture (cliques e campos não são capturados
  automaticamente), sem heatmaps, surveys, feature flags ou scripts extras do PostHog;
- com Do Not Track ou Global Privacy Control ligado no navegador, o PostHog nem é carregado.

Eventos:

| Evento | Quando | Propriedades |
| --- | --- | --- |
| `$pageview` | ao abrir o site e a cada troca de rota (hash) | `rota` |
| `escolha_home` | clique em "Jogar a história" ou "Ler o currículo" na home | `opcao`: `historia` \| `curriculo` |
| `fase_iniciada` | uma fase da história começa (inclusive "ver de novo") | `fase` (0 a 7), `fase_id` |
| `fase_concluida` | a pessoa chega ao fim das falas de uma fase | `fase`, `fase_id` |
| `fase_pulada` | clique em "pular" | `fase`, `fase_id` |
| `historia_concluida` | a tela de encerramento ("CONTINUA…") aparece | — |
| `link_externo` | clique em link para LinkedIn, GitHub ou email | `destino`: `linkedin` \| `github` \| `email`, `url` |

## Arte

Os sprites em `public/sprites/` são gerados pelos scripts em `tools/` (Python + Pillow):

- `tools/build_character.py` monta o personagem e os NPCs a partir das camadas do
  [Universal LPC Spritesheet Character Generator](https://github.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator)
  (clone em outra pasta; o script só lê os PNGs e JSONs) e gera o `CREDITS.csv`.
- `tools/build_props*.py` desenham em código os cenários, objetos e telas de cada fase.

```bash
python -I tools/build_character.py <pasta-do-lpc> public/sprites/character
python -I tools/build_props.py public/sprites/phase0
python -I tools/build_props_phase1.py public/sprites/phase1   # e assim por diante até a fase 7
```

## Licenças da arte

Os personagens usam arte do Liberated Pixel Cup e da comunidade do OpenGameArt
(CC-BY-SA 3.0, OGA-BY 3.0 e GPL 3.0); os autores estão em
`public/sprites/character/CREDITS.csv` e na página `#/creditos`. A fonte
Press Start 2P está sob a SIL Open Font License (`tools/fonts/OFL.txt`).
