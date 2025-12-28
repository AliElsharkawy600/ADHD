import React, { useState, useEffect, useCallback } from "react";

// الترتيب الدقيق حسب صور الفيجما
const POSITIONS = [
  { id: "centered", css: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" },
  { id: "top-left", css: "top-24 left-10" },
  { id: "top-right", css: "top-24 right-10" },
  { id: "bottom-left", css: "bottom-40 left-10" },
  { id: "bottom-right", css: "bottom-40 right-10" },
];

const BalloonGame = () => {
  const [gameStatus, setGameStatus] = useState<
    "start" | "playing" | "success" | "failure"
  >("start");
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBalloon, setShowBalloon] = useState(true);
  const [serverData, setServerData] = useState<any>(null); // لتخزين رد الباك إند

  const totalSteps = 10;
  const timerDuration = 3000;

  // دالة إرسال النتيجة واستقبال الـ Response الموضح في الـ Postman
  const saveToBackend = async (finalScore: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/scores/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: finalScore, total: totalSteps }),
      });

      const result = await response.json();

      if (result.success) {
        setServerData(result.data); // تخزين البيانات (percentage, id, etc)
        // تحديد النجاح أو الفشل بناءً على النسبة القادمة من الباك إند
        setGameStatus(result.data.percentage >= 80 ? "success" : "failure");
      }
    } catch (e) {
      console.error("Backend Error", e);
      // حساب احتياطي في حال تعطل السيرفر
      const localPercentage = (finalScore / totalSteps) * 100;
      setGameStatus(localPercentage >= 80 ? "success" : "failure");
    }
  };

  const nextStep = useCallback(() => {
    if (currentIndex < totalSteps - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowBalloon(true);
    } else {
      saveToBackend(score); // ننهي اللعبة ونرسل للباك
    }
  }, [currentIndex, score]);

  // تيمر الـ 3 ثواني لإخفاء البالونة والانتقال للمكان التالي
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStatus === "playing" && showBalloon) {
      timer = setTimeout(() => {
        setShowBalloon(false);
        nextStep();
      }, timerDuration);
    }
    return () => clearTimeout(timer);
  }, [showBalloon, gameStatus, nextStep]);

  const handleBalloonClick = () => {
    setScore((prev) => prev + 1);
    setShowBalloon(false);
    nextStep();
  };

  if (gameStatus === "success" || gameStatus === "failure") {
    return (
      <ResultScreen
        type={gameStatus}
        score={score}
        total={totalSteps}
        percentage={serverData?.percentage}
      />
    );
  }

  return (
    <div className="relative w-full h-screen bg-[#E3F2FD] overflow-hidden font-sans">
      {/* الشريط العلوي حسب الفيجما */}
      <div className="absolute top-0 w-full p-4 flex items-center justify-between z-10">
        <button className="text-blue-400 text-3xl font-bold">×</button>
        <div className="w-1/2 h-4 bg-white rounded-full overflow-hidden border border-blue-100 shadow-sm">
          <div
            className="h-full bg-blue-400 transition-all duration-500"
            style={{ width: `${(currentIndex / totalSteps) * 100}%` }}
          ></div>
        </div>
        <div className="flex items-center gap-1 font-bold text-blue-900">
          ⭐ 50ro
        </div>
      </div>

      {/* السحاب */}
      <div className="absolute top-20 left-10 opacity-60 text-4xl">☁️</div>
      <div className="absolute top-32 right-20 opacity-60 text-4xl">☁️</div>

      {gameStatus === "start" ? (
        <div className="flex h-full items-center justify-center">
          <button
            onClick={() => setGameStatus("playing")}
            className="bg-blue-500 text-white px-16 py-4 rounded-full text-2xl font-bold shadow-xl hover:bg-blue-600 transition-transform active:scale-95"
          >
            ابدأ
          </button>
        </div>
      ) : (
        showBalloon && (
          <div
            className={`absolute transition-all duration-300 cursor-pointer ${
              POSITIONS[currentIndex % POSITIONS.length].css
            }`}
            onClick={handleBalloonClick}
          >
            <div className="relative animate-bounce">
              <div className="w-16 h-20 bg-blue-500 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] shadow-lg"></div>
              <div className="w-0.5 h-14 bg-gray-400 mx-auto -mt-1 opacity-70"></div>
            </div>
          </div>
        )
      )}

      {/* الأرضية الخضراء */}
      <div className="absolute bottom-0 w-full h-40 pointer-events-none">
        <div className="absolute bottom-0 w-full h-24 bg-[#66BB6A] rounded-t-[100px]"></div>
        <div className="absolute bottom-4 left-1/4 w-32 h-20 bg-[#81C784] rounded-full blur-xl opacity-40"></div>
      </div>
    </div>
  );
};

// شاشة النتائج المتوافقة مع رد الباك إند
const ResultScreen = ({ type, score, total, percentage }: any) => {
  // نستخدم النسبة القادمة من الباك إند، وإذا لم تتوفر نحسبها محلياً
  const displayPercentage = percentage ?? Math.round((score / total) * 100);

  return (
    <div className="h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-2 text-gray-400 font-medium">نسبة التركيز</div>
      <div className="text-6xl font-black text-blue-600 mb-4">
        {displayPercentage}%
      </div>
      <div className="w-64 h-2 bg-gray-100 rounded-full mb-10 overflow-hidden">
        <div
          className="bg-blue-500 h-full transition-all duration-1000"
          style={{ width: `${displayPercentage}%` }}
        ></div>
      </div>

      <h2 className="text-4xl font-bold mb-8 text-blue-900">
        {type === "success" ? "أحسنت!" : "حاول تاني"}
      </h2>

      {/* صورة الولد حسب الحالة */}
      <div className="w-48 h-64 bg-blue-50 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
        <span className="text-9xl">{type === "success" ? "👦" : "😟"}</span>
      </div>

      <div className="text-gray-500 text-lg mb-10 font-medium">
        لقد أنجزت <span className="text-blue-600 font-bold">{score}</span> من{" "}
        <span className="font-bold">{total}</span>
      </div>

      <button
        onClick={() => window.location.reload()}
        className="bg-[#FF9800] text-white w-full max-w-sm py-5 rounded-3xl text-2xl font-black shadow-lg hover:bg-orange-500 transition-colors active:scale-95"
      >
        {type === "success" ? "التالي" : "حاول مرة أخرى"}
      </button>
    </div>
  );
};

export default BalloonGame;
