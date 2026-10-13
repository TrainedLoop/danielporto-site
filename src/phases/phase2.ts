import { drawFrame, drawWalk, FRAME } from "../engine/character";
import { definePhase } from "../engine/types";
import { segment, withText } from "../lib/sprites";

const BASE = import.meta.env.BASE_URL;
const P = `${BASE}sprites/phase2`;

type Rect = { x: number; y: number; w: number; h: number };

const TOWER: Rect = { x: 126, y: 76, w: 26, h: 36 };
const MONITOR: Rect = { x: 78, y: 68, w: 44, h: 34 };
const CLOSE_FRAME: Rect = { x: 60, y: 14, w: 200, h: 130 };
const CLOSE_SCREEN: Rect = { x: 72, y: 24, w: 176, h: 108 };
const RAM_SLOT = { x: 133, y: 46 };
const HD_BAY = { x: 203, y: 78 };
const PROGRESS = { x: 24, y: 70, w: 128, h: 10 };

const WALK_Y = 88;
const DANIEL_BENCH_X = 78;
const NEIGHBOR_STOP_X = 214;
const DOOR_X = 330;
const STACK = [
  { x: 176, y: 112 },
  { x: 194, y: 112 },
];
const CARRY = { x: 8, y: 32 };
const EXIT_LEFT_X = -80;
const TOOLBOX_GROUND = { x: 44, y: 122 };
const TOOLBOX_HAND = { x: 14, y: 36 };

// Slices (0 to 1) of the animation. Each beat ends exactly when its last animation ends.
const TIMELINE = {
  walkIn: [0, 0.12],
  sign: [0.12, 0.18],
  manIn: [0.2, 0.28],
  drop1: [0.28, 0.31],
  manOut: [0.31, 0.37],
  womanIn: [0.38, 0.45],
  drop2: [0.45, 0.48],
  womanOut: [0.48, 0.54],
  zoomIn: [0.54, 0.58],
  ram: [0.6, 0.65],
  hd: [0.66, 0.71],
  format: [0.73, 0.8],
  zoomOut: [0.8, 0.84],
  manBack: [0.84, 0.9],
  pickUp: [0.9, 0.92],
  manLeaves: [0.92, 0.98],
  danielLeaves: [0.93, 1],
  item: 0.8,
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

export const phase2 = definePhase({
  id: "phase2",
  sprites: {
    street: `${P}/street.png`,
    bench: `${P}/bench.png`,
    monitor: `${P}/monitor.png`,
    tower: `${P}/tower.png`,
    pc: `${P}/pc.png`,
    sign: withText(`${P}/sign.png`),
    toolbox: `${P}/toolbox.png`,
    thumbs: `${P}/thumbs.png`,
    closeCase: `${P}/close-case.png`,
    ram: `${P}/ram.png`,
    hd: `${P}/hd.png`,
    closeFormat: withText(`${P}/close-format.png`),
    closeFrame: `${BASE}sprites/phase1/close-frame.png`,
    counter0: `${P}/counter-0.png`,
    counter1: `${P}/counter-1.png`,
    counter2: `${P}/counter-2.png`,
    counter3: `${P}/counter-3.png`,
    danielWalk: `${BASE}sprites/character/teen-walk.png`,
    man: `${BASE}sprites/character/neighbor-man-walk.png`,
    woman: `${BASE}sprites/character/neighbor-woman-walk.png`,
  },
  // Each beat plays its own slice of the animation; speed and textSpeed apply to it only.
  // The lines are in the locales (story.phases.phase2.beats), under the same ids.
  beats: {
    courses: {
      to: TIMELINE.sign[1],
      seconds: 2,
      speed: 1,
      textSpeed: 1,
    },
    neighborhood: {
      to: TIMELINE.womanOut[1],
      seconds: 4,
      speed: 1,
      textSpeed: 1,
    },
    repairs: {
      to: TIMELINE.format[1],
      seconds: 3.4,
      speed: 1,
      textSpeed: 1,
    },
    houseCalls: {
      to: 1,
      seconds: 2.8,
      speed: 1,
      textSpeed: 1,
    },
  },
  item: {
    id: "screwdriver",
    src: `${P}/item-screwdriver.png`,
    at: TIMELINE.item,
  },
  staticAt: 0.8,
  draw(ctx, s, p) {
    // ---- Street and workshop
    ctx.drawImage(s.street, 0, 0);
    const signT = segment(p, TIMELINE.sign[0], TIMELINE.sign[1]);
    if (signT > 0) {
      const bounce = signT < 1 ? Math.abs(Math.sin(signT * Math.PI * 2)) * (1 - signT) * 6 : 0;
      ctx.drawImage(s.sign, 80, Math.round(lerp(-30, 30, easeOut(signT)) - bounce));
    }
    ctx.drawImage(s.bench, 70, 110);
    ctx.drawImage(s.monitor, MONITOR.x, MONITOR.y);
    ctx.drawImage(s.tower, TOWER.x, TOWER.y);

    // PC counter: goes up with each tower that arrives and when he leaves for a house call.
    const count =
      p >= TIMELINE.danielLeaves[0] + 0.02
        ? 3
        : p >= TIMELINE.drop2[1]
          ? 2
          : p >= TIMELINE.drop1[1]
            ? 1
            : 0;
    if (p >= TIMELINE.manIn[0]) ctx.drawImage(s[`counter${count}` as keyof typeof s], 4, 4);

    // Towers left on the sidewalk (the first one goes back to its owner at the end).
    const firstPicked = p >= TIMELINE.pickUp[1];
    if (p >= TIMELINE.drop1[1] && !firstPicked) ctx.drawImage(s.pc, STACK[0].x, STACK[0].y);
    if (p >= TIMELINE.drop2[1]) ctx.drawImage(s.pc, STACK[1].x, STACK[1].y);

    // ---- Daniel: arrives and works at the bench, back turned; at the end leaves with the toolbox.
    if (p < TIMELINE.danielLeaves[0]) {
      ctx.drawImage(s.toolbox, TOOLBOX_GROUND.x, TOOLBOX_GROUND.y);
      if (p < TIMELINE.walkIn[1]) {
        drawWalk(ctx, s.danielWalk, p, TIMELINE.walkIn[0], TIMELINE.walkIn[1], -64, DANIEL_BENCH_X, WALK_Y, "up");
      } else {
        drawFrame(ctx, s.danielWalk, "up", 0, DANIEL_BENCH_X, WALK_Y);
      }
    } else {
      // Leaves to the left, away from the neighbor, picking up the toolbox on the way.
      const t = segment(p, TIMELINE.danielLeaves[0], TIMELINE.danielLeaves[1]);
      const x = lerp(DANIEL_BENCH_X, EXIT_LEFT_X, t);
      const carrying = x + TOOLBOX_HAND.x <= TOOLBOX_GROUND.x;
      if (!carrying) ctx.drawImage(s.toolbox, TOOLBOX_GROUND.x, TOOLBOX_GROUND.y);
      drawWalk(ctx, s.danielWalk, p, TIMELINE.danielLeaves[0], TIMELINE.danielLeaves[1], DANIEL_BENCH_X, EXIT_LEFT_X, WALK_Y, "left");
      if (carrying) ctx.drawImage(s.toolbox, Math.round(x + TOOLBOX_HAND.x), WALK_Y + TOOLBOX_HAND.y);
    }

    // ---- Neighbors arriving with their PC, leaving it on the sidewalk and going away.
    const neighbor = (
      sheet: HTMLImageElement,
      inT: readonly [number, number],
      dropT: readonly [number, number],
      outT: readonly [number, number],
      slot: { x: number; y: number },
    ) => {
      if (p < inT[0] || p >= outT[1]) return;
      if (p < outT[0]) {
        drawWalk(ctx, sheet, p, inT[0], inT[1], DOOR_X, NEIGHBOR_STOP_X, WALK_Y - 2, "left");
        const walking = p < inT[1];
        const x = walking ? lerp(DOOR_X, NEIGHBOR_STOP_X, segment(p, inT[0], inT[1])) : NEIGHBOR_STOP_X;
        const dropProgress = segment(p, dropT[0], dropT[1]);
        if (dropProgress < 1) {
          const from = { x: x + CARRY.x, y: WALK_Y - 2 + CARRY.y };
          const pcX = lerp(from.x, slot.x, dropProgress);
          const pcY = lerp(from.y, slot.y, dropProgress) - Math.sin(dropProgress * Math.PI) * 10;
          ctx.drawImage(s.pc, Math.round(pcX), Math.round(pcY));
        }
      } else {
        drawWalk(ctx, sheet, p, outT[0], outT[1], NEIGHBOR_STOP_X, DOOR_X, WALK_Y - 2, "right");
      }
    };
    neighbor(s.man, TIMELINE.manIn, TIMELINE.drop1, TIMELINE.manOut, STACK[0]);
    neighbor(s.woman, TIMELINE.womanIn, TIMELINE.drop2, TIMELINE.womanOut, STACK[1]);

    // The man comes back, picks up the fixed PC and leaves with a thumbs-up.
    if (p >= TIMELINE.manBack[0] && p < TIMELINE.manLeaves[1]) {
      if (p < TIMELINE.manLeaves[0]) {
        drawWalk(ctx, s.man, p, TIMELINE.manBack[0], TIMELINE.manBack[1], DOOR_X, STACK[0].x + 20, WALK_Y - 2, "left");
        if (p >= TIMELINE.pickUp[0]) ctx.drawImage(s.thumbs, STACK[0].x + 46, WALK_Y - 10);
      } else {
        const t = segment(p, TIMELINE.manLeaves[0], TIMELINE.manLeaves[1]);
        const x = lerp(STACK[0].x + 20, DOOR_X, t);
        drawWalk(ctx, s.man, p, TIMELINE.manLeaves[0], TIMELINE.manLeaves[1], STACK[0].x + 20, DOOR_X, WALK_Y - 2, "right");
        ctx.drawImage(s.pc, Math.round(x + FRAME / 2), WALK_Y - 2 + CARRY.y);
        ctx.drawImage(s.thumbs, Math.round(x + 27), WALK_Y - 12 - Math.round(t * 8));
      }
    }

    // ---- Zoom: first inside the tower, then on the Windows reinstall screen.
    const zoomIn = easeOut(segment(p, TIMELINE.zoomIn[0], TIMELINE.zoomIn[1]));
    const zoomOut = segment(p, TIMELINE.zoomOut[0], TIMELINE.zoomOut[1]);
    if (zoomIn <= 0 || zoomOut >= 1) return;

    const showFormat = p >= TIMELINE.format[0] - 0.01;
    const amount = showFormat ? 1 - easeOut(zoomOut) : zoomIn;
    ctx.fillStyle = `rgba(27, 22, 34, ${0.8 * amount})`;
    ctx.fillRect(0, 0, 320, 180);

    if (!showFormat) {
      drawRect(ctx, s.closeCase, lerpRect(TOWER, CLOSE_FRAME, zoomIn));
      if (zoomIn < 1) return;
      const ramT = easeOut(segment(p, TIMELINE.ram[0], TIMELINE.ram[1]));
      if (ramT > 0) ctx.drawImage(s.ram, RAM_SLOT.x, Math.round(lerp(-10, RAM_SLOT.y, ramT)));
      const hdT = easeOut(segment(p, TIMELINE.hd[0], TIMELINE.hd[1]));
      if (hdT > 0) ctx.drawImage(s.hd, Math.round(lerp(330, HD_BAY.x, hdT)), HD_BAY.y);
      return;
    }

    // Reinstall screen with the bar filling up; at the end it shrinks back into the monitor.
    const frame = lerpRect(CLOSE_FRAME, MONITOR, 1 - amount);
    const screen = lerpRect(CLOSE_SCREEN, { x: MONITOR.x + 7, y: MONITOR.y + 6, w: 30, h: 22 }, 1 - amount);
    drawRect(ctx, s.closeFrame, frame);
    drawRect(ctx, s.closeFormat, screen);
    const fill = segment(p, TIMELINE.format[0], TIMELINE.format[1]);
    const sx = screen.w / CLOSE_SCREEN.w;
    ctx.fillStyle = "#3cc864";
    ctx.fillRect(
      Math.round(screen.x + PROGRESS.x * sx),
      Math.round(screen.y + PROGRESS.y * sx),
      Math.round(PROGRESS.w * fill * sx),
      Math.max(1, Math.round(PROGRESS.h * sx)),
    );
  },
});
