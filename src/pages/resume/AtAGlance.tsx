import { useTranslation } from "react-i18next";

/** "Professional summary": the two-sentence pitch (also shown on the home). */
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
    </section>
  );
}
