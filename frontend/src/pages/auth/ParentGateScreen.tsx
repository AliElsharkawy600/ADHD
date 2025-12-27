import React, { useState } from 'react';

export const ParentGateScreen = ({ onNavigate, targetScreen }: any) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const checkAnswer = (val: number) => {
    if (val === 34) { // 9 + 25
      setIsSuccess(true);
      setTimeout(() => onNavigate(targetScreen), 1500);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center">
      {!isSuccess ? (
        <>
          <div className="mb-8 text-4xl">🛡️</div>
          <h2 className="text-2xl font-bold mb-2">تحقق ولي الأمر</h2>
          <p className="text-gray-500 mb-8">للمتابعة، يرجى حل المسألة الحسابية</p>
          <div className="text-3xl font-bold mb-8 text-blue-600 font-mono">? = 9 + 25</div>
          <div className="grid grid-cols-2 gap-4 w-full">
            {[12, 34, 55, 47].map(num => (
              <button key={num} onClick={() => checkAnswer(num)} className="border-2 border-gray-100 py-4 rounded-2xl text-xl font-bold hover:bg-blue-50">
                {num}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="animate-bounce text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold">تم التحقق بنجاح</h2>
        </div>
      )}
    </div>
  );
};