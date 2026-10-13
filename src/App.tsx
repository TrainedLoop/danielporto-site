import { useEffect } from 'react'
import { content as contentPt } from './content/profile'
import { content as contentEn } from './content/profile.en'
import { href, useLang, useRoute } from './lib/route'
import { Credits } from './pages/Credits'
import { Home } from './pages/Home'
import { Resume } from './pages/Resume'
import { Story } from './pages/Story'

export default function App() {
  const route = useRoute()
  const lang = useLang()
  const content = lang === 'en' ? contentEn : contentPt
  const t = content.ui

  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR'
  }, [lang])

  // A versão em inglês só existe para a home e o currículo; nas outras páginas o EN leva à home.
  const enRoute = route === 'curriculo' ? 'curriculo' : 'home'

  return (
    <>
      <header className={`topbar topbar--${route} no-print`}>
        <a className="topbar__name" href={href('home', lang)}>
          Daniel Porto
        </a>
        <nav className="topbar__nav" aria-label={t.nav.label}>
          <a href={href('historia')} aria-current={route === 'historia' ? 'page' : undefined}>
            {t.nav.story}
          </a>
          <a href={href('curriculo', lang)} aria-current={route === 'curriculo' ? 'page' : undefined}>
            {t.nav.resume}
          </a>
          <span className="topbar__lang">
            <a href={href(route)} hrefLang="pt-BR" lang="pt-BR" aria-current={lang === 'pt' ? 'true' : undefined}>
              PT
            </a>
            {' · '}
            <a href={href(enRoute, 'en')} hrefLang="en" lang="en" aria-current={lang === 'en' ? 'true' : undefined}>
              EN
            </a>
          </span>
        </nav>
      </header>

      {route === 'home' && <Home content={content} lang={lang} />}
      {route === 'historia' && <Story />}
      {route === 'curriculo' && <Resume content={content} />}
      {route === 'creditos' && <Credits />}

      {route !== 'historia' && (
        <footer className="site-footer no-print">
          <span>© Daniel Porto</span>
          <a href={href('creditos')}>{t.footerCredits}</a>
        </footer>
      )}
    </>
  )
}
