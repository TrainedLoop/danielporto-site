import { useTranslation } from "react-i18next";
import { CONTENT_DATE, formatContentDate } from "../../content/pages";
import { ContactButton } from "../../components/ContactButton";
import { href, type Lang } from "../../lib/route";

type Props = {
  /** Opens the print dialog (the "print / save as PDF" button). */
  onPrint: () => void;
};

/** Top of the résumé: who, where, the two actions and a small line with the date and the story link; on paper, the contacts too. */
export function ResumeHeader({ onPrint }: Props) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;
  const profile = t("profile");

  return (
    <header className="resume__header">
      <div className="resume__identity">
        <h1>{profile.name}</h1>
        <p className="resume__role">
          {profile.role} {t("resume.roleAt")} {profile.company}
        </p>
        <p className="resume__location">{profile.location}</p>
        {/*
         * On paper the contacts sit right under the name. They live here, in the header, so the
         * PDF's text (what résumé parsers and AI tools read) has them before the summary too; the
         * side column's contact block is hidden in print.
         */}
        <ul className="resume__print-contact">
          {profile.links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="resume__actions no-print">
        <button type="button" className="button button--secondary" onClick={onPrint}>
          {t("resume.printPdf")}
        </button>
        <ContactButton variant="primary" />
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
