'use client';
import { useEffect, useId, useRef, useState } from 'react';

export default function Diagram({ source }: { source: string }) {
  const container = useRef<HTMLDivElement>(null);
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    import('mermaid')
      .then(async ({ default: mermaid }) => {
        mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: 'neutral' });
        const { svg } = await mermaid.render(`diagram${id}`, source);
        if (active && container.current) container.current.innerHTML = svg;
      })
      .catch(() => {
        if (active) setError('Diagram could not be rendered. The source is available below.');
      });
    return () => {
      active = false;
    };
  }, [id, source]);
  return (
    <figure className="diagram">
      <figcaption>Workflow</figcaption>
      <div ref={container} role="img" aria-label="Workflow diagram" />
      {error && <p role="alert">{error}</p>}
      <details>
        <summary>Diagram source</summary>
        <pre>{source}</pre>
      </details>
    </figure>
  );
}
