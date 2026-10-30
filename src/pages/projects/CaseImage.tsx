import type { CaseStudy } from "../../i18n/locales/pt";

const BASE = import.meta.env.BASE_URL;

/** Width of the small version of a screenshot (`srcSmall`), for phones. */
const SMALL_WIDTH = 800;

/**
 * A case study screenshot: lazy-loaded, with its intrinsic size (no layout shift) and, when
 * there is a small version, a srcset so phones download the ~800px file.
 */
export function CaseImage({
  image,
  className,
  sizes,
}: {
  image: NonNullable<CaseStudy["image"]>;
  className: string;
  sizes: string;
}) {
  const { src, srcSmall, width, height, alt } = image;
  return (
    <img
      className={className}
      src={`${BASE}${src}`}
      srcSet={srcSmall ? `${BASE}${srcSmall} ${SMALL_WIDTH}w, ${BASE}${src} ${width}w` : undefined}
      sizes={srcSmall ? sizes : undefined}
      width={width}
      height={height}
      alt={alt}
      loading="lazy"
      decoding="async"
    />
  );
}
