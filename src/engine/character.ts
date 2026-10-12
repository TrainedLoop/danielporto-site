import { segment } from "../lib/sprites";

/** Tamanho de um quadro das folhas LPC. */
export const FRAME = 64;

/** Linhas das folhas LPC por direção. */
export const FACING = { up: 0, left: 1, down: 2, right: 3 } as const;
export type Facing = keyof typeof FACING;

export function drawFrame(
  ctx: CanvasRenderingContext2D,
  sheet: HTMLImageElement,
  facing: Facing,
  col: number,
  x: number,
  y: number,
) {
  ctx.drawImage(
    sheet,
    col * FRAME,
    FACING[facing] * FRAME,
    FRAME,
    FRAME,
    Math.round(x),
    Math.round(y),
    FRAME,
    FRAME,
  );
}

/**
 * Desenha alguém andando de `fromX` até `toX` durante o trecho [start, end] da animação.
 * Antes do trecho fica parado em `fromX`; depois, parado em `toX` virado para `endFacing`.
 */
export function drawWalk(
  ctx: CanvasRenderingContext2D,
  walkSheet: HTMLImageElement,
  p: number,
  start: number,
  end: number,
  fromX: number,
  toX: number,
  y: number,
  endFacing: Facing,
) {
  const t = segment(p, start, end);
  const x = fromX + (toX - fromX) * t;
  const walking = t > 0 && t < 1;
  const facing: Facing = t >= 1 ? endFacing : toX >= fromX ? "right" : "left";
  const col = walking ? 1 + (Math.floor(Math.abs(x) / 6) % 8) : 0;
  drawFrame(ctx, walkSheet, facing, col, x, y);
}

// No quadro "sentado de costas" (coluna 2), o corpo ocupa x 20–43 e termina em y 52.
const SEATED_CENTER_X = 32;
const SEATED_HIP_Y = 47;

/**
 * Desenha alguém sentado de costas numa cadeira ou banquinho: a cadeira fica
 * centralizada embaixo do quadril e o assento passa por cima da parte de baixo
 * do corpo, para não parecer que a pessoa flutua.
 */
export function drawSeated(
  ctx: CanvasRenderingContext2D,
  sitSheet: HTMLImageElement,
  chair: HTMLImageElement,
  x: number,
  y: number,
) {
  drawFrame(ctx, sitSheet, "up", 2, x, y);
  ctx.drawImage(
    chair,
    Math.round(x + SEATED_CENTER_X - chair.width / 2),
    Math.round(y + SEATED_HIP_Y),
  );
}

/** A cadeira vazia, no mesmo lugar em que fica quando alguém senta (para antes de sentar). */
export function drawEmptySeat(
  ctx: CanvasRenderingContext2D,
  chair: HTMLImageElement,
  x: number,
  y: number,
) {
  ctx.drawImage(
    chair,
    Math.round(x + SEATED_CENTER_X - chair.width / 2),
    Math.round(y + SEATED_HIP_Y),
  );
}
