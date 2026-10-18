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
    if (['', 'architecture', 'customization'].includes(doc.slug)) {
      await expect(page.locator('.diagram svg').first()).toBeVisible();
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
