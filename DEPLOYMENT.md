# Deployment Guide

This project is configured for seamless deployment on Vercel.

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nicholasadamou/iconforge)

## Manual Deployment

### Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. [Vercel CLI](https://vercel.com/docs/cli) installed (optional)

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Import Repository**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Import your GitHub repository: `nicholasadamou/iconforge`

2. **Configure Project**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

3. **Environment Variables** (Optional)
   - Add if you want to use the advanced ICO generator:
     ```
     NEXT_PUBLIC_REAL_FAVICON_GENERATOR_API_KEY=your_api_key_here
     ```

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (~2-3 minutes)
   - Your app will be live at `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # Development deployment
   vercel

   # Production deployment
   vercel --prod
   ```

4. **Follow the prompts**
   - Set up and deploy: Yes
   - Which scope: Select your account
   - Link to existing project: No (for first deployment)
   - Project name: iconforge (or your preferred name)
   - Directory: ./ (press Enter)

## Automatic Deployments

Once connected to GitHub, Vercel automatically deploys:

- **Production**: Every push to `main` or `master` branch
- **Preview**: Every push to any other branch or pull request

### Branch Deployments

- `main`/`master` → Production (your-project.vercel.app)
- Feature branches → Preview URLs (your-project-git-branch.vercel.app)
- Pull Requests → Preview URLs with GitHub integration

## Environment Variables

Set environment variables in the Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add variables for each environment:

| Variable | Value | Environments |
|----------|-------|--------------|
| `NEXT_PUBLIC_REAL_FAVICON_GENERATOR_API_KEY` | Your API key | Production, Preview |

**Note**: Environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Custom Domain

### Add a Custom Domain

1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain (e.g., `iconforge.com`)
4. Configure DNS:
   - **A Record**: Point to Vercel's IP
   - **CNAME**: Point to `cname.vercel-dns.com`

5. Wait for DNS propagation (can take up to 48 hours)

### Recommended DNS Settings

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## Build Configuration

The project includes a `vercel.json` file with optimized settings:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

## Performance Optimizations

Vercel automatically provides:

- ✅ **Edge Network**: Global CDN for fast loading
- ✅ **Automatic HTTPS**: Free SSL certificates
- ✅ **Image Optimization**: Next.js Image component optimization
- ✅ **Smart Caching**: Intelligent caching strategies
- ✅ **Compression**: Gzip and Brotli compression
- ✅ **HTTP/2**: Modern protocol support

## Monitoring & Analytics

### Vercel Analytics (Optional)

1. Go to your project settings
2. Enable "Analytics"
3. Install the analytics package:
   ```bash
   npm install @vercel/analytics
   ```

4. Add to your `app/layout.tsx`:
   ```tsx
   import { Analytics } from '@vercel/analytics/react';
   
   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
         </body>
       </html>
     );
   }
   ```

### Web Vitals

Vercel automatically tracks Core Web Vitals:
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

## Troubleshooting

### Build Fails

**Issue**: Build fails with dependency errors
```bash
# Solution: Ensure all dependencies are in package.json
npm install
npm run build # Test locally first
```

**Issue**: Environment variable not found
```bash
# Solution: Add to Vercel dashboard
# Settings > Environment Variables
```

### Deployment Takes Too Long

- Check build logs in Vercel dashboard
- Optimize dependencies (remove unused packages)
- Use `npm ci` instead of `npm install` in CI

### Custom Domain Not Working

- Verify DNS configuration is correct
- Wait for DNS propagation (up to 48 hours)
- Check SSL certificate status in Vercel dashboard

## Rollback

If a deployment has issues:

1. Go to project "Deployments" tab
2. Find a previous working deployment
3. Click "⋯" menu → "Promote to Production"

## Logs & Debugging

View logs in real-time:

```bash
# Using Vercel CLI
vercel logs

# Or in the dashboard
# Project > Deployments > Select deployment > View Function Logs
```

## Cost

- **Free Tier**: Perfect for personal projects
  - 100 GB bandwidth/month
  - Unlimited deployments
  - Automatic HTTPS
  - Preview deployments

- **Pro Tier**: For production apps
  - 1 TB bandwidth/month
  - Advanced analytics
  - Password protection
  - Priority support

See [vercel.com/pricing](https://vercel.com/pricing) for details.

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Environment Variables](https://vercel.com/docs/environment-variables)
