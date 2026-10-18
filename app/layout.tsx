import type { Metadata } from 'next';
import '@fontsource-variable/dm-sans';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://iconforge-gamma.vercel.app'),
  title: { default: 'IconForge — Small icon. Big character.', template: '%s · IconForge' },
  description:
    'Create your own favicon with 1,895 Font Awesome icons. Customize colors, preview live, and download from your browser.',
  openGraph: {
    title: 'IconForge — Small icon. Big character.',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
  icons: { icon: '/logo.svg' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" id="top">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
