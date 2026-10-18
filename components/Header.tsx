'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Brand, { GithubLink, repository } from './Brand';
import { docPages, docHref } from '@/lib/doc-pages';

export default function Header() {
  const pathname = usePathname();
  const isDocs = pathname.startsWith('/docs');
  const menu = useRef<HTMLDialogElement>(null);
  const search = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => {
    menu.current?.close();
    search.current?.close();
    setMenuOpen(false);
  };
  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        menu.current?.close();
        setMenuOpen(false);
        search.current?.showModal();
      }
    };
    document.addEventListener('keydown', shortcut);
    return () => document.removeEventListener('keydown', shortcut);
  }, []);
  const results = docPages.filter((page) =>
    `${page.title} ${page.description}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className={isDocs ? 'docs-header' : 'site-header'}>
        <div className={isDocs ? 'docs-header-inner' : 'wrap header-inner'}>
          <Brand />
          {isDocs && <span className="docs-header-label">Documentation</span>}
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link href="/#studio" aria-current={!isDocs ? 'page' : undefined}>
              Create an icon
            </Link>
            <Link
              href="/docs/quick-start"
              aria-current={pathname === '/docs/quick-start' ? 'page' : undefined}
            >
              Getting started
            </Link>
            <Link href="/docs" aria-current={pathname === '/docs' ? 'page' : undefined}>
              Documentation
            </Link>
          </nav>
          <button className="header-search-trigger" onClick={() => search.current?.showModal()}>
            <span className="sr-only">Search documentation</span>
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
            <kbd>⌘ K</kbd>
          </button>
          <GithubLink />
          <button
            className="menu-toggle"
            aria-label="Menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            onClick={() => {
              menu.current?.showModal();
              setMenuOpen(true);
            }}
          >
            Menu ☰
          </button>
        </div>
      </header>
      <dialog
        ref={menu}
        className="mobile-dialog"
        aria-label="Navigation"
        onClose={() => setMenuOpen(false)}
      >
        <div className="mobile-panel-heading">
          <Brand />
          <button className="close-overlay" onClick={close} aria-label="Close menu">
            ×
          </button>
        </div>
        <div className="mobile-panel-body">
          <p className="eyebrow">A little detail goes a long way</p>
          <h2>What’s next?</h2>
          <button
            className="mobile-search-trigger"
            onClick={() => {
              close();
              search.current?.showModal();
            }}
          >
            Search guides & documentation <kbd>⌘ K</kbd>
          </button>
          <nav className="mobile-primary" aria-label="Mobile navigation" onClick={close}>
            <Link className="mobile-feature-card" href="/#studio">
              <span className="nav-card-icon">✳</span>
              <span>
                <strong>Create an icon</strong>
                <small>A little mark for your next big idea.</small>
              </span>
            </Link>
            <div className="mobile-resource-grid">
              <Link href="/docs/quick-start">
                <strong>Getting started</strong>
                <small>From an icon to your first favicon.</small>
              </Link>
              <Link href="/docs">
                <strong>Documentation</strong>
                <small>Everything you need, written down.</small>
              </Link>
            </div>
          </nav>
          <div className="mobile-tasks">
            <div className="mobile-section-label">
              <h3>Browse by task</h3>
              <span>Make it yours</span>
            </div>
            <nav onClick={close}>
              {docPages.slice(2, 6).map((page) => (
                <Link key={page.slug} href={docHref(page.slug)}>
                  {page.title}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mobile-starter">
            <p className="eyebrow">Not sure where to begin?</p>
            <h3>Start with a simple shape.</h3>
            <p>Choose an icon, find your color, and give your browser tab a little character.</p>
            <Link onClick={close} href="/docs/quick-start">
              Make your first favicon
            </Link>
          </div>
        </div>
        <div className="mobile-panel-footer">
          <a href={repository}>GitHub</a>
          <a href={`${repository}/issues`}>Feedback & issues</a>
        </div>
      </dialog>
      <dialog
        ref={search}
        className="search-dialog"
        aria-labelledby="search-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="overlay-heading">
          <div>
            <p className="eyebrow">The IconForge guide</p>
            <h2 id="search-title">Find your next step.</h2>
          </div>
          <button className="close-overlay" onClick={close} aria-label="Close search">
            ×
          </button>
        </div>
        <div className="panel-search">
          <input
            aria-label="Search guides"
            placeholder="Search guides and documentation…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="search-results-scroll">
          {results.map((page) => (
            <Link
              className="search-result"
              key={page.slug}
              onClick={close}
              href={docHref(page.slug)}
            >
              <span className="result-copy">
                <strong>{page.title}</strong>
                <small>{page.description}</small>
              </span>
            </Link>
          ))}
          {!results.length && (
            <p className="search-no-results">No guides found. Try “export” or “colors”.</p>
          )}
        </div>
        <div className="search-panel-footer">Escape to close · Tab to move between results</div>
      </dialog>
    </>
  );
}
