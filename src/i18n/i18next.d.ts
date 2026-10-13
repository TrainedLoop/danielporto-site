import "i18next";
import type pt from "./locales/pt";

// Chaves tipadas: t("home.playLabel") é conferido pelo TypeScript contra pt.ts.
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: { translation: typeof pt };
    returnObjects: true;
  }
}
