import type { Job } from "../../i18n/locales/pt";
import { useTranslation } from "react-i18next";
import { Highlight } from "../../components/Highlight";
import { CaseLinks } from "./CaseLinks";

/** One job: company, role, period, one line of context, short bullets and the stack as tags. */
export function JobEntry({ job }: { job: Job }) {
  const { t } = useTranslation();
  // Cases whose résumé anchor is this job (data-driven: caseStudies.items[].resumeTarget).
  const caseIds = t("caseStudies.items")
    .filter((item) => item.resumeTarget === job.id)
    .map((item) => item.id);

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
      <CaseLinks ids={caseIds} />
    </article>
  );
}
