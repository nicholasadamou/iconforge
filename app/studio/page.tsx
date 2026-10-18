'use client';

import Link from 'next/link';
import Brand from '@/components/Brand';
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

export default function Studio() {
  const [state, setState] = useState<CanvasState>({
    foregroundColor: '#a34329',
    backgroundColor: 'transparent',
    size: 85,
    stackedSize: 60,
    icon: defaultIcon,
    stackedIcon: defaultIcon,
    stackedSelected: false,
  });

  const [panel, setPanel] = useState('icons');

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
    <main id="main" className="studio-app" data-panel={panel}>
      <header className="studio-toolbar">
        <Brand />
        <h1>Make your mark.</h1>
        <Link href="/docs/quick-start">Help & guides</Link>
      </header>
      <nav className="studio-tabs" aria-label="Studio panels">
        <button aria-pressed={panel === 'icons'} onClick={() => setPanel('icons')}>
          1. Choose an icon
        </button>
        <button aria-pressed={panel === 'design'} onClick={() => setPanel('design')}>
          2. Customize & export
        </button>
      </nav>
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
    </main>
  );
}
