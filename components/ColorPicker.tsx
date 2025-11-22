'use client';

import { HexColorPicker, HexColorInput } from 'react-colorful';
import { useState } from 'react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label: string;
}

export default function ColorPicker({ color, onChange, label }: ColorPickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const isTransparent = color === 'transparent';
  const displayColor = isTransparent ? '#ffffff' : color;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-200">{label}</label>
      <div className="flex gap-2 items-center">
        <div className="relative">
          <button
            onClick={() => setShowPicker(!showPicker)}
            className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer shadow-md hover:shadow-lg transition-shadow"
            style={{
              backgroundColor: isTransparent ? 'transparent' : color,
              backgroundImage: isTransparent ? `
                linear-gradient(45deg, #ccc 25%, transparent 25%),
                linear-gradient(-45deg, #ccc 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #ccc 75%),
                linear-gradient(-45deg, transparent 75%, #ccc 75%)
              ` : 'none',
              backgroundSize: '10px 10px',
              backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px',
            }}
          />
          {showPicker && !isTransparent && (
            <div className="absolute top-14 left-0 z-10 bg-gray-700 p-3 rounded-lg shadow-xl border border-gray-600">
              <button
                onClick={() => setShowPicker(false)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600"
              >
                ✕
              </button>
              <HexColorPicker color={displayColor} onChange={onChange} />
            </div>
          )}
        </div>
        {!isTransparent ? (
          <HexColorInput
            color={color}
            onChange={onChange}
            className="flex-1 px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
            prefixed
          />
        ) : (
          <input
            type="text"
            value="transparent"
            disabled
            className="flex-1 px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-400 font-mono text-sm"
          />
        )}
      </div>
    </div>
  );
}
