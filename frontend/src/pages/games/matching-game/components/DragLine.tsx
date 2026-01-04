// ---------------------------------------------------------------------------
// DragLine Component
// مكون خط التوصيل أثناء السحب
// ---------------------------------------------------------------------------

import React from "react";

interface DragLineProps {
  startPosition: { x: string; y: string };
  endPosition: { x: number; y: number };
}

export const DragLine: React.FC<DragLineProps> = ({
  startPosition,
  endPosition,
}) => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
      <line
        x1={startPosition.x}
        y1={startPosition.y}
        x2={endPosition.x}
        y2={endPosition.y}
        stroke="#3B82F6"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray="12 12"
        className="opacity-70 drop-shadow-sm"
      />
      <circle
        cx={endPosition.x}
        cy={endPosition.y}
        r="10"
        fill="#3B82F6"
        className="drop-shadow-sm"
      />
    </svg>
  );
};
