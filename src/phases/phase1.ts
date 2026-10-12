import { drawEmptySeat, drawSeated, drawWalk } from "../engine/character";
import { definePhase } from "../engine/types";
import { segment } from "../lib/sprites";

const BASE = import.meta.env.BASE_URL;
const P = `${BASE}sprites/phase1`;

const NOTEPAD_LINES = 8;

// Monitor na sala e a mesma tela vista de perto (zoom).
const SCREEN = { x: 199, y: 66, w: 30, h: 22 };
const MONITOR = { x: 192, y: 60, w: 44, h: 34 };
const CLOSE_FRAME = { x: 60, y: 14, w: 200, h: 130 };
const CLOSE_SCREEN = { x: 72, y: 24, w: 176, h: 108 };

const DANIEL_DESK_X = 182;
const FRIEND_DOOR_X = 330;
const FRIEND_STOP_X = 236;
const APOSTILA_FROM = { x: 262, y: 120 };
const APOSTILA_TO = { x: 208, y: 104 };

// Trechos (0 a 1) da animação. Cada fala termina quando a última animação dela acaba.
const TIMELINE = {
  walkIn: [0, 0.15],
  boot: [0.15, 0.2],
  desktop: [0.2, 0.25],
  friendIn: [0.25, 0.33],
  handOver: [0.34, 0.4],
  friendOut: [0.42, 0.5],
  zoom: [0.5, 0.56],
  typing: [0.57, 0.7],
  site: [0.7, 0.75],
  alert: [0.75, 0.8],
  msn: [0.82, 1],
  item: 0.4,
} as const;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOut = (t: number) => 1 - (1 - t) ** 3;

export const phase1 = definePhase({
  id: "phase1",
  title: "Fase 1: o primeiro PC",
  description:
    "Um adolescente sentado em frente ao computador com Windows XP na sala de casa. Um amigo entrega uma apostila de HTML. Na tela, um fã-site de Final Fantasy feito em casa e um alerta escrito Olá, mundo.",
  sprites: {
    room: `${P}/room.png`,
    desk: `${P}/desk.png`,
    speaker: `${P}/speaker.png`,
    stool: `${P}/stool.png`,
    plant: `${P}/plant.png`,
    monitor: `${P}/monitor.png`,
    tower: `${P}/tower.png`,
    screenOff: `${P}/screen-off.png`,
    screenBoot: `${P}/screen-boot.png`,
    screenDesktop: `${P}/screen-desktop.png`,
    screenMsn: `${P}/screen-msn.png`,
    closeFrame: `${P}/close-frame.png`,
    closeDesktop: `${P}/close-desktop.png`,
    closeSite: `${P}/close-site.png`,
    closeAlert: `${P}/close-alert.png`,
    msnToast: `${P}/msn-toast.png`,
    note: `${P}/note.png`,
    apostila: `${P}/apostila.png`,
    notepad0: `${P}/close-notepad-0.png`,
    notepad1: `${P}/close-notepad-1.png`,
    notepad2: `${P}/close-notepad-2.png`,
    notepad3: `${P}/close-notepad-3.png`,
    notepad4: `${P}/close-notepad-4.png`,
    notepad5: `${P}/close-notepad-5.png`,
    notepad6: `${P}/close-notepad-6.png`,
    notepad7: `${P}/close-notepad-7.png`,
    notepad8: `${P}/close-notepad-8.png`,
    danielWalk: `${BASE}sprites/character/teen-walk.png`,
    danielSit: `${BASE}sprites/character/teen-sit.png`,
    friend: `${BASE}sprites/character/friend-walk.png`,
  },
  // Cada fala toca o seu pedaço da animação; speed e textSpeed valem só para ela.
  beats: [
    {
      to: TIMELINE.desktop[1],
      seconds: 2.2,
      speed: 0.5,
      textSpeed: 1,
      text: "2004. Meu primeiro PC, na sala de casa. Bem parecido com o do meu tio, mas agora com Windows XP.",
    },
    {
      to: TIMELINE.friendOut[1],
      seconds: 2.6,
      speed: 1,
      textSpeed: 1,
      text: "Um amigo me emprestou uma apostila de HTML do colégio dele.",
    },
    {
      to: TIMELINE.site[1],
      seconds: 3,
      speed: 1,
      textSpeed: 1,
      text: "Comecei a fazer os meus primeiros sites, como um fã-site de Final Fantasy que nunca chegou a ir pro ar.",
    },
    {
      to: 1,
      seconds: 2.6,
      speed: 1,
      textSpeed: 1,
      text: "Depois veio o JavaScript, com o primeiro alert(). E o som do MSN tocando o tempo todo.",
    },
  ],
  item: {
    id: "apostila",
    label: "Apostila de HTML",
    src: `${P}/item-apostila.png`,
    at: TIMELINE.item,
  },
  staticAt: 0.95,
  draw(ctx, s, p) {
    // ---- Sala
    ctx.drawImage(s.room, 0, 0);
    ctx.drawImage(s.plant, 150, 110);
    ctx.drawImage(s.desk, 176, 104);
    ctx.drawImage(s.speaker, 182, 92);
    ctx.drawImage(s.speaker, 240, 92);
    ctx.drawImage(s.monitor, MONITOR.x, MONITOR.y);
    ctx.drawImage(s.tower, 256, 100);

    const smallScreen =
      p >= TIMELINE.msn[0]
        ? s.screenMsn
        : p >= TIMELINE.desktop[0]
          ? s.screenDesktop
          : p >= TIMELINE.boot[0]
            ? s.screenBoot
            : s.screenOff;
    ctx.drawImage(smallScreen, SCREEN.x, SCREEN.y);

    // ---- Daniel: entra pela esquerda e senta no banquinho, de costas.
    if (p < TIMELINE.walkIn[1]) {
      drawEmptySeat(ctx, s.stool, DANIEL_DESK_X, 82);
      drawWalk(
        ctx,
        s.danielWalk,
        p,
        TIMELINE.walkIn[0],
        TIMELINE.walkIn[1],
        -64,
        DANIEL_DESK_X,
        96,
        "up",
      );
    } else {
      drawSeated(ctx, s.danielSit, s.stool, DANIEL_DESK_X, 82);
    }

    // ---- O amigo entra pela porta, entrega a apostila e vai embora.
    if (p >= TIMELINE.friendIn[0] && p < TIMELINE.friendOut[1]) {
      if (p < TIMELINE.friendOut[0]) {
        drawWalk(
          ctx,
          s.friend,
          p,
          TIMELINE.friendIn[0],
          TIMELINE.friendIn[1],
          FRIEND_DOOR_X,
          FRIEND_STOP_X,
          92,
          "left",
        );
      } else {
        drawWalk(
          ctx,
          s.friend,
          p,
          TIMELINE.friendOut[0],
          TIMELINE.friendOut[1],
          FRIEND_STOP_X,
          FRIEND_DOOR_X,
          92,
          "right",
        );
      }
    }
    const handT = segment(p, TIMELINE.handOver[0], TIMELINE.handOver[1]);
    if (handT > 0 && handT < 1) {
      const x = lerp(APOSTILA_FROM.x, APOSTILA_TO.x, handT);
      const y =
        lerp(APOSTILA_FROM.y, APOSTILA_TO.y, handT) -
        Math.sin(handT * Math.PI) * 18;
      ctx.drawImage(s.apostila, Math.round(x), Math.round(y));
    }

    // ---- Zoom no monitor: a tela cresce até virar um close-up.
    const zoomT = easeOut(segment(p, TIMELINE.zoom[0], TIMELINE.zoom[1]));
    if (zoomT <= 0) return;

    ctx.fillStyle = `rgba(27, 22, 34, ${0.75 * zoomT})`;
    ctx.fillRect(0, 0, 320, 180);

    const frame = {
      x: lerp(MONITOR.x, CLOSE_FRAME.x, zoomT),
      y: lerp(MONITOR.y, CLOSE_FRAME.y, zoomT),
      w: lerp(MONITOR.w, CLOSE_FRAME.w, zoomT),
      h: lerp(MONITOR.h, CLOSE_FRAME.h, zoomT),
    };
    const screen = {
      x: lerp(SCREEN.x, CLOSE_SCREEN.x, zoomT),
      y: lerp(SCREEN.y, CLOSE_SCREEN.y, zoomT),
      w: lerp(SCREEN.w, CLOSE_SCREEN.w, zoomT),
      h: lerp(SCREEN.h, CLOSE_SCREEN.h, zoomT),
    };

    let content = s.closeDesktop;
    if (p >= TIMELINE.alert[0] + 0.01) {
      content = s.closeAlert;
    } else if (p >= TIMELINE.site[0]) {
      content = s.closeSite;
    } else if (p >= TIMELINE.typing[0]) {
      const lines = Math.round(
        segment(p, TIMELINE.typing[0], TIMELINE.typing[1]) * NOTEPAD_LINES,
      );
      content = s[`notepad${lines}` as keyof typeof s];
    }

    ctx.drawImage(
      s.closeFrame,
      Math.round(frame.x),
      Math.round(frame.y),
      Math.round(frame.w),
      Math.round(frame.h),
    );
    ctx.drawImage(
      content,
      Math.round(screen.x),
      Math.round(screen.y),
      Math.round(screen.w),
      Math.round(screen.h),
    );

    // ---- MSN: o aviso sobe no canto da tela e as notinhas flutuam.
    const msnT = segment(p, TIMELINE.msn[0], TIMELINE.msn[0] + 0.06);
    if (msnT > 0) {
      const toastY = lerp(
        CLOSE_SCREEN.y + CLOSE_SCREEN.h,
        CLOSE_SCREEN.y + CLOSE_SCREEN.h - 42,
        easeOut(msnT),
      );
      ctx.save();
      ctx.beginPath();
      ctx.rect(
        CLOSE_SCREEN.x,
        CLOSE_SCREEN.y,
        CLOSE_SCREEN.w,
        CLOSE_SCREEN.h - 10,
      );
      ctx.clip();
      ctx.drawImage(
        s.msnToast,
        CLOSE_SCREEN.x + CLOSE_SCREEN.w - 86,
        Math.round(toastY),
      );
      ctx.restore();

      const notesT = segment(p, TIMELINE.msn[0], TIMELINE.msn[1]);
      for (let i = 0; i < 4; i++) {
        const t = (notesT * 2 + i * 0.25) % 1;
        const x = CLOSE_FRAME.x + CLOSE_FRAME.w + 6 + Math.sin((t + i) * 6) * 4;
        const y = CLOSE_FRAME.y + CLOSE_FRAME.h - 10 - t * 70;
        ctx.globalAlpha = 1 - t;
        ctx.drawImage(s.note, Math.round(x + (i % 2) * 14), Math.round(y));
        ctx.globalAlpha = 1;
      }
    }
  },
});
