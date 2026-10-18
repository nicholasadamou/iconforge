# Local development

Use Flox to keep the local toolchain aligned with CI.

## Set up

Install [Flox](https://flox.dev/docs/install-flox/), clone the repository, then run:

```sh
git clone https://github.com/nicholasadamou/iconforge.git
cd iconforge
flox activate
bun install --frozen-lockfile
bun run hooks:install
bun run dev
```

Open `http://localhost:3000`. Flox provides Bun, Node.js, Git, and pre-commit; its manifest and lockfile pin the environment. Bun manages dependencies and scripts. Next.js and Jest run on Node for compatibility.

## Verify a change

```sh
bun run check
bun run test:ci
bun run build
bun run test:e2e
```

`check` runs formatting, ESLint, TypeScript, Markdown, Mermaid syntax, and LOC budgets. Browser tests use Playwright Chromium and the production server. Install its browser once with `bunx playwright install chromium`; Linux CI also installs browser system dependencies.

Pre-commit runs the same static checks and unit tests; pre-push builds and runs browser tests. Install both hooks with `bun run hooks:install`. Run all hooks manually with `pre-commit run --all-files` and `pre-commit run --all-files --hook-stage pre-push`.

## Production preview

```sh
bun run build
bun run start
```

No environment variables are required for normal editing or local exports. Advanced export optionally uses `NEXT_PUBLIC_REAL_FAVICON_GENERATOR_API_KEY`; never commit environment files or private credentials.

## Budgets and content

Authored source, docs, scripts, and workflows have a 300-line budget; directories have a 25-file budget. Generated `lib/icons.ts`, lockfiles, and binary/font assets are excluded with explicit reasons in `scripts/budgets.json`. Regenerate the icon catalog with `bun run generate-icons` only when intentionally updating Font Awesome.

Edit documentation in `docs/`, and add routes in `lib/doc-pages.ts`. Run `bun run format` after edits. Mermaid blocks are parsed in the same Chromium environment as browser tests; malformed diagrams fail CI.

## Releases

Successful main-branch CI triggers an idempotent patch release. The workflow checks that the tested revision is still main, tags it, and creates a GitHub release with generated notes. Pull requests receive checks without publishing a release. The workflow needs repository content-write permission; no personal access token is required.
