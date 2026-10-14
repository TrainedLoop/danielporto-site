import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AtAGlance } from "./resume/AtAGlance";
import { EarlyCareer } from "./resume/EarlyCareer";
import { JobEntry } from "./resume/JobEntry";
import { ProjectCard } from "./resume/ProjectCard";
import { ResumeHeader } from "./resume/ResumeHeader";
import { ResumeSidebar } from "./resume/ResumeSidebar";

/** Opens the print dialog; the title becomes the suggested PDF name and is restored afterwards. */
function printResume(pdfTitle: string) {
  const original = document.title;
  document.title = pdfTitle;
  window.addEventListener("afterprint", () => (document.title = original), { once: true });
  window.print();
}

/**
 * The text version: header on top, a sticky side column (contact, skills) and the main column
 * (at a glance, experience, early career, selected projects). The DOM order is the phone order.
 */
export function Resume() {
  const { t } = useTranslation();
  const experience = t("experience");
  const projects = t("projects");

  // Coming from the story (/curriculo/#job-id), scroll to that phase's job.
  useEffect(() => {
    const jobId = decodeURIComponent(window.location.hash.slice(1));
    if (jobId) document.getElementById(jobId)?.scrollIntoView();
  }, []);

  return (
    <main className="resume">
      <ResumeHeader onDownloadPdf={() => printResume(t("resume.pdfTitle"))} />
      <AtAGlance />
      <ResumeSidebar />
      <div className="resume__main">
        <section className="resume__section">
          <h2>{t("resume.experience")}</h2>
          {experience.map((job) => (
            <JobEntry key={job.id} job={job} />
          ))}
        </section>
        <EarlyCareer />
        <section className="resume__section projects">
          <h2>{t("resume.projects")}</h2>
          <div className="projects__grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
