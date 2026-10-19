import { test, expect } from '@playwright/test';

test('studio controls fit every export format, including open popovers', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/studio');
  const controls = page.locator('.editor-controls');
  const expectNoOverflow = async () => {
    expect(await controls.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(
      true,
    );
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    expect(
      await controls.evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        return [...element.children].every((child) => {
          const rect = child.getBoundingClientRect();
          return rect.left >= bounds.left && rect.right <= bounds.right;
        });
      }),
    ).toBe(true);
  };
  for (const width of [1440, 1024, 768, 701, 700, 390, 320]) {
    await page.setViewportSize({ width, height: 568 });
    if (width <= 700) {
      await page.getByRole('button', { name: '2. Customize & export' }).click();
    }
    for (const format of ['.ico', '.ico (advanced)', '.png']) {
      await expect(page.getByTitle('Change format')).toContainText(format);
      await expectNoOverflow();
      await page.getByRole('button', { name: 'About download formats' }).hover();
      await expect(page.getByRole('tooltip')).toBeVisible();
      await expectNoOverflow();
      await page.getByTitle('Change format').click();
    }
    await page.getByRole('button', { name: 'Choose icon color' }).click();
    await expect(page.getByRole('button', { name: 'Close color picker' })).toBeVisible();
    await expectNoOverflow();
    await page.getByRole('button', { name: 'Close color picker' }).click();
    await page.getByLabel('Enable Stacked Icon').check();
    await expectNoOverflow();
  }
});
