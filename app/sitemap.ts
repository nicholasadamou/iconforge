import type { MetadataRoute } from 'next';
import { docPages, docHref } from '@/lib/doc-pages';
export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://iconforge-gamma.vercel.app';
  return ['/', ...docPages.map((page) => docHref(page.slug))].map((route) => ({
    url: `${site}${route}`,
  }));
}
