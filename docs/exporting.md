# Exporting favicons

Choose the format that fits your website.

## Available formats

| Format       | Result                                      | Where it runs        |
| ------------ | ------------------------------------------- | -------------------- |
| ICO          | A 256 × 256 PNG-backed ICO container        | Your browser         |
| PNG          | A 512 × 512 transparent-capable image       | Your browser         |
| Advanced ICO | An external multi-platform favicon workflow | RealFaviconGenerator |

The format button cycles through these options. Normal downloads need no account or API key. ICO uses the PNG-backed format supported by modern browsers; it does not contain multiple legacy bitmap sizes.

## Advanced export

Advanced export sends the current canvas image to RealFaviconGenerator in a new tab. Self-hosted instances must set `NEXT_PUBLIC_REAL_FAVICON_GENERATOR_API_KEY` before building. This is a browser-visible integration key, never a private server credential.

The external service controls the remaining steps. IconForge does not claim that a remote favicon package is complete just because a tab opened. If the integration is unavailable, use the normal PNG or ICO download instead.

## Use the result

Place your export in the website’s public files and add a matching icon link. See the [quick start](quick-start.md) for HTML and Next.js examples.

Check your icon on both dark and light browser chrome. Transparent shapes with very pale or very dark colors can disappear against similar backgrounds.

## Download failures

A visible error means the download did not complete. Retry after the preview has loaded. If a browser blocks downloads or new tabs, allow the requested action or choose a local format. See [troubleshooting](troubleshooting.md).
