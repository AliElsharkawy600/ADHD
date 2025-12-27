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
        ✕
      </button>

      <div className="relative mt-4">
        <div className="text-6xl mb-4">🔓</div>
        <h2 className="text-2xl font-bold text-blue-900 mb-2">
          افتح كل الألعاب!
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
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
