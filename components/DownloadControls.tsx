'use client';

import Tooltip from './Tooltip';

export type DownloadFormat = 'ico' | 'ico-advanced' | 'png';

interface DownloadControlsProps {
  downloading: boolean;
  format: DownloadFormat;
  onDownload: () => void;
  onFormatChange: () => void;
}

export default function DownloadControls({
  downloading,
  format,
  onDownload,
  onFormatChange,
}: DownloadControlsProps) {
  const getFormatLabel = () => {
    if (format === 'ico') return '.ico';
    if (format === 'ico-advanced') return '.ico (advanced)';
    return '.png';
  };

  const getFormatDescription = () => {
    if (format === 'ico') {
      return (
        <div>
          <strong className="text-red-400">.ico</strong>
          <p className="mt-1">Standard favicon format. Best for simple icons, compatible with all browsers.</p>
        </div>
      );
    }
    if (format === 'ico-advanced') {
      return (
        <div>
          <strong className="text-red-400">.ico (advanced)</strong>
          <p className="mt-1">Opens RealFaviconGenerator for multi-platform favicons (iOS, Android, etc.) with customization options.</p>
        </div>
      );
    }
    return (
      <div>
        <strong className="text-red-400">.png</strong>
        <p className="mt-1">High-quality PNG image. Use for modern web apps or when you need transparency support.</p>
      </div>
    );
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={onDownload}
        disabled={downloading}
        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {downloading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Downloading...
          </span>
        ) : (
          'Download'
        )}
      </button>
      <div className="flex gap-2">
        <button
          onClick={onFormatChange}
          disabled={downloading}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
          title="Change format"
        >
          <span>{getFormatLabel()}</span>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <Tooltip content={getFormatDescription()}>
          <button
            type="button"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-3 rounded-lg shadow-md transition-colors cursor-help flex items-center h-full"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
