
import React from "react";
import { X, RotateCw, Play } from "lucide-react";
import { BoyCharacter, StarIcon } from "./GameAssets";

interface ResultScreenProps {
  type: "success" | "failure";
  score: number;
  total: number;
  percentage?: number;
  onNext: () => void;
  onRetry: () => void;
  currentLevel: number;
  onHome: () => void;
}

export const GameResultScreen: React.FC<ResultScreenProps> = ({
  type,
  onNext,
  onRetry,
  onHome,
  currentLevel, // Used for next level logic
}) => {
  const isSuccess = type === "success";

  return (
    <div className="h-full bg-white flex flex-col items-center relative overflow-hidden dir-rtl">
      {/* Background Pattern (Stars) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <StarIcon className="absolute top-20 left-10 w-8 h-8 text-blue-200" />
         <StarIcon className="absolute top-40 right-20 w-6 h-6 text-blue-100" />
         <StarIcon className="absolute bottom-40 left-20 w-10 h-10 text-blue-200" />
         <StarIcon className="absolute top-1/4 left-1/2 w-5 h-5 text-yellow-100" />
      </div>

      {/* Top Bar */}
      <div className="w-full pt-safe px-6 flex justify-start z-10">
        <button 
            onClick={onHome}
            className="p-2 rounded-full bg-blue-100 text-blue-500 hover:bg-blue-200 transition-colors mt-4"
        >
            <X size={24} strokeWidth={3} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm px-6 -mt-10 z-10">
        
        {/* Title */}
        <h1 className="text-4xl font-black text-[#2561C0] mb-8 font-baloo">
            {isSuccess ? "أحسنت!" : "حاول تاني"}
        </h1>

        {/* Character Illustration */}
        <div className="mb-12 transform scale-110">
            <BoyCharacter mood={isSuccess ? 'success' : 'failure'} />
        </div>

        {/* Buttons Section */}
        <div className="w-full flex items-center justify-center gap-4">
            
            {/* Secondary Button (Retry) - Left */}
            <button 
                onClick={onRetry}
                className="w-14 h-14 rounded-full border-2 border-[#5CAAF8] text-[#5CAAF8] flex items-center justify-center hover:bg-blue-50 transition-colors bg-white shadow-sm"
            >
                <RotateCw size={24} strokeWidth={2.5} />
            </button>

            {/* Primary Button (Next or Retry Text) - Right */}
            {isSuccess ? (
                 <button 
                 onClick={currentLevel < 3 ? onNext : onHome}
                 className="flex-1 h-14 bg-[#5CAAF8] text-white rounded-full flex items-center justify-center gap-3 shadow-lg shadow-blue-200 hover:bg-[#4a90e2] transition-colors"
               >
                 <Play size={20} fill="currentColor" />
                 <span className="text-xl font-bold pb-1">
                    {currentLevel < 3 ? "التالي" : "إنهاء"}
                 </span>
               </button>
            ) : (
                <button 
                onClick={onRetry}
                className="flex-1 h-14 bg-[#5CAAF8] text-white rounded-full flex items-center justify-center gap-3 shadow-lg shadow-blue-200 hover:bg-[#4a90e2] transition-colors"
              >
                <RotateCw size={20} />
                <span className="text-xl font-bold pb-1">حاول تاني</span>
              </button>
            )}

        </div>

      </div>
    </div>
  );
};
