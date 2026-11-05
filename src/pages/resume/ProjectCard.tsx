import { useTranslation } from "react-i18next";
import type { Project } from "../../i18n/locales/pt";
import { Highlight } from "../../components/Highlight";
import { caseOfProject } from "../../content/caseStudies";
import { CaseLinks } from "./CaseLinks";

/** A résumé project: title, what was done, the result and the stack. No dates or clients. */
export function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation();
  const caseId = caseOfProject(project.id);

  return (
    <article className="project-card">
      <h3>{project.title}</h3>
      <p className="project-card__did">
        <Highlight text={project.did} />
      </p>
      <p className="project-card__result">
        <strong>{t("resume.projectResult")}:</strong> <Highlight text={project.result} />
      </p>
      <ul className="chips">
        {project.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {caseId && <CaseLinks ids={[caseId]} />}
    </article>
  );
}
