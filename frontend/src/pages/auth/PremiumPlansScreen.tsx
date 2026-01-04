import React from "react";

export const PremiumPlansScreen = ({ onNavigate }: any) => {
  return (
    /* أزلنا h-full تماماً وأضفنا h-auto مع overflow-visible */
    <div
      className="h-auto min-h-full bg-white p-6 pb-20 overflow-visible"
      dir="rtl"
    >
      {/* Header - السهم يمين والعنوان في المنتصف */}
      <div
        className="relative flex items-center mb-10 w-full"
        style={{ minHeight: "40px" }}
      >
        <button
          onClick={() => onNavigate("visual-games")}
          className="z-10 hover:opacity-70 transition-opacity"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.7598 24.0933L4.66642 16L12.7598 7.90668"
              stroke="#256EE8"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M27.333 16H4.89307"
              stroke="#256EE8"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <h2 className="absolute inset-0 flex items-center justify-center text-xl font-bold text-slate-800 pointer-events-none">
          اختر باقتك
        </h2>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-3">
          استثمر في مستقبل طفلك
        </h1>
        <p className="text-slate-500 text-base leading-relaxed">
          افتح عالماً من التعلم الممتع مع محتوى تعليمي احترافي مصمم خصيصاً
          للأطفال
        </p>
      </div>

      {/* Main Card */}
      <div className="border-[1.5px] border-green-400 rounded-[35px] p-6 bg-gradient-to-b from-[#F0F7FF] to-white shadow-sm mb-6">
        {/* Star Icon & Label */}
        <div className="flex justify-between items-start mb-6">
          <span className="text-green-600 font-bold text-xl">
            الباقة المميزة
          </span>
          <div className="bg-white p-2.5 rounded-2xl shadow-sm border border-slate-50">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.52 6.94666L22.3999 10.7067C22.6533 11.2267 23.3333 11.72 23.9066 11.8266L27.3066 12.3866C29.4799 12.7466 29.9866 14.32 28.4266 15.8933L25.7732 18.5467C25.3332 18.9867 25.08 19.8533 25.2266 20.48L25.9866 23.76C26.5866 26.3467 25.1999 27.36 22.9199 26L19.7333 24.1067C19.1599 23.76 18.1999 23.76 17.6266 24.1067L14.4399 26C12.1599 27.3467 10.7733 26.3467 11.3733 23.76L12.1333 20.48C12.2799 19.8667 12.0266 19 11.5866 18.5467L8.93328 15.8933C7.37328 14.3333 7.87995 12.76 10.0533 12.3866L13.4533 11.8266C14.0266 11.7333 14.7066 11.2267 14.9599 10.7067L16.8399 6.94666C17.8399 4.90666 19.4933 4.90666 20.52 6.94666Z"
                stroke="#256EE8"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.667 6.66666H2.66699"
                stroke="#256EE8"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.66699 25.3333H2.66699"
                stroke="#256EE8"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.00033 16H2.66699"
                stroke="#256EE8"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>

        <h3 className="text-2xl font-black text-slate-800 mb-2">
          الاشتراك السنوي
        </h3>
        <p className="text-slate-600 text-base mb-6">
          افتح أكثر من 20 مستوى جديد مع محتوى تعليمي شامل وتقارير متقدمة لمتابعة
          تطور طفلك
        </p>

        {/* Pricing Box */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 text-center mb-6">
          <div className="flex justify-center items-baseline gap-1 mb-1">
            <span className="text-4xl font-black text-blue-600">899</span>
            <span className="text-lg font-bold text-blue-600">ج.م</span>
          </div>
          <div className="text-slate-800 font-bold text-base mb-2">
            للسنة كاملة
          </div>
          <hr className="border-t border-slate-500 my-2" />
          <div className="border-t border-slate-50 pt-2 flex justify-center gap-2 items-center text-sm">
            <span className="text-slate-400 line-through">1188 ج.م</span>
            <span className="text-green-500 font-bold">وفّر 289 ج.م</span>
          </div>
        </div>

        {/* Features List */}
        <ul className="space-y-4 mb-8 mr-1">
          {[
            "فتح جميع المستويات والألعاب",
            "تقارير أداء تفصيلية",
            "قصص تعليمية متخصصة",
            "دعم فني مميز",
            "تحديثات مستمرة",
          ].map((item) => (
            <li
              key={item}
              className="flex items-center text-slate-700 text-sm font-medium"
            >
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full ml-3"></span>
              {item}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button className="w-full bg-[#256EE8] text-white py-4 rounded-2xl text-lg font-bold shadow-lg active:scale-95 transition-all">
          ابدأ الاشتراك السنوي
        </button>
      </div>
    </div>
  );
};
