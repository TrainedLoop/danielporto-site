import { useTranslation } from "react-i18next";
import { flatSkills } from "../content/skills";
import { track } from "../lib/analytics";
import { href, type Lang } from "../lib/route";

const BASE = import.meta.env.BASE_URL;

/** The home page, in the page's language (texts in src/i18n/locales). */
export function Home() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;
  const profile = t("profile");
  const highlights = t("highlights");
  const skills = flatSkills(t("skillGroups"));
  return (
    <main className="home">
      <section className="hero">
        <div
          className="hero__avatar"
          role="img"
          aria-label={t("home.avatarAlt")}
          style={{ backgroundImage: `url(${BASE}sprites/character/adult-idle.png)` }}
        />
        <div className="hero__text">
          <p className="hero__hello">{t("home.hello")}</p>
          <h1 className="hero__name">{profile.name}</h1>
          <p className="hero__role">
            {profile.role} {t("home.roleAt")} {profile.company}
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
          {t("home.choiceTitle")}
        </h2>
        <div className="choice__options">
          <a className="choice__card choice__card--play" href={href("story", lang)} onClick={() => track("home_choice", { option: "story" })}>
            <span className="choice__icon" aria-hidden="true">
              ▶
            </span>
            <span className="choice__label">{t("home.playLabel")}</span>
            <span className="choice__hint">{t("home.playHint")}</span>
          </a>
          <a className="choice__card" href={href("resume", lang)} onClick={() => track("home_choice", { option: "resume" })}>
            <span className="choice__icon" aria-hidden="true">
              ≡
            </span>
            <span className="choice__label">{t("home.resumeLabel")}</span>
            <span className="choice__hint">{t("home.resumeHint")}</span>
          </a>
        </div>
      </section>

      <section className="highlights" aria-label={t("home.highlightsLabel")}>
        {highlights.map((item) => (
          <article key={item.title} className="highlight">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="home-skills" aria-label={t("home.skillsLabel")}>
        <ul className="chips">
          {skills.slice(0, 12).map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
