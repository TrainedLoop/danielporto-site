import type { SpriteMap } from "../lib/sprites";

/** Uma fala: toca a animação até `to` (0 a 1) enquanto o texto é digitado. */
export type Beat = {
  to: number;
  /** Duração da animação desta fala, em segundos (antes dos multiplicadores). */
  seconds: number;
  /** Multiplicador de velocidade da animação só desta fala (2 = duas vezes mais rápido). */
  speed: number;
  /** Multiplicador de velocidade do texto só desta fala. */
  textSpeed: number;
  text: string;
};

export type InventoryItem = {
  id: string;
  label: string;
  src: string;
};

export type Phase<K extends string = string> = {
  id: string;
  /** Rótulo da fase para leitores de tela, ex.: "Fase 0: a casa da avó". */
  title: string;
  /** Descrição da imagem da cena para leitores de tela. */
  description: string;
  sprites: Record<K, string>;
  beats: Beat[];
  /** Item ganho na fase e o ponto da animação (0 a 1) em que ele entra no inventário. */
  item: InventoryItem & { at: number };
  /** Ponto da animação mostrado parado para quem prefere menos movimento. */
  staticAt: number;
  draw: (ctx: CanvasRenderingContext2D, sprites: SpriteMap<K>, p: number) => void;
};

/** Ajuda o TypeScript a ligar os nomes dos sprites ao `draw` de cada fase. */
export function definePhase<K extends string>(phase: Phase<K>): Phase {
  return phase as unknown as Phase;
}
