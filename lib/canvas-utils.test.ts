import { hexToRgba, rgbaToString, canvasToDataURL } from './canvas-utils';

describe('canvas-utils', () => {
  describe('hexToRgba', () => {
    it('should convert hex color to rgba object', () => {
      const result = hexToRgba('#ff3860');
      expect(result).toEqual({
        r: 255,
        g: 56,
        b: 96,
        a: 1,
      });
    });

    it('should handle hex color without # prefix', () => {
      const result = hexToRgba('ffffff');
      expect(result).toEqual({
        r: 255,
        g: 255,
        b: 255,
        a: 1,
      });
    });

    it('should return black for invalid hex color', () => {
      const result = hexToRgba('invalid');
      expect(result).toEqual({
        r: 0,
        g: 0,
        b: 0,
        a: 1,
      });
    });

    it('should convert black correctly', () => {
      const result = hexToRgba('#000000');
      expect(result).toEqual({
        r: 0,
        g: 0,
        b: 0,
        a: 1,
      });
    });
  });

  describe('rgbaToString', () => {
    it('should convert rgba values to string', () => {
      const result = rgbaToString(255, 56, 96, 1);
      expect(result).toBe('rgba(255, 56, 96, 1)');
    });

    it('should round decimal values', () => {
      const result = rgbaToString(255.7, 56.3, 96.9, 0.5);
      expect(result).toBe('rgba(256, 56, 97, 0.5)');
    });

    it('should handle zero values', () => {
      const result = rgbaToString(0, 0, 0, 0);
      expect(result).toBe('rgba(0, 0, 0, 0)');
    });
  });

  describe('canvasToDataURL', () => {
    it('should convert canvas to data URL', () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      
      // Mock toDataURL since jsdom doesn't implement it
      canvas.toDataURL = jest.fn(() => 'data:image/png;base64,mockdata');
      
      const result = canvasToDataURL(canvas);
      expect(result).toMatch(/^data:image\/png;base64,/);
    });
  });
});
