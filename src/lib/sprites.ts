export type SpriteMap<K extends string> = Record<K, HTMLImageElement>

// Uma promessa por arquivo: a fase que pré-carregou e a que desenha usam a mesma imagem.
const cache = new Map<string, Promise<HTMLImageElement>>()

function loadImage(src: string): Promise<HTMLImageElement> {
  let promise = cache.get(src)
  if (!promise) {
    promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image()
      image.onload = () => resolve(image)
      image.onerror = () => reject(new Error(`Falha ao carregar ${src}`))
      image.src = src
    }).then(async (image) => {
      // Decodifica antes do primeiro desenho; se o navegador recusar, o canvas decodifica depois.
      await image.decode?.().catch(() => undefined)
      return image
    })
    // Se falhar, sai do cache para a próxima tentativa baixar de novo.
    promise.catch(() => cache.delete(src))
    cache.set(src, promise)
  }
  return promise
}

/** Carrega as imagens da cena antes de começar a desenhar. */
export function loadSprites<K extends string>(paths: Record<K, string>): Promise<SpriteMap<K>> {
  const entries = Object.entries(paths) as [K, string][]
  return Promise.all(
    entries.map(([key, src]) => loadImage(src).then((image) => [key, image] as const)),
  ).then((loaded) => Object.fromEntries(loaded) as SpriteMap<K>)
}

/** Interpola de 0 a 1 dentro de um trecho [start, end] do progresso. */
export function segment(progress: number, start: number, end: number) {
  return Math.min(1, Math.max(0, (progress - start) / (end - start)))
}
