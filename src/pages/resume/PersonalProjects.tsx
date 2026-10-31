import { useTranslation } from "react-i18next";
import { caseRoute } from "../../content/caseStudies";
import { href, type Lang } from "../../lib/route";

/**
 * "Personal projects": one line each, with the link to its case study. Kept apart from (and after)
 * the selected projects on purpose. The id is the cases' résumé anchor (resumeTarget).
 */
export function PersonalProjects() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;
  const { title, items } = t("resume.personalProjects");

  return (
    <section id="personal-project" className="resume__section personal-project">
      <h2>{title}</h2>
      {items.map((item) => (
        <p key={item.case} className="personal-project__line">
          {item.text}{" "}
          <a className="no-print" href={href(caseRoute(item.case), lang)}>
            {t("resume.caseStudyLink")}
          </a>
        </p>
      ))}
    </section>
  );
}
