import "i18next";
import type pt from "./locales/pt";

// Typed keys: t("home.storyCta") is checked by TypeScript against pt.ts.
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: { translation: typeof pt };
    returnObjects: true;
  }
}
