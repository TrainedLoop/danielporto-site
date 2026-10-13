import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { href, useRoute, type Page } from './lib/route'
import { Credits } from './pages/Credits'
import { Home } from './pages/Home'
import { Resume } from './pages/Resume'
import { Story } from './pages/Story'

/** `page` é a página com que o app começa: vem do caminho no navegador e, no build, de cada página pré-renderizada. */
export default function App({ page: initial }: { page: Page }) {
  const { route, lang } = useRoute(initial)
  const { t } = useTranslation()

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
        <nav className="topbar__nav" aria-label={t('nav.label')}>
          <a href={href('historia')} aria-current={route === 'historia' ? 'page' : undefined}>
            {t('nav.story')}
          </a>
          <a href={href('curriculo', lang)} aria-current={route === 'curriculo' ? 'page' : undefined}>
            {t('nav.resume')}
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

      {route === 'home' && <Home />}
      {route === 'historia' && <Story />}
      {route === 'curriculo' && <Resume />}
      {route === 'creditos' && <Credits />}

      {route !== 'historia' && (
        <footer className="site-footer no-print">
          <span>© Daniel Porto</span>
          <a href={href('creditos')}>{t('footerCredits')}</a>
        </footer>
      )}
    </>
  )
}
