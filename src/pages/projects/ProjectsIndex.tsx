import { useTranslation } from "react-i18next";
import { Highlight } from "../../components/Highlight";
import { caseRoute } from "../../content/caseStudies";
import { href, type Lang } from "../../lib/route";
import { CaseImage } from "./CaseImage";

/**
 * /projetos/: the case studies as cards (result on top, title, the problem, link), in order. A case
 * with a screenshot gets a wide card of its own, with the image as a thumbnail.
 */
export function ProjectsIndex() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;

  return (
    <main className="case case--index">
      <h1>{t("caseStudies.indexTitle")}</h1>
      <p className="case__intro">{t("caseStudies.indexIntro")}</p>
      <div className="case-cards">
        {t("caseStudies.items").map((item) => (
          <article key={item.id} className={`project-card case-card${item.image ? " case-card--wide" : ""}`}>
            {item.image && <CaseImage image={item.image} className="case-card__image" sizes="(max-width: 720px) calc(100vw - 52px), 400px" />}
            <div className="case-card__body">
              <p className="project-card__result">
                <Highlight text={item.result} />
              </p>
              <h2 id={`case-card-${item.id}`}>{item.title}</h2>
              <p className="project-card__did">{item.problem}</p>
              <a
                className="case-card__link"
                href={href(caseRoute(item.id), lang)}
                aria-describedby={`case-card-${item.id}`}
              >
                {t("resume.caseStudyLink")}
              </a>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
