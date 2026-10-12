import { drawEmptySeat, drawFrame, drawSeated, drawWalk } from "../engine/character";
import { definePhase } from "../engine/types";
import { segment } from "../lib/sprites";

const BASE = import.meta.env.BASE_URL;
const P = `${BASE}sprites/phase5`;
const P3 = `${BASE}sprites/phase3`;
const C = `${BASE}sprites/character`;

type Rect = { x: number; y: number; w: number; h: number };
type Point = { x: number; y: number };

const LCD: Rect = { x: 152, y: 74, w: 34, h: 24 };
const CLOSE_FRAME: Rect = { x: 60, y: 14, w: 200, h: 130 };
const CLOSE_SCREEN: Rect = { x: 72, y: 24, w: 176, h: 108 };
const SIT = { x: 156, y: 82 };
const STAND_Y = 96;
const ENDPOINTS = 5;

// Caminhos dos pacotes no diagrama (coordenadas da tela de perto): celular → API → loja.
const at = (x: number, y: number): Point => ({ x: CLOSE_SCREEN.x + x, y: CLOSE_SCREEN.y + y });
const STORE_PATHS: Point[][] = [19, 53, 87].map((storeY) => [
  at(28, 53),
  at(52, 53),
  at(92, 53),
  at(98, 53),
  at(98, storeY),
  at(104, storeY),
]);

// O time de 4 pessoas chega para o "level up": dois de cada lado.
const TEAM = [
  { sheet: "coworker", from: -64, to: 40 },
  { sheet: "friend", from: -100, to: 84 },
  { sheet: "devWoman", from: 360, to: 226 },
  { sheet: "neighborWoman", from: 396, to: 266 },
] as const;

// Trechos (0 a 1) da animação. Cada fala termina quando a última animação dela acaba.
const TIMELINE = {
  walkIn: [0, 0.14],
  zoomIn: [0.16, 0.2],
  reveal: [0.22, 0.42],
  diagram: 0.44,
  packets: [0.46, 0.7],
  item: 0.6,
  zoomOut: [0.72, 0.76],
  team: [0.77, 0.88],
  levelUp: [0.9, 1],
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

/** Posição ao longo de uma linha quebrada, com t de 0 a 1. */
function along(path: Point[], t: number): Point {
  const lengths = path.slice(1).map((p, i) => Math.hypot(p.x - path[i].x, p.y - path[i].y));
  let remaining = lengths.reduce((a, b) => a + b, 0) * t;
  for (let i = 0; i < lengths.length; i++) {
    if (remaining <= lengths[i]) {
      const k = lengths[i] === 0 ? 0 : remaining / lengths[i];
      return { x: lerp(path[i].x, path[i + 1].x, k), y: lerp(path[i].y, path[i + 1].y, k) };
    }
    remaining -= lengths[i];
  }
  return path[path.length - 1];
}

export const phase5 = definePhase({
  id: "phase5",
  title: "Fase 5: Fulllab, e-commerce e mobile",
  description:
    "Num escritório aberto, um rapaz de moicano descobre os endpoints da API da VTEX com uma lupa, liga o app a lojas como Sephora e Magento por uma API e, rodeado por um time de quatro pessoas, sobe de nível para líder técnico.",
  sprites: {
    office: `${P}/office.png`,
    desk: `${P}/desk.png`,
    lcd: `${P3}/lcd.png`,
    chair: `${P3}/chair.png`,
    lcdFrame: `${P3}/lcd-frame.png`,
    lupa: `${P}/lupa.png`,
    diagram: `${P}/diagram.png`,
    levelUp: `${P}/level-up.png`,
    star: `${P}/star.png`,
    reverse0: `${P}/reverse-0.png`,
    reverse1: `${P}/reverse-1.png`,
    reverse2: `${P}/reverse-2.png`,
    reverse3: `${P}/reverse-3.png`,
    reverse4: `${P}/reverse-4.png`,
    reverse5: `${P}/reverse-5.png`,
    danielWalk: `${C}/mohawk-walk.png`,
    danielSit: `${C}/mohawk-sit.png`,
    coworker: `${C}/coworker-walk.png`,
    friend: `${C}/friend-walk.png`,
    devWoman: `${C}/dev-woman-walk.png`,
    neighborWoman: `${C}/neighbor-woman-walk.png`,
  },
  // Cada fala toca o seu pedaço da animação; speed e textSpeed valem só para ela.
  beats: [
    {
      to: TIMELINE.walkIn[1],
      seconds: 2,
      speed: 1,
      textSpeed: 1,
      text: "Em 2015 fui para a Fulllab, trabalhar com e-commerce e aplicativos mobile.",
    },
    {
      to: TIMELINE.reveal[1],
      seconds: 3.6,
      speed: 1,
      textSpeed: 1,
      text: "Integrei a VTEX por engenharia reversa, quando ainda não tinha documentação.",
    },
    {
      to: TIMELINE.packets[1],
      seconds: 3.4,
      speed: 1,
      textSpeed: 1,
      text: "Criei as APIs dos apps, um plugin para Magento e robôs com Selenium para lojas sem API, como a Sephora.",
    },
    {
      to: 1,
      seconds: 3.6,
      speed: 1,
      textSpeed: 1,
      text: "Em 2017 virei líder técnico, com um time de 4 pessoas.",
    },
  ],
  item: {
    id: "phone",
    label: "Celular com o app",
    src: `${P}/item-phone.png`,
    at: TIMELINE.item,
  },
  staticAt: 1,
  draw(ctx, s, p) {
    // ---- Escritório
    ctx.drawImage(s.office, 0, 0);
    ctx.drawImage(s.desk, 140, 106);
    ctx.drawImage(s.lcd, LCD.x, LCD.y);
    ctx.drawImage(s.lcd, 188, 74);

    const standing = p >= TIMELINE.zoomOut[1];
    if (p < TIMELINE.walkIn[1]) {
      drawEmptySeat(ctx, s.chair, SIT.x, SIT.y);
      drawWalk(ctx, s.danielWalk, p, TIMELINE.walkIn[0], TIMELINE.walkIn[1], -64, SIT.x, STAND_Y, "up");
    } else if (!standing) {
      drawSeated(ctx, s.danielSit, s.chair, SIT.x, SIT.y);
    } else {
      // Levanta e vira para o time.
      drawEmptySeat(ctx, s.chair, SIT.x, SIT.y);
      drawFrame(ctx, s.danielWalk, "down", 0, SIT.x, STAND_Y + 4);
    }

    // ---- O time chega e o "LEVEL UP!" sobe em cima do Daniel.
    if (standing) {
      for (const member of TEAM) {
        drawWalk(ctx, s[member.sheet], p, TIMELINE.team[0], TIMELINE.team[1], member.from, member.to, STAND_Y, member.to < SIT.x ? "right" : "left");
      }
      const upT = easeOut(segment(p, TIMELINE.levelUp[0], TIMELINE.levelUp[1]));
      if (upT > 0) {
        ctx.globalAlpha = Math.min(1, upT * 2);
        ctx.drawImage(s.levelUp, SIT.x - 24, Math.round(lerp(76, 48, upT)));
        ctx.globalAlpha = 1;
        if (Math.floor(p * 200) % 2 === 0) {
          ctx.drawImage(s.star, SIT.x - 30, 58);
          ctx.drawImage(s.star, SIT.x + 92, 52);
        } else {
          ctx.drawImage(s.star, SIT.x - 22, 46);
          ctx.drawImage(s.star, SIT.x + 84, 64);
        }
      }
      return;
    }

    // ---- Zoom no monitor: engenharia reversa da VTEX e o diagrama das integrações.
    const zoomIn = easeOut(segment(p, TIMELINE.zoomIn[0], TIMELINE.zoomIn[1]));
    if (zoomIn <= 0) return;
    const zoomOut = easeOut(segment(p, TIMELINE.zoomOut[0], TIMELINE.zoomOut[1]));
    const amount = zoomIn * (1 - zoomOut);
    ctx.fillStyle = `rgba(27, 22, 34, ${0.8 * amount})`;
    ctx.fillRect(0, 0, 320, 180);

    const revealT = segment(p, TIMELINE.reveal[0], TIMELINE.reveal[1]);
    const revealed = Math.min(ENDPOINTS, Math.floor(revealT * ENDPOINTS + 0.001));
    const content = p >= TIMELINE.diagram ? s.diagram : s[`reverse${revealed}` as keyof typeof s];
    const screenFrom = { x: LCD.x + 3, y: LCD.y + 3, w: LCD.w - 6, h: LCD.h - 6 };
    drawRect(ctx, s.lcdFrame, lerpRect(LCD, CLOSE_FRAME, amount));
    drawRect(ctx, content, lerpRect(screenFrom, CLOSE_SCREEN, amount));
    if (amount < 1) return;

    // Lupa varrendo a linha que está sendo descoberta.
    if (p < TIMELINE.diagram && revealT > 0 && revealT < 1) {
      const line = Math.min(ENDPOINTS - 1, revealed);
      const k = (revealT * ENDPOINTS) % 1;
      const x = CLOSE_SCREEN.x + 6 + k * 100;
      const y = CLOSE_SCREEN.y + 14 + line * 16;
      ctx.drawImage(s.lupa, Math.round(x), Math.round(y));
    }

    // Pacotes de dados indo e voltando entre o app, a API e as lojas.
    const packetsT = segment(p, TIMELINE.packets[0], TIMELINE.packets[1]);
    if (p >= TIMELINE.diagram && packetsT > 0) {
      STORE_PATHS.forEach((path, i) => {
        for (let k = 0; k < 2; k++) {
          const t = (packetsT * 3 + i * 0.33 + k * 0.5) % 1;
          const going = k === 0;
          const point = along(path, going ? t : 1 - t);
          ctx.fillStyle = going ? "#3c8cf0" : "#3cc864";
          ctx.fillRect(Math.round(point.x) - 2, Math.round(point.y) - 2, 5, 5);
        }
      });
    }
  },
});
