'use client';

import { useEffect, useRef } from 'react';
import { CanvasState } from '@/types/icon';
import { drawIcon } from '@/lib/canvas-utils';

interface IconCanvasProps {
  state: CanvasState;
}

export default function IconCanvas({ state }: IconCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      drawIcon(canvasRef.current, state);
    }
  }, [state]);

  return (
    <div className="flex justify-center items-center p-4">
      <canvas
        ref={canvasRef}
        className="w-32 h-32 border-2 border-gray-300 rounded-lg shadow-lg"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #ccc 25%, transparent 25%),
            linear-gradient(-45deg, #ccc 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ccc 75%),
            linear-gradient(-45deg, transparent 75%, #ccc 75%)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
        }}
      />
    </div>
  );
}
