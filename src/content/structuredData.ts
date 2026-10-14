import { i18n } from "../i18n";
import { LANGS, type Lang, type Page, type Route } from "../lib/route";
import { flatSkills } from "./skills";
import { CONTENT_DATE, LANG_CODE, ogImage, pageMeta, pageUrl, SITE_URL } from "./pages";

/** Stable ids of the nodes shared by every page, so search engines merge them across pages and languages. */
const PERSON_ID = `${SITE_URL}#person`;
const WEBSITE_ID = `${SITE_URL}#website`;

/** Facts that aren't text on the page, so they don't live in the locales. */
const EMPLOYER_URL = "https://www.purplemetrics.com.br/";
const ADDRESS = { "@type": "PostalAddress", addressLocality: "Rio de Janeiro", addressRegion: "RJ", addressCountry: "BR" };

/** Pages whose main subject is Daniel himself (schema.org ProfilePage); the others are plain WebPages. */
const PROFILE_ROUTES: Route[] = ["home", "resume"];

function person(lang: Lang) {
  const t = i18n.getFixedT(lang);
  const profile = t("profile");
  const email = profile.links.find((link) => link.href.startsWith("mailto:"));
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.name,
    url: pageUrl("home", lang),
    image: ogImage(lang),
    jobTitle: profile.role,
    description: profile.intro,
    worksFor: { "@type": "Organization", name: profile.company, url: EMPLOYER_URL },
    address: ADDRESS,
    ...(email && { email: email.href.slice("mailto:".length) }),
    sameAs: profile.links.filter((link) => link.href.startsWith("https://")).map((link) => link.href),
    knowsAbout: flatSkills(t("skillGroups")),
    knowsLanguage: t("languages").map((language) => ({
      "@type": "Language",
      name: language.name,
      alternateName: language.code,
    })),
  };
}

/**
 * schema.org JSON-LD of a page, in its language: the WebSite, the page itself (ProfilePage
 * for home and résumé, WebPage for the others), Daniel as a Person and, on subpages, the
 * breadcrumb back to the home page. Written into each page's static HTML by the build.
 */
export function structuredData(page: Page) {
  const { route, lang } = page;
  const t = i18n.getFixedT(lang);
  const { title, description } = pageMeta(page);
  const url = pageUrl(route, lang);
  const breadcrumbId = `${url}#breadcrumb`;

  const webPage = {
    "@type": PROFILE_ROUTES.includes(route) ? "ProfilePage" : "WebPage",
    "@id": url,
    url,
    name: title,
    description,
    inLanguage: LANG_CODE[lang],
    isPartOf: { "@id": WEBSITE_ID },
    dateModified: CONTENT_DATE,
    primaryImageOfPage: { "@type": "ImageObject", url: ogImage(lang) },
    ...(PROFILE_ROUTES.includes(route) ? { mainEntity: { "@id": PERSON_ID } } : { about: { "@id": PERSON_ID } }),
    ...(route !== "home" && { breadcrumb: { "@id": breadcrumbId } }),
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId,
    itemListElement: (["home", route] as const).map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: t(`meta.${step}.name`),
      item: pageUrl(step, lang),
    })),
  };

  const website = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: t("profile").name,
    description: pageMeta({ route: "home", lang }).description,
    inLanguage: LANGS.map((other) => LANG_CODE[other]),
    publisher: { "@id": PERSON_ID },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [website, webPage, person(lang), ...(route === "home" ? [] : [breadcrumb])],
  };
}
