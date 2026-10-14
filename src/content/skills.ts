import type { SkillGroup } from "../i18n/locales/pt";

/** The flat skill list (home chips, JSON-LD), derived from the groups: their order, no duplicates. */
export function flatSkills(groups: SkillGroup[]): string[] {
  return [...new Set(groups.flatMap((group) => group.items))];
}

/** Home chips: items taken round-robin across the groups (1st of each, then 2nd of each...), no duplicates. */
export function homeSkills(groups: SkillGroup[], limit = 12): string[] {
  const picked = new Set<string>();
  const depth = Math.max(0, ...groups.map((group) => group.items.length));
  for (let i = 0; i < depth && picked.size < limit; i++) {
    for (const group of groups) {
      if (i < group.items.length && picked.size < limit) picked.add(group.items[i]);
    }
  }
  return [...picked];
}
