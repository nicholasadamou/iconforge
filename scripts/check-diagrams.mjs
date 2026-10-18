import { chromium } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const files = execFileSync(
  'git',
  ['ls-files', '--cached', '--others', '--exclude-standard', '*.md'],
  { encoding: 'utf8' },
)
  .trim()
  .split('\n');
const browser = await chromium.launch();
let count = 0;
try {
  const page = await browser.newPage();
  await page.addScriptTag({ path: 'node_modules/mermaid/dist/mermaid.min.js' });
  await page.evaluate(() =>
    window.mermaid.initialize({ startOnLoad: false, securityLevel: 'strict' }),
  );
  for (const file of new Set(files)) {
    const content = readFileSync(file, 'utf8');
    for (const match of content.matchAll(/```mermaid\s*\n([\s\S]*?)```/g)) {
      try {
        await page.evaluate((source) => window.mermaid.parse(source), match[1]);
        count++;
      } catch (error) {
        throw new Error(`${file}: invalid Mermaid diagram: ${error.message}`);
      }
    }
  }
  console.log(`Validated ${count} Mermaid diagrams.`);
} finally {
  await browser.close();
}
