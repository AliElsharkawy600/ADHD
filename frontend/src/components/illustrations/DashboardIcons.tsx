import React from 'react';

export const EyesIllustration = () => (
  <svg viewBox="0 0 200 100" className="w-40 h-20 mx-auto mb-2">
    <g transform="translate(40, 50)">
      <circle cx="0" cy="0" r="28" fill="white" stroke="#374151" strokeWidth="2" />
      <circle cx="0" cy="0" r="22" fill="#374151" />
      <circle cx="8" cy="-8" r="8" fill="white" />
      <circle cx="-10" cy="10" r="3" fill="white" opacity="0.5" />
      <ellipse cx="-35" cy="15" rx="6" ry="4" fill="#FFA5A5" opacity="0.6" />
      <ellipse cx="35" cy="15" rx="6" ry="4" fill="#FFA5A5" opacity="0.6" />
    </g>
    <g transform="translate(160, 50)">
      <circle cx="0" cy="0" r="28" fill="white" stroke="#374151" strokeWidth="2" />
      <circle cx="0" cy="0" r="22" fill="#374151" />
      <circle cx="8" cy="-8" r="8" fill="white" />
      <circle cx="-10" cy="10" r="3" fill="white" opacity="0.5" />
    </g>
    <path d="M90 55 Q 100 65, 110 55" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
    <circle cx="20" cy="60" r="2" fill="#FCA5A5" />
    <circle cx="15" cy="50" r="1.5" fill="#FCA5A5" />
    <circle cx="180" cy="60" r="2" fill="#FCA5A5" />
  </svg>
);

export const BoyHeadIllustration = () => (
  <svg viewBox="0 0 200 120" className="w-40 h-24 mx-auto">
    <path d="M40 50 Q 30 60, 40 70" fill="none" stroke="#F97316" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
    <path d="M30 40 Q 15 60, 30 80" fill="none" stroke="#F97316" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
    <path d="M160 50 Q 170 60, 160 70" fill="none" stroke="#F97316" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
    <path d="M170 40 Q 185 60, 170 80" fill="none" stroke="#F97316" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
    <g transform="translate(100, 60)">
       <path d="M-35 -20 C -40 -40, 40 -40, 35 -20" fill="#8B4513" />
       <circle cx="-38" cy="0" r="10" fill="#FFCBA4" />
       <circle cx="38" cy="0" r="10" fill="#FFCBA4" />
       <path d="M-35 -10 L 35 -10 L 35 10 Q 35 45, 0 45 Q -35 45, -35 10 Z" fill="#FFCBA4" />
       <path d="M-35 -15 C -20 -5, -10 -25, 0 -15 C 10 -25, 20 -5, 35 -15 C 35 -35, -35 -35, -35 -15" fill="#8B4513" />
       <circle cx="-15" cy="10" r="4" fill="#374151" />
       <circle cx="15" cy="10" r="4" fill="#374151" />
       <path d="M-5 25 Q 0 28, 5 25" fill="none" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
       <circle cx="-25" cy="18" r="4" fill="#FFA5A5" opacity="0.5" />
       <circle cx="25" cy="18" r="4" fill="#FFA5A5" opacity="0.5" />
    </g>
  </svg>
);
