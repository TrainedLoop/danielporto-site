import type { Project } from "../../i18n/locales/pt";
import { Highlight } from "../../components/Highlight";

/** A selected project: result on top, then what was done and the stack. No dates or clients. */
export function ProjectCard({ project }: { project: Project }) {
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
    </article>
  );
}
