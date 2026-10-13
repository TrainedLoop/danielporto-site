import { createElement, StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { pages, SITE_URL } from './content/pages'
import { ROUTES, routePath, type Route } from './lib/route'

export { pages, ROUTES, routePath, SITE_URL }

/** Usado só no build (scripts/prerender.js): gera o HTML de cada página a partir dos componentes. */
export function render(route: Route) {
  return renderToString(createElement(StrictMode, null, createElement(App, { route })))
}
