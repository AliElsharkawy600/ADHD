import lockGif from "../../assets/Locked.gif";

export const PremiumPopup = ({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
    <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-blue-500 rounded-b-[50%] -translate-y-12"></div>
      <button
        onClick={onClose}
        className="absolute top-4 left-4 text-white text-xl"
      >
        <svg
          width="48"
          height="50"
          viewBox="0 0 48 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_227_2724)">
            <rect
              width="48"
              height="48"
              rx="24"
              fill="#FCFDFF"
              shapeRendering="crispEdges"
            />
            <rect
              x="0.5"
              y="0.5"
              width="47"
              height="47"
              rx="23.5"
              stroke="#488DFF"
              shapeRendering="crispEdges"
            />
            <path
              d="M17.001 17L31 30.9991"
              stroke="#488DFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 30.9991L30.999 17"
              stroke="#488DFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_227_2724"
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
                values="0 0 0 0 0.4 0 0 0 0 0.627451 0 0 0 0 1 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_227_2724"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_227_2724"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </button>

      <div className="relative mt-4">
        <div className="text-6xl mb-4 flex justify-center">
          <img src={lockGif} alt="loading" className="w-40 h-40" />
        </div>
        <h2 className="text-2xl font-bold text-blue-900 mb-2">
          افتح كل الألعاب!
        </h2>
        <p className="text-gray-600 mb-6 text-lg">
          مع الاشتراك البريميوم ستحصل على محتوى تعليمي كامل
        </p>
        <button
          onClick={onConfirm}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200"
        >
          مساعدة بابا
        </button>
      </div>
    </div>
  </div>
);
