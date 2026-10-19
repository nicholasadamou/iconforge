import Link from 'next/link';

const features = [
  [
    'palette',
    'Your colors. Your character.',
    'Dial in a hex color, keep the background transparent, or give your icon a solid backdrop.',
  ],
  [
    'layer-group',
    'A little more you.',
    'Adjust the size and layer a second shape to make a familiar symbol feel personal.',
  ],
  [
    'eye',
    'See every change.',
    'A live preview keeps the result in view while you experiment. No guesswork, no export loop.',
  ],
];
const questions = [
  ['Do I need an account?', 'No. Open the studio, choose an icon, and start creating.'],
  [
    'Which format should I choose?',
    'Choose ICO for a conventional favicon or PNG for a 512 × 512 image. The export guide covers adding either to your website.',
  ],
  [
    'Does my design leave my browser?',
    'Standard ICO and PNG exports are generated locally. Advanced ICO export uses the external RealFaviconGenerator service.',
  ],
  [
    'Can I use brand icons?',
    'The library includes brand symbols. Their owners’ trademarks still apply; use them only where you have the appropriate rights.',
  ],
];
export default function MarketingSections() {
  return (
    <>
      <section className="marketing-band">
        <div className="wrap">
          <div className="marketing-heading">
            <p className="eyebrow">SMALL TOOLS. ROOM TO PLAY.</p>
            <h2>
              Make the details <em>feel like you.</em>
            </h2>
            <p>Everything you need for a distinctive browser tab, in one focused workspace.</p>
          </div>
          <div className="feature-grid">
            {features.map(([icon, title, description]) => (
              <article key={icon}>
                <i className={`fa-solid fa-${icon}`} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <Link className="primary-link" href="/studio">
            Explore the studio <i className="fa-solid fa-palette" aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section className="wrap inspiration-section">
        <div>
          <p className="eyebrow">A STARTING POINT FOR EVERY IDEA</p>
          <h2>
            Side project.
            <br />
            Personal corner.
            <br />
            <em>Next big thing.</em>
          </h2>
          <p>
            A simple mark makes your site easier to recognize among a dozen open tabs. Start with a
            shape that says something about you.
          </p>
          <Link className="text-link" href="/studio">
            Find your shape
          </Link>
        </div>
        <div className="idea-cards">
          {[
            ['code', 'The weekend build', 'Something worth shipping.'],
            ['mug-hot', 'The personal blog', 'A little space of your own.'],
            ['seedling', 'The fresh start', 'Give a new idea room to grow.'],
          ].map(([icon, title, copy]) => (
            <Link href={`/studio?icon=${icon}`} key={icon}>
              <i className={`fa-solid fa-${icon}`} aria-hidden="true" />
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
              <span>Make yours</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="marketing-band">
        <div className="wrap export-section">
          <div className="export-art" aria-hidden="true">
            <i className="fa-regular fa-file-image" />
            <span>.ico</span>
            <span>.png</span>
          </div>
          <div>
            <p className="eyebrow">READY FOR YOUR NEXT RELEASE</p>
            <h2>
              From your browser.
              <br />
              <em>To everyone’s tabs.</em>
            </h2>
            <p>
              Download an ICO or PNG directly from the studio. No account, no upload, and no detour
              for a standard export.
            </p>
            <div className="hero-actions">
              <Link className="primary-link" href="/studio">
                Create a favicon
              </Link>
              <Link className="text-link" href="/docs/exporting">
                Read the export guide
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="wrap faq-section">
        <div>
          <p className="eyebrow">A FEW GOOD QUESTIONS</p>
          <h2>
            The little details,
            <br />
            <em>explained.</em>
          </h2>
          <Link className="text-link" href="/docs">
            Explore the documentation
          </Link>
        </div>
        <div>
          {questions.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="wrap final-cta">
        <p className="eyebrow">YOUR NEXT FAVICON STARTS HERE</p>
        <h2>
          Give your idea
          <br />
          <em>its own little mark.</em>
        </h2>
        <p>Pick a shape. Find your color. Make it yours.</p>
        <Link className="primary-link" href="/studio">
          Open the studio <i className="fa-solid fa-wand-magic-sparkles" aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
