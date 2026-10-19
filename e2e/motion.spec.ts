import { test, expect } from '@playwright/test';

declare global {
  interface Window {
    motionTargets: string[];
  }
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.motionTargets = [];
    const animate = Element.prototype.animate;
    Element.prototype.animate = function (...args) {
      window.motionTargets.push(this.tagName);
      return animate.apply(this, args);
    };
  });
});

test('page entrances and section reveals preserve navigation and studio editing', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect.poll(() => page.evaluate(() => window.motionTargets)).toContain('MAIN');
  await page.locator('.inspiration-section').scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => window.motionTargets.length)).toBeGreaterThan(1);
  await page.getByRole('link', { name: /The weekend build/ }).click();
  await expect(page.locator('.preview-card p')).toHaveText('Code');
  await expect
    .poll(() => page.evaluate(() => window.motionTargets.filter((tag) => tag === 'MAIN').length))
    .toBe(2);
  const count = await page.evaluate(() => window.motionTargets.length);
  await page.getByLabel('Find your shape').fill('leaf');
  await expect(page.getByRole('button', { name: 'leaf', exact: true })).toBeVisible();
  expect(await page.evaluate(() => window.motionTargets.length)).toBe(count);
  await page.getByRole('link', { name: 'Help & guides' }).click();
  await expect(page.locator('main h1')).toBeVisible();
  await expect
    .poll(() => page.evaluate(() => window.motionTargets.filter((tag) => tag === 'MAIN').length))
    .toBe(3);
});

test('reduced motion disables animation and reacts to preference changes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('.inspiration-section').scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => window.motionTargets)).toEqual([]);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'auto',
  );
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect.poll(() => page.evaluate(() => window.motionTargets.length)).toBeGreaterThan(0);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(() => page.evaluate(() => document.getAnimations().length)).toBe(0);
  const count = await page.evaluate(() => window.motionTargets.length);
  await page.getByRole('link', { name: /The fresh start/ }).click();
  await expect(page.locator('.preview-card p')).toHaveText('Seedling');
  expect(await page.evaluate(() => window.motionTargets.length)).toBe(count);
});

test('marketing content remains visible without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('.hero h1')).toBeVisible();
  await page.locator('.final-cta').scrollIntoViewIfNeeded();
  await expect(page.locator('.final-cta h2')).toBeVisible();
  expect(await page.locator('.final-cta').evaluate((el) => getComputedStyle(el).opacity)).toBe('1');
  await context.close();
});
