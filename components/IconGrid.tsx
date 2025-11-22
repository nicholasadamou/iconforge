'use client';

import { Icon } from '@/types/icon';

interface IconGridProps {
  icons: Icon[];
  onSelectIcon: (icon: Icon) => void;
}

export default function IconGrid({ icons, onSelectIcon }: IconGridProps) {
  const getFontFamily = (icon: Icon) => {
    // Brand icons use "Font Awesome 6 Brands"
    if (icon.styles.includes('brands')) {
      return '"Font Awesome 6 Brands"';
    }
    // Regular icons use "Font Awesome 6 Free" with normal weight
    if (icon.styles.includes('regular')) {
      return '"Font Awesome 6 Free"';
    }
    // Solid icons use "Font Awesome 6 Free" with weight 900
    return '"Font Awesome 6 Free"';
  };

  const getFontWeight = (icon: Icon) => {
    // Brand icons typically use normal weight
    if (icon.styles.includes('brands')) {
      return 400;
    }
    // Regular icons use normal weight
    if (icon.styles.includes('regular')) {
      return 400;
    }
    // Solid icons use weight 900
    return 900;
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 p-6">
      {icons.map((icon) => (
        <button
          key={`${icon.id}-${icon.styles[0]}`}
          onClick={() => onSelectIcon(icon)}
          className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer group"
          title={icon.label}
        >
          <span
            className="text-3xl text-white group-hover:scale-110 transition-transform"
            style={{ 
              fontFamily: getFontFamily(icon), 
              fontWeight: getFontWeight(icon)
            }}
          >
            {icon.unicode}
          </span>
          <span className="text-xs mt-2 text-white text-center truncate w-full">
            {icon.id}
          </span>
        </button>
      ))}
    </div>
  );
}
