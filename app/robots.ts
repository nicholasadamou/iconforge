import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://iconforge-gamma.vercel.app';
  return {
    rules: {
      userAgent: '*',
      ...(process.env.VERCEL_ENV === 'production' ? { allow: '/' } : { disallow: '/' }),
    },
    sitemap: `${site}/sitemap.xml`,
  };
}
