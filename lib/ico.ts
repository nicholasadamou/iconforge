import { canvasToBlob } from './canvas-utils';

/** ICO dimensions encode 256 as zero; a PNG payload preserves transparency. */
export function pngToIco(png: Blob): Blob {
  const header = new ArrayBuffer(22);
  const view = new DataView(header);
  view.setUint16(2, 1, true);
  view.setUint16(4, 1, true);
  view.setUint16(10, 1, true);
  view.setUint16(12, 32, true);
  view.setUint32(14, png.size, true);
  view.setUint32(18, 22, true);
  return new Blob([header, png], { type: 'image/x-icon' });
}

export async function canvasToIco(canvas: HTMLCanvasElement): Promise<Blob> {
  const scaled = document.createElement('canvas');
  scaled.width = scaled.height = 256;
  const context = scaled.getContext('2d');
  if (!context) throw new Error('Your browser could not create the icon canvas.');
  context.drawImage(canvas, 0, 0, 256, 256);
  return pngToIco(await canvasToBlob(scaled));
}
