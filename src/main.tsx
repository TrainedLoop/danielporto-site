import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import { pageMeta } from './content/pages'
import { setLang } from './i18n'
import { pageKey, pageOrHome, pathFromLegacyHash, pathFromLegacyPath } from './lib/route'
import { initAnalytics } from './lib/analytics'
import './styles.css'

// Old links (#/curriculo, /en/curriculo/) go to the real page (/curriculo/, /en/resume/),
// which the build already rendered.
const { pathname, search, hash } = window.location
const legacy = pathFromLegacyHash(hash) ?? pathFromLegacyPath(pathname, search, hash)

if (legacy) {
  window.location.replace(legacy)
} else {
  const container = document.getElementById('root')!
  const page = pageOrHome(pathname)
  // Language first: analytics events carry it.
  setLang(page.lang)
  initAnalytics()
  const app = (
    <StrictMode>
      <App page={page} />
    </StrictMode>
  )

  // In the build, each page ships with its HTML already rendered: React just takes over.
  // If the HTML belongs to another page (404.html, or /curriculo without the trailing slash),
  // render from scratch. The story too: it resumes the progress saved in the browser,
  // which the build's HTML can't know about.
  if (container.dataset.route === pageKey(page) && page.route !== 'story') {
    hydrateRoot(container, app)
  } else {
    document.title = pageMeta(page).title
    createRoot(container).render(app)
  }
}
