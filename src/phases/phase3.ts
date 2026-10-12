import { drawEmptySeat, drawSeated, drawWalk } from "../engine/character";
import { definePhase } from "../engine/types";
import { segment } from "../lib/sprites";

const BASE = import.meta.env.BASE_URL;
const P = `${BASE}sprites/phase3`;
const C = `${BASE}sprites/character`;

type Rect = { x: number; y: number; w: number; h: number };

const OFFICE_LCD: Rect = { x: 176, y: 74, w: 34, h: 24 };
const BEDROOM_LCD: Rect = { x: 146, y: 74, w: 34, h: 24 };
const CLOSE_FRAME: Rect = { x: 60, y: 14, w: 200, h: 130 };
const CLOSE_SCREEN: Rect = { x: 72, y: 24, w: 176, h: 108 };
const CURSOR_FROM = { x: 150, y: 70 };
const CURSOR_TO = { x: 222, y: 106 }; // ícone de rede na bandeja do cliente

const SIT_Y = 82;
const BOARD_LINES = 4;
const STUDENTS = [
  { sheet: "friendSit", x: 60 },
  { sheet: "danielSit", x: 145 },
  { sheet: "womanSit", x: 230 },
] as const;

// Trechos (0 a 1) da animação. Cada fala termina quando a última animação dela acaba.
const TIMELINE = {
  walkIn: [0, 0.1],
  ring: [0.11, 0.2],
  zoomRemote: [0.2, 0.25],
  cursor: [0.26, 0.35],
  fixed: 0.36,
  toClass: 0.45, // escurece e troca para a sala de aula
  board: [0.5, 0.68],
  item: 0.36,
  toBedroom: 0.72, // escurece e troca para o quarto
  zoomCourse: [0.78, 0.83],
  course: [0.83, 0.92],
  certificate: 0.93,
} as const;
const FADE = 0.03;

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

/** Zoom de um monitor da cena até o close-up, com o fundo escurecendo. */
function zoom(
  ctx: CanvasRenderingContext2D,
  frameImage: HTMLImageElement,
  content: HTMLImageElement,
  from: Rect,
  t: number,
) {
  ctx.fillStyle = `rgba(27, 22, 34, ${0.8 * t})`;
  ctx.fillRect(0, 0, 320, 180);
  const screenFrom = { x: from.x + 3, y: from.y + 3, w: from.w - 6, h: from.h - 6 };
  drawRect(ctx, frameImage, lerpRect(from, CLOSE_FRAME, t));
  drawRect(ctx, content, lerpRect(screenFrom, CLOSE_SCREEN, t));
}

export const phase3 = definePhase({
  id: "phase3",
  title: "Fase 3: suporte e faculdade",
  description:
    "De dia, um rapaz atende ligações no suporte de um provedor de internet a rádio e conserta a conexão de um cliente por acesso remoto. À noite, assiste aula de C++ na faculdade de Sistemas de Informação e, de madrugada, termina um curso online de C#.",
  sprites: {
    office: `${P}/office.png`,
    officeDesk: `${P}/office-desk.png`,
    lcd: `${P}/lcd.png`,
    lcdNight: `${P}/lcd-night.png`,
    phone: `${P}/phone.png`,
    ring: `${P}/ring.png`,
    chair: `${P}/chair.png`,
    lcdFrame: `${P}/lcd-frame.png`,
    remote: `${P}/close-remote.png`,
    remoteOk: `${P}/close-remote-ok.png`,
    cursor: `${P}/cursor.png`,
    classroom: `${P}/classroom.png`,
    schoolChair: `${P}/school-chair.png`,
    board0: `${P}/board-0.png`,
    board1: `${P}/board-1.png`,
    board2: `${P}/board-2.png`,
    board3: `${P}/board-3.png`,
    board4: `${P}/board-4.png`,
    bedroom: `${P}/bedroom.png`,
    nightDesk: `${P}/night-desk.png`,
    course: `${P}/close-course.png`,
    courseDone: `${P}/close-course-done.png`,
    danielWalk: `${C}/young-walk.png`,
    danielSit: `${C}/young-sit.png`,
    friendSit: `${C}/friend-sit.png`,
    womanSit: `${C}/neighbor-woman-sit.png`,
  },
  // Cada fala toca o seu pedaço da animação; speed e textSpeed valem só para ela.
  beats: [
    {
      to: TIMELINE.ring[1],
      seconds: 2.2,
      speed: 1,
      textSpeed: 1,
      text: "Trabalhando no suporte de um provedor de internet a rádio, eu atendia as ligações dos clientes…",
    },
    {
      to: TIMELINE.toClass - FADE,
      seconds: 3,
      speed: 1,
      textSpeed: 1,
      text: "…e resolvia os problemas por acesso remoto.",
    },
    {
      to: TIMELINE.board[1],
      seconds: 3.4,
      speed: 1,
      textSpeed: 1,
      text: "À noite, a faculdade de Sistemas de Informação. Foi lá que conheci C e C++.",
    },
    {
      to: 1,
      seconds: 3.6,
      speed: 1,
      textSpeed: 1,
      text: "No meio da faculdade, fiz um curso online de C#.",
    },
  ],
  item: {
    id: "headset",
    label: "Headset do suporte",
    src: `${P}/item-headset.png`,
    at: TIMELINE.item,
  },
  staticAt: 0.6,
  draw(ctx, s, p) {
    if (p < TIMELINE.toClass) {
      // ---- Escritório do provedor, de dia.
      ctx.drawImage(s.office, 0, 0);
      ctx.drawImage(s.officeDesk, 150, 106);
      ctx.drawImage(s.lcd, OFFICE_LCD.x, OFFICE_LCD.y);
      const ringing = p >= TIMELINE.ring[0] && p < TIMELINE.ring[1];
      const shake = ringing ? (Math.floor(p * 600) % 2 ? 1 : -1) : 0;
      ctx.drawImage(s.phone, 226 + shake, 97);
      if (ringing) ctx.drawImage(s.ring, 224, 80);
      if (p < TIMELINE.walkIn[1]) {
        drawEmptySeat(ctx, s.chair, 164, SIT_Y);
        drawWalk(ctx, s.danielWalk, p, TIMELINE.walkIn[0], TIMELINE.walkIn[1], -64, 164, 96, "up");
      } else {
        drawSeated(ctx, s.danielSit, s.chair, 164, SIT_Y);
      }

      const zoomT = easeOut(segment(p, TIMELINE.zoomRemote[0], TIMELINE.zoomRemote[1]));
      if (zoomT > 0) {
        zoom(ctx, s.lcdFrame, p >= TIMELINE.fixed ? s.remoteOk : s.remote, OFFICE_LCD, zoomT);
        const cursorT = easeOut(segment(p, TIMELINE.cursor[0], TIMELINE.cursor[1]));
        if (zoomT >= 1) {
          ctx.drawImage(
            s.cursor,
            Math.round(lerp(CURSOR_FROM.x, CURSOR_TO.x, cursorT)),
            Math.round(lerp(CURSOR_FROM.y, CURSOR_TO.y, cursorT)),
          );
        }
      }
    } else if (p < TIMELINE.toBedroom) {
      // ---- Sala de aula, à noite: o código vai sendo escrito no quadro.
      ctx.drawImage(s.classroom, 0, 0);
      const lines = Math.round(segment(p, TIMELINE.board[0], TIMELINE.board[1]) * BOARD_LINES);
      ctx.drawImage(s[`board${lines}` as keyof typeof s], 68, 18);
      for (const student of STUDENTS) {
        drawSeated(ctx, s[student.sheet], s.schoolChair, student.x, 100);
      }
    } else {
      // ---- Quarto, de madrugada: o curso online de C#.
      ctx.drawImage(s.bedroom, 0, 0);
      ctx.drawImage(s.nightDesk, 120, 106);
      ctx.drawImage(s.lcdNight, BEDROOM_LCD.x, BEDROOM_LCD.y);
      drawSeated(ctx, s.danielSit, s.chair, 134, SIT_Y);
      const zoomT = easeOut(segment(p, TIMELINE.zoomCourse[0], TIMELINE.zoomCourse[1]));
      if (zoomT > 0) {
        zoom(ctx, s.lcdFrame, p >= TIMELINE.certificate ? s.courseDone : s.course, BEDROOM_LCD, zoomT);
      }
    }

    // ---- Escurece entre um ambiente e outro.
    for (const cut of [TIMELINE.toClass, TIMELINE.toBedroom]) {
      const alpha = 1 - Math.abs(p - cut) / FADE;
      if (alpha > 0) {
        ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(1, alpha)})`;
        ctx.fillRect(0, 0, 320, 180);
      }
    }
  },
});
