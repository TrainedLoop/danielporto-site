import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CONTENT_DATE, formatContentDate } from "../content/pages";
import { flatSkills } from "../content/skills";
import { href, type Lang } from "../lib/route";

/** Opens the print dialog; the title becomes the suggested PDF name and is restored afterwards. */
function printResume(pdfTitle: string) {
  const original = document.title;
  document.title = pdfTitle;
  window.addEventListener("afterprint", () => (document.title = original), { once: true });
  window.print();
}

/** The text version: the full résumé, from the current job to the oldest. */
export function Resume() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;
  const profile = t("profile");
  const glance = t("resume.glance");
  const experience = t("experience");
  const earlyCareer = t("earlyCareer");
  const projects = t("projects");
  const skills = flatSkills(t("skillGroups"));

  // Coming from the story (/curriculo/#job-id), scroll to that phase's job.
  useEffect(() => {
    const jobId = decodeURIComponent(window.location.hash.slice(1));
    if (jobId) document.getElementById(jobId)?.scrollIntoView();
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
        <p className="resume__updated">
          <time dateTime={CONTENT_DATE}>{t("resume.updated", { date: formatContentDate(lang) })}</time>
        </p>
        <p className="resume__actions no-print">
          <a href={href("story", lang)}>{t("resume.playStory")}</a>
          <button type="button" className="resume__pdf" onClick={() => printResume(t("resume.pdfTitle"))}>
            {t("resume.downloadPdf")}
          </button>
        </p>
      </header>

      <section className="resume__section">
        <h2>{t("resume.glanceTitle")}</h2>
        {glance.pitch.map((sentence) => (
          <p key={sentence}>{sentence}</p>
        ))}
        <ul>
          {glance.stats.map((stat) => (
            <li key={stat.value}>
              <strong>{stat.value}</strong> {stat.label}
            </li>
          ))}
        </ul>
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
            <p>{job.stack.join(" · ")}</p>
          </article>
        ))}
      </section>

      <section className="resume__section">
        <h2>{t("resume.earlyCareer")}</h2>
        <ul>
          {earlyCareer.map((job) => (
            <li key={job.id} id={job.id}>
              {job.company} · {job.role} · {job.period}: {job.line}
            </li>
          ))}
        </ul>
      </section>

      <section className="resume__section">
        <h2>{t("resume.projects")}</h2>
        {projects.map((project) => (
          <article key={project.id} className="job">
            <h3>{project.title}</h3>
            <p>{project.did}</p>
            <p>{project.result}</p>
            <p>{project.stack.join(" · ")}</p>
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
    </main>
  );
}
