import { createElement, StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { pageMeta, SITE_URL } from './content/pages'
import { setLang } from './i18n'
import { PAGES, pageKey, routePath, type Page } from './lib/route'

export { pageKey, pageMeta, PAGES, routePath, SITE_URL }

/** Usado só no build (scripts/prerender.js): gera o HTML de cada página a partir dos componentes. */
export function render(page: Page) {
  setLang(page.lang)
  return renderToString(createElement(StrictMode, null, createElement(App, { page })))
}
