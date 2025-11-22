import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tooltip from './Tooltip';

describe('Tooltip', () => {
  it('should render children', () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('should not show tooltip initially', () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  it('should show tooltip on hover', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>
    );

    await user.hover(screen.getByText('Hover me'));
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
  });

  it('should hide tooltip on unhover', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>
    );

    const button = screen.getByText('Hover me');
    await user.hover(button);
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();

    await user.unhover(button);
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });


  it('should render complex content', async () => {
    const user = userEvent.setup();
    const content = (
      <div>
        <strong>Title</strong>
        <p>Description</p>
      </div>
    );

    render(
      <Tooltip content={content}>
        <button>Hover me</button>
      </Tooltip>
    );

    await user.hover(screen.getByText('Hover me'));
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });
});
