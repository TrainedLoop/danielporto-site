import { useTranslation } from "react-i18next";
import { caseRoute } from "../../content/caseStudies";
import { href, type Lang } from "../../lib/route";

/**
 * "Personal project": one line and the link to its case study. Kept apart from (and after) the
 * selected projects on purpose. The id is the case's résumé anchor (resumeTarget).
 */
export function PersonalProject() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;
  const { title, text } = t("resume.personalProject");

  return (
    <section id="personal-project" className="resume__section personal-project">
      <h2>{title}</h2>
      <p className="personal-project__line">{text}</p>
      <p className="case-links no-print">
        <a href={href(caseRoute("sealdown"), lang)}>{t("resume.caseStudyLink")}</a>
      </p>
    </section>
  );
}
