import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DownloadControls from './DownloadControls';

describe('DownloadControls', () => {
  const mockOnDownload = jest.fn();
  const mockOnFormatChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render download button', () => {
    render(
      <DownloadControls
        downloading={false}
        format="ico"
        onDownload={mockOnDownload}
        onFormatChange={mockOnFormatChange}
      />
    );

    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('should render format label for ico', () => {
    render(
      <DownloadControls
        downloading={false}
        format="ico"
        onDownload={mockOnDownload}
        onFormatChange={mockOnFormatChange}
      />
    );

    expect(screen.getByText('.ico')).toBeInTheDocument();
  });

  it('should render format label for ico-advanced', () => {
    render(
      <DownloadControls
        downloading={false}
        format="ico-advanced"
        onDownload={mockOnDownload}
        onFormatChange={mockOnFormatChange}
      />
    );

    expect(screen.getByText('.ico (advanced)')).toBeInTheDocument();
  });

  it('should render format label for png', () => {
    render(
      <DownloadControls
        downloading={false}
        format="png"
        onDownload={mockOnDownload}
        onFormatChange={mockOnFormatChange}
      />
    );

    expect(screen.getByText('.png')).toBeInTheDocument();
  });

  it('should call onDownload when download button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <DownloadControls
        downloading={false}
        format="ico"
        onDownload={mockOnDownload}
        onFormatChange={mockOnFormatChange}
      />
    );

    await user.click(screen.getByText('Download'));
    expect(mockOnDownload).toHaveBeenCalledTimes(1);
  });

  it('should call onFormatChange when format button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <DownloadControls
        downloading={false}
        format="ico"
        onDownload={mockOnDownload}
        onFormatChange={mockOnFormatChange}
      />
    );

    await user.click(screen.getByText('.ico'));
    expect(mockOnFormatChange).toHaveBeenCalledTimes(1);
  });

  it('should disable buttons when downloading', () => {
    render(
      <DownloadControls
        downloading={true}
        format="ico"
        onDownload={mockOnDownload}
        onFormatChange={mockOnFormatChange}
      />
    );

    const downloadButton = screen.getByText('Downloading...').closest('button');
    expect(downloadButton).toBeDisabled();
    
    const formatButton = screen.getByText('.ico').closest('button');
    expect(formatButton).toBeDisabled();
  });

  it('should show downloading state', () => {
    render(
      <DownloadControls
        downloading={true}
        format="ico"
        onDownload={mockOnDownload}
        onFormatChange={mockOnFormatChange}
      />
    );

    expect(screen.getByText('Downloading...')).toBeInTheDocument();
  });

  it('should render tooltip info button', () => {
    render(
      <DownloadControls
        downloading={false}
        format="ico"
        onDownload={mockOnDownload}
        onFormatChange={mockOnFormatChange}
      />
    );

    // The tooltip button contains an SVG icon
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3); // Download, Format, Tooltip
  });
});
