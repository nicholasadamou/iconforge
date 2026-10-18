import Link from 'next/link';
import { docPages, docHref } from '@/lib/doc-pages';

export default function DocsNav({ slug }: { slug: string }) {
  return (
    <nav className="docs-navigation" aria-label="Documentation pages">
      <Link href="/docs">IconForge overview</Link>
      {['Start here', 'Guides', 'Project'].map((group) => (
        <div key={group}>
          <p>{group}</p>
          {docPages
            .filter((page) => page.group === group)
            .map((page) => (
              <Link
                key={page.slug}
                href={docHref(page.slug)}
                aria-current={slug === page.slug ? 'page' : undefined}
              >
                {page.title}
              </Link>
            ))}
        </div>
      ))}
      <Link className="docs-home" href="/">
        Back to home
      </Link>
    </nav>
  );
}
