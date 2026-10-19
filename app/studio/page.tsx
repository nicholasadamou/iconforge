import Studio from '@/components/Studio';

export default async function StudioPage({
  searchParams,
}: {
  searchParams: Promise<{ icon?: string | string[] }>;
}) {
  const { icon } = await searchParams;
  const initialIcon = typeof icon === 'string' ? icon : undefined;
  return <Studio key={initialIcon ?? 'default'} initialIcon={initialIcon} />;
}
