<p align="center"><img src="public/logo.svg" width="64" height="64" alt="IconForge logo" /></p>

# IconForge

Small icon. Big character. Create favicons with 1,895 Font Awesome icons, live color and size controls, stacking, and browser-based PNG and ICO exports.

![IconForge — Small icon. Big character.](public/og.png)

[![CI](https://github.com/nicholasadamou/iconforge/actions/workflows/ci.yml/badge.svg)](https://github.com/nicholasadamou/iconforge/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/nicholasadamou/iconforge)](https://github.com/nicholasadamou/iconforge/releases)
[![Next.js](https://img.shields.io/badge/Next.js-16-292b25?logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Bun](https://img.shields.io/badge/Bun-1.3-292b25?logo=bun)](https://bun.sh)
[![Flox](https://img.shields.io/badge/Environment-Flox-a34329)](https://flox.dev)
[![License](https://img.shields.io/badge/License-PolyForm_Shield-a34329)](LICENSE)

## Run locally

```sh
flox activate
bun install --frozen-lockfile
bun run hooks:install
bun run dev
```

Open `http://localhost:3000`. No API key is needed for normal exports.

## Documentation

Start with [docs/](docs/README.md): [quick start](docs/quick-start.md), [customization](docs/customization.md), [exports](docs/exporting.md), [development and CI](docs/development.md), and [architecture](docs/architecture.md). The same guides are available at `/docs` in the app.

Run `bun run check`, `bun run test:ci`, and `bun run verify:production` before pushing. Local hooks mirror CI, including Markdown, Mermaid, and LOC budgets. Successful main CI produces patch releases automatically.

[License](LICENSE) · [Credits and privacy](docs/credits.md)
