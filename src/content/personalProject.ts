/**
 * The personal open-source project (rendermd): links, the screenshot and its anchor on /projetos/.
 * The texts live in the locales (`personalProject`).
 */

/** Anchor id of the card on /projetos/ and /en/projects/ (the résumé links to it). */
export const PERSONAL_PROJECT_ID = "rendermd";

export const PERSONAL_PROJECT_LINKS = {
  live: "https://trainedloop.github.io/rendermd/",
  code: "https://github.com/TrainedLoop/rendermd",
};

const BASE = import.meta.env.BASE_URL;

/**
 * Screenshot of the live app (dark theme, preview tab), in public/projects/: two widths of the
 * same crop (about 48:25), so phones download the smaller one.
 */
export const PERSONAL_PROJECT_IMAGE = {
  src: `${BASE}projects/rendermd.webp`,
  srcSet: `${BASE}projects/rendermd-800.webp 800w, ${BASE}projects/rendermd.webp 1600w`,
  width: 1600,
  height: 833,
};
