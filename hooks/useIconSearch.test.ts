import { renderHook, act } from '@testing-library/react';
import { useIconSearch } from './useIconSearch';
import { Icon } from '@/types/icon';

const mockIcons: Icon[] = [
  {
    id: 'heart',
    label: 'Heart',
    unicode: '\uf004',
    styles: ['solid'],
    search: ['love', 'like', 'favorite'],
  },
  {
    id: 'star',
    label: 'Star',
    unicode: '\uf005',
    styles: ['solid'],
    search: ['favorite', 'rating'],
  },
  {
    id: 'user',
    label: 'User',
    unicode: '\uf007',
    styles: ['solid'],
    search: ['person', 'profile'],
  },
];

describe('useIconSearch', () => {
  it('should return all icons initially', () => {
    const { result } = renderHook(() => useIconSearch(mockIcons));

    expect(result.current.filteredIcons).toEqual(mockIcons);
    expect(result.current.searchQuery).toBe('');
  });

  it('should filter icons by id', () => {
    const { result } = renderHook(() => useIconSearch(mockIcons));

    act(() => {
      result.current.setSearchQuery('heart');
    });

    expect(result.current.filteredIcons).toHaveLength(1);
    expect(result.current.filteredIcons[0].id).toBe('heart');
  });

  it('should filter icons by label', () => {
    const { result } = renderHook(() => useIconSearch(mockIcons));

    act(() => {
      result.current.setSearchQuery('Star');
    });

    expect(result.current.filteredIcons).toHaveLength(1);
    expect(result.current.filteredIcons[0].id).toBe('star');
  });

  it('should filter icons by search terms', () => {
    const { result } = renderHook(() => useIconSearch(mockIcons));

    act(() => {
      result.current.setSearchQuery('favorite');
    });

    expect(result.current.filteredIcons).toHaveLength(2);
    expect(result.current.filteredIcons.map(i => i.id)).toContain('heart');
    expect(result.current.filteredIcons.map(i => i.id)).toContain('star');
  });

  it('should return empty array for non-matching search', () => {
    const { result } = renderHook(() => useIconSearch(mockIcons));

    act(() => {
      result.current.setSearchQuery('nonexistent');
    });

    expect(result.current.filteredIcons).toHaveLength(0);
  });

  it('should update searchQuery state', () => {
    const { result } = renderHook(() => useIconSearch(mockIcons));

    act(() => {
      result.current.setSearchQuery('test query');
    });

    expect(result.current.searchQuery).toBe('test query');
  });

  it('should be case insensitive', () => {
    const { result } = renderHook(() => useIconSearch(mockIcons));

    act(() => {
      result.current.setSearchQuery('HEART');
    });

    expect(result.current.filteredIcons).toHaveLength(1);
    expect(result.current.filteredIcons[0].id).toBe('heart');
  });

  it('should handle fuzzy search', () => {
    const { result } = renderHook(() => useIconSearch(mockIcons));

    act(() => {
      result.current.setSearchQuery('use');
    });

    expect(result.current.filteredIcons.length).toBeGreaterThanOrEqual(1);
    expect(result.current.filteredIcons.some(i => i.id === 'user')).toBe(true);
  });
});
