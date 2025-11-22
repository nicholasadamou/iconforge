import { useEffect } from 'react';

export const useDynamicFavicon = (canvasSelector: string = 'canvas') => {
  useEffect(() => {
    const updateFavicon = () => {
      const canvas = document.querySelector(canvasSelector) as HTMLCanvasElement;
      if (!canvas) return;

      try {
        // Get the canvas data as a URL
        const faviconUrl = canvas.toDataURL('image/png');

        // Find or create the favicon link element
        let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
        
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.head.appendChild(link);
        }

        // Update the favicon
        link.href = faviconUrl;
      } catch (error) {
        console.error('Failed to update favicon:', error);
      }
    };

    // Update favicon after a short delay to ensure canvas is rendered
    const timeoutId = setTimeout(updateFavicon, 100);

    return () => clearTimeout(timeoutId);
  }, [canvasSelector]);

  return { updateFavicon: () => {
    const canvas = document.querySelector(canvasSelector) as HTMLCanvasElement;
    if (canvas) {
      const faviconUrl = canvas.toDataURL('image/png');
      let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = faviconUrl;
    }
  }};
};
