import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { loadSprites, type SpriteMap } from "../lib/sprites";
import {
  ANIMATION_SPEED,
  CHARS_PER_SECOND,
  HEIGHT,
  TEXT_SPEED,
  WIDTH,
} from "./config";
import type { Phase } from "./types";

type Status = "idle" | "playing" | "done";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** Lê a preferência por menos movimento; no HTML gerado no build (sem `window`), começa com movimento. */
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
  /** Sem `onNext`, é a última fase e o botão de próxima fase não aparece. */
  onNext?: () => void;
  /** Começa sozinha assim que as imagens carregam (quando a pessoa já veio da fase anterior). */
  autoStart?: boolean;
  sectionRef?: React.Ref<HTMLElement>;
};

export function Scene({ phase, onItem, onNext, autoStart = false, sectionRef }: SceneProps) {
  const { beats } = phase;
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
  /** Muda a cada "tentar de novo", para o efeito carregar as imagens outra vez. */
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

  useEffect(() => {
    let cancelled = false;
    loadSprites(phase.sprites)
      .then((sprites) => {
        if (cancelled) return;
        spritesRef.current = sprites;
        render(reduceMotion ? phase.staticAt : 0);
        if (reduceMotion) setStatus("done");
        setLoaded(true);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
      animRef.current?.kill();
      typeRef.current?.kill();
    };
  }, [phase, render, reduceMotion, attempt]);

  const retry = () => {
    setFailed(false);
    setAttempt((n) => n + 1);
  };

  // Só a fase que está na tela responde ao teclado.
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

  /** Toca a animação da fala e digita o texto ao mesmo tempo. */
  const startBeat = useCallback(
    (index: number) => {
      const { to, seconds, speed, textSpeed, text } = beats[index];
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
    [beats, render],
  );

  const start = useCallback(() => {
    render(0);
    setStatus("playing");
    startBeat(0);
  }, [render, startBeat]);

  // Vindo da fase anterior, não precisa de outro "PRESS START".
  useEffect(() => {
    if (loaded && autoStart && !reduceMotion && status === "idle") start();
  }, [loaded, autoStart, reduceMotion, status, start]);

  /** Avança para a próxima fala, mas só depois que o texto e a animação da atual terminam. */
  const advance = useCallback(() => {
    if (status !== "playing") return;
    if (typed < beats[beat].text.length || animating) return;
    if (beat + 1 < beats.length) {
      startBeat(beat + 1);
    } else {
      setStatus("done");
    }
  }, [status, beat, beats, typed, animating, startBeat]);

  const skip = () => {
    animRef.current?.kill();
    typeRef.current?.kill();
    render(1);
    setStatus("done");
  };

  // Enter ou espaço fazem o mesmo que clicar: começar ou avançar.
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

  const current = beats[beat];
  const ready =
    status === "playing" && typed >= current.text.length && !animating;

  return (
    <section
      ref={sectionRef}
      className={reduceMotion ? "phase phase--static" : "phase"}
      aria-label={phase.title}
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
          aria-label={phase.description}
        />

        {!loaded && !failed && (
          <p className="phase__loading" role="status">
            carregando…
          </p>
        )}

        {failed && (
          <div className="phase__done" role="alert">
            <p className="phase__clear">ERRO AO CARREGAR</p>
            <p className="phase__hint">As imagens desta fase não carregaram.</p>
            <div className="phase__actions">
              <button type="button" onClick={retry}>
                <span className="icon" aria-hidden="true">
                  ↺
                </span>{" "}
                tentar de novo
              </button>
              {onNext && (
                <button type="button" onClick={onNext}>
                  pular fase{" "}
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
              PRESS START
            </span>
            <span className="phase__hint">clique, ou aperte Enter</span>
          </button>
        )}

        {reduceMotion ? (
          <div className="dialog">
            {beats.map((b) => (
              <p key={b.text}>{b.text}</p>
            ))}
          </div>
        ) : (
          status === "playing" && (
            <div className="dialog" aria-live="polite">
              <p>
                {current.text.slice(0, typed)}
                <span className="dialog__rest" aria-hidden="true">
                  {current.text.slice(typed)}
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
                  {beat + 1 < beats.length ? "continuar" : "concluir"}{" "}
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
              pular{" "}
              <span className="icon" aria-hidden="true">
                ▶▶
              </span>
            </button>
          </div>
        )}

        {status === "done" && (
          <div className="phase__done">
            <p className="phase__clear">FASE COMPLETA</p>
            <div className="phase__actions">
              {!reduceMotion && (
                <button type="button" onClick={start}>
                  <span className="icon" aria-hidden="true">
                    ↺
                  </span>{" "}
                  ver de novo
                </button>
              )}
              {onNext && (
                <button type="button" onClick={onNext}>
                  próxima fase{" "}
                  <span className="icon" aria-hidden="true">
                    ▶
                  </span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
