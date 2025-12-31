import React from "react";
import { Settings, ArrowLeft, Trophy, Target, ChevronDown } from "lucide-react";
import {
  EyesIllustration,
  BoyHeadIllustration,
  GirlAvatar,
  BoylAvatar
} from "../../components/illustrations/DashboardIcons";
import { ScreenProps } from "../../types";
import { useAuth } from "../../context/AuthContext";

// --- مكون الكارد (TherapyCard) ---
const TherapyCard: React.FC<{
  title: string;
  subtitle: string;
  bgColor: string;
  illustration: React.ReactNode;
  onClick?: () => void; // التأكد من وجود خاصية الضغط
}> = ({ title, subtitle, bgColor, illustration, onClick }) => (
  <div
    onClick={onClick} // ربط الضغطة بالـ div الرئيسي
    className={`${bgColor} rounded-3xl p-4 mb-4 relative overflow-hidden shadow-sm cursor-pointer active:scale-95 transition-transform`}
  >
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
    <div className="mb-2 text-[#5CAAF8]">{icon}</div>
    <div className="text-2xl font-bold text-gray-800 dir-ltr font-sans">
      {value}
    </div>
    <div className="text-xs text-gray-400 mt-1">{label}</div>
  </div>
);

const ChartBar: React.FC<{
  height: string;
  label: string;
  isActive?: boolean;
}> = ({ height, label, isActive }) => (
  <div className="flex flex-col items-center gap-2 flex-1">
    {isActive && (
      <div className="absolute -mt-10 bg-white shadow-md border border-gray-100 text-[10px] px-2 py-1 rounded text-gray-500 whitespace-nowrap z-10">
        20 د<div className="text-[8px] text-gray-400">الاثنين, 16 ديسمبر</div>
      </div>
    )}
    <div className="w-full h-24 flex items-end justify-center bg-transparent rounded-lg relative">
      <div
        className={`w-3 rounded-t-full transition-all duration-500 ${
          isActive ? "bg-[#5CAAF8]" : "bg-[#A5D0FA]"
        }`}
        style={{ height: height }}
      ></div>
    </div>
    <span className="text-[10px] text-gray-400 font-medium">{label}</span>
  </div>
);

export const HomeScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const { user } = useAuth(); // استدعاء بيانات المستخدم

  // دالة الحماية للتأكد من أن onNavigate موجودة قبل استدعائها
  const handleNavigation = (screenName: string) => {
    if (typeof onNavigate === "function") {
      onNavigate(screenName);
    } else {
      console.error("Error: onNavigate is not passed correctly to HomeScreen");
    }
  };

  // تحديد اسم الطفل (أو الاسم الافتراضي إذا لم يوجد)
  // نقوم بفصل الاسم الأول فقط إذا كان الاسم ثلاثي/رباعي
  const displayName = user?.name ? user.name.split(' ')[0] : 'يا بطل';

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 pt-safe pb-4 flex justify-between items-center shadow-sm z-10">
        <button className="text-gray-400 p-2 hover:bg-gray-50 rounded-full">
          <Settings size={24} />
        </button>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-gray-400 text-xs">أهلاً {user?.gender === 'female' ? 'بالبطلة' : 'بالبطل'}</p>
            <p className="font-bold text-gray-800 text-lg">{displayName}</p>
          </div>
          <div>
            {/* Display Avatar based on gender */}
               {user?.gender === 'female' ? (<GirlAvatar />) : (<BoylAvatar />)}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-24">
        <div className="space-y-4 mb-8">
          <TherapyCard
            title="العلاج البصري"
            subtitle="5 جلسات ممتعة لتنمية المهارات البصرية"
            bgColor="bg-[#E3F1FA]"
            illustration={<EyesIllustration />}
            onClick={() => handleNavigation("visual-games")}
          />

          <TherapyCard
            title="العلاج السمعي"
            subtitle="3 مستويات لتعزيز التركيز السمعي"
            bgColor="bg-[#E3F1FA]"
            illustration={<BoyHeadIllustration />}
          />
        </div>

        <div>
          <h3 className="text-right font-bold text-gray-800 mb-4 text-lg">
            احصائيات
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <StatCard
              icon={<Target size={24} />}
              value="0%"
              label="متوسط الدقة"
            />
            <StatCard
              icon={<Trophy size={24} />}
              value="0"
              label="جلسات مكتملة"
            />
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <button className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg text-xs text-gray-500 font-medium">
                <ChevronDown size={14} />
                هذا الاسبوع
              </button>
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#5CAAF8]">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect x="2" y="10" width="4" height="14" rx="1" />
                  <rect x="10" y="4" width="4" height="20" rx="1" />
                  <rect x="18" y="14" width="4" height="10" rx="1" />
                </svg>
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 dir-rtl">
                0
                <span className="text-sm font-normal text-gray-500 mr-1">
                  د
                </span>
              </h2>
              <p className="text-xs text-gray-400 mt-1">متوسط مرحلة الانتباه</p>
            </div>

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
