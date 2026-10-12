import { useEffect, useState } from "react";

const BASE = import.meta.env.BASE_URL;

type Credit = { file: string; authors: string; licenses: string; urls: string[] };

/** Lê o CREDITS.csv gerado pelo tools/build_character.py (campos entre aspas, separados por vírgula). */
function parse(csv: string): Credit[] {
  return csv
    .trim()
    .split("\n")
    .slice(1)
    .map((line) => {
      const fields = [...line.matchAll(/"([^"]*)"/g)].map((match) => match[1]);
      const [file = "", authors = "", licenses = "", urls = ""] = fields;
      return { file, authors, licenses, urls: [...new Set(urls.split("; ").filter(Boolean))] };
    });
}

/** Créditos dos sprites e da fonte, exigidos pelas licenças (CC-BY-SA, OGA-BY, GPL e OFL). */
export function Credits() {
  const [credits, setCredits] = useState<Credit[]>([]);

  useEffect(() => {
    fetch(`${BASE}sprites/character/CREDITS.csv`)
      .then((response) => response.text())
      .then((text) => setCredits(parse(text)))
      .catch(() => setCredits([]));
  }, []);

  return (
    <main className="resume credits">
      <h1>Créditos</h1>
      <p>
        Os personagens foram montados a partir do{" "}
        <a href="https://github.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator">
          Universal LPC Spritesheet Character Generator
        </a>
        , com arte do Liberated Pixel Cup e da comunidade do OpenGameArt. Cenários, objetos e telas foram desenhados para
        este site. Os textos nas telas usam a fonte Press Start 2P, de CodeMan38, sob a SIL Open Font License.
      </p>
      <p>
        <a href={`${BASE}sprites/character/CREDITS.csv`}>Baixar a lista completa (CSV)</a>
      </p>
      <ul className="credits__list">
        {credits.map((credit) => (
          <li key={credit.file}>
            <p className="credits__file">{credit.file}</p>
            <p>{credit.authors}</p>
            <p className="credits__license">{credit.licenses}</p>
            <p className="credits__urls">
              {credit.urls.map((url) => (
                <a key={url} href={url}>
                  {url.replace(/^https?:\/\//, "")}
                </a>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
