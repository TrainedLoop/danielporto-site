import type { Project } from "../../i18n/locales/pt";
import { Highlight } from "../../components/Highlight";
import { caseOfProject } from "../../content/caseStudies";
import { CaseLinks } from "./CaseLinks";

/** A selected project: result on top, then what was done and the stack. No dates or clients. */
export function ProjectCard({ project }: { project: Project }) {
  const caseId = caseOfProject(project.id);

  return (
    <article className="project-card">
      <p className="project-card__result">
        <Highlight text={project.result} />
      </p>
      <h3>{project.title}</h3>
      <p className="project-card__did">
        <Highlight text={project.did} />
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
