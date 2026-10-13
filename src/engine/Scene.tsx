import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { trackPhase } from "../lib/analytics";
import { jobHref, type Lang } from "../lib/route";
import { loadSprites, spritePaths, type SpriteMap } from "../lib/sprites";
import {
  ANIMATION_SPEED,
  CHARS_PER_SECOND,
  HEIGHT,
  TEXT_SPEED,
  WIDTH,
} from "./config";
import { usePhaseText } from "./phaseText";
import type { Phase } from "./types";

type Status = "idle" | "playing" | "done";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** Reads the reduced-motion preference; in the build's HTML (no `window`) it starts with motion. */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

type SceneProps = {
  phase: Phase;
  onItem: (id: string, got: boolean) => void;
  /** Without `onNext`, this is the last phase and the next-phase button doesn't show. */
  onNext?: () => void;
  /** Starts on its own as soon as the images load (when the player came from the previous phase). */
  autoStart?: boolean;
  sectionRef?: React.Ref<HTMLElement>;
};

export function Scene({ phase, onItem, onNext, autoStart = false, sectionRef }: SceneProps) {
  const { beats } = phase;
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;
  const { title, description, lines } = usePhaseText(phase);
  const sprites = useMemo(() => spritePaths(phase.sprites, lang), [phase, lang]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const spritesRef = useRef<SpriteMap<string> | null>(null);
  const progressRef = useRef(0);
  const animRef = useRef<gsap.core.Tween | null>(null);
  const typeRef = useRef<gsap.core.Tween | null>(null);
  const visibleRef = useRef(false);
  const [status, setStatus] = useState<Status>("idle");
  const [beat, setBeat] = useState(0);
  const [typed, setTyped] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  /** Changes on every "try again", so the effect loads the images again. */
  const [attempt, setAttempt] = useState(0);
  const reduceMotion = usePrefersReducedMotion();

  const render = useCallback(
    (p: number) => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx || !spritesRef.current) return;
      ctx.imageSmoothingEnabled = false;
      progressRef.current = p;
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      phase.draw(ctx, spritesRef.current, p);
      onItem(phase.item.id, p >= phase.item.at);
    },
    [phase, onItem],
  );

  const retry = () => {
    setFailed(false);
    setAttempt((n) => n + 1);
  };

  // Only the phase on screen responds to the keyboard.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.intersectionRatio >= 0.6;
      },
      { threshold: [0, 0.6, 1] },
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  /** Plays the beat's animation and types its line at the same time. */
  const startBeat = useCallback(
    (index: number) => {
      const { to, seconds, speed, textSpeed } = beats[index];
      const text = lines[index];
      animRef.current?.kill();
      typeRef.current?.kill();
      setBeat(index);
      setTyped(0);
      setAnimating(true);
      const anim = { p: progressRef.current };
      animRef.current = gsap.to(anim, {
        p: to,
        duration: seconds / (speed * ANIMATION_SPEED),
        ease: "none",
        onUpdate: () => render(anim.p),
        onComplete: () => setAnimating(false),
      });
      const chars = { n: 0 };
      typeRef.current = gsap.to(chars, {
        n: text.length,
        duration: text.length / (CHARS_PER_SECOND * textSpeed * TEXT_SPEED),
        ease: "none",
        onUpdate: () => setTyped(Math.floor(chars.n)),
      });
    },
    [beats, lines, render],
  );

  const start = useCallback(() => {
    render(0);
    setStatus("playing");
    startBeat(0);
    trackPhase("phase_started", phase.id);
  }, [render, startBeat, phase.id]);

  // Loads the images and only then draws (or starts the phase): the auto start happens
  // in the load callback, not directly in the effect body.
  useEffect(() => {
    let cancelled = false;
    loadSprites(sprites)
      .then((images) => {
        if (cancelled) return;
        spritesRef.current = images;
        setLoaded(true);
        if (reduceMotion) {
          render(phase.staticAt);
          setStatus("done");
        } else if (autoStart) {
          // Coming from the previous phase, no need for another "PRESS START".
          start();
        } else {
          render(0);
        }
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
      animRef.current?.kill();
      typeRef.current?.kill();
    };
    // `sprites` changes with the language, but Story remounts the scene when the language changes.
  }, [phase, sprites, render, reduceMotion, autoStart, start, attempt]);

  /** Moves to the next beat, but only after the current one's text and animation finish. */
  const advance = useCallback(() => {
    if (status !== "playing") return;
    if (typed < lines[beat].length || animating) return;
    if (beat + 1 < beats.length) {
      startBeat(beat + 1);
    } else {
      setStatus("done");
      trackPhase("phase_completed", phase.id);
    }
  }, [status, beat, beats, lines, typed, animating, startBeat, phase.id]);

  const skip = () => {
    animRef.current?.kill();
    typeRef.current?.kill();
    render(1);
    setStatus("done");
    trackPhase("phase_skipped", phase.id);
  };

  // Enter or space do the same as clicking: start or advance.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== " " && event.key !== "Enter") return;
      if (!visibleRef.current) return;
      if (
        event.target instanceof HTMLElement &&
        event.target.closest("button, a")
      )
        return;
      if (status === "idle" && loaded) {
        event.preventDefault();
        start();
      } else if (status === "playing") {
        event.preventDefault();
        advance();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [status, loaded, start, advance]);

  const current = lines[beat];
  const ready =
    status === "playing" && typed >= current.length && !animating;

  return (
    <section
      ref={sectionRef}
      className={reduceMotion ? "phase phase--static" : "phase"}
      aria-label={title}
    >
      <div
        ref={stageRef}
        className={ready ? "phase__stage phase__stage--ready" : "phase__stage"}
        onClick={status === "playing" ? advance : undefined}
      >
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          className="phase__canvas"
          role="img"
          aria-label={description}
        />

        {!loaded && !failed && (
          <p className="phase__loading" role="status">
            {t("story.scene.loading")}
          </p>
        )}

        {failed && (
          <div className="phase__done" role="alert">
            <p className="phase__clear">{t("story.scene.loadError")}</p>
            <p className="phase__hint">{t("story.scene.loadErrorHint")}</p>
            <div className="phase__actions">
              <button type="button" onClick={retry}>
                <span className="icon" aria-hidden="true">
                  ↺
                </span>{" "}
                {t("story.scene.retry")}
              </button>
              {onNext && (
                <button type="button" onClick={onNext}>
                  {t("story.scene.skipPhase")}{" "}
                  <span className="icon" aria-hidden="true">
                    ▶▶
                  </span>
                </button>
              )}
            </div>
          </div>
        )}

        {status === "idle" && loaded && (
          <button type="button" className="phase__start" onClick={start}>
            <span className="phase__press">
              <span className="icon" aria-hidden="true">
                ▶
              </span>{" "}
              {t("story.scene.pressStart")}
            </span>
            <span className="phase__hint">{t("story.scene.startHint")}</span>
          </button>
        )}

        {reduceMotion ? (
          <div className="dialog">
            {beats.map((b, i) => (
              <p key={b.id}>{lines[i]}</p>
            ))}
          </div>
        ) : (
          status === "playing" && (
            <div className="dialog" aria-live="polite">
              <p>
                {current.slice(0, typed)}
                <span className="dialog__rest" aria-hidden="true">
                  {current.slice(typed)}
                </span>
              </p>
              <div className="dialog__footer">
                <span className="dialog__step">
                  {beat + 1}/{beats.length}
                </span>
                <button
                  type="button"
                  className="dialog__next"
                  disabled={!ready}
                  onClick={(event) => {
                    event.stopPropagation();
                    advance();
                  }}
                >
                  {beat + 1 < beats.length ? t("story.scene.continue") : t("story.scene.finish")}{" "}
                  <span className="icon" aria-hidden="true">
                    ▶
                  </span>
                  <kbd>Enter</kbd>
                </button>
              </div>
            </div>
          )
        )}

        {status === "playing" && (
          <div className="controls">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                skip();
              }}
            >
              {t("story.scene.skip")}{" "}
              <span className="icon" aria-hidden="true">
                ▶▶
              </span>
            </button>
          </div>
        )}

        {status === "done" && (
          <div className="phase__done">
            <p className="phase__clear">{t("story.scene.phaseClear")}</p>
            <div className="phase__actions">
              {!reduceMotion && (
                <button type="button" onClick={start}>
                  <span className="icon" aria-hidden="true">
                    ↺
                  </span>{" "}
                  {t("story.scene.replay")}
                </button>
              )}
              {onNext && (
                <button type="button" onClick={onNext}>
                  {t("story.scene.nextPhase")}{" "}
                  <span className="icon" aria-hidden="true">
                    ▶
                  </span>
                </button>
              )}
              {phase.job && <a href={jobHref(phase.job, lang)}>{t("story.scene.seeOnResume")}</a>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
