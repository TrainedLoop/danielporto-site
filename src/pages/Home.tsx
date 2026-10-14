import { useTranslation } from "react-i18next";
import { AchievementCard } from "./home/AchievementCard";
import { HomeHero } from "./home/HomeHero";
import { StoryInvite } from "./home/StoryInvite";

/** The home page, for recruiters first: who, two actions, three achievements, then the story invitation. */
export function Home() {
  const { t } = useTranslation();
  return (
    <main className="home">
      <HomeHero />
      <section className="achievements" aria-labelledby="achievements-title">
        <h2 id="achievements-title">{t("home.achievementsLabel")}</h2>
        <div className="achievements__grid">
          {t("home.achievements").map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </section>
      <StoryInvite />
    </main>
  );
}
