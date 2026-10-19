import { readFile } from 'node:fs/promises';
import path from 'node:path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import DocsNav from '@/components/DocsNav';
import DocActions from '@/components/DocActions';
import CodeBlock from '@/components/CodeBlock';
import Diagram from '@/components/Diagram';
import { docPages, docHref } from '@/lib/doc-pages';

export const dynamicParams = false;
export function generateStaticParams() {
  return docPages.map((page) => ({ slug: page.slug ? [page.slug] : [] }));
}
type Props = { params: Promise<{ slug?: string[] }> };
const headingId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
export async function generateMetadata({ params }: Props) {
  const slug = ((await params).slug ?? []).join('/');
  const page = docPages.find((page) => page.slug === slug);
  return {
    title: page ? `${page.title} — Documentation` : 'Page not found',
    description: page?.description,
  };
}
export default async function DocsPage({ params }: Props) {
  const slug = ((await params).slug ?? []).join('/');
  const page = docPages.find((page) => page.slug === slug);
  if (!page) notFound();
  const content = await readFile(
    path.join(process.cwd(), 'docs', `${slug || 'README'}.md`),
    'utf8',
  );
  const headings = [...content.matchAll(/^## (.+)$/gm)].map((match) => match[1]);
  const sections = content.replace(/^# .+\n+/, '').split(/^## /m);
  const next = docPages[docPages.indexOf(page) + 1];
  const toc = headings.map((heading) => (
    <a href={`#${headingId(heading)}`} key={heading}>
      {heading}
    </a>
  ));
  const render = (text: string) => (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children }) => (
          <Link
            href={
              href?.endsWith('.md')
                ? docHref(href.replace('.md', '').replace('README', ''))
                : href || '/docs'
            }
          >
            {children}
          </Link>
        ),
        pre: ({ children }) => <>{children}</>,
        code: ({ className, children, node }) =>
          className === 'language-mermaid' ? (
            <Diagram source={String(children)} />
          ) : className || node?.position?.start.line !== node?.position?.end.line ? (
            <CodeBlock
              source={String(children)}
              language={className?.replace('language-', '') || ''}
            />
          ) : (
            <code>{children}</code>
          ),
      }}
    >
      {text}
    </Markdown>
  );
  return (
    <div className="docs-layout">
      <aside className="docs-sidebar" aria-label="Documentation navigation">
        <DocsNav slug={slug} />
      </aside>
      <main id="main" className="docs-main">
        <header className="doc-heading">
          <p className="docs-breadcrumb">{page.group}</p>
          <div className="doc-brand">
            <i className="fa-solid fa-icons" aria-hidden="true" />
          </div>
          <h1>{page.title}</h1>
          {render(sections[0])}
        </header>
        <details className="docs-mobile-toc">
          <summary>On this page</summary>
          <nav>{toc}</nav>
        </details>
        {sections.slice(1).map((section) => {
          const title = section.split('\n')[0];
          return (
            <section className="doc-section" id={headingId(title)} key={title}>
              {render(`## ${section}`)}
            </section>
          );
        })}
        <div className="doc-actions-mobile">
          <DocActions content={content} slug={slug} />
        </div>
        {next && (
          <Link className="docs-next" href={docHref(next.slug)}>
            <span>Continue reading</span>
            <strong>{next.title}</strong>
          </Link>
        )}
        <footer className="docs-footer">
          <Link href="/">Back to home</Link>
          <a href="https://github.com/nicholasadamou/iconforge/tree/main/docs">
            View documentation source
          </a>
        </footer>
      </main>
      <aside className="docs-toc" aria-label="On this page">
        <p>On this page</p>
        {toc}
        <DocActions content={content} slug={slug} />
      </aside>
    </div>
  );
}
