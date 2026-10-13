import { drawEmptySeat, drawSeated, drawWalk, FACING, FRAME } from "../engine/character";
import { definePhase } from "../engine/types";
import { segment, withText } from "../lib/sprites";

const BASE = import.meta.env.BASE_URL;
const P = `${BASE}sprites/phase7`;
const P3 = `${BASE}sprites/phase3`;
const C = `${BASE}sprites/character`;

type Rect = { x: number; y: number; w: number; h: number };

const MONITOR: Rect = { x: 150, y: 72, w: 60, h: 26 };
const CLOSE_FRAME: Rect = { x: 60, y: 14, w: 200, h: 130 };
const CLOSE_SCREEN: Rect = { x: 72, y: 24, w: 176, h: 108 };
const SIT = { x: 146, y: 82 };
const CENTER = { x: 160, y: 72 };

// CI/CD pipeline (close-up screen coordinates): stage dots and the counter.
const STAGE_DOTS = [20, 38, 56, 74].map((y) => ({ x: 9, y: y + 3 }));
const COUNTER = { x: 92, y: 56 };
// Chat: messages and the answer's bars.
const USER_MSG = { x: 84, y: 30 };
const AI_MSG = { x: 84, y: 52 };
const ANSWER_BARS = [
  { color: "#c8beec", h: 10 },
  { color: "#7c4ad0", h: 22 },
  { color: "#c8beec", h: 14 },
  { color: "#c8beec", h: 8 },
];
// Video call with the team: tile positions and who shows up in each one.
const CALL_TILES = [
  [6, 16],
  [64, 16],
  [122, 16],
  [6, 58],
  [64, 58],
  [122, 58],
] as const;
const CALL_FACES = ["danielWalk", "coworker", "devWoman", "friend", "neighborWoman", "neighborMan"] as const;
const TERMINAL_LINES = 6;

// The items from every phase, which merge into "applied AI".
const ITEMS = [
  "phase0/item-cd",
  "phase1/item-apostila",
  "phase2/item-screwdriver",
  "phase3/item-headset",
  "phase4/item-badge",
  "phase5/item-phone",
  "phase6/item-box",
] as const;

// Slices (0 to 1) of the animation. Each beat ends exactly when its last animation ends.
const TIMELINE = {
  walkIn: [0, 0.06],
  classChange: [0.07, 0.14],
  zoomCi: [0.15, 0.18],
  stages: [0.19, 0.28],
  counter: [0.19, 0.3],
  zoomOutCi: [0.31, 0.34],
  fly: [0.35, 0.43],
  merge: [0.43, 0.46],
  glow: [0.46, 0.5],
  item: 0.46,
  zoomScreen: [0.52, 0.55],
  userMsg: 0.57,
  aiMsg: 0.61,
  bars: [0.62, 0.68],
  call: 0.7,
  faces: [0.71, 0.8],
  live: [0.8, 0.82],
  terminal: 0.84,
  lines: [0.85, 0.95],
  zoomOutEnd: [0.96, 1],
} as const;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOut = (t: number) => 1 - (1 - t) ** 3;
const easeIn = (t: number) => t * t * t;
const lerpRect = (a: Rect, b: Rect, t: number): Rect => ({
  x: lerp(a.x, b.x, t),
  y: lerp(a.y, b.y, t),
  w: lerp(a.w, b.w, t),
  h: lerp(a.h, b.h, t),
});
const drawRect = (ctx: CanvasRenderingContext2D, image: HTMLImageElement, r: Rect) =>
  ctx.drawImage(image, Math.round(r.x), Math.round(r.y), Math.round(r.w), Math.round(r.h));

export const phase7 = definePhase({
  id: "phase7",
  sprites: {
    room: `${P}/room.png`,
    desk: `${P}/desk.png`,
    ultrawide: `${P}/ultrawide.png`,
    laptop: `${P}/laptop.png`,
    chair: `${P3}/chair.png`,
    lcdFrame: `${P3}/lcd-frame.png`,
    badgeCsharp: `${P}/badge-csharp.png`,
    badgeReact: `${P}/badge-react.png`,
    badgeTs: `${P}/badge-ts.png`,
    pipeline: withText(`${P}/pipeline.png`),
    dashboard: withText(`${P}/dashboard.png`),
    msgUser: withText(`${P}/msg-user.png`),
    msgAi: withText(`${P}/msg-ai.png`),
    call: withText(`${P}/call.png`),
    live: withText(`${P}/live.png`),
    iaBig: `${P}/ia-big.png`,
    itemIa: `${P}/item-ia.png`,
    count0: `${P}/count-0.png`,
    count100: `${P}/count-100.png`,
    count200: `${P}/count-200.png`,
    count300: `${P}/count-300.png`,
    count400: `${P}/count-400.png`,
    count500: `${P}/count-500.png`,
    count600: `${P}/count-600.png`,
    count700: `${P}/count-700.png`,
    count800: `${P}/count-800.png`,
    terminal0: `${P}/terminal-0.png`,
    terminal1: withText(`${P}/terminal-1.png`),
    terminal2: withText(`${P}/terminal-2.png`),
    terminal3: withText(`${P}/terminal-3.png`),
    terminal4: withText(`${P}/terminal-4.png`),
    terminal5: withText(`${P}/terminal-5.png`),
    terminal6: withText(`${P}/terminal-6.png`),
    item0: `${BASE}sprites/${ITEMS[0]}.png`,
    item1: `${BASE}sprites/${ITEMS[1]}.png`,
    item2: `${BASE}sprites/${ITEMS[2]}.png`,
    item3: `${BASE}sprites/${ITEMS[3]}.png`,
    item4: `${BASE}sprites/${ITEMS[4]}.png`,
    item5: `${BASE}sprites/${ITEMS[5]}.png`,
    item6: `${BASE}sprites/${ITEMS[6]}.png`,
    danielWalk: `${C}/adult-walk.png`,
    danielSit: `${C}/adult-sit.png`,
    coworker: `${C}/coworker-walk.png`,
    devWoman: `${C}/dev-woman-walk.png`,
    friend: `${C}/friend-walk.png`,
    neighborWoman: `${C}/neighbor-woman-walk.png`,
    neighborMan: `${C}/neighbor-man-walk.png`,
  },
  // Each beat plays its own slice of the animation; speed and textSpeed apply to it only.
  // The lines are in the locales (story.phases.phase7.beats), under the same ids.
  beats: {
    purple: {
      to: TIMELINE.classChange[1],
      seconds: 2.6,
      speed: 1,
      textSpeed: 1,
    },
    pipeline: {
      to: TIMELINE.counter[1],
      seconds: 3.4,
      speed: 1,
      textSpeed: 1,
    },
    appliedAi: {
      to: TIMELINE.glow[1],
      seconds: 4,
      speed: 1,
      textSpeed: 1,
    },
    chat: {
      to: TIMELINE.bars[1],
      seconds: 3.4,
      speed: 1,
      textSpeed: 1,
    },
    today: {
      to: TIMELINE.live[1],
      seconds: 3,
      speed: 1,
      textSpeed: 1,
    },
    mcp: {
      to: 1,
      seconds: 4,
      speed: 1,
      textSpeed: 1,
    },
  },
  item: {
    id: "ia",
    src: `${P}/item-ia.png`,
    at: TIMELINE.item,
  },
  job: "purple-metrics-desenvolvedor-full-stack-senior",
  staticAt: 1,
  draw(ctx, s, p) {
    // ---- Home office
    ctx.drawImage(s.room, 0, 0);
    ctx.drawImage(s.desk, 130, 106);
    ctx.drawImage(s.ultrawide, MONITOR.x, MONITOR.y);
    ctx.drawImage(s.laptop, 214, 88);
    if (p < TIMELINE.walkIn[1]) {
      drawEmptySeat(ctx, s.chair, SIT.x, SIT.y);
      drawWalk(ctx, s.danielWalk, p, TIMELINE.walkIn[0], TIMELINE.walkIn[1], -64, SIT.x, 96, "up");
    } else {
      drawSeated(ctx, s.danielSit, s.chair, SIT.x, SIT.y);
    }
    // After the merge, the AI star keeps shining above Daniel.
    if (p >= TIMELINE.glow[1]) {
      const bob = Math.round(Math.sin(p * 90) * 2);
      ctx.drawImage(s.itemIa, SIT.x + 16, 46 + bob);
    }

    // ---- Class change: the C# badge rises and fades; React and TS appear in its place.
    const change = segment(p, TIMELINE.classChange[0], TIMELINE.classChange[1]);
    if (change > 0 && p < TIMELINE.zoomCi[1]) {
      const out = Math.min(1, change * 2);
      if (out < 1) {
        ctx.globalAlpha = 1 - out;
        ctx.drawImage(s.badgeCsharp, SIT.x + 20, Math.round(60 - out * 14));
        ctx.globalAlpha = 1;
      }
      const inT = easeOut(Math.max(0, change * 2 - 1));
      if (inT > 0) {
        ctx.globalAlpha = inT;
        ctx.drawImage(s.badgeReact, SIT.x - 2, Math.round(66 - inT * 12));
        ctx.drawImage(s.badgeTs, SIT.x + 48, Math.round(66 - inT * 12));
        ctx.globalAlpha = 1;
      }
      if (change > 0.4 && change < 0.6) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.fillRect(SIT.x + 16, 82, 32, 40);
      }
    }

    // ---- Zoom into the screen. First the CI/CD pipeline; after "it all clicked",
    // the chat, the call with the team and the terminal with MCP and the agents.
    const ciAmount =
      easeOut(segment(p, TIMELINE.zoomCi[0], TIMELINE.zoomCi[1])) *
      (1 - easeOut(segment(p, TIMELINE.zoomOutCi[0], TIMELINE.zoomOutCi[1])));
    const endAmount =
      easeOut(segment(p, TIMELINE.zoomScreen[0], TIMELINE.zoomScreen[1])) *
      (1 - easeOut(segment(p, TIMELINE.zoomOutEnd[0], TIMELINE.zoomOutEnd[1])));
    const amount = p < TIMELINE.zoomScreen[0] ? ciAmount : endAmount;

    if (amount > 0) {
      ctx.fillStyle = `rgba(27, 22, 34, ${0.8 * amount})`;
      ctx.fillRect(0, 0, 320, 180);
      let content = s.pipeline;
      if (p >= TIMELINE.terminal) {
        const lines = Math.round(segment(p, TIMELINE.lines[0], TIMELINE.lines[1]) * TERMINAL_LINES);
        content = s[`terminal${lines}` as keyof typeof s];
      } else if (p >= TIMELINE.call) content = s.call;
      else if (p >= TIMELINE.zoomScreen[0]) content = s.dashboard;
      const screenFrom = { x: MONITOR.x + 3, y: MONITOR.y + 3, w: MONITOR.w - 6, h: MONITOR.h - 6 };
      drawRect(ctx, s.lcdFrame, lerpRect(MONITOR, CLOSE_FRAME, amount));
      drawRect(ctx, content, lerpRect(screenFrom, CLOSE_SCREEN, amount));

      if (amount >= 1 && content === s.pipeline) {
        const stagesT = segment(p, TIMELINE.stages[0], TIMELINE.stages[1]);
        STAGE_DOTS.forEach((dot, i) => {
          const lit = stagesT >= (i + 1) / STAGE_DOTS.length;
          const running = !lit && stagesT >= i / STAGE_DOTS.length;
          ctx.fillStyle = lit ? "#3cc86e" : running && Math.floor(p * 300) % 2 ? "#f3c03f" : "#50546a";
          ctx.fillRect(CLOSE_SCREEN.x + dot.x + 1, CLOSE_SCREEN.y + dot.y + 1, 5, 5);
        });
        const step = Math.min(8, Math.floor(segment(p, TIMELINE.counter[0], TIMELINE.counter[1]) * 8 + 0.001)) * 100;
        ctx.drawImage(s[`count${step}` as keyof typeof s], CLOSE_SCREEN.x + COUNTER.x, CLOSE_SCREEN.y + COUNTER.y);
      }

      if (amount >= 1 && content === s.dashboard) {
        if (p >= TIMELINE.userMsg) ctx.drawImage(s.msgUser, CLOSE_SCREEN.x + USER_MSG.x, CLOSE_SCREEN.y + USER_MSG.y);
        if (p >= TIMELINE.aiMsg) {
          ctx.drawImage(s.msgAi, CLOSE_SCREEN.x + AI_MSG.x, CLOSE_SCREEN.y + AI_MSG.y);
          const barsT = easeOut(segment(p, TIMELINE.bars[0], TIMELINE.bars[1]));
          ANSWER_BARS.forEach((bar, i) => {
            const h = Math.round(bar.h * barsT);
            ctx.fillStyle = bar.color;
            ctx.fillRect(CLOSE_SCREEN.x + AI_MSG.x + 8 + i * 18, CLOSE_SCREEN.y + AI_MSG.y + 41 - h, 12, h);
          });
        } else if (p >= TIMELINE.userMsg && Math.floor(p * 200) % 2 === 0) {
          ctx.fillStyle = "#9a90b8";
          for (let i = 0; i < 3; i++) ctx.fillRect(CLOSE_SCREEN.x + AI_MSG.x + 4 + i * 5, CLOSE_SCREEN.y + AI_MSG.y + 4, 3, 3);
        }
      }

      if (amount >= 1 && content === s.call) {
        // The team's faces pop in one by one (front-facing head crop from the LPC sheets).
        const facesT = segment(p, TIMELINE.faces[0], TIMELINE.faces[1]);
        CALL_FACES.forEach((face, i) => {
          if (facesT < i / CALL_FACES.length) return;
          const [tx, ty] = CALL_TILES[i];
          ctx.drawImage(
            s[face],
            16,
            FACING.down * FRAME + 6,
            32,
            32,
            CLOSE_SCREEN.x + tx + 8,
            CLOSE_SCREEN.y + ty + 4,
            32,
            32,
          );
        });
        if (p >= TIMELINE.live[0]) ctx.drawImage(s.live, CLOSE_SCREEN.x + 4, CLOSE_SCREEN.y + 97);
      }
    }

    // ---- "It all clicked": the journey's items fly to the center and become "applied AI".
    const flyT = segment(p, TIMELINE.fly[0], TIMELINE.fly[1]);
    if (flyT <= 0 || p >= TIMELINE.glow[1]) return;
    ctx.fillStyle = `rgba(27, 22, 34, ${0.75 * Math.min(1, flyT * 3)})`;
    ctx.fillRect(0, 0, 320, 180);

    if (p < TIMELINE.merge[1]) {
      ITEMS.forEach((_, i) => {
        const startX = 40 + i * 40;
        const t = easeIn(Math.min(1, flyT * 1.1));
        const angle = (i / ITEMS.length) * Math.PI * 2 + t * Math.PI * 2;
        const radius = (1 - t) * 60;
        const x = lerp(startX, CENTER.x + Math.cos(angle) * radius, Math.min(1, flyT * 2)) - 16;
        const y = lerp(190, CENTER.y + Math.sin(angle) * radius * 0.6, Math.min(1, flyT * 2)) - 16;
        if (t < 1) ctx.drawImage(s[`item${i}` as keyof typeof s], Math.round(x), Math.round(y));
      });
    }
    const mergeT = segment(p, TIMELINE.merge[0], TIMELINE.merge[1]);
    if (mergeT > 0 && mergeT < 1) {
      ctx.fillStyle = `rgba(255, 255, 255, ${1 - mergeT})`;
      ctx.beginPath();
      ctx.arc(CENTER.x, CENTER.y, 10 + mergeT * 80, 0, Math.PI * 2);
      ctx.fill();
    }
    if (p >= TIMELINE.merge[0] + 0.01) {
      const glowT = segment(p, TIMELINE.glow[0], TIMELINE.glow[1]);
      const pulse = 1 + Math.sin(p * 80) * 0.06;
      const size = Math.round(48 * (0.6 + 0.4 * easeOut(Math.max(glowT, mergeT))) * pulse) * 2;
      ctx.drawImage(s.iaBig, Math.round(CENTER.x - size / 2), Math.round(CENTER.y - size / 2), size, size);
    }
  },
});
