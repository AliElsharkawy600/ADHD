import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative w-16 h-16 mb-2">
         {/* Abstract Tree/Brain Shape matching the logo */}
         <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M50 95 C 50 95, 45 80, 45 70 C 45 60, 55 60, 55 70 C 55 80, 50 95, 50 95 Z" fill="#8B4513" /> {/* Trunk */}
            <circle cx="50" cy="45" r="35" fill="#FFF" stroke="#E5E7EB" strokeWidth="1" />
            
            {/* Colorful dots/leaves */}
            <circle cx="50" cy="25" r="5" fill="#FF6B6B" />
            <circle cx="65" cy="30" r="5" fill="#4ECDC4" />
            <circle cx="75" cy="45" r="5" fill="#45B7D1" />
            <circle cx="65" cy="60" r="5" fill="#96CEB4" />
            <circle cx="50" cy="65" r="5" fill="#FFEEAD" />
            <circle cx="35" cy="60" r="5" fill="#D4A5A5" />
            <circle cx="25" cy="45" r="5" fill="#9B59B6" />
            <circle cx="35" cy="30" r="5" fill="#3498DB" />
            <circle cx="50" cy="45" r="8" fill="#5CAAF8" opacity="0.2" />
         </svg>
      </div>
      <h1 className="text-xl font-bold text-gray-800 text-center leading-tight">
        <span className="text-[#5CAAF8]">مركز نماء لتنمية</span>
        <br />
        مهارات الطفل
      </h1>
    </div>
  );
};
