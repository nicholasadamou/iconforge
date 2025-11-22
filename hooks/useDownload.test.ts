import { renderHook, act } from '@testing-library/react';
import { useDownload } from './useDownload';

// Mock file-saver
jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

// Mock canvas-utils
jest.mock('@/lib/canvas-utils', () => ({
  canvasToBlob: jest.fn(() => Promise.resolve(new Blob())),
}));

describe('useDownload', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Setup canvas mock
    document.querySelector = jest.fn(() => {
      const canvas = document.createElement('canvas');
      canvas.toDataURL = jest.fn(() => 'data:image/png;base64,mockbase64data');
      return canvas;
    }) as any;
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useDownload());

    expect(result.current.downloading).toBe(false);
    expect(result.current.downloadFormat).toBe('ico');
  });

  it('should cycle download format from ico to ico-advanced', () => {
    const { result } = renderHook(() => useDownload());

    act(() => {
      result.current.cycleDownloadFormat();
    });

    expect(result.current.downloadFormat).toBe('ico-advanced');
  });

  it('should cycle download format from ico-advanced to png', () => {
    const { result } = renderHook(() => useDownload());

    act(() => {
      result.current.cycleDownloadFormat();
      result.current.cycleDownloadFormat();
    });

    expect(result.current.downloadFormat).toBe('png');
  });

  it('should cycle download format from png back to ico', () => {
    const { result } = renderHook(() => useDownload());

    act(() => {
      result.current.cycleDownloadFormat();
      result.current.cycleDownloadFormat();
      result.current.cycleDownloadFormat();
    });

    expect(result.current.downloadFormat).toBe('ico');
  });

  it('should set downloading state during download', async () => {
    const { result } = renderHook(() => useDownload());

    let downloadPromise: Promise<void>;
    act(() => {
      downloadPromise = result.current.handleDownload();
    });

    // During download
    expect(result.current.downloading).toBe(true);

    await act(async () => {
      await downloadPromise;
    });

    // After download
    expect(result.current.downloading).toBe(false);
  });

  it('should handle download errors gracefully', async () => {
    const { canvasToBlob } = require('@/lib/canvas-utils');
    canvasToBlob.mockRejectedValueOnce(new Error('Download failed'));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const { result } = renderHook(() => useDownload());

    await act(async () => {
      await result.current.handleDownload();
    });

    expect(consoleSpy).toHaveBeenCalledWith('Download failed:', expect.any(Error));
    expect(result.current.downloading).toBe(false);

    consoleSpy.mockRestore();
  });
});
