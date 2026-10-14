import { useTranslation } from "react-i18next";

/** "In 30 seconds": the two-sentence pitch and three headline figures. */
export function AtAGlance() {
  const { t } = useTranslation();
  const glance = t("resume.glance");

  return (
    <section className="glance">
      <h2>{t("resume.glanceTitle")}</h2>
      {glance.pitch.map((sentence) => (
        <p key={sentence} className="glance__pitch">
          {sentence}
        </p>
      ))}
      <ul className="glance__stats">
        {glance.stats.map((stat) => (
          <li key={stat.value}>
            <strong className="glance__value">{stat.value}</strong>
            <span className="glance__label">{stat.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
