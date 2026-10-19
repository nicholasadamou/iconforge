import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';
import { docPages, docHref } from '../lib/doc-pages';

test('search, customize, and download a real ICO and PNG', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /Create your favicon/ }).click();
  await page.getByLabel('Find your shape').fill('leaf');
  await page.getByRole('button', { name: 'leaf', exact: true }).click();
  await expect(page.locator('.preview-card')).toContainText('Leaf');
  const icoDownload = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download', exact: true }).click();
  const ico = await icoDownload;
  expect(ico.suggestedFilename()).toBe('favicon.ico');
  const bytes = await readFile((await ico.path())!);
  expect([...bytes.subarray(0, 6)]).toEqual([0, 0, 1, 0, 1, 0]);
  expect(bytes.readUInt32LE(18)).toBe(22);
  expect([...bytes.subarray(22, 30)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
  expect(bytes.readUInt32BE(38)).toBe(256);
  await page.getByTitle('Change format').click();
  await page.getByTitle('Change format').click();
  const pngDownload = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download', exact: true }).click();
  expect((await pngDownload).suggestedFilename()).toBe('favicon.png');
  await page.getByLabel('Find your shape').fill('zzzznotanicon987');
  await expect(page.getByText('No icons found.')).toBeVisible();
  await page.getByRole('button', { name: 'Clear search', exact: true }).click();
  await expect(page.locator('.icon-option')).toHaveCount(120);
  await page.getByRole('button', { name: /Show more icons/ }).click();
  await expect(page.locator('.icon-option')).toHaveCount(240);
});

test('mobile menu, search, keyboard dismissal, and reflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Navigation' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Menu', exact: true })).toBeFocused();
  await page.getByRole('button', { name: /Search documentation/ }).click();
  await page.getByLabel('Search guides').fill('export');
  await page.getByRole('link', { name: /Exporting favicons/ }).click();
  await expect(page).toHaveURL('/docs/exporting');
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
});

for (const doc of docPages) {
  test(`documentation: ${doc.title}`, async ({ page }) => {
    const response = await page.goto(docHref(doc.slug));
    expect(response?.status()).toBe(200);
    await expect(page.locator('main h1')).toBeVisible();
    for (const diagram of await page.locator('.diagram').all()) {
      await expect(diagram.locator('svg')).toBeVisible();
    }
    const audit = await new AxeBuilder({ page }).analyze();
    expect(audit.violations).toEqual([]);
  });
}

test('home accessibility, assets, and unknown-page recovery', async ({ page }) => {
  await page.goto('/');
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  for (const asset of ['/logo.svg', '/og.png']) {
    expect((await page.request.get(asset)).status()).toBe(200);
  }
  expect((await page.goto('/docs/not-a-guide'))?.status()).toBe(404);
});

test('docs drawer, section navigation, copy controls, and next page', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/docs/quick-start');
  await page
    .locator('.code-heading')
    .first()
    .getByRole('button', { name: 'Copy', exact: true })
    .click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('favicon.ico');
  await page.locator('.docs-toc').getByRole('button', { name: 'Copy as Markdown' }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('# Quick start');
  await expect(page.locator('.site-footer')).toHaveCount(0);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await page
    .getByRole('dialog', { name: 'Navigation' })
    .getByRole('link', { name: 'Colors & stacking' })
    .click();
  await expect(page).toHaveURL('/docs/customization');
  await expect(page.getByRole('dialog', { name: 'Navigation' })).not.toBeVisible();
  await page.locator('.docs-mobile-toc summary').click();
  await expect(page.locator('.docs-mobile-toc nav')).toBeVisible();
  await page.locator('.docs-next').click();
  await expect(page).toHaveURL('/docs/exporting');
});

test('studio fills the viewport and mobile panels retain the design', async ({ page }) => {
  await page.goto('/studio');
  for (const [width, height] of [
    [1440, 900],
    [1024, 768],
    [768, 600],
    [390, 844],
    [320, 568],
  ]) {
    await page.setViewportSize({ width, height });
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <= innerWidth &&
          document.documentElement.scrollHeight <= innerHeight,
      ),
    ).toBe(true);
  }
  await page.getByLabel('Find your shape').fill('leaf');
  await page.getByRole('button', { name: 'leaf', exact: true }).click();
  await page.getByRole('button', { name: '2. Customize & export' }).click();
  await expect(page.locator('.preview-card')).toContainText('Leaf');
  await page.getByLabel('Enable Stacked Icon').check();
  await expect(page.getByLabel('Stacked Size:')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollHeight <= innerHeight)).toBe(
    true,
  );
  await page.getByRole('button', { name: '1. Choose an icon' }).click();
  await expect(page.getByLabel('Find your shape')).toHaveValue('leaf');
  await page.setViewportSize({ width: 1440, height: 900 });
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test('chat providers include the current documentation and open separately', async ({ page }) => {
  await page.goto('/docs/quick-start');
  const control = page.locator('.docs-toc .chat-disclosure');
  await control.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(control.locator('.chat-providers a')).toHaveCount(6);
  for (const link of await control.locator('.chat-providers a').all()) {
    const url = new URL((await link.getAttribute('href'))!);
    const prompt =
      url.searchParams.get('prompt') || url.searchParams.get('q') || url.searchParams.get('text');
    expect(prompt).toContain('Help me use IconForge');
    expect(prompt).toContain('# Quick start');
    await expect(link).toHaveAttribute('target', '_blank');
    expect(
      await link
        .locator('img')
        .evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0),
    ).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  const mobile = page.locator('.doc-actions-mobile .chat-disclosure');
  await mobile.locator('summary').click();
  await expect(mobile.getByRole('link', { name: 'Cursor', exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('documentation highlights code on the server and copies untouched source', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const response = await page.goto('/docs/exporting');
  expect(await response!.text()).toContain('hljs-keyword');
  const block = page
    .locator('.code-block')
    .filter({ has: page.locator('.code-heading', { hasText: 'typescript' }) });
  await expect(block.locator('.hljs-keyword').first()).toBeVisible();
  await block.getByRole('button', { name: 'Copy', exact: true }).click();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toContain("import type { Metadata } from 'next';");
  expect(copied).not.toContain('hljs-');
  expect(copied).not.toMatch(/^1/);
  await expect(page.locator('.highlighted-code link')).toHaveCount(0);
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
