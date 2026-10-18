import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Favicon studio',
  description:
    'Choose an icon, customize your colors, and export a favicon in a focused workspace.',
};
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
