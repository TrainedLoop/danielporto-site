/** The "contact me" mailto link: the address from the profile links plus a URI-encoded subject; null when there is no mailto link. */
export function contactHref(links: { label: string; href: string }[], subject: string): string | null {
  const mailto = links.find((link) => link.href.startsWith("mailto:"))?.href;
  if (!mailto) return null;
  return `${mailto}?subject=${encodeURIComponent(subject)}`;
}
