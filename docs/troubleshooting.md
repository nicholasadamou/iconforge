# Troubleshooting

A few checks for the most common favicon problems.

## The glyph is missing

Wait for the bundled fonts to load, then choose the icon again. If you are running locally, install dependencies from the lockfile and rebuild. The icon catalog and Font Awesome fonts must use the same version.

## The search is empty

Try a broader word such as `star` or `leaf`. Search includes labels and keywords, so a concept may use a different name. Use **Clear search** to restore the library.

## The icon looks cut out

Stacking uses XOR composition. Overlapping areas become transparent by design. Disable **Stacked Icon** to return to a single shape, or lower **Stacked Size** to reduce the cutout.

## The tab icon has not changed

Browsers cache favicons. Verify the file URL directly, reload with cache disabled, or change the filename and update your HTML reference. The editor’s tab preview is temporary; downloading does not update your deployed site automatically.

## Advanced export does not open

The integration needs a configured public API key and permission to open the external service. If either is unavailable, choose PNG or normal ICO. The standard formats do not need a network service.

## Changes disappeared

Editor state is not saved across refreshes or navigation away. Download before leaving. IconForge does not store your design in an account or on a server.

## Report a problem

Open a [GitHub issue](https://github.com/nicholasadamou/iconforge/issues) with your browser, selected format, and reproduction steps. Include the visible error message, but never paste API keys or environment files.
