import { useTranslation } from "react-i18next";

/** Side column: contact links and the skills by group. Sticky on wide screens. */
export function ResumeSidebar() {
  const { t } = useTranslation();
  const profile = t("profile");
  const skillGroups = t("skillGroups");

  return (
    <aside className="resume__sidebar">
      <section className="resume__contact">
        <h2>{t("resume.contact")}</h2>
        <ul>
          {profile.links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </section>
      <section className="resume__skills">
        <h2>{t("resume.skills")}</h2>
        {skillGroups.map((group) => (
          <div key={group.label} className="skill-group">
            <h3>{group.label}</h3>
            <ul className="chips">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </aside>
  );
}
