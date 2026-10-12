import { href, useRoute } from './lib/route'
import { Credits } from './pages/Credits'
import { Home } from './pages/Home'
import { Resume } from './pages/Resume'
import { Story } from './pages/Story'

export default function App() {
  const route = useRoute()

  return (
    <>
      <header className={`topbar topbar--${route} no-print`}>
        <a className="topbar__name" href={href('home')}>
          Daniel Porto
        </a>
        <nav className="topbar__nav" aria-label="Navegação">
          <a href={href('historia')} aria-current={route === 'historia' ? 'page' : undefined}>
            história
          </a>
          <a href={href('curriculo')} aria-current={route === 'curriculo' ? 'page' : undefined}>
            currículo
          </a>
        </nav>
      </header>

      {route === 'home' && <Home />}
      {route === 'historia' && <Story />}
      {route === 'curriculo' && <Resume />}
      {route === 'creditos' && <Credits />}

      {route !== 'historia' && (
        <footer className="site-footer no-print">
          <span>© Daniel Porto</span>
          <a href={href('creditos')}>créditos dos sprites e da fonte</a>
        </footer>
      )}
    </>
  )
}
