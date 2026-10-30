import { createElement, StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { llmsFullTxt, llmsTxt } from './content/llms'
import { CONTENT_DATE, LANG_CODE, ogImage, pageMeta, pageUrl, SITE_URL } from './content/pages'
import { structuredData } from './content/structuredData'
import { i18n, setLang } from './i18n'
import { href, LANGS, LEGACY_PATHS, PAGES, pageKey, routePath, type AppPage, type Page } from './lib/route'
import type { CaseId } from './i18n/locales/pt'
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

/** Used only by the build (scripts/prerender.js): renders each page's HTML (and the not-found screen) from the components. */
export function render(page: AppPage) {
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

/** Ids of the case studies, in navigation order. */
const CASE_IDS: CaseId[] = ['ai-chat', 'cicd-design-system', 'ocr-extraction', 'sealdown', 'ai-workflow']

/** The OCR case is anonymous: no employer, client, year or "freelance" may appear in its text. */
const OCR_FORBIDDEN = [/purple|fu2re|fulllab|hebara|freela/i, /\b(19|20)\d{2}\b/]

/** Résumé anchors a case can point to besides the jobs: the selected projects and the personal project. */
const SECTION_ANCHORS = ['projects', 'personal-project']

/**
 * Build-time sanity check of the case studies, per language: the cases exist in order,
 * no text is empty, resumeTarget is a résumé anchor, an image has its alt text and size, and the
 * OCR case (its texts and its page meta) passes the confidentiality rules.
 */
export function checkCaseStudies(fileExists: (path: string) => boolean = () => true): string[] {
  const problems: string[] = []
  for (const lang of LANGS) {
    const t = i18n.getFixedT(lang)
    const items = t('caseStudies.items')
    const anchors = new Set([...SECTION_ANCHORS, ...[...t('experience'), ...t('earlyCareer')].map((job) => job.id)])
    if (items.map((item) => item.id).join() !== CASE_IDS.join()) {
      problems.push(`case studies: ids are ${items.map((item) => item.id).join(', ')}, expected ${CASE_IDS.join(', ')} (${lang})`)
    }
    for (const item of items) {
      const texts = [
        item.title, item.result, item.role, item.context, item.problem,
        ...item.stack, ...item.flow, ...item.outcome,
        ...item.decisions.map((decision) => decision.title),
      ]
      if (texts.some((text) => !text.trim())) problems.push(`case ${item.id}: has an empty text (${lang})`)
      if (item.stack.length === 0 || item.flow.length === 0 || item.outcome.length === 0 || item.decisions.length === 0) {
        problems.push(`case ${item.id}: has an empty list (${lang})`)
      }
      if (!anchors.has(item.resumeTarget)) {
        problems.push(`case ${item.id}: resumeTarget ${item.resumeTarget} not found on the résumé (${lang})`)
      }
      if (item.image) {
        const { src, srcSmall, width, height, alt } = item.image
        if (!alt.trim() || !(width > 0) || !(height > 0)) problems.push(`case ${item.id}: image needs alt, width and height (${lang})`)
        for (const file of [src, srcSmall].filter((path): path is string => Boolean(path))) {
          if (!fileExists(file)) problems.push(`case ${item.id}: missing image ${file}`)
        }
      }
      if (item.id === 'ocr-extraction') {
        // The page's meta (name, title, description) goes into the HTML head, llms.txt and the JSON-LD.
        const meta = t('meta.case-ocr-extraction')
        const full = [
          ...texts, ...item.decisions.map((decision) => decision.text), item.resumeTarget,
          meta.name, meta.title, meta.description,
        ].join('\n')
        for (const rule of OCR_FORBIDDEN) {
          const match = full.match(rule)
          if (match) problems.push(`case ${item.id}: confidential text "${match[0]}" (${lang})`)
        }
      }
    }
    const ui = [t('caseStudies.indexTitle'), t('caseStudies.indexIntro'), ...Object.values(t('caseStudies.labels'))]
    if (ui.some((text) => !text.trim())) problems.push(`case studies: has an empty UI text (${lang})`)
  }
  return problems
}
