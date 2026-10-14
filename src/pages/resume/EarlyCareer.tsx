import { useTranslation } from "react-i18next";

/** Older jobs, one line each; every entry keeps its id as a story anchor. */
export function EarlyCareer() {
  const { t } = useTranslation();
  const earlyCareer = t("earlyCareer");

  return (
    <section className="resume__section early-career">
      <h2>{t("resume.earlyCareer")}</h2>
      <ul>
        {earlyCareer.map((job) => (
          <li key={job.id} id={job.id} className="early-career__item">
            <p className="early-career__title">
              <strong>{job.company}</strong> <span className="job__role">· {job.role}</span>{" "}
              <span className="job__period">· {job.period}</span>
            </p>
            <p className="early-career__line">{job.line}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
