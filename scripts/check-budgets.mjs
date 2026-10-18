import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';

const config = JSON.parse(readFileSync(process.argv[2] || 'scripts/budgets.json', 'utf8'));
const files = [
  ...new Set(
    execFileSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'], {
      encoding: 'utf8',
    })
      .split('\0')
      .filter(Boolean),
  ),
];
const directories = new Map();
const failures = [];
for (const file of files) {
  if (
    !existsSync(file) ||
    file in config.excluded ||
    !/\.(tsx?|m?js|css|md|ya?ml|toml|json)$/.test(file)
  )
    continue;
  const lines = readFileSync(file, 'utf8').trimEnd().split('\n').length;
  if (lines > config.defaultLines)
    failures.push(`${file}: ${lines} lines > budget ${config.defaultLines}`);
  const directory = dirname(file);
  directories.set(directory, (directories.get(directory) || 0) + 1);
}
for (const [directory, count] of directories) {
  if (count > config.defaultFiles)
    failures.push(`${directory}: ${count} files > budget ${config.defaultFiles}`);
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else console.log(`LOC and directory budgets passed (${files.length} repository files).`);
