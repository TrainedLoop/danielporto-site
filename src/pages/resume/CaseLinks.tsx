import { useTranslation } from "react-i18next";
import { caseRoute } from "../../content/caseStudies";
import type { CaseId } from "../../i18n/locales/pt";
import { href, type Lang } from "../../lib/route";

/** "read the case study: A · B" at the end of a job or project card. Screen only; never printed. */
export function CaseLinks({ ids }: { ids: CaseId[] }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;
  if (ids.length === 0) return null;
  const titles = new Map(t("caseStudies.items").map((item) => [item.id, item.title]));

  return (
    <p className="case-links no-print">
      {t("resume.caseStudyLink")}:{" "}
      {ids.map((id, index) => (
        <span key={id}>
          {index > 0 && " · "}
          <a href={href(caseRoute(id), lang)}>{titles.get(id)}</a>
        </span>
      ))}
    </p>
  );
}
