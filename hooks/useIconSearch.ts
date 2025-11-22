import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import { Icon } from '@/types/icon';

export function useIconSearch(icons: Icon[]) {
  const [searchQuery, setSearchQuery] = useState('');

  const fuse = useMemo(
    () =>
      new Fuse(icons, {
        keys: ['id', 'label', 'search'],
        threshold: 0.3,
        distance: 100,
      }),
    [icons]
  );

  const filteredIcons = useMemo(() => {
    if (!searchQuery) return icons;
    return fuse.search(searchQuery).map((result) => result.item);
  }, [searchQuery, fuse, icons]);

  return {
    searchQuery,
    setSearchQuery,
    filteredIcons,
  };
}
