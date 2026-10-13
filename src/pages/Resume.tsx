import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { href } from "../lib/route";

/** Abre a caixa de impressão; o título vira o nome sugerido do PDF e volta ao original depois. */
function printResume(pdfTitle: string) {
  const original = document.title;
  document.title = pdfTitle;
  window.addEventListener("afterprint", () => (document.title = original), { once: true });
  window.print();
}

/** A versão em texto: o currículo completo, da experiência atual para a mais antiga. */
export function Resume() {
  const { t } = useTranslation();
  const profile = t("profile");
  const summary = t("summary");
  const experience = t("experience");
  const skills = t("skills");
  const languages = t("languages");

  // Vindo da história (/curriculo/#id-do-emprego), rola até o emprego da fase.
  useEffect(() => {
    const exp = decodeURIComponent(window.location.hash.slice(1));
    if (exp) document.getElementById(exp)?.scrollIntoView();
  }, []);

  return (
    <main className="resume">
      <header className="resume__header">
        <h1>{profile.name}</h1>
        <p className="resume__role">
          {profile.role} {t("resume.roleAt")} {profile.company}
        </p>
        <p className="resume__headline">{profile.headline}</p>
        <p className="resume__contact">
          {profile.location}
          {profile.links.map((link) => (
            <span key={link.href}>
              {" · "}
              <a href={link.href}>{link.label}</a>
            </span>
          ))}
        </p>
        <p className="resume__actions no-print">
          <a href={href("historia")}>{t("resume.playStory")}</a>
          <button type="button" className="resume__pdf" onClick={() => printResume(t("resume.pdfTitle"))}>
            {t("resume.downloadPdf")}
          </button>
        </p>
      </header>

      <section className="resume__section">
        <h2>{t("resume.summary")}</h2>
        <p>{profile.intro}</p>
        <h3>{summary.aiProjectsTitle}</h3>
        <ul>
          {summary.aiProjects.map((project) => (
            <li key={project}>{project}</li>
          ))}
        </ul>
        <p>{summary.dailyAi}</p>
        <p>{summary.stack}</p>
      </section>

      <section className="resume__section">
        <h2>{t("resume.experience")}</h2>
        {experience.map((job) => (
          <article key={job.id} id={job.id} className="job">
            <header className="job__header">
              <h3>
                {job.company} <span className="job__role">· {job.role}</span>
              </h3>
              <p className="job__period">{job.period}</p>
            </header>
            {job.description && <p className="job__description">{job.description}</p>}
            <ul>
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="resume__section">
        <h2>{t("resume.skills")}</h2>
        <ul className="chips">
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <section className="resume__section">
        <h2>{t("resume.languages")}</h2>
        <p>{languages.map((language) => `${language.name} (${language.level})`).join(" · ")}</p>
      </section>
    </main>
  );
}
