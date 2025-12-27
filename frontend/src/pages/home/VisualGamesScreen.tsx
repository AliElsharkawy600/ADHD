import React, { useState } from "react";
import { ScreenProps } from "../../types";
import { PremiumPopup } from "../../components/ui/PremiumPopup";

const GAMES = [
  {
    id: 1,
    title: "فرقع البالونات",
    desc: "تنسيق العين واليد",
    isPremium: false,
    color: "bg-blue-100",
  },
  {
    id: 2,
    title: "توصيل الهدف",
    desc: "تحديد الاتجاه",
    isPremium: false,
    color: "bg-orange-100",
  },
  {
    id: 3,
    title: "تتبع الإشارة",
    desc: "التتبع البصري",
    isPremium: true,
    color: "bg-gray-100",
  },
  {
    id: 4,
    title: "السحب والإفلات",
    desc: "الربط بين الأشياء",
    isPremium: true,
    color: "bg-blue-50",
  },
];

export const VisualGamesScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="flex flex-col h-full bg-white p-4 dir-rtl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">العلاج البصري</h1>
        <button
          onClick={() => onNavigate("home")}
          className="p-2 text-blue-500"
        >
          {"<"}
        </button>
      </div>

      <div className="space-y-4">
        {GAMES.map((game) => (
          <div
            key={game.id}
            onClick={() => (game.isPremium ? setShowPopup(true) : null)}
            className={`relative flex items-center p-4 rounded-2xl border-2 ${
              game.isPremium ? "border-gray-200" : "border-blue-200"
            } cursor-pointer`}
          >
            <div
              className={`w-16 h-16 rounded-xl ${game.color} flex items-center justify-center`}
            >
              {/* هنا توضع الأيقونة */}
              {game.isPremium && (
                <div className="absolute inset-0 bg-black/10 rounded-2xl flex items-center justify-center">
                  🔒
                </div>
              )}
            </div>
            <div className="mr-4 flex-1 text-right">
              <h3 className="font-bold text-lg">{game.title}</h3>
              <p className="text-gray-500 text-sm">{game.desc}</p>
            </div>
          </div>
        ))}
      </div>

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
