import { useEffect } from "react";
import { experience, jobId, languages, profile, skills, summary } from "../content/profile";
import { hashParam, href } from "../lib/route";

/** A versão em texto: o currículo completo, da experiência atual para a mais antiga. */
export function Resume() {
  // Vindo da história (#/curriculo?exp=...), rola até o emprego da fase.
  useEffect(() => {
    const exp = hashParam("exp");
    if (exp) document.getElementById(exp)?.scrollIntoView();
  }, []);

  return (
    <main className="resume">
      <header className="resume__header">
        <h1>{profile.name}</h1>
        <p className="resume__role">
          {profile.role} na {profile.company}
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
          <a href={href("historia")}>▶ jogar a história</a>
        </p>
      </header>

      <section className="resume__section">
        <h2>Resumo</h2>
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
        <h2>Experiência</h2>
        {experience.map((job) => (
          <article key={jobId(job)} id={jobId(job)} className="job">
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
        <h2>Competências</h2>
        <ul className="chips">
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <section className="resume__section">
        <h2>Idiomas</h2>
        <p>{languages.map((language) => `${language.name} (${language.level})`).join(" · ")}</p>
      </section>
    </main>
  );
}
