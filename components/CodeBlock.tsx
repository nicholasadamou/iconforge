import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import xml from 'highlight.js/lib/languages/xml';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import css from 'highlight.js/lib/languages/css';
import yaml from 'highlight.js/lib/languages/yaml';
import { CopyButton } from './DocActions';

for (const [name, grammar] of Object.entries({
  bash,
  xml,
  typescript,
  javascript,
  json,
  css,
  yaml,
})) {
  hljs.registerLanguage(name, grammar);
}

export default function CodeBlock({ source, language }: { source: string; language: string }) {
  const code = source.trimEnd();
  const highlighted = hljs.getLanguage(language)
    ? hljs.highlight(code, { language, ignoreIllegals: true }).value
    : null;
  return (
    <div className="code-block">
      <div className="code-heading">
        <span>{language || 'text'}</span>
        <CopyButton text={source} />
      </div>
      <pre className="highlighted-code">
        <span className="code-gutter" aria-hidden="true">
          {code
            .split('\n')
            .map((_, index) => index + 1)
            .join('\n')}
        </span>
        {highlighted === null ? (
          <code>{code}</code>
        ) : (
          <code dangerouslySetInnerHTML={{ __html: highlighted }} />
        )}
      </pre>
    </div>
  );
}
