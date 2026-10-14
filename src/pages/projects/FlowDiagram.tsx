/**
 * "How it works": the steps as boxes joined by arrows, horizontal on wide screens and
 * vertical on phones (CSS). The list is the content; the arrows are decoration only.
 */
export function FlowDiagram({ steps }: { steps: string[] }) {
  return (
    <ol className="flow">
      {steps.map((step, index) => (
        <li key={step} className="flow__step">
          <span className="flow__box">{step}</span>
          {index < steps.length - 1 && (
            <span className="flow__arrow" aria-hidden="true" />
          )}
        </li>
      ))}
    </ol>
  );
}
