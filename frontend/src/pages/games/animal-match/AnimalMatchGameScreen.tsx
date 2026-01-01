import React, { useCallback, useEffect, useMemo, useState } from "react";
import { X, RotateCw, Play } from "lucide-react";
import { ScreenProps } from "../../../types";
import {
  BoneTargetIcon,
  BoyCharacter,
  CatDrinkingMilkIcon,
  CatIcon,
  CloudShape,
  DogIcon,
  DogWithBoneIcon,
  GrassTargetIcon,
  GreatJobBadge,
  MilkTargetIcon,
  SheepEatingGrassIcon,
  SheepIcon,
  StarIcon,
} from "../../../components/games/common/GameAssets";
import { AnimalMatchLane } from "../../../components/games/animal-match/AnimalMatchLane";

interface LaneConfig {
  id: string;
  animal: React.ReactNode;
  target: React.ReactNode;
  success: React.ReactNode;
}

const LANE_CONFIGS: LaneConfig[] = [
  {
    id: "sheep",
    animal: <SheepIcon />,
    target: <GrassTargetIcon />,
    success: <SheepEatingGrassIcon />,
  },
  {
    id: "cat",
    animal: <CatIcon />,
    target: <MilkTargetIcon />,
    success: <CatDrinkingMilkIcon />,
  },
  {
    id: "dog",
    animal: <DogIcon />,
    target: <BoneTargetIcon />,
    success: <DogWithBoneIcon />,
  },
];

// نسخ رسائل النجاح المؤقت لكل حارة
const LANE_SUCCESS_COPY: Record<string, { title: string; subtitle: string }> = {
  sheep: {
    title: "أحسنت!",
    subtitle: "الخروف سعيد بالعشب الطازج.",
  },
  cat: {
    title: "ممتاز!",
    subtitle: "القطة تستمتع بكأس الحليب.",
  },
  dog: {
    title: "رائع!",
    subtitle: "الكلب حصل على عظمه المفضلة.",
  },
};

// خلفية السماء مع آثار الأقدام لإضفاء طابع مرح
const PAW_BACKGROUND =
  "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.65) 0 18%, transparent 18%)," +
  "radial-gradient(circle at 80% 30%, rgba(255,255,255,0.45) 0 14%, transparent 14%)," +
  "radial-gradient(circle at 40% 80%, rgba(255,255,255,0.35) 0 16%, transparent 16%)," +
  "#FEF6E9";

export const AnimalMatchGameScreen: React.FC<ScreenProps> = ({
  onNavigate,
}) => {
  // تمثيل حالة اللعبة للحارات المكتملة والوضع الحالي
  const [activeLaneIndex, setActiveLaneIndex] = useState(0);
  const [completedLanes, setCompletedLanes] = useState<string[]>([]);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [sessionId, setSessionId] = useState(0);
  const [recentSuccess, setRecentSuccess] = useState<string | null>(null);
  const [awaitingNext, setAwaitingNext] = useState(false);

  // معالجة نجاح التوصيل للحارة النشطة
  const handleLaneSuccess = useCallback(() => {
    const lane = LANE_CONFIGS[activeLaneIndex];
    if (!lane) return;

    setCompletedLanes((prev) => Array.from(new Set([...prev, lane.id])));
    setRecentSuccess(lane.id);
    setAwaitingNext(true);
  }, [activeLaneIndex]);

  // إعادة تشغيل اللعبة من البداية
  const handleRestart = useCallback(() => {
    setCompletedLanes([]);
    setActiveLaneIndex(0);
    setIsSuccessModalOpen(false);
    setSessionId((id) => id + 1);
    setRecentSuccess(null);
    setAwaitingNext(false);
  }, []);

  // زر الخروج للعودة إلى الشاشة الرئيسية
  const handleClose = useCallback(() => {
    // onNavigate("home");
    // onNavigate("", {}, { isBack: true })
    window.history.back()
  }, [onNavigate]);

  const completedCount = completedLanes.length;
  const totalCount = LANE_CONFIGS.length;
  const percentage = Math.round((completedCount / totalCount) * 100) || 0;

  // قفل التمرير عند ظهور النوافذ المنبثقة
  useEffect(() => {
    if (isSuccessModalOpen || awaitingNext) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [awaitingNext, isSuccessModalOpen]);

  // تحديد الحارة الأخيرة التي نجحت لإظهار الرسالة المؤقتة
  const successLane = useMemo(
    () => LANE_CONFIGS.find((lane) => lane.id === recentSuccess),
    [recentSuccess]
  );
  const successCopy = successLane
    ? LANE_SUCCESS_COPY[successLane.id] ?? null
    : null;
  const activeLane = LANE_CONFIGS[activeLaneIndex] ?? null;
  const isFinalLane = activeLaneIndex >= LANE_CONFIGS.length - 1;

  // الانتقال للحارة التالية أو إظهار النتيجة النهائية
  const handleProceed = useCallback(() => {
    if (!awaitingNext) return;
    setAwaitingNext(false);
    if (isFinalLane) {
      setIsSuccessModalOpen(true);
    } else {
      setActiveLaneIndex((index) =>
        Math.min(LANE_CONFIGS.length - 1, index + 1)
      );
    }
    setRecentSuccess(null);
  }, [awaitingNext, isFinalLane]);

  // إعادة المحاولة للحارة الحالية بعد النجاح
  const handleRetryCurrentLane = useCallback(() => {
    const lane = LANE_CONFIGS[activeLaneIndex];
    if (!lane) return;
    setAwaitingNext(false);
    setRecentSuccess(null);
    setCompletedLanes((prev) => prev.filter((id) => id !== lane.id));
    setSessionId((id) => id + 1);
  }, [activeLaneIndex]);

  return (
    <div
      className="relative w-full h-full min-h-screen overflow-auto"
      style={{ background: PAW_BACKGROUND }}
    >
      {/* الخلفية الزخرفية */}
      {/* <div className="absolute top-16 left-6 w-40 text-[#F3DAC0]/70 animate-fade-in">
        <CloudShape />
      </div>
      <div className="absolute top-32 -right-7.5 w-32 text-[#F3DAC0]/40 animate-fade-in delay-200">
        <CloudShape />
      </div> */}

      <div className="relative z-10 flex flex-col h-full dir-rtl">
        {/* شريط التحكم العلوي (خروج + شريط التقدم + النجمة) */}
        <div className="px-7 pt-8">
          <div className="flex items-center gap-3">
            {/* Close Button */}
            <button 
                onClick={handleClose}
                className="w-10 h-10 bg-[#A5D0FA] rounded-full flex items-center justify-center text-white hover:bg-blue-400 transition-colors"
            >
                <X size={24} strokeWidth={3} />
            </button>
            <div className="flex-1 h-3 bg-white/50 rounded-full overflow-hidden border border-white/60 shadow-inner">
              <div
                className="h-full bg-linear-to-l from-[#4C8DFF] via-[#6EA9FF] to-[#8EC1FF] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="w-10 h-10 flex items-center justify-center">
                <StarIcon className="w-10 h-10" />
            </div>
          </div>
        </div>

        {/* الحارة الحالية للعبة */}
        <div className="flex-1 px-4 sm:px-6 pb-24 mt-1 flex flex-col gap-8 overflow-y-hidden max-w-3xl w-full mx-auto">
          {activeLane && (
            <div
              key={`${activeLane.id}-${sessionId}`}
              className="relative px-6 py-10 transition-all"
            >
              <AnimalMatchLane
                animalIcon={activeLane.animal}
                targetIcon={activeLane.target}
                successIcon={activeLane.success}
                disabled={false}
                onActivate={() => setAwaitingNext(false)}
                onSuccess={() => {
                  handleLaneSuccess();
                }}
                onFail={() => {
                  /* لا حاجة لإظهار أي حالة فشل */
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* طبقة النجاح المؤقت أثناء اللعب */}
      {recentSuccess && successLane && awaitingNext && !isSuccessModalOpen && (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-auto">
          <div className="absolute inset-0 bg-[#1E2560]/35 backdrop-blur-sm transition-opacity" />
          <div className="relative z-10 flex flex-col items-center gap-8 px-15 py-20 bg-white/95 border border-white/70 rounded-4xl shadow-[0_24px_60px_rgba(30,37,96,0.2)] animate-in fade-in duration-300">
           
            {successCopy && (
              <GreatJobBadge />
            )}
            <div className="w-30 h-30 sm:w-32 sm:h-32 drop-shadow-[0_16px_32px_rgba(76,141,255,0.25)]">
              {successLane.success}
            </div>
            {/* button section  */}
            <div className="w-full mt-2 flex items-center justify-center gap-3">
              {/* Secondary Button (Retry) - Left */}
              <button
                onClick={() => {
                  handleRetryCurrentLane();
                }}
                className="w-14 h-14 rounded-full border-2 border-[#5CAAF8] text-[#5CAAF8] flex items-center justify-center hover:bg-blue-50 transition-colors bg-white shadow-sm"
              >
                <RotateCw size={24} strokeWidth={2.5} />
              </button>

              <button
                onClick={handleProceed}
                className="flex-1 px-8 h-14 bg-[#5CAAF8] text-white rounded-full flex items-center justify-center gap-2 shadow-lg shadow-blue-200 hover:bg-[#4a90e2] transition-colors"
              >
                <span className="text-xl font-bold">التالى</span>
                <Play size={20} fill="currentColor" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* طبقة النجاح النهائية */}
      {isSuccessModalOpen && (
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#1E2560]/40 backdrop-blur-sm px-8">
     {/* Top Bar */}
      <div className="w-full pt-safe px-2 flex justify-start z-10">
        <button 
            onClick={handleClose}
            className="p-1 rounded-full bg-blue-100 text-blue-500 hover:bg-blue-200 transition-colors mt-4"
        >
            <X size={24} strokeWidth={3} />
        </button>
      </div>
      {/* content */}
          <div className="bg-white rounded-[30px] px-10 py-12 text-center shadow-[0_30px_60px_rgba(30,37,96,0.28)] max-w-xl w-full">
            {/* Title */}
            <h1 className="text-4xl font-black text-[#2561C0] mb-8 font-baloo">
              {isSuccessModalOpen ? "أحسنت!" : "حاول تاني"}
            </h1>
            <div className="mb-12 transform scale-110">
              <BoyCharacter mood={isSuccessModalOpen ? "success" : "failure"} />
            </div>
            {/* button section  */}
            <div className="w-full flex items-center justify-center gap-4">
              {/* Secondary Button (Retry) - Left */}
              <button
                onClick={() => {
                  handleRestart();
                }}
                className="w-14 h-14 rounded-full border-2 border-[#5CAAF8] text-[#5CAAF8] flex items-center justify-center hover:bg-blue-50 transition-colors bg-white shadow-sm"
              >
                <RotateCw size={24} strokeWidth={2.5} />
              </button>

              <button
                onClick={handleClose}
                className="flex-1 h-14 bg-[#5CAAF8] text-white rounded-full flex items-center justify-center gap-3 shadow-lg shadow-blue-200 hover:bg-[#4a90e2] transition-colors"
              >
                <span className="text-xl font-bold pb-1">إنهاء</span>
                <Play size={20} fill="currentColor" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
