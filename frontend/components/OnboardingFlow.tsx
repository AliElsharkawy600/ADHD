import React, { useState } from 'react';
import { Illustration } from './Illustration';
import { Wave } from './Wave';
import { OnboardingScreen } from './OnboardingScreen';
import { SlideData } from '../types';

const SLIDES: SlideData[] = [
  {
    id: 1,
    title: "مساحة هادئة للعب",
    description: "لكل طفل يحتاج وقتاً وهدوءاً"
  },
  {
    id: 2,
    title: "ألعاب بسيطة",
    description: "بدون ضغط أو وقت"
  },
  {
    id: 3,
    title: "لا توجد إجابات خاطئة",
    description: "كل طفل يلعب بطريقته",
    isLast: true
  }
];

export const OnboardingFlow: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onFinish();
    }
  };

  const handleSkip = () => {
     setCurrentSlide(SLIDES.length - 1);
  };

  return (
    <div className="relative w-full h-full bg-[#A5D0FA] overflow-hidden flex flex-col">
      {/* Top Bar (Skip) */}
      <div className="absolute top-0 left-0 w-full z-50 px-6 pt-safe mt-6 flex justify-between items-center">
        {currentSlide !== SLIDES.length - 1 && (
            <button 
                onClick={handleSkip}
                className="text-gray-700 font-bold text-lg opacity-70 hover:opacity-100 transition-opacity"
            >
                تخطي
            </button>
        )}
        <div></div>
      </div>

      <div className="relative flex-1 w-full">
         <Illustration />
         <Wave />
      </div>
      
      <div className="relative h-[45%] bg-white"></div>

      {SLIDES.map((slide, index) => (
        <OnboardingScreen 
          key={slide.id}
          data={slide}
          isActive={index === currentSlide}
          currentSlideIndex={currentSlide}
          totalSlides={SLIDES.length}
          onNext={handleNext}
        />
      ))}
    </div>
  );
};
