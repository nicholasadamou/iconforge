# Scripts

This directory contains utility scripts for the IconForge project.

## generate-icons.js

Generates a comprehensive list of Font Awesome icons by fetching the latest metadata from the Font Awesome GitHub repository.

### Usage

```bash
npm run generate-icons
```

### What it does

1. Fetches the Font Awesome icons metadata from their GitHub repository
2. Parses all available icons (currently ~1,895 icons)
3. Generates a TypeScript file at `lib/icons.ts` with:
   - Icon ID
   - Unicode character
   - Display label
   - Available styles (solid, regular, brands, etc.)
   - Search terms for fuzzy search

### When to run

Run this script when you want to:
- Update to the latest Font Awesome icons
- Add more icons to your application
- Refresh the icon metadata

### Output

The script generates `/lib/icons.ts` which exports:
- `icons`: Array of all available icons
- `defaultIcon`: The default icon (heart)
