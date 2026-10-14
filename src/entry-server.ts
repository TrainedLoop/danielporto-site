import { createElement, StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { llmsFullTxt, llmsTxt } from './content/llms'
import { CONTENT_DATE, LANG_CODE, ogImage, pageMeta, pageUrl, SITE_URL } from './content/pages'
import { structuredData } from './content/structuredData'
import { i18n, setLang } from './i18n'
import { href, LANGS, LEGACY_PATHS, PAGES, pageKey, routePath, type Page } from './lib/route'
import { PHASES } from './phases'

export {
  CONTENT_DATE,
  href,
  LANG_CODE,
  LANGS,
  LEGACY_PATHS,
  llmsFullTxt,
  llmsTxt,
  ogImage,
  pageKey,
  pageMeta,
  PAGES,
  pageUrl,
  routePath,
  SITE_URL,
  structuredData,
}

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
    if (phase.job) {
      for (const lang of LANGS) {
        const t = i18n.getFixedT(lang)
        const ids = new Set([...t('experience'), ...t('earlyCareer')].map((job) => job.id))
        if (!ids.has(phase.job)) problems.push(`${phase.id}: job ${phase.job} not found on the résumé (${lang})`)
      }
    }
    const sources = Object.values(phase.sprites).flatMap((src) => (typeof src === 'string' ? [src] : Object.values(src)))
    for (const src of new Set([...sources, phase.item.src])) {
      if (!fileExists(src.slice(base.length))) problems.push(`${phase.id}: missing sprite ${src}`)
    }
  }
  return problems
}

/**
 * Build-time sanity check of the home achievement cards: each one links to a résumé anchor,
 * which is either the projects section or the id of a job, in every language.
 */
export function checkHomeAchievements(): string[] {
  const problems: string[] = []
  for (const lang of LANGS) {
    const t = i18n.getFixedT(lang)
    const anchors = new Set(['projects', ...[...t('experience'), ...t('earlyCareer')].map((job) => job.id)])
    for (const achievement of t('home.achievements')) {
      if (!anchors.has(achievement.target)) {
        problems.push(`home: achievement ${achievement.id} target ${achievement.target} not found on the résumé (${lang})`)
      }
    }
  }
  return problems
}
