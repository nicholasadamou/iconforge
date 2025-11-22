'use client';

import { useState, useEffect } from 'react';
import IconCanvas from '@/components/IconCanvas';
import ColorPicker from '@/components/ColorPicker';
import IconGrid from '@/components/IconGrid';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SizeControls from '@/components/SizeControls';
import DownloadControls from '@/components/DownloadControls';
import { icons, defaultIcon } from '@/lib/icons';
import { CanvasState } from '@/types/icon';
import { useDynamicFavicon } from '@/hooks/useDynamicFavicon';
import { useIconSearch } from '@/hooks/useIconSearch';
import { useDownload } from '@/hooks/useDownload';

export default function Home() {
  const [state, setState] = useState<CanvasState>({
    foregroundColor: '#ff3860',
    backgroundColor: 'transparent',
    size: 85,
    stackedSize: 60,
    icon: defaultIcon,
    stackedIcon: defaultIcon,
    stackedSelected: false,
  });

  // Custom hooks
  const { searchQuery, setSearchQuery, filteredIcons } = useIconSearch(icons);
  const { downloading, downloadFormat, handleDownload, cycleDownloadFormat } = useDownload();
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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Controls */}
      <div className="w-full lg:w-1/2 bg-gray-900 flex flex-col lg:h-screen overflow-y-auto">
        <div className="flex-1 flex flex-col items-center justify-start p-8">
          <div className="w-full max-w-md space-y-6">
            <Header />

            {/* Canvas Preview */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6">
              <IconCanvas state={state} />
            </div>

            {/* Color Controls */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
              <ColorPicker
                color={state.foregroundColor}
                onChange={(color) =>
                  setState((prev) => ({ ...prev, foregroundColor: color }))
                }
                label="Icon Color"
              />
              <div>
                <ColorPicker
                  color={state.backgroundColor}
                  onChange={(color) =>
                    setState((prev) => ({ ...prev, backgroundColor: color }))
                  }
                  label="Background Color"
                />
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    id="transparent"
                    checked={state.backgroundColor === 'transparent'}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        backgroundColor: e.target.checked ? 'transparent' : '#ffffff',
                      }))
                    }
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="transparent" className="text-sm text-gray-300">
                    Transparent background
                  </label>
                </div>
              </div>
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
          </div>
        </div>

        <Footer />
      </div>

      {/* Right Panel - Icon Grid */}
      <div className="w-full lg:w-1/2 h-screen bg-gray-800 overflow-y-auto border-t lg:border-t-0 lg:border-l border-gray-700">
        <div className="sticky top-0 bg-gray-900 p-4 z-10 shadow-md border-b border-gray-700">
          <input
            type="text"
            placeholder="Search icons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
          />
        </div>
        <div className="bg-gray-800">
          <IconGrid
            icons={filteredIcons}
            onSelectIcon={(icon) =>
              setState((prev) => ({
                ...prev,
                [prev.stackedSelected ? 'stackedIcon' : 'icon']: icon,
              }))
            }
          />
        </div>
      </div>
    </div>
  );
}
