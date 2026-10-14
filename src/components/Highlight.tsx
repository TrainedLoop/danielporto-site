/**
 * Renders a locale string where `**…**` marks the highlighted figure: the marked parts become
 * `<strong className="highlight">`, the rest stays plain text (no HTML is parsed).
 */
export function Highlight({ text }: { text: string }) {
  // After splitting on the marker, odd indexes are the parts that were between `**` pairs.
  const parts = text.split("**");
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <strong key={`${index}-${part}`} className="highlight">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}
