import { useTranslation } from "react-i18next";
import { href, type Lang } from "../lib/route";

/**
 * Shown for paths that match no page (GitHub Pages serves dist/404.html for them), in the
 * language of the path's prefix: a "GAME OVER" screen with the way back home and to the résumé.
 */
export function NotFound() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;

  return (
    <main className="not-found">
      <p className="not-found__title">
        {t("notFound.title")}
      </p>
      <h1>{t("notFound.text")}</h1>
      <p className="not-found__hint">{t("notFound.hint")}</p>
      <div className="not-found__actions">
        <a className="button button--primary" href={href("home", lang)}>
          {t("notFound.home")}
        </a>
        <a className="button button--secondary" href={href("resume", lang)}>
          {t("notFound.resume")}
        </a>
      </div>
    </main>
  );
}
