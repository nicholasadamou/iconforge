import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ColorPicker from './ColorPicker';

describe('ColorPicker', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render label', () => {
    render(
      <ColorPicker
        color="#ff3860"
        onChange={mockOnChange}
        label="Test Color"
      />
    );

    expect(screen.getByText('Test Color')).toBeInTheDocument();
  });

  it('should render color input with correct value', () => {
    render(
      <ColorPicker
        color="#ff3860"
        onChange={mockOnChange}
        label="Test Color"
      />
    );

    const input = screen.getByDisplayValue('#ff3860');
    expect(input).toBeInTheDocument();
  });

  it('should call onChange when color is changed', async () => {
    const user = userEvent.setup();
    render(
      <ColorPicker
        color="#ff3860"
        onChange={mockOnChange}
        label="Test Color"
      />
    );

    const input = screen.getByDisplayValue('#ff3860');
    await user.clear(input);
    await user.type(input, '#0000ff');

    expect(mockOnChange).toHaveBeenCalled();
  });
});
