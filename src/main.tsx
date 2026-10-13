import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import { pageMeta } from './content/pages'
import { setLang } from './i18n'
import { pageFromPath, pageKey, pathFromLegacyHash } from './lib/route'
import { initAnalytics } from './lib/analytics'
import './styles.css'

// Links antigos (#/curriculo) vão para a página de verdade (/curriculo/), que já vem pronta do build.
const legacy = pathFromLegacyHash(window.location.hash)

if (legacy) {
  window.location.replace(legacy)
} else {
  initAnalytics()
  const container = document.getElementById('root')!
  const page = pageFromPath(window.location.pathname) ?? { route: 'home', lang: 'pt' }
  setLang(page.lang)
  const app = (
    <StrictMode>
      <App page={page} />
    </StrictMode>
  )

  // No build, cada página já vem com o HTML renderizado: o React só assume o que está lá.
  // Se o HTML é de outra página (o 404.html, ou /curriculo sem a barra no fim), renderiza do zero.
  // A história também: ela retoma o progresso salvo no navegador, que o HTML do build não conhece.
  if (container.dataset.route === pageKey(page) && page.route !== 'historia') {
    hydrateRoot(container, app)
  } else {
    document.title = pageMeta(page).title
    createRoot(container).render(app)
  }
}
