import { i18n } from "../i18n";
import type { Lang, Route } from "../lib/route";
import { formatContentDate, pageMeta, pageUrl, SITE_URL } from "./pages";

/**
 * /llms.txt and /llms-full.txt (https://llmstxt.org): plain-text versions of the site for AI
 * tools, written by the build (scripts/prerender.js) from the same locales as the pages.
 * English comes first; every page is listed in both languages.
 */

/** Order of the pages in llms.txt: the résumé right after the home page. */
const LLMS_ROUTES: Route[] = ["home", "resume", "story", "credits"];

/** Languages in the order they appear in both files. */
const LLMS_LANGS: Lang[] = ["en", "pt"];

const FULL_PATH = "llms-full.txt";

/** "Senior Full Stack Developer at Purple Metrics" in the given language. */
function roleLine(lang: Lang) {
  const t = i18n.getFixedT(lang);
  const profile = t("profile");
  return `${profile.role} ${t("resume.roleAt")} ${profile.company}`;
}

/** Markdown link list of the profile links (LinkedIn, GitHub, email). */
function contactLinks(lang: Lang) {
  const t = i18n.getFixedT(lang);
  return t("profile").links.map((link) => {
    const label = link.href.startsWith("mailto:") ? `${t("llms.email")}: ${link.label}` : link.label;
    return `- [${label}](${link.href})`;
  });
}

/** The index: who Daniel is, every page in both languages with its description, and the contacts. */
export function llmsTxt(): string {
  const en = i18n.getFixedT("en");
  const profile = en("profile");
  const lines = [
    `# ${profile.name}`,
    "",
    `> ${roleLine("en")} · ${profile.location}. ${profile.headline}.`,
    "",
    ...LLMS_LANGS.map((lang) => i18n.getFixedT(lang)("profile").intro).flatMap((intro) => [intro, ""]),
  ];
  for (const lang of LLMS_LANGS) {
    const t = i18n.getFixedT(lang);
    lines.push(`## ${t("llms.pages")}`, "");
    for (const route of LLMS_ROUTES) {
      lines.push(`- [${t(`meta.${route}.name`)}](${pageUrl(route, lang)}): ${pageMeta({ route, lang }).description}`);
    }
    lines.push("");
  }
  lines.push(`## ${en("llms.contact")}`, "", ...contactLinks("en"), "");
  // "Optional" is the section name the llms.txt convention reserves for secondary links.
  lines.push("## Optional", "", `- [${en("llms.fullResume")}](${SITE_URL}${FULL_PATH}): ${en("llms.fullResumeHint")}`, "");
  return lines.join("\n");
}

/** The whole résumé in one language, as Markdown under a level-2 heading. */
function resumeMarkdown(lang: Lang): string[] {
  const t = i18n.getFixedT(lang);
  const profile = t("profile");
  const glance = t("resume.glance");
  const lines = [
    `## ${t("llms.languageName")}`,
    "",
    `${roleLine(lang)} · ${profile.location}`,
    "",
    profile.headline,
    "",
    t("resume.updated", { date: formatContentDate(lang) }),
    "",
    `- [${t("llms.online")}](${pageUrl("resume", lang)})`,
    ...contactLinks(lang),
    "",
    `### ${t("resume.glanceTitle")}`,
    "",
    ...glance.pitch.flatMap((sentence) => [sentence, ""]),
    ...glance.stats.map((stat) => `- **${stat.value}** ${stat.label}`),
    "",
    `### ${t("resume.experience")}`,
    "",
  ];
  for (const job of t("experience")) {
    lines.push(`#### ${job.company} · ${job.role}`, "", job.period, "");
    if (job.description) lines.push(job.description, "");
    lines.push(...job.bullets.map((bullet) => `- ${bullet}`), "", `Stack: ${job.stack.join(" · ")}`, "");
  }
  lines.push(`### ${t("resume.earlyCareer")}`, "");
  lines.push(...t("earlyCareer").map((job) => `- **${job.company}** · ${job.role} · ${job.period} — ${job.line}`), "");
  // The projects block stays self-contained: no dates, clients or employers next to it.
  lines.push(`### ${t("resume.projects")}`, "");
  for (const project of t("projects")) {
    lines.push(`#### ${project.title}`, "", project.did, "", project.result, "", `Stack: ${project.stack.join(" · ")}`, "");
  }
  lines.push(`### ${t("resume.skills")}`, "");
  lines.push(...t("skillGroups").map((group) => `- **${group.label}:** ${group.items.join(" · ")}`), "");
  return lines;
}

/** The full résumé, in English and then in Portuguese. */
export function llmsFullTxt(): string {
  const en = i18n.getFixedT("en");
  const lines = [
    `# ${en("profile").name}`,
    "",
    ...LLMS_LANGS.flatMap((lang) => [">", `> ${i18n.getFixedT(lang)("llms.fullIntro")}`]).slice(1),
    "",
    ...LLMS_LANGS.flatMap(resumeMarkdown),
  ];
  return lines.join("\n");
}
