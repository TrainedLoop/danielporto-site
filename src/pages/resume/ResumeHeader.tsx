import { useTranslation } from "react-i18next";
import { CONTENT_DATE, formatContentDate } from "../../content/pages";
import { contactHref } from "../../content/contact";
import { href, type Lang } from "../../lib/route";

type Props = {
  /** Opens the print dialog (the "download PDF" button). */
  onDownloadPdf: () => void;
};

/** Top of the résumé: who, where, the two actions and a small line with the date and the story link. */
export function ResumeHeader({ onDownloadPdf }: Props) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;
  const profile = t("profile");
  const contact = contactHref(profile.links, t("resume.contactSubject"));

  return (
    <header className="resume__header">
      <div className="resume__identity">
        <h1>{profile.name}</h1>
        <p className="resume__role">
          {profile.role} {t("resume.roleAt")} {profile.company}
        </p>
        <p className="resume__location">{profile.location}</p>
      </div>
      <div className="resume__actions no-print">
        <button type="button" className="button button--secondary" onClick={onDownloadPdf}>
          {t("resume.downloadPdf")}
        </button>
        {contact && (
          <a className="button button--primary" href={contact}>
            {t("resume.contactCta")}
          </a>
        )}
      </div>
      <p className="resume__meta">
        <time dateTime={CONTENT_DATE}>{t("resume.updated", { date: formatContentDate(lang) })}</time>
        <span className="no-print">
          {" · "}
          <a href={href("story", lang)}>{t("resume.playStory")}</a>
        </span>
      </p>
    </header>
  );
}
