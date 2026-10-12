import { drawEmptySeat, drawSeated, drawWalk } from "../engine/character";
import { definePhase } from "../engine/types";
import { segment } from "../lib/sprites";

const BASE = import.meta.env.BASE_URL;
const P = `${BASE}sprites/phase6`;
const P3 = `${BASE}sprites/phase3`;
const P5 = `${BASE}sprites/phase5`;
const C = `${BASE}sprites/character`;

type Rect = { x: number; y: number; w: number; h: number };

const LCD: Rect = { x: 152, y: 74, w: 34, h: 24 };
const CLOSE_FRAME: Rect = { x: 60, y: 14, w: 200, h: 130 };
const CLOSE_SCREEN: Rect = { x: 72, y: 24, w: 176, h: 108 };
const SIT = { x: 156, y: 82 };

// Aquário: área de água e os peixinhos.
const TANK = { x: 248, y: 54, w: 54, h: 28 };
const FISH = [
  { color: "#ff8a30", speed: 1, phase: 0, y: 60 },
  { color: "#ffd84a", speed: 1.4, phase: 0.5, y: 68 },
  { color: "#ff5a7a", speed: 0.8, phase: 0.2, y: 75 },
];

// SmartVision (coordenadas da tela de perto): barras da fila e o gráfico da perda.
const QUEUE = [
  { y: 39, rate: 1.4 },
  { y: 57, rate: 0.9 },
  { y: 75, rate: 0.5 },
];
const CHART = { x: 94, y: 32, w: 74, h: 46 };

// Rua: postes e o carro com a câmera no teto.
const POLES = [40, 120, 200, 280];
const CAR_Y = 112;
const CAMERA_OFFSET = 29;

// Trechos (0 a 1) da animação. Cada fala termina quando a última animação dela acaba.
const TIMELINE = {
  walkIn: [0, 0.12],
  zoom: [0.14, 0.18],
  training: [0.2, 0.38],
  toStreet: 0.4,
  car: [0.42, 0.68],
  toOffice: 0.7,
  box: [0.74, 0.95],
  item: 0.95,
} as const;
const FADE = 0.02;

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

export const phase6 = definePhase({
  id: "phase6",
  title: "Fase 6: Fu2re e a visão computacional",
  description:
    "Num escritório com aquário, um homem de barba trabalha na SmartVision, uma plataforma que treina modelos de visão computacional. Na rua, um carro com uma câmera no teto fotografa os postes da Light, que ganham caixas de detecção. Por fim, uma caixa-preta escrita IA se abre.",
  sprites: {
    office: `${P}/office.png`,
    desk: `${P5}/desk.png`,
    lcd: `${P3}/lcd.png`,
    chair: `${P3}/chair.png`,
    lcdFrame: `${P3}/lcd-frame.png`,
    smartvision: `${P}/smartvision.png`,
    avenue: `${P}/avenue.png`,
    car: `${P}/car.png`,
    flash: `${P}/flash.png`,
    label: `${P}/detect-label.png`,
    box0: `${P}/box-0.png`,
    box1: `${P}/box-1.png`,
    box2: `${P}/box-2.png`,
    box3: `${P}/box-3.png`,
    danielWalk: `${C}/adult-walk.png`,
    danielSit: `${C}/adult-sit.png`,
  },
  // Cada fala toca o seu pedaço da animação; speed e textSpeed valem só para ela.
  beats: [
    {
      to: TIMELINE.walkIn[1],
      seconds: 2,
      speed: 1,
      textSpeed: 1,
      text: "Em 2019 fui para a Fu2re, onde ouvi falar de IA a sério, antes do boom.",
    },
    {
      to: TIMELINE.training[1],
      seconds: 3.6,
      speed: 1,
      textSpeed: 1,
      text: "Na SmartVision, a plataforma de visão computacional da empresa, fiz das APIs com fila de treino à interface em React.",
    },
    {
      to: TIMELINE.car[1],
      seconds: 4,
      speed: 1,
      textSpeed: 1,
      text: "Participei do software de um carro que fotografava os postes da Light pela cidade, como os do Google.",
    },
    {
      to: 1,
      seconds: 3.4,
      speed: 1,
      textSpeed: 1,
      text: "E fui abrindo a caixa-preta para entender como se treina um modelo.",
    },
  ],
  item: {
    id: "black-box",
    label: "Caixa-preta da IA, aberta",
    src: `${P}/item-box.png`,
    at: TIMELINE.item,
  },
  staticAt: 1,
  draw(ctx, s, p) {
    if (p < TIMELINE.toStreet || p >= TIMELINE.toOffice) {
      // ---- Escritório, com os peixinhos nadando no aquário.
      ctx.drawImage(s.office, 0, 0);
      for (const fish of FISH) {
        const t = (p * 6 * fish.speed + fish.phase) % 2;
        const goingRight = t < 1;
        const x = TANK.x + 2 + (goingRight ? t : 2 - t) * (TANK.w - 10);
        ctx.fillStyle = fish.color;
        ctx.fillRect(Math.round(x), fish.y, 5, 3);
        ctx.fillRect(Math.round(goingRight ? x - 2 : x + 5), fish.y + 1, 2, 1);
      }
      ctx.drawImage(s.desk, 140, 106);
      ctx.drawImage(s.lcd, LCD.x, LCD.y);
      ctx.drawImage(s.lcd, 188, 74);
      if (p < TIMELINE.walkIn[1]) {
        drawEmptySeat(ctx, s.chair, SIT.x, SIT.y);
        drawWalk(ctx, s.danielWalk, p, TIMELINE.walkIn[0], TIMELINE.walkIn[1], -64, SIT.x, 96, "up");
      } else {
        drawSeated(ctx, s.danielSit, s.chair, SIT.x, SIT.y);
      }

      if (p >= TIMELINE.toOffice) {
        // ---- A caixa-preta se abrindo no meio da tela.
        const t = segment(p, TIMELINE.box[0], TIMELINE.box[1]);
        ctx.fillStyle = `rgba(27, 22, 34, ${0.8 * Math.min(1, segment(p, TIMELINE.toOffice, TIMELINE.box[0]) * 2)})`;
        ctx.fillRect(0, 0, 320, 180);
        const frame = Math.min(3, Math.floor(t * 4));
        const lift = t > 0 && t < 1 ? Math.round(Math.sin(t * Math.PI * 6) * 1) : 0;
        ctx.drawImage(s[`box${frame}` as keyof typeof s], 120, 40 + lift, 80, 72);
      } else {
        // ---- Zoom na SmartVision: fila de treino andando e a perda caindo.
        const zoomT = easeOut(segment(p, TIMELINE.zoom[0], TIMELINE.zoom[1]));
        if (zoomT > 0) {
          ctx.fillStyle = `rgba(27, 22, 34, ${0.8 * zoomT})`;
          ctx.fillRect(0, 0, 320, 180);
          const screenFrom = { x: LCD.x + 3, y: LCD.y + 3, w: LCD.w - 6, h: LCD.h - 6 };
          drawRect(ctx, s.lcdFrame, lerpRect(LCD, CLOSE_FRAME, zoomT));
          drawRect(ctx, s.smartvision, lerpRect(screenFrom, CLOSE_SCREEN, zoomT));
          if (zoomT >= 1) {
            const t = segment(p, TIMELINE.training[0], TIMELINE.training[1]);
            for (const job of QUEUE) {
              ctx.fillStyle = "#3c6ed2";
              ctx.fillRect(CLOSE_SCREEN.x + 7, CLOSE_SCREEN.y + job.y, Math.round(70 * Math.min(1, t * job.rate)), 3);
            }
            // Curva da perda descendo, desenhada aos poucos.
            ctx.fillStyle = "#e6455a";
            const points = Math.round(CHART.w * t);
            for (let i = 0; i < points; i++) {
              const k = i / CHART.w;
              const y = CHART.y + CHART.h * (1 - Math.exp(-4 * k)) * 0.85 + Math.sin(i * 1.7) * 1.5;
              ctx.fillRect(CLOSE_SCREEN.x + CHART.x + i, Math.round(CLOSE_SCREEN.y + y), 1, 2);
            }
          }
        }
      }
    } else {
      // ---- Rua: o carro passa, fotografa cada poste e o modelo detecta.
      ctx.drawImage(s.avenue, 0, 0);
      const carX = lerp(-70, 340, segment(p, TIMELINE.car[0], TIMELINE.car[1]));
      const cameraX = carX + CAMERA_OFFSET;
      for (const pole of POLES) {
        const passedBy = cameraX - (pole + 2);
        if (passedBy >= 0) {
          ctx.strokeStyle = "#3ce678";
          ctx.lineWidth = 1;
          ctx.strokeRect(pole - 13.5, 40.5, 31, 91);
          ctx.drawImage(s.label, pole - 14, 30);
          if (passedBy < 14) ctx.drawImage(s.flash, pole - 6, 40);
        }
      }
      const bump = Math.floor(carX / 8) % 2;
      ctx.drawImage(s.car, Math.round(carX), CAR_Y + bump);
    }

    // ---- Escurece na troca de ambiente.
    for (const cut of [TIMELINE.toStreet, TIMELINE.toOffice]) {
      const alpha = 1 - Math.abs(p - cut) / FADE;
      if (alpha > 0) {
        ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(1, alpha)})`;
        ctx.fillRect(0, 0, 320, 180);
      }
    }
  },
});
