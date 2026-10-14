import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Scene } from "../engine/Scene";
import { track } from "../lib/analytics";
import { href, storyHref, storyPhase, type Lang } from "../lib/route";
import { loadSprites, spritePaths } from "../lib/sprites";
import { PHASES } from "../phases";

type Progress = { current: number; items: Record<string, boolean> };

// Progress is kept in the browser so reloading the page, or going to the résumé and back,
// doesn't start over. Without storage (private tab, blocked), the story works the same.
// It is shared by both languages: switching language keeps the phase and the items.
// Saved as { phase, items }: the phase index (0 to 8, 8 = finished) and the collected item ids.
const STORAGE_KEY = "story:progress";
// Key and field names used before the code moved to English ({ fase, itens }). Read once and
// moved to STORAGE_KEY, so returning visitors keep their progress.
const LEGACY_STORAGE_KEY = "historia:progresso";

/** Validates saved progress; `phaseField`/`itemsField` name the fields in that format. */
function parseProgress(raw: string | null, phaseField: string, itemsField: string): Progress | null {
  const saved: unknown = JSON.parse(raw ?? "null");
  if (!saved || typeof saved !== "object") return null;
  const phase = (saved as Record<string, unknown>)[phaseField];
  const ids = (saved as Record<string, unknown>)[itemsField];
  if (typeof phase !== "number" || !Number.isInteger(phase) || phase < 0 || phase > PHASES.length) return null;
  const items = Array.isArray(ids) ? ids.filter((id): id is string => typeof id === "string") : [];
  return { current: phase, items: Object.fromEntries(items.map((id) => [id, true])) };
}

function readProgress(): Progress | null {
  if (typeof window === "undefined") return null;
  try {
    const current = parseProgress(window.localStorage.getItem(STORAGE_KEY), "phase", "items");
    if (current) return current;
    const legacy = parseProgress(window.localStorage.getItem(LEGACY_STORAGE_KEY), "fase", "itens");
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
    if (legacy) writeProgress(legacy);
    return legacy;
  } catch {
    return null;
  }
}

function clearProgress() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch {
    // No storage, nothing to clear.
  }
}

function writeProgress({ current, items }: Progress) {
  const ids = Object.keys(items).filter((id) => items[id]);
  if (current === 0 && ids.length === 0) return clearProgress();
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ phase: current, items: ids }));
  } catch {
    // No storage: progress just won't survive a reload.
  }
}

/** Opening a phase directly (/historia/?fase=3) already gives the items of the previous phases. */
function progressAt(phase: number): Progress {
  const current = Math.min(Math.max(phase, 1), PHASES.length) - 1;
  const items = Object.fromEntries(PHASES.slice(0, current).map((p) => [p.item.id, true]));
  return { current, items };
}

function initialProgress(): Progress {
  const linked = storyPhase();
  if (linked !== null) return progressAt(linked);
  return readProgress() ?? { current: 0, items: {} };
}

/**
 * The pixel-art story, optional from the home page. One phase at a time, like a game:
 * the next one only shows up when the current one ends, and the inventory collects the items.
 */
export function Story() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;
  const texts = t("story.phases");
  const [initial] = useState(initialProgress);
  const [current, setCurrent] = useState(initial.current);
  const [items, setItems] = useState(initial.items);
  // Only a phase reached from the previous one starts on its own; opened from a link or
  // after a reload, it waits for "PRESS START".
  const [cameFromPrevious, setCameFromPrevious] = useState(false);
  const handleItem = useCallback(
    (id: string, got: boolean) =>
      setItems((existing) => (existing[id] === got ? existing : { ...existing, [id]: got })),
    [setItems],
  );
  const goNext = useCallback(() => {
    setCurrent((index) => index + 1);
    setCameFromPrevious(true);
    window.scrollTo(0, 0);
  }, [setCurrent, setCameFromPrevious]);

  // While a phase plays, download the next one's images so there's no pause between them.
  // Waits for the current one to finish loading, so they don't compete for the connection.
  useEffect(() => {
    const now = PHASES[current];
    const next = PHASES[current + 1];
    if (!now || !next) return;
    let cancelled = false;
    loadSprites(spritePaths(now.sprites, lang))
      .then(() => {
        if (!cancelled) return loadSprites(spritePaths(next.sprites, lang));
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [current, lang]);

  // Saves progress and shows the current phase in the URL, in the page's language.
  // replaceState so the browser's back button doesn't step through every phase.
  useEffect(() => {
    writeProgress({ current, items });
  }, [current, items]);
  useEffect(() => {
    const target = current < PHASES.length ? storyHref(current + 1, lang) : href("story", lang);
    if (window.location.pathname + window.location.search !== target) {
      window.history.replaceState(null, "", target);
    }
  }, [current, lang]);

  // Browser back/forward to a phase link also goes to that phase.
  useEffect(() => {
    const onPopState = () => {
      const linked = storyPhase();
      if (linked === null) return;
      const next = progressAt(linked);
      setCurrent(next.current);
      setItems(next.items);
      setCameFromPrevious(false);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const finished = current >= PHASES.length;
  const phase = PHASES[current];
  useEffect(() => void (finished && track("story_completed")), [finished]);
  const collected = PHASES.filter((p) => items[p.item.id]).map((p) => ({ ...p.item, label: texts[p.id].item }));

  return (
    <>
      <main className="story">
        {!finished && (
          <>
            {/* The page's only heading: the current phase (or, at the end, the ending title). */}
            <h1 className="story__progress" aria-live="polite">
              {texts[phase.id].title}
              <span className="story__count">
                {current + 1}/{PHASES.length}
              </span>
            </h1>
            {/* Keyed by language too: switching language restarts the phase with its texts and sprites. */}
            <Scene
              key={`${phase.id}-${lang}`}
              phase={phase}
              onItem={handleItem}
              onNext={goNext}
              autoStart={cameFromPrevious}
            />
          </>
        )}

        {/* Ending: the story continues at Purple. */}
        {finished && (
          <section className="next">
            <h1 className="next__level">{t("story.ending.title")}</h1>
            <p className="next__soon">{t("story.ending.text")}</p>
            <p className="next__links">
              <a href={href("resume", lang)}>{t("story.ending.resume")}</a> ·{" "}
              <a href={href("home", lang)}>{t("story.ending.home")}</a> ·{" "}
              <a href={href("credits", lang)}>{t("story.ending.credits")}</a> ·{" "}
              <button
                type="button"
                className="next__restart"
                onClick={() => {
                  clearProgress();
                  setItems({});
                  setCurrent(0);
                  setCameFromPrevious(false);
                }}
              >
                {t("story.ending.restart")}
              </button>
            </p>
            {/* This page has no footer, so the privacy notice shows up here. */}
            <small className="next__privacy">{t("privacyNotice")}</small>
          </section>
        )}
      </main>

      <nav className="inventory" aria-label={t("story.inventory.label")}>
        <span className="inventory__label">{t("story.inventory.title")}</span>
        <ul>
          {Array.from({ length: PHASES.length }, (_, i) => {
            const item = collected[i];
            return (
              <li
                key={item?.id ?? `empty-${i}`}
                className={item ? "inventory__slot inventory__slot--new" : "inventory__slot"}
              >
                {item && <img src={item.src} alt={item.label} title={item.label} />}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
