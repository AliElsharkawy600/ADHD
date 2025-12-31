import React from "react";

interface AnimalMatchProgressIndicatorProps {
  steps: number;
  activeIndex: number;
  completedCount: number;
}

export const AnimalMatchProgressIndicator: React.FC<
  AnimalMatchProgressIndicatorProps
> = ({ steps, activeIndex, completedCount }) => {
  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      {Array.from({ length: steps }).map((_, index) => {
        const isCompleted = index < completedCount;
        const isActive = index === activeIndex;
        return (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              isCompleted
                ? "bg-[#2BCB7C] scale-125 shadow-[0_0_0_6px_rgba(43,203,124,0.12)]"
                : isActive
                ? "bg-[#4C8DFF] scale-110 shadow-[0_0_0_6px_rgba(76,141,255,0.12)]"
                : "bg-[#D9E3FF]"
            }`}
          />
        );
      })}
    </div>
  );
};
