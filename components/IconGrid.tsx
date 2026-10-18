'use client';

import { useState } from 'react';
import { Icon } from '@/types/icon';

interface IconGridProps {
  icons: Icon[];
  onSelectIcon: (icon: Icon) => void;
}

export default function IconGrid({ icons, onSelectIcon }: IconGridProps) {
  const [visibleCount, setVisibleCount] = useState(120);
  return (
    <>
      <div className="icon-grid">
        {icons.slice(0, visibleCount).map((icon) => (
          <button
            key={`${icon.id}-${icon.styles[0]}`}
            onClick={() => onSelectIcon(icon)}
            className="icon-option"
            title={icon.label}
            aria-label={icon.id}
          >
            <i
              aria-hidden="true"
              className={`glyph fa-${icon.styles.includes('brands') ? 'brands' : icon.styles.includes('regular') ? 'regular' : 'solid'} fa-${icon.id}`}
            />
            <span className="icon-name">{icon.id}</span>
          </button>
        ))}
      </div>
      {visibleCount < icons.length && (
        <button className="load-more" onClick={() => setVisibleCount((count) => count + 120)}>
          Show more icons ({icons.length - visibleCount} remaining)
        </button>
      )}
    </>
  );
}
