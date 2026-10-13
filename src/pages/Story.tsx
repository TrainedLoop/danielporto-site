import { useCallback, useEffect, useState } from "react";
import { Scene } from "../engine/Scene";
import { track } from "../lib/analytics";
import { href } from "../lib/route";
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

/**
 * A história em pixel art, opcional a partir da home. Uma fase por vez, como num
 * jogo: a próxima só aparece quando a atual termina, e o inventário acumula os itens.
 */
export function Story() {
  const [current, setCurrent] = useState(0);
  const [items, setItems] = useState<Record<string, boolean>>({});
  const handleItem = useCallback(
    (id: string, got: boolean) =>
      setItems((existing) => (existing[id] === got ? existing : { ...existing, [id]: got })),
    [],
  );
  const goNext = useCallback(() => {
    setCurrent((index) => index + 1);
    window.scrollTo(0, 0);
  }, []);

  const finished = current >= PHASES.length;
  const phase = PHASES[current];
  useEffect(() => void (finished && track("historia_concluida")), [finished]);
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
              autoStart={current > 0}
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
                  setItems({});
                  setCurrent(0);
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
