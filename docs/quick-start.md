# Quick start

From your first icon to a browser tab in a few steps.

## Choose an icon

Open the [studio](/studio). The editor fills your viewport; the icon library scrolls inside its panel. On phones, switch between **Choose an icon** and **Customize & export** to keep your workspace focused. Search for a word such as `leaf`, `coffee`, or `code`, then select an icon. Clear the search to browse the collection, and select **Show more icons** to load the next batch. Brand icons are also available; respect their owners’ trademark rules.

## Make it yours

Select **Icon Color** to choose a color. Adjust **Icon Size** until the shape reads clearly. Keep **Transparent background** enabled, or switch it off and choose a background color. Small, simple shapes usually read best in browser tabs.

## Download

The format button next to **Download** cycles through ICO, advanced ICO, and PNG. Choose ICO for a conventional favicon or PNG for a 512 × 512 image. Advanced export opens an external service and needs a configured public API key.

## Add it to your website

Copy `favicon.ico` to your site’s public directory and reference it in your HTML:

```html
<link rel="icon" href="/favicon.ico" sizes="any" />
```

For a PNG export:

```html
<link rel="icon" type="image/png" href="/favicon.png" />
```

Next.js projects can put the ICO file at `app/favicon.ico`. Reload your page to see the result; browsers may cache an older favicon. See [troubleshooting](troubleshooting.md) if it does not change.
