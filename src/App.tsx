import { useEffect, type SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { equivalentHref, href, useRoute, type Lang, type Page, type Route } from './lib/route'
import { caseIdOf } from './content/caseStudies'
import { Credits } from './pages/Credits'
import { Home } from './pages/Home'
import { CaseStudyPage } from './pages/projects/CaseStudyPage'
import { ProjectsIndex } from './pages/projects/ProjectsIndex'
import { Resume } from './pages/Resume'
import { Story } from './pages/Story'

/**
 * A link in the PT · EN switch. The rendered href points to the same page in the other
 * language; on hover, focus or click it is swapped for the full equivalent address (the
 * story's phase, the résumé's job), which the build-time href can't know.
 */
function LangLink({ route, lang, current, label }: { route: Route; lang: Lang; current: Lang; label: string }) {
  const update = (event: SyntheticEvent<HTMLAnchorElement>) => {
    event.currentTarget.href = equivalentHref(route, lang)
  }
  const code = lang === 'en' ? 'en' : 'pt-BR'
  return (
    <a
      href={href(route, lang)}
      hrefLang={code}
      lang={code}
      aria-current={lang === current ? 'true' : undefined}
      onMouseEnter={update}
      onFocus={update}
      onClick={update}
    >
      {label}
    </a>
  )
}

/** `page` is the page the app starts on: from the browser path, or, in the build, each prerendered page. */
export default function App({ page: initial }: { page: Page }) {
  const { route, lang } = useRoute(initial)
  const { t } = useTranslation()
  const caseId = caseIdOf(route)

  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR'
  }, [lang])

  return (
    <>
      <header className={`topbar topbar--${route} no-print`}>
        {/* On phones the name shrinks to its initials so the bar (three links + PT · EN) fits on one line. */}
        <a className="topbar__name" href={href('home', lang)} aria-label="Daniel Porto">
          <span className="topbar__full">Daniel Porto</span>
          <span className="topbar__short" aria-hidden="true">
            DP
          </span>
        </a>
        <nav className="topbar__nav" aria-label={t('nav.label')}>
          <a href={href('story', lang)} aria-current={route === 'story' ? 'page' : undefined}>
            {t('nav.story')}
          </a>
          <a href={href('resume', lang)} aria-current={route === 'resume' ? 'page' : undefined}>
            {t('nav.resume')}
          </a>
          <a href={href('projects', lang)} aria-current={route === 'projects' || caseId ? 'page' : undefined}>
            {t('nav.projects')}
          </a>
          <span className="topbar__lang" role="group" aria-label={t('nav.language')}>
            <LangLink route={route} lang="pt" current={lang} label="PT" />
            {' · '}
            <LangLink route={route} lang="en" current={lang} label="EN" />
          </span>
        </nav>
      </header>

      {route === 'home' && <Home />}
      {route === 'story' && <Story />}
      {route === 'resume' && <Resume />}
      {route === 'projects' && <ProjectsIndex />}
      {caseId && <CaseStudyPage id={caseId} />}
      {route === 'credits' && <Credits />}

      {route !== 'story' && (
        <footer className="site-footer no-print">
          <span>© Daniel Porto</span>
          <a href={href('credits', lang)}>{t('footerCredits')}</a>
          <small className="site-footer__privacy">{t('privacyNotice')}</small>
        </footer>
      )}
    </>
  )
}
