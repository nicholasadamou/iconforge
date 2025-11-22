# GitHub Actions Workflows

This directory contains GitHub Actions workflows for continuous integration.

## Workflow

### Tests Workflow (`test.yml`)

**Main CI workflow** that runs on every push and pull request to main/master branch.

Tests across multiple Node.js versions to ensure compatibility.

**Steps:**
1. Checkout code
2. Setup Node.js (matrix: 18.x, 20.x) with npm cache
3. Install dependencies with `npm ci`
4. Run ESLint linter
5. Run tests with coverage
6. Build Next.js application
7. Upload coverage to Codecov (Node 20.x only)

**Triggers:**
- Push to `main` or `master` branch
- Pull requests to `main` or `master` branch

## Required Secrets

Some workflows use GitHub secrets for optional features:

- `CODECOV_TOKEN` - Token for uploading coverage to Codecov (optional)
- `NEXT_PUBLIC_REAL_FAVICON_GENERATOR_API_KEY` - API key for RealFaviconGenerator (optional for build)

You can add these in your repository settings: **Settings > Secrets and variables > Actions**

## Status Badge

The status badge is already in the README:

```markdown
![Tests](https://github.com/nicholasadamou/iconforge/workflows/Tests/badge.svg)
```

## Local Testing

Before pushing, you can verify your changes locally:

```bash
# Run linter
npm run lint

# Run tests
npm test

# Build application
npm run build
```

## Customization

To modify workflows:

1. Edit the `.yml` files in this directory
2. Test changes in a separate branch
3. Workflows will run on your PR
4. Merge after verification

## Troubleshooting

**Build fails on CI but works locally?**
- Ensure `npm ci` is used (not `npm install`)
- Check Node.js version matches (20.x)
- Verify all dependencies are in `package.json`

**Tests fail on CI?**
- Run `npm test` locally first
- Check for environment-specific issues
- Review workflow logs on GitHub Actions tab

**Coverage upload fails?**
- Verify `CODECOV_TOKEN` secret is set
- This is optional and won't fail the workflow
