import Link from 'next/link';
import Image from 'next/image';
import MarketingSections from '@/components/MarketingSections';

export default function Home() {
  return (
    <main id="main">
      <section className="wrap hero">
        <div>
          <p className="eyebrow">
            <span className="status-dot" /> THE ICONFORGE STUDIO
          </p>
          <h1>
            Small icon.
            <br />
            <em>Big character.</em>
          </h1>
          <p className="hero-copy">
            Give your next idea a mark of its own. Pick an icon, make it yours, and bring a little
            character to every tab.
          </p>
          <div className="hero-actions">
            <Link className="primary-link" href="/studio">
              Create your favicon{' '}
              <i className="fa-solid fa-wand-magic-sparkles" aria-hidden="true" />
            </Link>
            <Link className="text-link" href="#getting-started">
              How it works
            </Link>
          </div>
          <p className="hero-meta">
            1,895 icons <span>·</span> Live preview <span>·</span> Made in your browser
          </p>
        </div>
        <div className="hero-art" aria-label="A collection of favicon ideas">
          <div className="art-label">A LITTLE DETAIL. ALL YOURS.</div>
          <div className="sample-icons">
            {[
              'seedling',
              'bolt',
              'moon',
              'asterisk',
              'mountain-sun',
              'paper-plane',
              'code',
              'heart',
              'sun',
            ].map((name, index) => (
              <div key={name} className={`sample-icon sample-${index}`}>
                <i aria-hidden="true" className={`fa-solid fa-${name}`} />
              </div>
            ))}
          </div>
          <div className="browser-sample">
            <span>● ● ●</span>
            <span>
              <Image src="/logo.svg" width="14" height="14" alt="" /> Your next big idea
            </span>
            <span>+</span>
          </div>
          <p>Something small. Unmistakably you.</p>
        </div>
      </section>
      <section className="wrap how-section" id="getting-started">
        <div>
          <p className="eyebrow">FROM IDEA TO BROWSER TAB</p>
          <h2>
            Three steps.
            <br />
            <em>One little masterpiece.</em>
          </h2>
          <Link className="text-link" href="/docs/quick-start">
            Read the quick start
          </Link>
        </div>
        <ol>
          {[
            [
              'Find your shape',
              'Search 1,895 Font Awesome icons, from simple symbols to familiar brands.',
            ],
            [
              'Add your character',
              'Choose colors, adjust the size, or stack a second icon for something different.',
            ],
            [
              'Give it a home',
              'Download your favicon and add it to your website. A small finishing touch, sorted.',
            ],
          ].map(([title, text], index) => (
            <li key={title}>
              <span>0{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <MarketingSections />
    </main>
  );
}
