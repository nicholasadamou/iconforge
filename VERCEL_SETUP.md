# Vercel Setup Guide

Quick guide to get IconForge deployed on Vercel in minutes.

## Option 1: One-Click Deploy (Easiest)

Click the button below to deploy to Vercel instantly:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nicholasadamou/iconforge)

This will:
1. Fork/clone the repository to your GitHub
2. Create a new project on Vercel
3. Deploy automatically

## Option 2: Import from GitHub

1. **Push to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Go to Vercel**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Sign in with GitHub

3. **Import Repository**
   - Click "Import Project"
   - Select your repository: `nicholasadamou/iconforge`
   - Click "Import"

4. **Configure (Auto-detected)**
   - Framework: Next.js ✅
   - Root Directory: `./` ✅
   - Build Command: `npm run build` ✅
   - Output Directory: `.next` ✅

5. **Deploy**
   - Click "Deploy"
   - Wait ~2-3 minutes
   - Done! 🎉

## Option 3: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # Preview deployment
   npm run deploy:preview
   
   # Production deployment
   npm run deploy:prod
   
   # Interactive deployment
   npm run deploy
   ```

## After First Deployment

### Automatic Deployments

Vercel will automatically deploy:
- ✅ Every push to `main` → Production
- ✅ Every pull request → Preview URL
- ✅ Every branch → Preview URL

### Set Up Custom Domain (Optional)

1. Go to your project on Vercel
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `iconforge.com`)
4. Update DNS records as instructed
5. Wait for SSL certificate (automatic)

### Environment Variables (Optional)

If you want to use the advanced ICO generator:

1. Go to project "Settings" → "Environment Variables"
2. Add:
   ```
   Name: NEXT_PUBLIC_REAL_FAVICON_GENERATOR_API_KEY
   Value: your_api_key_here
   Environments: ✓ Production ✓ Preview ✓ Development
   ```
3. Redeploy to apply changes

## Useful Commands

```bash
# Preview deployment
npm run deploy:preview

# Production deployment  
npm run deploy:prod

# Check deployment status
vercel ls

# View logs
vercel logs

# Check who's logged in
vercel whoami

# Open deployed site
vercel open
```

## Your Deployment URLs

After deployment, you'll have:

- **Production**: `https://iconforge.vercel.app` (or your custom domain)
- **Preview**: `https://iconforge-git-[branch].vercel.app`

## Troubleshooting

**Build fails?**
```bash
# Test build locally first
npm run build

# Check logs on Vercel dashboard
# Project > Deployments > [Failed Deployment] > View Logs
```

**Need to rollback?**
```bash
# Via CLI
vercel rollback

# Via Dashboard
# Deployments > [Old Deployment] > ⋯ > Promote to Production
```

**Deployment taking too long?**
- Average build time: 2-3 minutes
- Check [Vercel Status](https://vercel-status.com)

## Next Steps

- ✅ Set up custom domain
- ✅ Enable Vercel Analytics
- ✅ Add environment variables
- ✅ Configure preview comments on PRs

See [DEPLOYMENT.md](./DEPLOYMENT.md) for more details.

## Resources

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
