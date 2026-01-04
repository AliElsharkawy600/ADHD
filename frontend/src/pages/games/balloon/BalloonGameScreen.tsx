import React, { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { ScreenProps } from "../../../types";
import { Balloon } from "../../../components/games/balloon/balloon";
import { GameResultScreen } from "../../../components/games/common/GameResultScreen";
import {
  CloudShape,
  Hills,
  StarIcon,
} from "../../../components/games/common/GameAssets";
import {
  BALLOON_GAME_LEVELS,
  BALLOON_POSITIONS,
} from "../../../config/gamesConfig";
import apiClient from "../../../services/api"; // استيراد الـ apiClient الخاص بك

export const BalloonGameScreen: React.FC<ScreenProps> = ({
  onNavigate,
  params,
}) => {
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [gameStatus, setGameStatus] = useState<
    "start" | "playing" | "success" | "failure"
  >("start");
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBalloon, setShowBalloon] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [serverData, setServerData] = useState<any>(null);
  const [startTime] = useState(Date.now()); // لتسجيل وقت بداية اللعبة لحساب الـ duration

  const config = BALLOON_GAME_LEVELS[level];

  // استخراج gameId من params التي مررها الـ Navigator
  const gameId = params?.gameId;

  const saveAndCheckResult = async (finalScore: number) => {
    // جلب childId من الـ localStorage
    const childId = localStorage.getItem("childId");

    // حساب المدة المستغرقة بالثواني
    const duration = Math.floor((Date.now() - startTime) / 1000);

    try {
      // إرسال الطلب باستخدام apiClient إلى المسار المحدد
      const response = await apiClient.post("/attempts/", {
        childId: childId,
        gameId: gameId,
        score: finalScore,
        total: config.totalSteps,
        duration: duration,
      });

      // نفترض أن الـ response.data يحتوي على تفاصيل النجاح والنسبة
      const result = response.data;

      // تحديث حالة اللعبة بناءً على النسبة الراجعة من السيرفر (أو حسابها محلياً)
      setServerData(result);

      // إذا كان السيرفر يعيد النسبة المئوية في حقل percentage
      const percentage =
        result.percentage ?? (finalScore / config.totalSteps) * 100;
      setGameStatus(percentage >= 80 ? "success" : "failure");
    } catch (e) {
      console.error("Failed to save game attempt:", e);
      // في حالة الخطأ، نقوم بالحساب محلياً لضمان استمرار تجربة المستخدم
      const localPct = (finalScore / config.totalSteps) * 100;
      setGameStatus(localPct >= 80 ? "success" : "failure");
    }
  };

  const nextStep = useCallback(() => {
    if (currentIndex < config.totalSteps - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowBalloon(true);
    } else {
      setShowBalloon(false);
      saveAndCheckResult(score);
    }
  }, [currentIndex, score, config.totalSteps, gameId]);

  // Timers
  useEffect(() => {
    let balloonTimer: NodeJS.Timeout;
    if (gameStatus === "playing" && showBalloon) {
      balloonTimer = setTimeout(() => {
        setShowBalloon(false);
        nextStep();
      }, config.balloonDuration);
    }
    return () => clearTimeout(balloonTimer);
  }, [showBalloon, gameStatus, config.balloonDuration, nextStep]);

  useEffect(() => {
    let levelInterval: NodeJS.Timeout;
    if (gameStatus === "playing" && config.timeLimit > 0) {
      setTimeLeft(config.timeLimit);
      levelInterval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(levelInterval);
            saveAndCheckResult(score);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(levelInterval);
  }, [gameStatus, level, config.timeLimit, score]);

  const handleBalloonClick = () => {
    setScore((prev) => prev + 1);
    setShowBalloon(false);
    nextStep();
  };

  const handleNextLevel = () => {
    if (level < 3) {
      setLevel((prev) => (prev + 1) as 1 | 2 | 3);
      setScore(0);
      setCurrentIndex(0);
      setServerData(null);
      setGameStatus("playing");
      setShowBalloon(true);
    }
  };

  const handleRetry = () => {
    setScore(0);
    setCurrentIndex(0);
    setServerData(null);
    setGameStatus("playing");
    setShowBalloon(true);
  };

  if (gameStatus === "success" || gameStatus === "failure") {
    return (
      <GameResultScreen
        type={gameStatus}
        score={score}
        total={config.totalSteps}
        percentage={serverData?.percentage || (score / config.totalSteps) * 100}
        onNext={handleNextLevel}
        onRetry={handleRetry}
        currentLevel={level}
        onHome={() => window.history.back()}
      />
    );
  }

  return (
    <div className="relative w-full h-screen bg-sky-100 overflow-hidden flex flex-col">
      {/* Background Clouds */}
      <div className="absolute top-10 left-10 w-40 text-white/60 animate-pulse">
        <CloudShape />
      </div>
      <div className="absolute top-20 -right-5 w-32 text-white/40 animate-pulse delay-700">
        <CloudShape />
      </div>
      <div className="absolute top-40 left-1/2 w-24 text-white/30">
        <CloudShape />
      </div>

      {/* Background Hills */}
      <div className="absolute bottom-0 w-full z-0">
        <Hills />
      </div>

      {/* Top HUD */}
      <div className="relative z-20 pt-safe px-4 mt-4 flex items-center justify-between gap-4">
        {/* Close Button */}
        <button
          onClick={() => window.history.back()}
          className="w-10 h-10 bg-[#A5D0FA] rounded-full flex items-center justify-center text-white hover:bg-blue-400 transition-colors"
        >
          <X size={24} strokeWidth={3} />
        </button>

        {/* Progress Bar Container */}
        <div className="flex-1 h-5 bg-[#D6EAF8] rounded-full relative mx-2">
          <div
            className="h-full bg-[#80B9F7] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentIndex / config.totalSteps) * 100}%` }}
          />
        </div>

        {/* Star Icon (Goal) */}
        <div className="w-8 h-8 flex items-center justify-center">
          <StarIcon className="w-8 h-8" />
        </div>
      </div>

      {/* Timer (if active) */}
      {config.timeLimit > 0 && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-white/50 px-4 py-1 rounded-full text-blue-900 font-bold z-20">
          {timeLeft} ثانية
        </div>
      )}

      {/* Start Screen Overlay */}
      {gameStatus === "start" && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <button
            onClick={() => setGameStatus("playing")}
            className="bg-[#5CAAF8] text-white px-12 py-4 rounded-full text-2xl font-bold shadow-lg hover:scale-105 transition-transform"
          >
            ابدأ اللعب
          </button>
        </div>
      )}

      {/* Game Area */}
      <div className="flex-1 relative z-10">
        {gameStatus === "playing" && showBalloon && (
          <div
            className={`absolute transition-all duration-300 ${
              BALLOON_POSITIONS[currentIndex % BALLOON_POSITIONS.length].css
            }`}
          >
            <Balloon onClick={handleBalloonClick} />
          </div>
        )}
      </div>
    </div>
  );
};
