import type { Job } from "../../i18n/locales/pt";
import { Highlight } from "../../components/Highlight";

/** One job: company, role, period, one line of context, short bullets and the stack as tags. */
export function JobEntry({ job }: { job: Job }) {
  return (
    // The id is the anchor the story links to (/curriculo/#<id>).
    <article id={job.id} className="job">
      <header className="job__header">
        <h3>
          {job.company} <span className="job__role">· {job.role}</span>
        </h3>
        <p className="job__period">{job.period}</p>
      </header>
      {job.description && (
        <p className="job__description">
          <Highlight text={job.description} />
        </p>
      )}
      <ul className="job__bullets">
        {job.bullets.map((bullet) => (
          <li key={bullet}>
            <Highlight text={bullet} />
          </li>
        ))}
      </ul>
      <ul className="chips job__stack">
        {job.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
