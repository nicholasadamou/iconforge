export const docPages = [
  {
    slug: '',
    title: 'Overview',
    group: 'Start here',
    description: 'A small workshop for your next favicon.',
  },
  {
    slug: 'quick-start',
    title: 'Quick start',
    group: 'Start here',
    description: 'From your first icon to a browser tab.',
  },
  {
    slug: 'customization',
    title: 'Colors & stacking',
    group: 'Guides',
    description: 'Make an icon your own.',
  },
  {
    slug: 'exporting',
    title: 'Exporting favicons',
    group: 'Guides',
    description: 'Choose a format and add it to your site.',
  },
  {
    slug: 'troubleshooting',
    title: 'Troubleshooting',
    group: 'Guides',
    description: 'Fix missing glyphs and unexpected exports.',
  },
  {
    slug: 'development',
    title: 'Local development',
    group: 'Project',
    description: 'A reproducible workspace with Flox and Bun.',
  },
  {
    slug: 'architecture',
    title: 'How it works',
    group: 'Project',
    description: 'Follow an icon from search to download.',
  },
  {
    slug: 'credits',
    title: 'Credits & privacy',
    group: 'Project',
    description: 'Licensing, assets, and data handling.',
  },
];
export const docHref = (slug: string) => `/docs${slug ? '/' + slug : ''}`;
