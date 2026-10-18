'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import IconCanvas from '@/components/IconCanvas';
import ColorPicker from '@/components/ColorPicker';
import IconGrid from '@/components/IconGrid';
import SizeControls from '@/components/SizeControls';
import DownloadControls from '@/components/DownloadControls';
import { icons, defaultIcon } from '@/lib/icons';
import { CanvasState } from '@/types/icon';
import { useDynamicFavicon } from '@/hooks/useDynamicFavicon';
import { useIconSearch } from '@/hooks/useIconSearch';
import { useDownload } from '@/hooks/useDownload';

export default function Home() {
  const [state, setState] = useState<CanvasState>({
    foregroundColor: '#a34329',
    backgroundColor: 'transparent',
    size: 85,
    stackedSize: 60,
    icon: defaultIcon,
    stackedIcon: defaultIcon,
    stackedSelected: false,
  });

  // Custom hooks
  const { searchQuery, setSearchQuery, filteredIcons } = useIconSearch(icons);
  const { error, downloading, downloadFormat, handleDownload, cycleDownloadFormat } = useDownload();
  const { updateFavicon } = useDynamicFavicon();

  // Update favicon whenever state changes
  useEffect(() => {
    // Small delay to ensure canvas has been rendered with new state
    const timeoutId = setTimeout(() => {
      updateFavicon();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [state, updateFavicon]);

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
            <Link className="primary-link" href="#studio">
              Create your favicon{' '}
              <i className="fa-solid fa-wand-magic-sparkles" aria-hidden="true" />
            </Link>
            <Link className="text-link" href="/docs/quick-start">
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
      <section className="studio-section" id="studio">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">YOUR NEXT FAVICON STARTS HERE</p>
              <h2>Make your mark.</h2>
            </div>
            <p>Pick a shape. Find your color. Make it yours.</p>
          </div>
          <div className="editor-layout">
            <div className="editor-controls">
              <div className="preview-card">
                <div className="panel-label">
                  <span>LIVE PREVIEW</span>
                  <span>512 × 512</span>
                </div>
                <IconCanvas state={state} />
                <p>{state.icon?.label}</p>
              </div>
              <div className="control-card">
                <ColorPicker
                  color={state.foregroundColor}
                  onChange={(color) => setState((prev) => ({ ...prev, foregroundColor: color }))}
                  label="Icon Color"
                />
                <ColorPicker
                  color={state.backgroundColor}
                  onChange={(color) => setState((prev) => ({ ...prev, backgroundColor: color }))}
                  label="Background Color"
                />
                <label className="check-label">
                  <input
                    type="checkbox"
                    checked={state.backgroundColor === 'transparent'}
                    onChange={(event) =>
                      setState((prev) => ({
                        ...prev,
                        backgroundColor: event.target.checked ? 'transparent' : '#ffffff',
                      }))
                    }
                  />{' '}
                  Transparent background
                </label>
              </div>
              <SizeControls
                state={state}
                onChange={(updates) => setState((prev) => ({ ...prev, ...updates }))}
              />
              <DownloadControls
                downloading={downloading}
                format={downloadFormat}
                onDownload={() => handleDownload()}
                onFormatChange={cycleDownloadFormat}
              />
              {error && <p role="alert">{error}</p>}
              <p className="download-note">
                Made locally in your browser. <Link href="/docs/exporting">About exports</Link>
              </p>
            </div>
            <div className="icon-library">
              <div className="library-heading">
                <label htmlFor="icon-search">Find your shape</label>
                <span>{filteredIcons.length.toLocaleString()} icons</span>
              </div>
              <div className="icon-search">
                <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
                <input
                  id="icon-search"
                  placeholder="Search icons… try coffee, code, or leaf"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} aria-label="Clear icon search">
                    ×
                  </button>
                )}
              </div>
              <div className="icon-scroll">
                <IconGrid
                  key={searchQuery}
                  icons={filteredIcons}
                  onSelectIcon={(icon) =>
                    setState((prev) => ({
                      ...prev,
                      [prev.stackedSelected ? 'stackedIcon' : 'icon']: icon,
                    }))
                  }
                />
                {!filteredIcons.length && (
                  <div className="empty-state">
                    <h3>No icons found.</h3>
                    <p>Try a broader word, or start fresh.</p>
                    <button onClick={() => setSearchQuery('')}>Clear search</button>
                  </div>
                )}
              </div>
              <div className="library-foot">
                Font Awesome Free <span>Solid · Regular · Brands</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="wrap how-section">
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
    </main>
  );
}
