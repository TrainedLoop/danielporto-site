import { highlights, profile, skills } from "../content/profile";
import { href } from "../lib/route";

const BASE = import.meta.env.BASE_URL;

export function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div
          className="hero__avatar"
          role="img"
          aria-label="Daniel em pixel art"
          style={{ backgroundImage: `url(${BASE}sprites/character/adult-idle.png)` }}
        />
        <div className="hero__text">
          <p className="hero__hello">Olá, eu sou</p>
          <h1 className="hero__name">{profile.name}</h1>
          <p className="hero__role">
            {profile.role} na {profile.company}
          </p>
          <p className="hero__headline">{profile.headline}</p>
          <p className="hero__intro">{profile.intro}</p>
          <ul className="hero__links">
            {profile.links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
            <li>{profile.location}</li>
          </ul>
        </div>
      </section>

      <section className="choice" aria-labelledby="choice-title">
        <h2 id="choice-title" className="choice__title">
          Como você quer conhecer a minha trajetória?
        </h2>
        <div className="choice__options">
          <a className="choice__card choice__card--play" href={href("historia")}>
            <span className="choice__icon" aria-hidden="true">
              ▶
            </span>
            <span className="choice__label">Jogar a história</span>
            <span className="choice__hint">
              Da casa da minha avó até a IA em produção, em 8 fases de pixel art. Uns 5 minutos.
            </span>
          </a>
          <a className="choice__card" href={href("curriculo")}>
            <span className="choice__icon" aria-hidden="true">
              ≡
            </span>
            <span className="choice__label">Ler o currículo</span>
            <span className="choice__hint">A versão em texto, direta ao ponto, começando pela experiência atual.</span>
          </a>
        </div>
      </section>

      <section className="highlights" aria-label="O que eu faço">
        {highlights.map((item) => (
          <article key={item.title} className="highlight">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="home-skills" aria-label="Competências">
        <ul className="chips">
          {skills.slice(0, 12).map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
