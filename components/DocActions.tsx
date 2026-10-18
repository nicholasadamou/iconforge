'use client';

import { useState } from 'react';
import ChatProviders from './ChatProviders';

export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [status, setStatus] = useState(label);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setStatus('Copied');
        } catch {
          setStatus('Clipboard unavailable');
        }
        window.setTimeout(() => setStatus(label), 2000);
      }}
    >
      <i className="fa-regular fa-copy" aria-hidden="true" />{' '}
      <span aria-live="polite">{status}</span>
    </button>
  );
}

export default function DocActions({ content, slug }: { content: string; slug: string }) {
  const source = `https://github.com/nicholasadamou/iconforge/blob/main/docs/${slug || 'README'}.md`;
  return (
    <div className="doc-actions">
      <a href={source}>
        <i className="fa-regular fa-pen-to-square" aria-hidden="true" />
        Edit on GitHub
      </a>
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <i className="fa-solid fa-angles-up" aria-hidden="true" />
        Scroll to top
      </button>
      <CopyButton text={content} label="Copy as Markdown" />
      <ChatProviders content={content} />
    </div>
  );
}

export function CodeBlock({ source, language }: { source: string; language: string }) {
  return (
    <div className="code-block">
      <div className="code-heading">
        <span>{language || 'text'}</span>
        <CopyButton text={source} />
      </div>
      <pre>
        <code>
          {source
            .trimEnd()
            .split('\n')
            .map((line, index) => (
              <span className="code-line" key={index}>
                <span aria-hidden="true">{index + 1}</span>
                {line}
                {'\n'}
              </span>
            ))}
        </code>
      </pre>
    </div>
  );
}
