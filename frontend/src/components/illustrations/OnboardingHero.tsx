import React from 'react';

export const OnboardingHero: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-end justify-center pointer-events-none overflow-hidden">
      {/* Clouds - Background */}
      <div className="absolute top-10 left-[-20px] opacity-90 animate-pulse delay-700">
        <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
           <path d="M20 50C20 50 10 50 10 40C10 30 20 25 30 30C30 20 40 10 60 10C80 10 90 20 90 30C100 25 110 30 110 40C110 50 100 50 100 50H20Z" fill="white" fillOpacity="0.6"/>
        </svg>
      </div>
      <div className="absolute top-20 right-[-10px] opacity-80 animate-pulse">
        <svg width="150" height="70" viewBox="0 0 150 70" fill="none">
           <path d="M30 60C30 60 20 60 20 50C20 40 30 35 40 40C40 30 50 20 70 20C90 20 100 30 100 40C110 35 120 40 120 50C120 60 110 60 110 60H30Z" fill="white" fillOpacity="0.5"/>
        </svg>
      </div>
      
      {/* Wind Lines */}
      <div className="absolute top-32 right-10">
        <svg width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
          <path d="M5 10 C 15 5, 25 15, 35 10" />
        </svg>
      </div>
      <div className="absolute top-40 left-10 opacity-70">
        <svg width="30" height="15" viewBox="0 0 30 15" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
          <path d="M5 7 C 10 3, 20 12, 25 7" />
        </svg>
      </div>

      {/* Main Illustration Container */}
      <div className="relative w-full max-w-[350px] aspect-square flex items-end justify-center mb-[-10px] z-10">
        
        {/* Blue Balloon */}
        <div className="absolute left-[10%] bottom-[30%] w-[110px] h-[130px] z-10 animate-bounce" style={{ animationDuration: '3s' }}>
             <div className="absolute bottom-[-40px] left-1/2 w-[2px] h-[50px] bg-white opacity-60 origin-top rotate-12"></div>
             <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-lg">
                <path d="M50 115 L45 120 L55 120 Z" fill="#4A90E2" />
                <ellipse cx="50" cy="55" rx="48" ry="58" fill="#4A90E2" />
                <ellipse cx="30" cy="35" rx="10" ry="15" fill="white" fillOpacity="0.3" transform="rotate(-20 30 35)" />
             </svg>
        </div>

        {/* Peach Balloon */}
        <div className="absolute left-[30%] bottom-[25%] w-[100px] h-[120px] z-0 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
             <div className="absolute bottom-[-40px] left-1/2 w-[2px] h-[50px] bg-white opacity-60 origin-top -rotate-6"></div>
             <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md">
                <path d="M50 115 L45 120 L55 120 Z" fill="#FFCBA4" />
                <ellipse cx="50" cy="55" rx="48" ry="58" fill="#FFCBA4" />
                <ellipse cx="30" cy="35" rx="8" ry="12" fill="white" fillOpacity="0.4" transform="rotate(-20 30 35)" />
             </svg>
        </div>

        {/* The White Cat */}
        <div className="absolute right-[10%] bottom-[12%] w-[100px] h-[120px] z-20">
            <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-xl">
                 <path d="M85 90 Q 95 80, 95 60 Q 95 40, 80 50" fill="none" stroke="#FFF" strokeWidth="8" strokeLinecap="round" />
                 <path d="M20 110 Q 20 60, 50 60 Q 80 60, 80 110 Z" fill="#FFF" />
                 <ellipse cx="50" cy="50" rx="35" ry="30" fill="#FFF" />
                 <path d="M25 35 L 20 10 L 40 25 Z" fill="#FFF" />
                 <path d="M75 35 L 80 10 L 60 25 Z" fill="#FFF" />
                 <path d="M28 32 L 24 18 L 36 26 Z" fill="#FFCBA4" />
                 <path d="M72 32 L 76 18 L 64 26 Z" fill="#FFCBA4" />
                 <circle cx="38" cy="48" r="2.5" fill="#333" />
                 <circle cx="62" cy="48" r="2.5" fill="#333" />
                 <path d="M46 55 Q 50 58, 54 55" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
                 <circle cx="50" cy="53" r="1.5" fill="#FFCBA4" />
                 <circle cx="32" cy="56" r="3" fill="#FFCBA4" opacity="0.5" />
                 <circle cx="68" cy="56" r="3" fill="#FFCBA4" opacity="0.5" />
                 <ellipse cx="35" cy="110" rx="10" ry="6" fill="#FFF" stroke="#E5E7EB" strokeWidth="1" />
                 <ellipse cx="65" cy="110" rx="10" ry="6" fill="#FFF" stroke="#E5E7EB" strokeWidth="1" />
            </svg>
        </div>
      </div>
    </div>
  );
};
