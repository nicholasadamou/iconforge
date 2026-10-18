import Link from 'next/link';
export default function NotFound() {
  return (
    <main id="main" className="wrap how-section">
      <div>
        <p className="eyebrow">404 · PAGE NOT FOUND</p>
        <h1>This page is missing its mark.</h1>
        <p>Head back to the studio or find your next step in the documentation.</p>
      </div>
      <div>
        <Link className="primary-link" href="/">
          Open the studio
        </Link>
        <p>
          <Link href="/docs">Browse documentation</Link>
        </p>
      </div>
    </main>
  );
}
