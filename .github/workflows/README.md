# GitHub Actions Workflows

This directory contains GitHub Actions workflows for continuous integration and deployment.

## Available Workflows

### 1. CI Workflow (`ci.yml`)

**Main workflow** that runs on every push and pull request to main/master branch.

**Steps:**
1. Checkout code
2. Setup Node.js 20.x with npm cache
3. Install dependencies with `npm ci`
4. Run ESLint linter
5. Run tests with coverage
6. Build Next.js application
7. Upload coverage to Codecov (optional)
8. Comment coverage report on PRs (optional)

**Triggers:**
- Push to `main` or `master` branch
- Pull requests to `main` or `master` branch

### 2. Test Workflow (`test.yml`)

Standalone workflow focused on testing across multiple Node.js versions.

**Steps:**
1. Checkout code
2. Setup Node.js (matrix: 18.x, 20.x)
3. Install dependencies
4. Run linter
5. Run tests with coverage
6. Upload coverage to Codecov

**Triggers:**
- Push to `main` or `master` branch
- Pull requests to `main` or `master` branch

### 3. Build Workflow (`build.yml`)

Verifies that the Next.js application builds successfully.

**Steps:**
1. Checkout code
2. Setup Node.js 20.x
3. Install dependencies
4. Build application
5. Verify build output

**Triggers:**
- Push to `main` or `master` branch
- Pull requests to `main` or `master` branch

## Required Secrets

Some workflows use GitHub secrets for optional features:

- `CODECOV_TOKEN` - Token for uploading coverage to Codecov (optional)
- `NEXT_PUBLIC_REAL_FAVICON_GENERATOR_API_KEY` - API key for RealFaviconGenerator (optional for build)

You can add these in your repository settings: **Settings > Secrets and variables > Actions**

## Status Badges

Add these badges to your README to show workflow status:

```markdown
![CI](https://github.com/nicholasadamou/iconforge/workflows/CI/badge.svg)
![Tests](https://github.com/nicholasadamou/iconforge/workflows/Tests/badge.svg)
![Build](https://github.com/nicholasadamou/iconforge/workflows/Build/badge.svg)
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
