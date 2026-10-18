import { readFile } from 'node:fs/promises';
import path from 'node:path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
  const nav = (
    <nav aria-label="Documentation pages">
      {['Start here', 'Guides', 'Project'].map((group) => (
        <div key={group}>
          <p>{group}</p>
          {docPages
            .filter((item) => item.group === group)
            .map((item) => (
              <Link
                key={item.slug}
                href={docHref(item.slug)}
                aria-current={slug === item.slug ? 'page' : undefined}
              >
                {item.title}
              </Link>
            ))}
        </div>
      ))}
    </nav>
  );
  return (
    <div className="docs-layout">
      <aside className="docs-sidebar" aria-label="Documentation navigation">
        <Link href="/#studio" className="docs-home">
          Back to the studio
        </Link>
        {nav}
      </aside>
      <main id="main" className="docs-main">
        <details className="docs-mobile-nav">
          <summary>Browse documentation</summary>
          {nav}
        </details>
        <p className="docs-breadcrumb">{page.group}</p>
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ children }) => <h2 id={headingId(String(children))}>{children}</h2>,
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
            pre: ({ children }) => <div className="code-block">{children}</div>,
            code: ({ className, children }) =>
              className === 'language-mermaid' ? (
                <Diagram source={String(children)} />
              ) : (
                <code className={className}>{children}</code>
              ),
          }}
        >
          {content}
        </Markdown>
        <div className="docs-next">
          <Link
            href={`https://github.com/nicholasadamou/iconforge/blob/main/docs/${slug || 'README'}.md`}
          >
            Edit this page on GitHub
          </Link>
          <Link href="/docs/quick-start">Quick start</Link>
        </div>
      </main>
      <aside className="docs-toc" aria-label="On this page">
        <p>On this page</p>
        {headings.map((heading) => (
          <a href={`#${headingId(heading)}`} key={heading}>
            {heading}
          </a>
        ))}
      </aside>
    </div>
  );
}
