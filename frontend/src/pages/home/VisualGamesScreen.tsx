import React, { useState } from "react";
import { ScreenProps } from "../../types";
import { PremiumPopup } from "../../components/ui/PremiumPopup";
import apiClient from "../../services/api";
import dogPhoto from "../../assets/dog.png";
import { AlertCircle } from "lucide-react";
import {
  BalloonGameIcon,
  TrackingGameIcon,
  DragDropGameIcon,
  PlayButtonIcon,
  LockIcon,
} from "../../components/icons/GameIcons";

const GAMES = [
  {
    id: 1,
    title: "فقع البالونات",
    desc: "تنسيق العين واليد",
    isPremium: false,
    color: "bg-blue-100",
    icon: <BalloonGameIcon />,
    path: "balloon",
  },
  {
    id: 2,
    title: "توصيل الهدف",
    desc: "تحديد الاتجاه",
    isPremium: false,
    color: "bg-orange-100",
    icon: <img src={dogPhoto} alt="Game Icon" className="w-full h-full" />,
    path: "matching",
  },
  {
    id: 3,
    title: "تتبع الإشارة",
    desc: "التتبع البصري",
    isPremium: true,
    color: "bg-gray-100",
    icon: <TrackingGameIcon />,
    path: "matching-game",
  },
  {
    id: 4,
    title: "السحب والإفلات",
    desc: "الربط بين الأشياء",
    isPremium: false,
    color: "bg-blue-50",
    icon: <DragDropGameIcon />,
    path: "drag-drop",
  },
];

export const VisualGamesScreen: React.FC<ScreenProps> = ({
  onNavigate,
  params,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const levelId = params?.levelId;

  const handleGameSelect = async (game: (typeof GAMES)[0]) => {
    if (game.isPremium) {
      setShowPopup(true);
      return;
    }

    if (game.path) {
      setLoading(true);
      setErrorMessage("");

      try {
        // 1. تنفيذ الريكويست
        const response = await apiClient.post("/games/", {
          name: game.title,
          levelId: levelId,
          maxAttempts: 3,
          passPercentage: 80,
          isActive: true,
        });

        // 2. استخراج الـ _id من الريسبونس
        const gameSessionId = response.data?._id;

        console.log("Game Created with ID:", gameSessionId);

        // 3. الانتقال للعبة وتمرير الـ _id والـ levelId
        onNavigate(game.path, {
          levelId: levelId,
          gameId: gameSessionId, // نمرر الـ _id باسم gameId لاستخدامه داخل اللعبة
        });
      } catch (error: any) {
        console.error("Error starting game session:", error);
        setErrorMessage("عذراً، فشل بدء اللعبة. تأكد من اتصالك بالإنترنت.");
        setTimeout(() => setErrorMessage(""), 3000);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-white p-6 dir-rtl relative">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/70 z-[60] flex flex-col items-center justify-center">
          <div className="w-14 h-14 border-4 border-[#5CAAF8] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-[#5CAAF8] font-bold animate-pulse">
            جاري تحضير اللعبة...
          </p>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="fixed top-10 left-6 right-6 z-[70] flex items-center gap-3 bg-red-50 border border-red-200 p-4 rounded-2xl text-red-600 shadow-lg">
          <AlertCircle size={20} />
          <p className="text-sm font-bold flex-1 text-right">{errorMessage}</p>
        </div>
      )}

      {/* Header */}
      <div className="grid grid-cols-3 items-center pt-4 mb-6" dir="rtl">
        <div className="flex justify-start">
          <button
            onClick={() => window.history.back()}
            className="p-2 text-black-500 text-4xl hover:bg-gray-100 rounded-full transition-colors"
          >
            {"<"}
          </button>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 text-center whitespace-nowrap">
          العلاج البصري
        </h1>
        <div className="w-10"></div>
      </div>

      {/* Games List */}
      <div className="space-y-6 overflow-y-auto pb-20 no-scrollbar">
        {GAMES.map((game) => (
          <div
            key={game.id}
            onClick={() => !loading && handleGameSelect(game)}
            className={`relative flex items-center p-6 rounded-2xl border-2 transition-all ${
              game.isPremium ? "bg-gray-100 border-gray-300" : "border-blue-200"
            } ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:shadow-md active:scale-[0.98]"
            }`}
          >
            {/* Icon Container */}
            <div
              className={`w-20 h-20 rounded-xl ${game.color} flex items-center justify-center relative shrink-0`}
            >
              {game.icon}
              {game.isPremium && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1.5 shadow">
                  <LockIcon />
                </div>
              )}
            </div>

            {/* Game Info */}
            <div className="mr-4 flex-1 text-right">
              <h3 className="font-bold text-lg text-gray-900">{game.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{game.desc}</p>
            </div>

            {/* Play Button Icon */}
            <div className="shrink-0">
              <PlayButtonIcon />
            </div>
          </div>
        ))}
      </div>

      {/* Premium Popup */}
      {showPopup && (
        <PremiumPopup
          onClose={() => setShowPopup(false)}
          onConfirm={() =>
            onNavigate("parent-gate", { target: "premium-plans" })
          }
        />
      )}
    </div>
  );
};
