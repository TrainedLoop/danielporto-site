import type { Content } from "../content/profile";
import { track } from "../lib/analytics";
import { href, type Lang } from "../lib/route";

const BASE = import.meta.env.BASE_URL;

/** A home recebe o conteúdo do idioma (profile.ts ou profile.en.ts) e o idioma para os links. */
export function Home({ content, lang }: { content: Content; lang: Lang }) {
  const { profile, highlights, skills } = content;
  const t = content.ui.home;
  return (
    <main className="home">
      <section className="hero">
        <div
          className="hero__avatar"
          role="img"
          aria-label={t.avatarAlt}
          style={{ backgroundImage: `url(${BASE}sprites/character/adult-idle.png)` }}
        />
        <div className="hero__text">
          <p className="hero__hello">{t.hello}</p>
          <h1 className="hero__name">{profile.name}</h1>
          <p className="hero__role">
            {profile.role} {t.roleAt} {profile.company}
          </p>
          <p className="hero__headline">{profile.headline}</p>
          <p className="hero__intro">{profile.intro}</p>
          <ul className="hero__links">
            {profile.links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
            <li>{profile.location}</li>
          </ul>
        </div>
      </section>

      <section className="choice" aria-labelledby="choice-title">
        <h2 id="choice-title" className="choice__title">
          {t.choiceTitle}
        </h2>
        <div className="choice__options">
          <a className="choice__card choice__card--play" href={href("historia")} onClick={() => track("escolha_home", { opcao: "historia" })}>
            <span className="choice__icon" aria-hidden="true">
              ▶
            </span>
            <span className="choice__label">{t.playLabel}</span>
            <span className="choice__hint">{t.playHint}</span>
          </a>
          <a className="choice__card" href={href("curriculo", lang)} onClick={() => track("escolha_home", { opcao: "curriculo" })}>
            <span className="choice__icon" aria-hidden="true">
              ≡
            </span>
            <span className="choice__label">{t.resumeLabel}</span>
            <span className="choice__hint">{t.resumeHint}</span>
          </a>
        </div>
      </section>

      <section className="highlights" aria-label={t.highlightsLabel}>
        {highlights.map((item) => (
          <article key={item.title} className="highlight">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="home-skills" aria-label={t.skillsLabel}>
        <ul className="chips">
          {skills.slice(0, 12).map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
