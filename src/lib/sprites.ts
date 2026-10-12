export type SpriteMap<K extends string> = Record<K, HTMLImageElement>

/** Carrega as imagens da cena antes de começar a desenhar. */
export function loadSprites<K extends string>(paths: Record<K, string>): Promise<SpriteMap<K>> {
  const entries = Object.entries(paths) as [K, string][]
  return Promise.all(
    entries.map(
      ([key, src]) =>
        new Promise<[K, HTMLImageElement]>((resolve, reject) => {
          const image = new Image()
          image.onload = () => resolve([key, image])
          image.onerror = () => reject(new Error(`Falha ao carregar ${src}`))
          image.src = src
        }),
    ),
  ).then((loaded) => Object.fromEntries(loaded) as SpriteMap<K>)
}

/** Interpola de 0 a 1 dentro de um trecho [start, end] do progresso. */
export function segment(progress: number, start: number, end: number) {
  return Math.min(1, Math.max(0, (progress - start) / (end - start)))
}
