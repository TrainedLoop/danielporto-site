import { useTranslation } from "react-i18next";
import { contactHref } from "../../content/contact";
import { track } from "../../lib/analytics";
import { href, type Lang } from "../../lib/route";

const BASE = import.meta.env.BASE_URL;

/** Top of the home: avatar, who and where, the résumé pitch and the two main actions (résumé, contact). */
export function HomeHero() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;
  const profile = t("profile");
  const contact = contactHref(profile.links, t("resume.contactSubject"));
  // The email is behind the contact button; the remaining links (LinkedIn, GitHub) go in small text.
  const links = profile.links.filter((link) => !link.href.startsWith("mailto:"));

  return (
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
        {t("resume.glance.pitch").map((sentence) => (
          <p key={sentence} className="hero__pitch">
            {sentence}
          </p>
        ))}
        <div className="hero__actions">
          <a className="button button--primary" href={href("resume", lang)} onClick={() => track("home_choice", { option: "resume" })}>
            {t("home.viewResume")}
          </a>
          {contact && (
            <a className="button button--secondary" href={contact} onClick={() => track("home_choice", { option: "contact" })}>
              {t("resume.contactCta")}
            </a>
          )}
          <ul className="hero__links">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
