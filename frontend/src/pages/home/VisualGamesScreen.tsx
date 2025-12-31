
import React, { useState } from "react";
import { ScreenProps } from "../../types";
import { PremiumPopup } from "../../components/ui/PremiumPopup";
import dogPhoto from "../../assets/dog.png";
import { 
    BalloonGameIcon, 
    TrackingGameIcon, 
    DragDropGameIcon, 
    PlayButtonIcon,
    LockIcon
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
  },
  {
    id: 4,
    title: "السحب والإفلات",
    desc: "الربط بين الأشياء",
    isPremium: true,
    color: "bg-blue-50",
    icon: <DragDropGameIcon />,
  },
];

export const VisualGamesScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="flex flex-col h-full bg-white p-6 dir-rtl">
      {/* Header */}
      <div className="grid grid-cols-3 items-center pt-4 mb-6" dir="rtl">
        <div className="flex justify-start">
          <button
            // onClick={() => onNavigate("home")}
            // onClick={() => onNavigate("", {}, { isBack: true })}
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
            onClick={() => {
              if (game.isPremium) {
                setShowPopup(true);
              } else if (game.path) {
                console.log("Navigating to:", game.path);
                onNavigate(game.path);
              }
            }}
            className={`relative flex items-center p-6 rounded-2xl border-2 ${
              game.isPremium ? "bg-gray-100 border-gray-300" : "border-blue-200"
            } cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98] transition-transform`}
          >
            {/* Icon Container */}
            <div
              className={`w-20 h-20 rounded-xl ${game.color} flex items-center justify-center relative flex-shrink-0`}
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

            {/* Play Button */}
            <div className="flex-shrink-0">
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
