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
`public/sprites/character/CREDITS.csv` e na página `#/creditos`.

As fontes Press Start 2P, VT323 e Inter são servidas pelo próprio site (arquivos
woff2 em `src/assets/fonts`, tirados dos pacotes do Fontsource) e estão sob a
SIL Open Font License 1.1. As licenças ficam ao lado dos arquivos:
`src/assets/fonts/PressStart2P-OFL.txt`, `VT323-OFL.txt` e `Inter-OFL.txt`
(a Press Start 2P também em `tools/fonts/OFL.txt`, junto do TTF usado pelos
scripts).
