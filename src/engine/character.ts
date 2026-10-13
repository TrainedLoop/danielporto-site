import { segment } from "../lib/sprites";

/** Size of one frame in the LPC sheets. */
export const FRAME = 64;

/** LPC sheet rows per facing direction. */
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
 * Draws someone walking from `fromX` to `toX` during the [start, end] slice of the animation.
 * Before the slice they stand still at `fromX`; after it, still at `toX` facing `endFacing`.
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

// In the "seated, back turned" frame (column 2), the body spans x 20–43 and ends at y 52.
const SEATED_CENTER_X = 32;
const SEATED_HIP_Y = 47;

/**
 * Draws someone seated with their back turned on a chair or stool: the chair is
 * centered under the hips and the seat is drawn over the lower body, so the
 * person doesn't look like they're floating.
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

/** The empty chair, in the same spot as when someone sits (for before they sit down). */
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
