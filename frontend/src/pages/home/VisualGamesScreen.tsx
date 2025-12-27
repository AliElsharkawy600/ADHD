import React, { useState } from "react";
import { ScreenProps } from "../../types";
import { PremiumPopup } from "../../components/ui/PremiumPopup";
import { GAMES } from "../../components/utils/data";


export const VisualGamesScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="flex flex-col h-full bg-white p-6 dir-rtl">
      <div className="grid grid-cols-3 items-center pt-4 mb-6" dir="rtl">
        {/* السهم في أقصى اليمين */}
        <div className="flex justify-start">
          <button
            onClick={() => onNavigate("home")}
            className="p-2 text-black-500 text-4xl"
          >
            {"<"} {/* غيرت الاتجاه ليكون مناسباً للغة العربية */}
          </button>
        </div>

        {/* العنوان في المنتصف تماماً */}
        <h1 className="text-2xl font-bold text-gray-800 text-center whitespace-nowrap">
          العلاج البصري
        </h1>

        {/* مساحة فارغة في اليسار لضمان بقاء العنوان في المنتصف */}
        <div className="w-10"></div>
      </div>

      <div className="space-y-6">
        {GAMES.map((game) => (
          <div
            key={game.id}
            onClick={() => {
              if (game.isPremium) {
                setShowPopup(true);
              } else {
                onNavigate(game.path);
              }
            }}  
            className={`relative flex items-center p-6 rounded-2xl border-2 ${
              game.isPremium ? "border-gray-200" : "border-blue-200"
            } cursor-pointer`}
          >
            <div
              className={`w-20 h-20 rounded-xl ${game.color} flex items-center justify-center relative `}
            >
              {/* هنا توضع الأيقونة */}
              {game.icon}

              {game.isPremium && (
                <div
                  className="absolute 
      -top-3 
      left-1/2 
      -translate-x-1/2
      bg-white 
      rounded-full 
      p-1
      shadow"
                >
                  🔒
                </div>
              )}
            </div>
            <div className="mr-4 flex-1 text-right">
              <h3 className="font-bold text-lg">{game.title}</h3>
              <p className="text-gray-500 text-sm">{game.desc}</p>
            </div>

            <div>
              <svg
                width="48"
                height="50"
                viewBox="0 0 48 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_227_2506)">
                  <path
                    d="M48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24Z"
                    fill="#488DFF"
                    shapeRendering="crispEdges"
                  />
                  <path
                    d="M32 24V20.44C32 16.02 28.87 14.21 25.04 16.42L21.95 18.2L18.86 19.98C15.03 22.19 15.03 25.81 18.86 28.02L21.95 29.8L25.04 31.58C28.87 33.79 32 31.98 32 27.56V24Z"
                    fill="#FFFCF3"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_227_2506"
                    x="0"
                    y="0"
                    width="48"
                    height="50"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.101961 0 0 0 0 0.443137 0 0 0 0 1 0 0 0 1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_227_2506"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_227_2506"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
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
