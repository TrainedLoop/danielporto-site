import { useTranslation } from "react-i18next";
import { Highlight } from "../../components/Highlight";
import { PERSONAL_PROJECT_ID, PERSONAL_PROJECT_IMAGE, PERSONAL_PROJECT_LINKS } from "../../content/personalProject";

/**
 * /projetos/: the personal open-source project (rendermd), below the case studies. A wide
 * project card: screenshot on top, then the one-liner, highlights, stack and the outbound links.
 */
export function PersonalProject() {
  const { t } = useTranslation();
  const project = t("personalProject");

  return (
    <section className="personal-project" aria-labelledby="personal-project-title">
      <h2 id="personal-project-title" className="personal-project__title">
        {project.sectionTitle}
      </h2>
      <article id={PERSONAL_PROJECT_ID} className="project-card personal-card">
        <img
          className="personal-card__image"
          src={PERSONAL_PROJECT_IMAGE.src}
          srcSet={PERSONAL_PROJECT_IMAGE.srcSet}
          sizes="(max-width: 920px) calc(100vw - 32px), 888px"
          width={PERSONAL_PROJECT_IMAGE.width}
          height={PERSONAL_PROJECT_IMAGE.height}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
        />
        <h3>{project.title}</h3>
        <p className="project-card__result">{project.line}</p>
        <ul className="personal-card__highlights">
          {project.highlights.map((item) => (
            <li key={item}>
              <Highlight text={item} />
            </li>
          ))}
        </ul>
        <ul className="chips">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="personal-card__links">
          <a className="button button--primary" href={PERSONAL_PROJECT_LINKS.live} target="_blank" rel="noopener">
            {project.open}
          </a>
          <a className="button button--secondary" href={PERSONAL_PROJECT_LINKS.code} target="_blank" rel="noopener">
            {project.code}
          </a>
        </p>
      </article>
    </section>
  );
}
