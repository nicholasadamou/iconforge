import { useState } from 'react';
import { saveAs } from 'file-saver';
import { canvasToBlob } from '@/lib/canvas-utils';
import { DownloadFormat } from '@/components/DownloadControls';

export function useDownload() {
  const [downloading, setDownloading] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<DownloadFormat>('ico');

  const handleDownload = async (canvasSelector: string = 'canvas') => {
    const canvas = document.querySelector(canvasSelector) as HTMLCanvasElement;
    if (!canvas) return;

    setDownloading(true);
    try {
      if (downloadFormat === 'ico-advanced') {
        // Open RealFaviconGenerator with the canvas data
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
        // For ICO and PNG, download as PNG (browsers will handle ICO conversion)
        const blob = await canvasToBlob(canvas);
        const extension = downloadFormat === 'ico' ? 'ico' : 'png';
        const filename = `favicon.${extension}`;
        saveAs(blob, filename);
      }
    } catch (error) {
      console.error('Download failed:', error);
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
    downloading,
    downloadFormat,
    handleDownload,
    cycleDownloadFormat,
  };
}
