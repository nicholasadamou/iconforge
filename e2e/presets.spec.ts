import { test, expect } from '@playwright/test';

test('inspiration cards seed an editable studio and survive reloads', async ({ page }) => {
  for (const [title, icon, label] of [
    ['The weekend build', 'code', 'Code'],
    ['The personal blog', 'mug-hot', 'Mug Hot'],
    ['The fresh start', 'seedling', 'Seedling'],
  ]) {
    await page.goto('/');
    await page.getByRole('link', { name: new RegExp(title) }).click();
    await expect(page).toHaveURL(`/studio?icon=${icon}`);
    await expect(page.locator('.preview-card p')).toHaveText(label);
    await page.reload();
    await expect(page.locator('.preview-card p')).toHaveText(label);
    await page.getByLabel('Find your shape').fill('leaf');
    await page.getByRole('button', { name: 'leaf', exact: true }).click();
    await expect(page.locator('.preview-card p')).toHaveText('Leaf');
  }
});

test('missing, unknown, or repeated icon parameters use the default', async ({ page }) => {
  for (const url of ['/studio', '/studio?icon=not-an-icon', '/studio?icon=code&icon=seedling']) {
    await page.goto(url);
    await expect(page.locator('.preview-card p')).toHaveText('Star');
  }
});
