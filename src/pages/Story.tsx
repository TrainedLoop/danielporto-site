import { useCallback, useEffect, useState } from "react";
import { Scene } from "../engine/Scene";
import { href, storyHref, storyPhase } from "../lib/route";
import { loadSprites } from "../lib/sprites";
import { phase0 } from "../phases/phase0";
import { phase1 } from "../phases/phase1";
import { phase2 } from "../phases/phase2";
import { phase3 } from "../phases/phase3";
import { phase4 } from "../phases/phase4";
import { phase5 } from "../phases/phase5";
import { phase6 } from "../phases/phase6";
import { phase7 } from "../phases/phase7";

// Fases em ordem; cada uma entrega um item para o inventário.
const PHASES = [phase0, phase1, phase2, phase3, phase4, phase5, phase6, phase7];

type Progress = { current: number; items: Record<string, boolean> };

// O progresso fica no navegador para recarregar a página, ou ir ao currículo e voltar,
// sem recomeçar do zero. Sem armazenamento (aba anônima, bloqueado), a história funciona igual.
const STORAGE_KEY = "historia:progresso";

function readProgress(): Progress | null {
  if (typeof window === "undefined") return null;
  try {
    const saved: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null");
    if (!saved || typeof saved !== "object") return null;
    const { fase, itens } = saved as { fase?: unknown; itens?: unknown };
    if (typeof fase !== "number" || !Number.isInteger(fase) || fase < 0 || fase > PHASES.length) return null;
    const ids = Array.isArray(itens) ? itens.filter((id) => typeof id === "string") : [];
    return { current: fase, items: Object.fromEntries(ids.map((id) => [id, true])) };
  } catch {
    return null;
  }
}

function clearProgress() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Sem armazenamento, não há o que limpar.
  }
}

function writeProgress({ current, items }: Progress) {
  const itens = Object.keys(items).filter((id) => items[id]);
  if (current === 0 && itens.length === 0) return clearProgress();
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ fase: current, itens }));
  } catch {
    // Sem armazenamento: o progresso só não sobrevive ao recarregar.
  }
}

/** Abrir direto numa fase (/historia/?fase=3) já entrega os itens das fases anteriores. */
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
 * A história em pixel art, opcional a partir da home. Uma fase por vez, como num
 * jogo: a próxima só aparece quando a atual termina, e o inventário acumula os itens.
 */
export function Story() {
  const [initial] = useState(initialProgress);
  const [current, setCurrent] = useState(initial.current);
  const [items, setItems] = useState(initial.items);
  // Só começa sozinha quem acabou de vir da fase anterior; ao abrir por link ou
  // recarregar, a fase espera o "PRESS START".
  const [cameFromPrevious, setCameFromPrevious] = useState(false);
  const handleItem = useCallback(
    (id: string, got: boolean) =>
      setItems((existing) => (existing[id] === got ? existing : { ...existing, [id]: got })),
    [],
  );
  const goNext = useCallback(() => {
    setCurrent((index) => index + 1);
    setCameFromPrevious(true);
    window.scrollTo(0, 0);
  }, []);

  // Enquanto uma fase roda, baixa as imagens da próxima, para não ter pausa entre elas.
  // Espera a atual terminar de carregar, para não disputar a conexão com ela.
  useEffect(() => {
    const now = PHASES[current];
    const next = PHASES[current + 1];
    if (!now || !next) return;
    let cancelled = false;
    loadSprites(now.sprites)
      .then(() => {
        if (!cancelled) return loadSprites(next.sprites);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [current]);

  // Guarda o progresso e mostra a fase atual na URL. replaceState para o "voltar"
  // do navegador não passar fase por fase.
  useEffect(() => {
    writeProgress({ current, items });
  }, [current, items]);
  useEffect(() => {
    const target = current < PHASES.length ? storyHref(current + 1) : href("historia");
    if (window.location.pathname + window.location.search !== target) {
      window.history.replaceState(null, "", target);
    }
  }, [current]);

  // Voltar/avançar do navegador para um link de fase também leva até ela.
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
  const collected = PHASES.filter((p) => items[p.item.id]).map((p) => p.item);

  return (
    <>
      <main className="story">
        {!finished && (
          <>
            <p className="story__progress" aria-live="polite">
              {phase.title}
              <span className="story__count">
                {current + 1}/{PHASES.length}
              </span>
            </p>
            <Scene
              key={phase.id}
              phase={phase}
              onItem={handleItem}
              onNext={goNext}
              autoStart={cameFromPrevious}
            />
          </>
        )}

        {/* Encerramento: a história continua na Purple. */}
        {finished && (
          <section className="next">
            <p className="next__level">CONTINUA…</p>
            <p className="next__soon">
              Hoje sou desenvolvedor full stack sênior na Purple Metrics, levando IA para produção.
            </p>
            <p className="next__links">
              <a href={href("curriculo")}>ler o currículo</a> · <a href={href("home")}>voltar ao início</a> ·{" "}
              <a href={href("creditos")}>créditos</a> ·{" "}
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
                jogar de novo
              </button>
            </p>
          </section>
        )}
      </main>

      <nav className="inventory" aria-label="Inventário">
        <span className="inventory__label">ITENS</span>
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
