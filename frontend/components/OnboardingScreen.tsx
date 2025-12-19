import React from 'react';
import { SlideData } from '../types';
import { ArrowLeft } from 'lucide-react';

interface Props {
  data: SlideData;
  isActive: boolean;
  totalSlides: number;
  currentSlideIndex: number;
  onNext: () => void;
}

export const OnboardingScreen: React.FC<Props> = ({ 
  data, 
  isActive, 
  totalSlides, 
  currentSlideIndex,
  onNext 
}) => {
  return (
    <div 
        className={`absolute inset-0 flex flex-col justify-end transition-opacity duration-500 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
    >
      <div className="w-full bg-white px-8 pb-safe pt-2 min-h-[40%] flex flex-col items-center text-center rounded-t-3xl z-20">
        
        {/* Text Content */}
        <div className="mb-8 mt-2 space-y-3 max-w-xs">
          <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
            {data.title}
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed font-medium">
            {data.description}
          </p>
        </div>

        {/* Controls Container (Dots + Button) */}
        <div className="w-full flex flex-col items-center gap-8 mb-8">
            
            {/* Custom Action Button */}
            {data.isLast ? (
                 <button 
                 onClick={onNext}
                 className="w-full max-w-[200px] bg-[#5CAAF8] hover:bg-[#4a90e2] active:scale-95 transition-all text-white py-3 px-6 rounded-full flex items-center justify-center gap-3 shadow-lg shadow-blue-200"
               >
                 <span className="text-lg font-bold">جاهزين نلعب</span>
                 <ArrowLeft size={20} strokeWidth={3} />
               </button>
            ) : (
                <button 
                onClick={onNext}
                className="w-14 h-14 bg-[#5CAAF8] hover:bg-[#4a90e2] active:scale-90 transition-all text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-200"
                aria-label="Next Slide"
              >
                <ArrowLeft size={28} strokeWidth={3} />
              </button>
            )}

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
                <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlideIndex 
                    ? 'w-8 bg-[#5CAAF8]' 
                    : 'w-2 bg-gray-300'
                }`}
                />
            ))}
            </div>

        </div>
      </div>
    </div>
  );
};
