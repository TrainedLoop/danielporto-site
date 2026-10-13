import { drawWalk } from "../engine/character";
import { definePhase } from "../engine/types";
import { segment } from "../lib/sprites";

const BASE = import.meta.env.BASE_URL;

const CD_FROM = { x: 124, y: 106 };
const CD_TO = { x: 274, y: 108 };

// Slices (0 to 1) of the animation where each thing happens. Each beat ends exactly
// when its last animation ends, with no dead time before the button.
const TIMELINE = {
  walk: [0, 0.3],
  boot: [0.3, 0.5],
  desktop: [0.5, 0.6],
  cd: [0.6, 0.95],
  game: [0.95, 1],
  item: 0.95,
} as const;

export const phase0 = definePhase({
  id: "phase0",
  sprites: {
    room: `${BASE}sprites/phase0/room.png`,
    desk: `${BASE}sprites/phase0/desk.png`,
    monitor: `${BASE}sprites/phase0/monitor.png`,
    screenOff: `${BASE}sprites/phase0/screen-off.png`,
    screenBoot: `${BASE}sprites/phase0/screen-boot.png`,
    screenDesktop: `${BASE}sprites/phase0/screen-desktop.png`,
    screenGame: `${BASE}sprites/phase0/screen-game.png`,
    tower: `${BASE}sprites/phase0/tower.png`,
    keyboard: `${BASE}sprites/phase0/keyboard.png`,
    magazines: `${BASE}sprites/phase0/magazines.png`,
    cd: `${BASE}sprites/phase0/cd.png`,
    kid: `${BASE}sprites/character/kid-walk.png`,
  },
  // Each beat plays its own slice of the animation; speed and textSpeed apply to it only.
  // The lines are in the locales (story.phases.phase0.beats), under the same ids.
  beats: {
    holidays: {
      to: TIMELINE.walk[1],
      seconds: 1.7,
      speed: 0.7,
      textSpeed: 1,
    },
    unclePc: {
      to: TIMELINE.desktop[1],
      seconds: 2.6,
      speed: 1,
      textSpeed: 1.3,
    },
    cdrom: {
      to: TIMELINE.game[1],
      seconds: 2.2,
      speed: 0.5,
      textSpeed: 1,
    },
  },
  item: {
    id: "cd",
    src: `${BASE}sprites/phase0/item-cd.png`,
    at: TIMELINE.item,
  },
  staticAt: 0.9,
  draw(ctx, s, p) {
    ctx.drawImage(s.room, 0, 0);
    ctx.drawImage(s.magazines, 116, 116);
    ctx.drawImage(s.desk, 150, 106);
    ctx.drawImage(s.monitor, 160, 62);
    ctx.drawImage(s.keyboard, 166, 102);
    ctx.drawImage(s.tower, 268, 100);

    // Monitor screen for the current moment of the story.
    const screen =
      p >= TIMELINE.game[0]
        ? s.screenGame
        : p >= TIMELINE.desktop[0]
          ? s.screenDesktop
          : p >= TIMELINE.boot[0]
            ? s.screenBoot
            : s.screenOff;
    ctx.drawImage(screen, 167, 68);

    // CD: resting on the stack, then flies in an arc into the tower's drive.
    const cdT = segment(p, TIMELINE.cd[0], TIMELINE.cd[1]);
    if (cdT < 1) {
      const x = CD_FROM.x + (CD_TO.x - CD_FROM.x) * cdT;
      const y =
        CD_FROM.y + (CD_TO.y - CD_FROM.y) * cdT - Math.sin(cdT * Math.PI) * 30;
      ctx.drawImage(s.cd, Math.round(x), Math.round(y));
    } else if (p < TIMELINE.game[0] + 0.03 && Math.floor(p * 400) % 2 === 0) {
      // Drive LED blinking while it reads the CD.
      ctx.fillStyle = "#ffb030";
      ctx.fillRect(282, 111, 2, 1);
    }

    // Character: walks in from the left and stops with his back turned, facing the monitor.
    drawWalk(ctx, s.kid, p, TIMELINE.walk[0], TIMELINE.walk[1], -64, 150, 96, "up");
  },
});
