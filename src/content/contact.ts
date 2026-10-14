type Link = { label: string; href: string };

/**
 * The owner's LinkedIn profile from the profile links, the destination of every "contact me"
 * button (LinkedIn has no public compose-message URL, so the button opens the profile).
 * Null when the profile has no LinkedIn link.
 */
export function linkedInHref(links: Link[]): string | null {
  return links.find((link) => /^https:\/\/([^/]+\.)?linkedin\.com\//.test(link.href))?.href ?? null;
}
