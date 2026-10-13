import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import { pages } from './content/pages'
import { pathFromLegacyHash, routeFromPath } from './lib/route'
import './styles.css'

// Links antigos (#/curriculo) vão para a página de verdade (/curriculo/), que já vem pronta do build.
const legacy = pathFromLegacyHash(window.location.hash)

if (legacy) {
  window.location.replace(legacy)
} else {
  const container = document.getElementById('root')!
  const route = routeFromPath(window.location.pathname) ?? 'home'
  const app = (
    <StrictMode>
      <App route={route} />
    </StrictMode>
  )

  // No build, cada página já vem com o HTML renderizado: o React só assume o que está lá.
  // Se o HTML é de outra página (o 404.html, ou /curriculo sem a barra no fim), renderiza do zero.
  // A história também: ela retoma o progresso salvo no navegador, que o HTML do build não conhece.
  if (container.dataset.route === route && route !== 'historia') {
    hydrateRoot(container, app)
  } else {
    document.title = pages[route].title
    createRoot(container).render(app)
  }
}
