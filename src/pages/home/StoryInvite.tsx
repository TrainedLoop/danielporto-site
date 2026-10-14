import { useTranslation } from "react-i18next";
import { track } from "../../lib/analytics";
import { href, type Lang } from "../../lib/route";

const BASE = import.meta.env.BASE_URL;

/** Inventory items from the story (decorative): one from the start, school, mobile and AI levels. */
const ITEMS = ["phase0/item-cd.png", "phase1/item-apostila.png", "phase5/item-phone.png", "phase7/item-ia.png"];

/** The invitation to the pixel-art story, below the achievements. */
export function StoryInvite() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;

  return (
    <section className="story-invite" aria-labelledby="story-invite-title">
      <ul className="story-invite__items" aria-hidden="true">
        {ITEMS.map((item) => (
          <li key={item}>
            <img src={`${BASE}sprites/${item}`} alt="" width={48} height={48} />
          </li>
        ))}
      </ul>
      <div className="story-invite__text">
        <h2 id="story-invite-title">{t("home.storyTitle")}</h2>
        <p>{t("home.storyText")}</p>
      </div>
      <a className="button button--primary" href={href("story", lang)} onClick={() => track("home_choice", { option: "story" })}>
        <span className="icon" aria-hidden="true">
          ▶
        </span>{" "}
        {t("home.storyCta")}
      </a>
    </section>
  );
}
