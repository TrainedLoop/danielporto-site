import { useTranslation } from "react-i18next";
import { Highlight } from "../../components/Highlight";
import { caseRoute } from "../../content/caseStudies";
import type { CaseId } from "../../i18n/locales/pt";
import { href, jobHref, type Lang } from "../../lib/route";
import { CaseImage } from "./CaseImage";
import { FlowDiagram } from "./FlowDiagram";

/**
 * One case study: breadcrumb, title, result, an optional screenshot, facts (role, stack), optional
 * public links (the live app, the code), then context, problem, decisions, how it works and outcome. The footer walks the cases in order and links to the
 * résumé entry the case comes from.
 */
export function CaseStudyPage({ id }: { id: CaseId }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;
  const items = t("caseStudies.items");
  const labels = t("caseStudies.labels");
  const index = items.findIndex((item) => item.id === id);
  const item = items[index];
  const previous = items[index - 1];
  const next = items[index + 1];

  return (
    <main className="case">
      <p className="case__breadcrumb">
        <a href={href("projects", lang)}>{labels.breadcrumb}</a>
        <span aria-hidden="true"> › </span>
        <span>{item.title}</span>
      </p>
      <h1>{item.title}</h1>
      <p className="case__result">
        <Highlight text={item.result} />
      </p>
      {item.image && (
        <CaseImage image={item.image} className="case__image" sizes="(max-width: 920px) calc(100vw - 32px), 888px" />
      )}
      <dl className="case__facts">
        <div>
          <dt>{labels.role}</dt>
          <dd>{item.role}</dd>
        </div>
        <div>
          <dt>{labels.stack}</dt>
          <dd>
            <ul className="chips">
              {item.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
      {item.links && (
        <p className="case__links">
          {item.links.map((link, i) => (
            <a
              key={link.href}
              className={`button ${i === 0 ? "button--primary" : "button--secondary"}`}
              href={link.href}
              target="_blank"
              rel="noopener"
            >
              {link.label}{" "}
              <span className="icon" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </p>
      )}

      <section className="case__section">
        <h2>{labels.context}</h2>
        <p>
          <Highlight text={item.context} />
        </p>
      </section>
      <section className="case__section">
        <h2>{labels.problem}</h2>
        <p>{item.problem}</p>
      </section>
      <section className="case__section">
        <h2>{labels.decisions}</h2>
        <div className="case__decisions">
          {item.decisions.map((decision) => (
            <div key={decision.title} className="case__decision">
              <h3>{decision.title}</h3>
              {decision.text && (
                <p>
                  <Highlight text={decision.text} />
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
      <section className="case__section">
        <h2>{labels.flow}</h2>
        <FlowDiagram steps={item.flow} />
      </section>
      <section className="case__section">
        <h2>{labels.outcome}</h2>
        <ul className="case__outcome">
          {item.outcome.map((line) => (
            <li key={line}>
              <Highlight text={line} />
            </li>
          ))}
        </ul>
      </section>

      <nav className="case__nav" aria-label={labels.breadcrumb}>
        {previous ? (
          <a className="button button--secondary case__previous" href={href(caseRoute(previous.id), lang)}>
            <span className="icon" aria-hidden="true">
              ◀
            </span>{" "}
            {labels.previous}
          </a>
        ) : (
          <span className="case__previous" />
        )}
        <a className="button button--primary case__resume" href={jobHref(item.resumeTarget, lang)}>
          {labels.resume}
        </a>
        {next ? (
          <a className="button button--secondary case__next" href={href(caseRoute(next.id), lang)}>
            {labels.next}{" "}
            <span className="icon" aria-hidden="true">
              ▶
            </span>
          </a>
        ) : (
          <span className="case__next" />
        )}
      </nav>
    </main>
  );
}
