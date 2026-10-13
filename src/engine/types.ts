import type { Messages } from "../i18n/locales/pt";
import type { SpriteMap, SpriteSrc } from "../lib/sprites";

/** Texts of every phase in the locales (story.phases): title, description, item and beats. */
export type PhaseTexts = Messages["story"]["phases"];
export type PhaseId = keyof PhaseTexts;
type BeatId<I extends PhaseId> = keyof PhaseTexts[I]["beats"] & string;

/** Timing of a beat: the animation plays up to `to` (0 to 1) while the line is typed. */
export type BeatTiming = {
  to: number;
  /** Duration of this beat's animation, in seconds (before the multipliers). */
  seconds: number;
  /** Animation speed multiplier for this beat only (2 = twice as fast). */
  speed: number;
  /** Text speed multiplier for this beat only. */
  textSpeed: number;
};

/** A beat: its timing plus the id of its line in story.phases.<phase>.beats. */
export type Beat = BeatTiming & { id: string };

export type InventoryItem = {
  id: string;
  /** Inventory icon (no text, the same in both languages). */
  src: string;
};

export type Phase<K extends string = string> = {
  id: PhaseId;
  /** Image paths; sprites with drawn text have one file per language (withText). */
  sprites: Record<K, SpriteSrc>;
  /** Beats in order. Their text comes from the locales (story.phases.<id>.beats.<beat id>). */
  beats: Beat[];
  /** Item earned in the phase and the animation point (0 to 1) where it enters the inventory. */
  item: InventoryItem & { at: number };
  /** This phase's job on the résumé (job `id` in src/i18n/locales); without it, the phase shows no link. */
  job?: string;
  /** Animation point shown frozen for people who prefer reduced motion. */
  staticAt: number;
  draw: (ctx: CanvasRenderingContext2D, sprites: SpriteMap<K>, p: number) => void;
};

/**
 * A phase as written in src/phases: `beats` is an object from beat id to timing, in the
 * order they play. Its keys must be exactly the beat ids of story.phases.<id>.beats in the
 * locales: a missing or extra beat is a type error, so text and timing can't drift apart.
 */
type PhaseConfig<I extends PhaseId, K extends string> = Omit<Phase<K>, "id" | "beats"> & {
  id: I;
  beats: { [B in BeatId<I>]: BeatTiming };
};

/** Ties sprite names to each phase's `draw` and turns the beats object into the ordered list. */
export function definePhase<I extends PhaseId, K extends string>({ beats, ...phase }: PhaseConfig<I, K>): Phase {
  const ordered = Object.entries<BeatTiming>(beats).map(([id, timing]) => ({ id, ...timing }));
  return { ...phase, beats: ordered } as unknown as Phase;
}
