# Testing

This project uses Jest and React Testing Library for unit testing.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

Tests are organized alongside their source files:

```
components/
  ├── DownloadControls.tsx
  ├── DownloadControls.test.tsx
  ├── Tooltip.tsx
  ├── Tooltip.test.tsx
  └── ...

hooks/
  ├── useDownload.ts
  ├── useDownload.test.ts
  └── ...

lib/
  ├── canvas-utils.ts
  ├── canvas-utils.test.ts
  └── ...
```

## Test Coverage

The following components and utilities are covered by tests:

### Components
- **DownloadControls**: Tests button rendering, format cycling, download actions, and disabled states
- **Tooltip**: Tests tooltip visibility on hover/unhover and content rendering
- **ColorPicker**: Tests color input rendering and change handlers

### Hooks
- **useDownload**: Tests download format cycling, download state management, and error handling
- **useIconSearch**: Tests icon filtering by id, label, search terms, and fuzzy search

### Utilities
- **canvas-utils**: Tests color conversion functions (hexToRgba, rgbaToString) and canvas operations

## Writing Tests

When adding new components or utilities, follow these guidelines:

1. Create a `.test.tsx` or `.test.ts` file alongside the source file
2. Use descriptive test names that explain what is being tested
3. Test user interactions with `@testing-library/user-event`
4. Mock external dependencies (like file-saver) appropriately
5. Test both success and error cases

### Example Test

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('should render with correct text', () => {
    render(<MyComponent text="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should handle click events', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<MyComponent onClick={handleClick} />);
    await user.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Continuous Integration

Tests run automatically on CI/CD pipelines. All tests must pass before merging pull requests.
