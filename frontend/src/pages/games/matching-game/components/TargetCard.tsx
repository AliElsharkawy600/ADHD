// ---------------------------------------------------------------------------
// TargetCard Component
// مكون عرض الهدف الواحد
// ---------------------------------------------------------------------------

import React from "react";
import { Target } from "../types/game";

interface TargetCardProps {
  target: Target;
  isCurrentTarget: boolean;
  feedback: { targetId: string; type: "success" | "error" } | null;
  setRef: (ref: HTMLDivElement | null) => void;
}

export const TargetCard: React.FC<TargetCardProps> = ({
  target,
  isCurrentTarget,
  feedback,
  setRef,
}) => {
  const isFeedbackTarget = feedback?.targetId === target.id;
  const feedbackClasses = isFeedbackTarget
    ? feedback?.type === "success"
      ? "bg-green-100 ring-4 ring-green-400 scale-110"
      : "bg-red-100 ring-4 ring-red-400 scale-105"
    : "bg-white/60 hover:bg-white/80";

  return (
    <div
      key={target.id}
      ref={setRef}
      className={`
                                    relative flex flex-col items-center justify-center p-3 rounded-[2rem] transition-all duration-300
                                    ${feedbackClasses}
                                    w-28 h-28 sm:w-32 sm:h-32 shadow-lg backdrop-blur-md
                                `}>
      <target.icon size={48} className={target.color} />
      <span className="mt-2 text-base font-bold text-gray-700 font-arabic">
        {target.label}
      </span>
    </div>
  );
};
