import Link from 'next/link';
import Brand, { repository } from './Brand';

const groups = [
  {
    title: 'The studio',
    links: [
      ['Create an icon', '/#studio'],
      ['Colors & stacking', '/docs/customization'],
      ['Export formats', '/docs/exporting'],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['Getting started', '/docs/quick-start'],
      ['Documentation', '/docs'],
      ['How it works', '/docs/architecture'],
      ['Local development', '/docs/development'],
    ],
  },
  {
    title: 'In the open',
    links: [
      ['GitHub repository', repository],
      ['Feedback & issues', `${repository}/issues`],
      ['Credits & privacy', '/docs/credits'],
      ['Brand mark', '/logo.svg'],
    ],
  },
];
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>
              A little icon.
              <br />A lot of character.
            </p>
            <span>A small workshop for thoughtful builders.</span>
          </div>
          {groups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2>{group.title}</h2>
              {group.links.map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} IconForge</span>
          <a href={`${repository}/blob/main/LICENSE`}>PolyForm Shield license</a>
          <span className="footer-note">Made for the smallest details.</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
