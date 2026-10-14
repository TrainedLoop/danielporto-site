import type { CaseId } from "../i18n/locales/pt";
import type { Route } from "../lib/route";

/** Route of each case study page; the texts live in the locales (caseStudies.items). */
const CASE_ROUTES: Record<CaseId, Route> = {
  "ai-chat": "case-ai-chat",
  "cicd-design-system": "case-cicd-design-system",
  "ocr-extraction": "case-ocr-extraction",
};

/** Route of a case study: "ai-chat" → "case-ai-chat". */
export const caseRoute = (id: CaseId): Route => CASE_ROUTES[id];

/** The case study shown on a route, or null if the route isn't a case study page. */
export function caseIdOf(route: Route): CaseId | null {
  const entry = Object.entries(CASE_ROUTES).find(([, caseRouteId]) => caseRouteId === route);
  return entry ? (entry[0] as CaseId) : null;
}
