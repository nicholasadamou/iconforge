'use client';

import { CanvasState } from '@/types/icon';

interface SizeControlsProps {
  state: CanvasState;
  onChange: (updates: Partial<CanvasState>) => void;
}

export default function SizeControls({ state, onChange }: SizeControlsProps) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-200 mb-2 block">
          Icon Size: {state.size}%
        </label>
        <input
          type="range"
          min="10"
          max="100"
          value={state.size}
          onChange={(e) =>
            onChange({ size: Number(e.target.value) })
          }
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Stacked Icon Toggle */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="stacked"
          checked={state.stackedSelected}
          onChange={(e) =>
            onChange({ stackedSelected: e.target.checked })
          }
          className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
        />
        <label htmlFor="stacked" className="text-sm font-medium text-gray-200">
          Enable Stacked Icon
        </label>
      </div>

      {state.stackedSelected && (
        <div>
          <label className="text-sm font-medium text-gray-200 mb-2 block">
            Stacked Size: {state.stackedSize}%
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={state.stackedSize}
            onChange={(e) =>
              onChange({ stackedSize: Number(e.target.value) })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      )}
    </div>
  );
}
