import { useTranslation } from "react-i18next";
import { PERSONAL_PROJECT_ID } from "../../content/personalProject";
import { href, type Lang } from "../../lib/route";

/**
 * Short block after the selected projects: the personal project in one line, linking to its
 * card on /projetos/. Kept separate from (and never part of) the selected projects.
 */
export function PersonalProjectNote() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;
  const project = t("personalProject");

  return (
    <section className="resume__section personal-note">
      <h2>{project.sectionTitle}</h2>
      <p className="personal-note__line">
        <strong>{project.title}</strong> · {project.line}{" "}
        <a href={`${href("projects", lang)}#${PERSONAL_PROJECT_ID}`}>{project.resumeLink}</a>
      </p>
    </section>
  );
}
