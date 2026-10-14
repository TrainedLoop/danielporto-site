import type { SkillGroup } from "../i18n/locales/pt";

/** The flat skill list (JSON-LD), derived from the groups: their order, no duplicates. */
export function flatSkills(groups: SkillGroup[]): string[] {
  return [...new Set(groups.flatMap((group) => group.items))];
}
