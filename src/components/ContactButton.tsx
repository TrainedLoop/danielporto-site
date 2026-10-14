import { useTranslation } from "react-i18next";
import { linkedInHref } from "../content/contact";

type Props = {
  /** Button style: primary (yellow) or secondary (panel). */
  variant: "primary" | "secondary";
  onClick?: () => void;
};

/**
 * The "message me on LinkedIn" button (home hero, résumé header, story ending): opens the
 * LinkedIn profile from the profile links in a new tab. Renders nothing without that link.
 */
export function ContactButton({ variant, onClick }: Props) {
  const { t } = useTranslation();
  const linkedIn = linkedInHref(t("profile").links);
  if (!linkedIn) return null;
  return (
    <a className={`button button--${variant}`} href={linkedIn} target="_blank" rel="noopener" onClick={onClick}>
      {t("resume.contactCta")}
    </a>
  );
}
