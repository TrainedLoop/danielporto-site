import { createElement, StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { pageMeta, SITE_URL } from './content/pages'
import { i18n, setLang } from './i18n'
import { href, LANGS, LEGACY_PATHS, PAGES, pageKey, routePath, type Page } from './lib/route'
import { PHASES } from './phases'

export { href, LANGS, LEGACY_PATHS, pageKey, pageMeta, PAGES, routePath, SITE_URL }

/** Used only by the build (scripts/prerender.js): renders each page's HTML from the components. */
export function render(page: Page) {
  setLang(page.lang)
  return renderToString(createElement(StrictMode, null, createElement(App, { page })))
}

/** Share texts per language that aren't page-specific (og:image alt text). */
export function shareText(lang: Page['lang']) {
  return { imageAlt: i18n.getFixedT(lang)('share.imageAlt') }
}

/**
 * Build-time sanity check of the story: every beat has a line in every language, and every
 * sprite file a phase asks for (including the .en.png variants of sprites with text)
 * exists. Returns the problems found; `fileExists` gets a path relative to the site root.
 */
export function checkStory(fileExists: (path: string) => boolean): string[] {
  const base = import.meta.env.BASE_URL
  const problems: string[] = []
  for (const phase of PHASES) {
    for (const lang of LANGS) {
      const beats = i18n.getFixedT(lang)('story.phases')[phase.id].beats as Record<string, string>
      for (const beat of phase.beats) {
        if (!beats[beat.id]) problems.push(`${phase.id}: beat "${beat.id}" has no ${lang} text`)
      }
      if (Object.keys(beats).length !== phase.beats.length) {
        problems.push(`${phase.id}: ${lang} has ${Object.keys(beats).length} beats, the phase has ${phase.beats.length}`)
      }
    }
    const sources = Object.values(phase.sprites).flatMap((src) => (typeof src === 'string' ? [src] : Object.values(src)))
    for (const src of new Set([...sources, phase.item.src])) {
      if (!fileExists(src.slice(base.length))) problems.push(`${phase.id}: missing sprite ${src}`)
    }
  }
  return problems
}
