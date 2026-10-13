import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { Phase } from "./types";

/**
 * A phase's texts in the current language: title, scene description, item name and the
 * beat lines in the order the phase plays them. Memoized per language, since the scene's
 * callbacks and effects depend on `lines`.
 */
export function usePhaseText(phase: Phase) {
  const { t } = useTranslation();
  return useMemo(() => {
    const text = t("story.phases")[phase.id];
    const beats = text.beats as Record<string, string>;
    return {
      title: text.title,
      description: text.description,
      item: text.item,
      lines: phase.beats.map((beat) => beats[beat.id]),
    };
  }, [t, phase]);
}
