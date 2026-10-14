import { useTranslation } from "react-i18next";
import { Highlight } from "../../components/Highlight";
import type { Achievement } from "../../i18n/locales/pt";
import { track } from "../../lib/analytics";
import { jobHref, type Lang } from "../../lib/route";

/** A home achievement: result on top, title, a short text and a link to its part of the résumé. Never names a company. */
export function AchievementCard({ achievement }: { achievement: Achievement }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;

  return (
    <article className="achievement">
      <p className="achievement__result">
        <Highlight text={achievement.result} />
      </p>
      <h3>{achievement.title}</h3>
      <p className="achievement__text">
        <Highlight text={achievement.text} />
      </p>
      <a
        className="achievement__link"
        href={jobHref(achievement.target, lang)}
        onClick={() => track("home_achievement", { id: achievement.id })}
      >
        {t("home.achievementLink")}
      </a>
    </article>
  );
}
