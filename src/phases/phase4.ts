import { drawEmptySeat, drawSeated, drawWalk } from "../engine/character";
import { definePhase } from "../engine/types";
import { segment } from "../lib/sprites";

const BASE = import.meta.env.BASE_URL;
const P = `${BASE}sprites/phase4`;
const P3 = `${BASE}sprites/phase3`;
const C = `${BASE}sprites/character`;

type Rect = { x: number; y: number; w: number; h: number };

const LCD: Rect = { x: 152, y: 74, w: 34, h: 24 };
const CLOSE_FRAME: Rect = { x: 60, y: 14, w: 200, h: 130 };
const CLOSE_SCREEN: Rect = { x: 72, y: 24, w: 176, h: 108 };
const PROGRESS = { x: 24, y: 60, w: 128, h: 10 };
// Área prateada da raspadinha, já na posição da tela de perto.
const SCRATCH = { x: CLOSE_SCREEN.x + 24, y: CLOSE_SCREEN.y + 44, w: 128, h: 40 };
const SCRATCH_FRAMES = 8;
const IDE_LINES = 7;

const SIT = { x: 156, y: 82 };
const CONFETTI_COLORS = ["#f3c03f", "#e6455a", "#46b4e6", "#5ac85a", "#a066dc"];

// Trechos (0 a 1) da animação. Cada fala termina quando a última animação dela acaba.
const TIMELINE = {
  walkIn: [0, 0.16],
  zoom: [0.18, 0.22],
  typing: [0.24, 0.38],
  intranet: [0.39, 0.44],
  deploy: [0.46, 0.6],
  success: [0.61, 0.68],
  card: 0.7,
  scratch: [0.74, 0.94],
  item: 0.16,
} as const;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOut = (t: number) => 1 - (1 - t) ** 3;
const lerpRect = (a: Rect, b: Rect, t: number): Rect => ({
  x: lerp(a.x, b.x, t),
  y: lerp(a.y, b.y, t),
  w: lerp(a.w, b.w, t),
  h: lerp(a.h, b.h, t),
});
const drawRect = (ctx: CanvasRenderingContext2D, image: HTMLImageElement, r: Rect) =>
  ctx.drawImage(image, Math.round(r.x), Math.round(r.y), Math.round(r.w), Math.round(r.h));

export const phase4 = definePhase({
  id: "phase4",
  title: "Fase 4: Hebara, o primeiro emprego como dev",
  description:
    "Um rapaz de moicano entra num escritório com pôsteres de raspadinha e pega umo crachá do primeiro emprego. No monitor, escreve o código da intranet em C#, faz o primeiro deploy em produção e raspa uma raspadinha que revela: site novo.",
  sprites: {
    office: `${P}/office.png`,
    desk: `${P3}/office-desk.png`,
    lcd: `${P3}/lcd.png`,
    chair: `${P3}/chair.png`,
    lcdFrame: `${P3}/lcd-frame.png`,
    intranet: `${P}/intranet.png`,
    deploy: `${P}/deploy.png`,
    deployDone: `${P}/deploy-done.png`,
    card: `${P}/card.png`,
    coin: `${P}/coin.png`,
    ide0: `${P}/ide-0.png`,
    ide1: `${P}/ide-1.png`,
    ide2: `${P}/ide-2.png`,
    ide3: `${P}/ide-3.png`,
    ide4: `${P}/ide-4.png`,
    ide5: `${P}/ide-5.png`,
    ide6: `${P}/ide-6.png`,
    ide7: `${P}/ide-7.png`,
    scratch0: `${P}/scratch-0.png`,
    scratch1: `${P}/scratch-1.png`,
    scratch2: `${P}/scratch-2.png`,
    scratch3: `${P}/scratch-3.png`,
    scratch4: `${P}/scratch-4.png`,
    scratch5: `${P}/scratch-5.png`,
    scratch6: `${P}/scratch-6.png`,
    scratch7: `${P}/scratch-7.png`,
    scratch8: `${P}/scratch-8.png`,
    danielWalk: `${C}/mohawk-walk.png`,
    danielSit: `${C}/mohawk-sit.png`,
    coworkerSit: `${C}/coworker-sit.png`,
  },
  // Cada fala toca o seu pedaço da animação; speed e textSpeed valem só para ela.
  beats: [
    {
      to: TIMELINE.walkIn[1],
      seconds: 2.2,
      speed: 1,
      textSpeed: 1,
      text: "Em 2013, um curso de C# me levou ao primeiro emprego como programador júnior, na Hebara.",
    },
    {
      to: TIMELINE.intranet[1],
      seconds: 3.6,
      speed: 1,
      textSpeed: 1,
      text: "Comecei desenvolvendo a intranet da empresa, com C#, .NET MVC, WebForms e banco Oracle.",
    },
    {
      to: TIMELINE.success[1],
      seconds: 3,
      speed: 1,
      textSpeed: 1,
      text: "E vieram os meus primeiros deploys em produção.",
    },
    {
      to: TIMELINE.scratch[1],
      seconds: 3.4,
      speed: 1,
      textSpeed: 1,
      text: "Também ajudei a reestruturar os sites da Raspadinha do Rio e do Rio de Prêmios.",
    },
  ],
  item: {
    id: "badge",
    label: "Crachá do primeiro emprego",
    src: `${P}/item-badge.png`,
    at: TIMELINE.item,
  },
  staticAt: 0.94,
  draw(ctx, s, p) {
    // ---- Escritório
    ctx.drawImage(s.office, 0, 0);
    ctx.drawImage(s.desk, 140, 106);
    ctx.drawImage(s.lcd, LCD.x, LCD.y);
    ctx.drawImage(s.lcd, 188, 74);
    ctx.drawImage(s.desk, 256, 106);
    ctx.drawImage(s.lcd, 280, 74);
    drawSeated(ctx, s.coworkerSit, s.chair, 270, 82);

    // ---- Daniel chega e senta na mesa dele; o crachá entra no inventário.
    if (p < TIMELINE.walkIn[1]) {
      drawEmptySeat(ctx, s.chair, SIT.x, SIT.y);
      drawWalk(ctx, s.danielWalk, p, TIMELINE.walkIn[0], TIMELINE.walkIn[1], -64, SIT.x, 96, "up");
    } else {
      drawSeated(ctx, s.danielSit, s.chair, SIT.x, SIT.y);
    }

    // ---- Zoom no monitor: IDE, intranet, deploy e a raspadinha.
    const zoomT = easeOut(segment(p, TIMELINE.zoom[0], TIMELINE.zoom[1]));
    if (zoomT <= 0) return;
    ctx.fillStyle = `rgba(27, 22, 34, ${0.8 * zoomT})`;
    ctx.fillRect(0, 0, 320, 180);

    let content = s.ide0;
    if (p >= TIMELINE.card) content = s.card;
    else if (p >= TIMELINE.success[0]) content = s.deployDone;
    else if (p >= TIMELINE.deploy[0]) content = s.deploy;
    else if (p >= TIMELINE.intranet[0]) content = s.intranet;
    else if (p >= TIMELINE.typing[0]) {
      const lines = Math.round(segment(p, TIMELINE.typing[0], TIMELINE.typing[1]) * IDE_LINES);
      content = s[`ide${lines}` as keyof typeof s];
    }

    const screenFrom = { x: LCD.x + 3, y: LCD.y + 3, w: LCD.w - 6, h: LCD.h - 6 };
    const screen = lerpRect(screenFrom, CLOSE_SCREEN, zoomT);
    drawRect(ctx, s.lcdFrame, lerpRect(LCD, CLOSE_FRAME, zoomT));
    drawRect(ctx, content, screen);
    if (zoomT < 1) return;

    // Barra do deploy enchendo.
    if (p >= TIMELINE.deploy[0] && p < TIMELINE.success[0]) {
      const fill = segment(p, TIMELINE.deploy[0], TIMELINE.deploy[1]);
      ctx.fillStyle = "#3ca03c";
      ctx.fillRect(CLOSE_SCREEN.x + PROGRESS.x, CLOSE_SCREEN.y + PROGRESS.y, Math.round(PROGRESS.w * fill), PROGRESS.h);
    }

    // Confetes caindo quando o deploy dá certo.
    if (p >= TIMELINE.success[0] && p < TIMELINE.card) {
      const t = segment(p, TIMELINE.success[0], TIMELINE.success[1]);
      for (let i = 0; i < 24; i++) {
        const x = CLOSE_FRAME.x + ((i * 37) % CLOSE_FRAME.w);
        const y = CLOSE_FRAME.y - 10 + ((t * 160 + i * 23) % 150);
        ctx.fillStyle = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
        ctx.fillRect(x, Math.round(y), 3, 2);
      }
    }

    // Raspadinha: a camada prateada vai sumindo e a moeda acompanha o zigue-zague.
    if (p >= TIMELINE.card) {
      const t = segment(p, TIMELINE.scratch[0], TIMELINE.scratch[1]);
      const frame = Math.round(t * SCRATCH_FRAMES);
      ctx.drawImage(s[`scratch${frame}` as keyof typeof s], CLOSE_SCREEN.x, CLOSE_SCREEN.y);
      if (t > 0 && t < 1) {
        const x = SCRATCH.x + t * SCRATCH.w;
        const zig = Math.abs(((t * SCRATCH_FRAMES) % 2) - 1);
        ctx.drawImage(s.coin, Math.round(x - 6), Math.round(SCRATCH.y + zig * (SCRATCH.h - 12)));
      }
    }
  },
});
