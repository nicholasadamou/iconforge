import { useState } from 'react';
import { saveAs } from 'file-saver';
import { canvasToIco } from '@/lib/ico';
import { canvasToBlob } from '@/lib/canvas-utils';
import { DownloadFormat } from '@/components/DownloadControls';

export function useDownload() {
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<DownloadFormat>('ico');

  const handleDownload = async (canvasSelector: string = 'canvas') => {
    const canvas = document.querySelector(canvasSelector) as HTMLCanvasElement;
    setError('');
    if (!canvas) {
      setError('Preview is not ready. Try again after it loads.');
      return;
    }

    setDownloading(true);
    try {
      if (downloadFormat === 'ico-advanced') {
        if (!process.env.NEXT_PUBLIC_REAL_FAVICON_GENERATOR_API_KEY) {
          throw new Error('Advanced export is not configured. Choose PNG or ICO instead.');
        }
        const base64Image = canvas.toDataURL().split(',')[1];
        const formData = JSON.stringify({
          favicon_generation: {
            api_key: process.env.NEXT_PUBLIC_REAL_FAVICON_GENERATOR_API_KEY,
            master_picture: {
              type: 'inline',
              content: base64Image,
            },
            files_location: { type: 'no_location' },
            callback: { type: 'none' },
          },
        });

        // Create a form and submit it
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://realfavicongenerator.net/api/favicon_generator';
        form.target = '_blank';

        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'json_params';
        input.value = formData;

        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
      } else {
        const blob =
          downloadFormat === 'ico' ? await canvasToIco(canvas) : await canvasToBlob(canvas);
        const extension = downloadFormat === 'ico' ? 'ico' : 'png';
        const filename = `favicon.${extension}`;
        saveAs(blob, filename);
      }
    } catch (error) {
      console.error('Download failed:', error);
      setError(error instanceof Error ? error.message : 'Download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const cycleDownloadFormat = () => {
    setDownloadFormat((prev) => {
      if (prev === 'ico') return 'ico-advanced';
      if (prev === 'ico-advanced') return 'png';
      return 'ico';
    });
  };

  return {
    error,
    downloading,
    downloadFormat,
    handleDownload,
    cycleDownloadFormat,
  };
}
