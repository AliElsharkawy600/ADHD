import React from 'react';
import { Settings, ArrowLeft, Trophy, Target, ChevronDown } from 'lucide-react';

// --- SVGs for the Cards ---

const EyesIllustration = () => (
  <svg viewBox="0 0 200 100" className="w-40 h-20 mx-auto mb-2">
    {/* Left Eye */}
    <g transform="translate(40, 50)">
      <circle cx="0" cy="0" r="28" fill="white" stroke="#374151" strokeWidth="2" />
      <circle cx="0" cy="0" r="22" fill="#374151" />
      <circle cx="8" cy="-8" r="8" fill="white" />
      <circle cx="-10" cy="10" r="3" fill="white" opacity="0.5" />
      {/* Cheeks */}
      <ellipse cx="-35" cy="15" rx="6" ry="4" fill="#FFA5A5" opacity="0.6" />
      <ellipse cx="35" cy="15" rx="6" ry="4" fill="#FFA5A5" opacity="0.6" />
    </g>
    {/* Right Eye */}
    <g transform="translate(160, 50)">
      <circle cx="0" cy="0" r="28" fill="white" stroke="#374151" strokeWidth="2" />
      <circle cx="0" cy="0" r="22" fill="#374151" />
      <circle cx="8" cy="-8" r="8" fill="white" />
      <circle cx="-10" cy="10" r="3" fill="white" opacity="0.5" />
    </g>
    {/* Cute Mouth */}
    <path d="M90 55 Q 100 65, 110 55" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
    {/* Freckles/Sparkles */}
    <circle cx="20" cy="60" r="2" fill="#FCA5A5" />
    <circle cx="15" cy="50" r="1.5" fill="#FCA5A5" />
    <circle cx="180" cy="60" r="2" fill="#FCA5A5" />
  </svg>
);

const BoyHeadIllustration = () => (
  <svg viewBox="0 0 200 120" className="w-40 h-24 mx-auto">
    {/* Sound Waves Left */}
    <path d="M40 50 Q 30 60, 40 70" fill="none" stroke="#F97316" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
    <path d="M30 40 Q 15 60, 30 80" fill="none" stroke="#F97316" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
    
    {/* Sound Waves Right */}
    <path d="M160 50 Q 170 60, 160 70" fill="none" stroke="#F97316" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
    <path d="M170 40 Q 185 60, 170 80" fill="none" stroke="#F97316" strokeWidth="3" strokeLinecap="round" opacity="0.4" />

    {/* Head */}
    <g transform="translate(100, 60)">
       {/* Hair Back */}
       <path d="M-35 -20 C -40 -40, 40 -40, 35 -20" fill="#8B4513" />
       
       {/* Ears */}
       <circle cx="-38" cy="0" r="10" fill="#FFCBA4" />
       <circle cx="38" cy="0" r="10" fill="#FFCBA4" />

       {/* Face Shape */}
       <path d="M-35 -10 L 35 -10 L 35 10 Q 35 45, 0 45 Q -35 45, -35 10 Z" fill="#FFCBA4" />
       
       {/* Hair Front */}
       <path d="M-35 -15 C -20 -5, -10 -25, 0 -15 C 10 -25, 20 -5, 35 -15 C 35 -35, -35 -35, -35 -15" fill="#8B4513" />

       {/* Eyes */}
       <circle cx="-15" cy="10" r="4" fill="#374151" />
       <circle cx="15" cy="10" r="4" fill="#374151" />
       
       {/* Mouth */}
       <path d="M-5 25 Q 0 28, 5 25" fill="none" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
       
       {/* Cheeks */}
       <circle cx="-25" cy="18" r="4" fill="#FFA5A5" opacity="0.5" />
       <circle cx="25" cy="18" r="4" fill="#FFA5A5" opacity="0.5" />
    </g>
  </svg>
);

// --- Components ---

const TherapyCard: React.FC<{
  title: string;
  subtitle: string;
  bgColor: string;
  illustration: React.ReactNode;
}> = ({ title, subtitle, bgColor, illustration }) => (
  <div className={`${bgColor} rounded-3xl p-4 mb-4 relative overflow-hidden shadow-sm`}>
    <div className="flex flex-col items-center justify-center pt-2 pb-4">
      {illustration}
    </div>
    <div className="flex justify-between items-end">
      <div className="flex-1 text-right">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
        <p className="text-gray-500 text-xs font-medium">{subtitle}</p>
      </div>
      <button className="w-10 h-10 bg-[#5CAAF8] rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-200 active:scale-95 transition-transform mr-4">
        <ArrowLeft size={20} strokeWidth={3} />
      </button>
    </div>
  </div>
);

const StatCard: React.FC<{
  icon: React.ReactNode;
  value: string;
  label: string;
  subValue?: string;
}> = ({ icon, value, label, subValue }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center text-center h-32">
    <div className="mb-2 text-[#5CAAF8]">
      {icon}
    </div>
    <div className="text-2xl font-bold text-gray-800 dir-ltr font-sans">{value}</div>
    <div className="text-xs text-gray-400 mt-1">{label}</div>
  </div>
);

const ChartBar: React.FC<{ height: string; label: string; isActive?: boolean }> = ({ height, label, isActive }) => (
  <div className="flex flex-col items-center gap-2 flex-1">
    {/* Tooltip for active */}
    {isActive && (
       <div className="absolute -mt-10 bg-white shadow-md border border-gray-100 text-[10px] px-2 py-1 rounded text-gray-500 whitespace-nowrap z-10">
         20 د
         <div className="text-[8px] text-gray-400">الاثنين, 16 ديسمبر</div>
       </div>
    )}
    <div className="w-full h-24 flex items-end justify-center bg-transparent rounded-lg relative">
        <div 
            className={`w-3 rounded-t-full transition-all duration-500 ${isActive ? 'bg-[#5CAAF8]' : 'bg-[#A5D0FA]'}`}
            style={{ height: height }}
        ></div>
    </div>
    <span className="text-[10px] text-gray-400 font-medium">{label}</span>
  </div>
);

export const HomeScreen: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 pt-safe pb-4 flex justify-between items-center shadow-sm z-10">
        <button className="text-gray-400 p-2 hover:bg-gray-50 rounded-full">
          <Settings size={24} />
        </button>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-gray-400 text-xs">أهلاً بالبطل</p>
            <p className="font-bold text-gray-800 text-lg">Ahmed</p>
          </div>
          <div className="w-12 h-12 bg-[#FFCBA4] rounded-full overflow-hidden border-2 border-white shadow-md">
             {/* Simple Avatar SVG */}
             <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect width="100" height="100" fill="#5CAAF8" />
                <circle cx="50" cy="40" r="25" fill="#FFCBA4" />
                <path d="M20 100 Q 50 50, 80 100" fill="#FFCBA4" />
                <path d="M25 30 Q 50 10, 75 30" fill="none" stroke="#8B4513" strokeWidth="5" strokeLinecap="round" />
                <circle cx="40" cy="40" r="3" fill="#333" />
                <circle cx="60" cy="40" r="3" fill="#333" />
                <path d="M45 50 Q 50 55, 55 50" fill="none" stroke="#333" strokeWidth="2" />
             </svg>
          </div>
        </div>
      </div>

      {/* Content Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-6 pb-24">
        
        {/* Therapy Cards */}
        <div className="space-y-4 mb-8">
            <TherapyCard 
                title="العلاج البصري"
                subtitle="5 جلسات ممتعة لتنمية المهارات البصرية"
                bgColor="bg-[#FFE4D6]" // Light Peach
                illustration={<EyesIllustration />}
            />
            
            <TherapyCard 
                title="العلاج السمعي"
                subtitle="3 مستويات لتعزيز التركيز السمعي"
                bgColor="bg-[#F5F5F4]" // Warm Gray / Off White
                illustration={<BoyHeadIllustration />}
            />
        </div>

        {/* Statistics Section */}
        <div>
            <h3 className="text-right font-bold text-gray-800 mb-4 text-lg">احصائيات</h3>
            
            {/* Top Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <StatCard 
                    icon={<Target size={24} />}
                    value="0%" // Or 70% as in second image
                    label="متوسط الدقة"
                />
                <StatCard 
                    icon={<Trophy size={24} />}
                    value="0" // Or 7
                    label="جلسات مكتملة"
                />
            </div>

            {/* Chart Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <button className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg text-xs text-gray-500 font-medium">
                        <ChevronDown size={14} />
                        هذا الاسبوع
                    </button>
                    
                    {/* Tiny Bar Icon */}
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#5CAAF8]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="2" y="10" width="4" height="14" rx="1" />
                            <rect x="10" y="4" width="4" height="20" rx="1" />
                            <rect x="18" y="14" width="4" height="10" rx="1" />
                        </svg>
                    </div>
                </div>

                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800 dir-rtl">
                        0<span className="text-sm font-normal text-gray-500 mr-1">د</span>
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">متوسط مرحلة الانتباه</p>
                </div>

                {/* Bar Chart Visualization */}
                <div className="flex justify-between items-end h-32 px-2 relative">
                    <ChartBar height="30%" label="س" />
                    <ChartBar height="50%" label="ح" />
                    <ChartBar height="20%" label="ن" />
                    <ChartBar height="60%" label="ث" />
                    <ChartBar height="80%" label="ر" isActive />
                    <ChartBar height="40%" label="خ" />
                    <ChartBar height="55%" label="اليوم" />
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};
