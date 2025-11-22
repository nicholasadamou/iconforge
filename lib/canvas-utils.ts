import { Icon, CanvasState } from '@/types/icon';

const CANVAS_SIZE = 512;

export function drawIcon(
  canvas: HTMLCanvasElement,
  state: CanvasState
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx || !state.icon) return;

  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;

  // Clear canvas
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  // Draw background (only if not transparent)
  if (state.backgroundColor !== 'transparent') {
    ctx.fillStyle = state.backgroundColor;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }

  // Configure text rendering
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Determine font family and weight based on icon style
  const getFontFamily = (icon: Icon) => {
    if (icon.styles.includes('brands')) {
      return '"Font Awesome 6 Brands"';
    }
    return '"Font Awesome 6 Free"';
  };

  const getFontWeight = (icon: Icon) => {
    if (icon.styles.includes('brands')) {
      return 400;
    }
    if (icon.styles.includes('regular')) {
      return 400;
    }
    return 900;
  };

  // Draw main icon
  const fontSize = (CANVAS_SIZE * state.size) / 100;
  const fontFamily = getFontFamily(state.icon);
  const fontWeight = getFontWeight(state.icon);
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  
  // Create mask for transparent icon
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillText(state.icon.unicode, CANVAS_SIZE / 2, CANVAS_SIZE / 2);

  // Draw icon with foreground color
  ctx.fillStyle = state.foregroundColor;
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillText(state.icon.unicode, CANVAS_SIZE / 2, CANVAS_SIZE / 2);

  // Draw stacked icon if enabled
  if (state.stackedSelected && state.stackedIcon) {
    ctx.save();
    const stackedFontSize = (CANVAS_SIZE * state.stackedSize) / 100;
    const stackedFontFamily = getFontFamily(state.stackedIcon);
    const stackedFontWeight = getFontWeight(state.stackedIcon);
    ctx.font = `${stackedFontWeight} ${stackedFontSize}px ${stackedFontFamily}`;
    ctx.globalCompositeOperation = 'xor';
    ctx.fillText(state.stackedIcon.unicode, CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    ctx.restore();
  }
}

export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Failed to convert canvas to blob'));
      }
    });
  });
}

export function canvasToDataURL(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL('image/png');
}

export function rgbaToString(r: number, g: number, b: number, a: number): string {
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})`;
}

export function hexToRgba(hex: string): { r: number; g: number; b: number; a: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: 1,
      }
    : { r: 0, g: 0, b: 0, a: 1 };
}
