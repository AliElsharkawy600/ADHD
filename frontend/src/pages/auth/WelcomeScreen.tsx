import React from 'react';
import { Logo } from '../../components/ui/Logo';
import { Button } from '../../components/ui/Button';
import { ScreenProps } from '../../types';

export const WelcomeScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col h-full relative bg-blue-50/50">
      
      {/* Background Effect (the blurry background in image) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* The background image will be here if we wish to add it in the future. */}
      </div>

      <div className="relative flex flex-col items-center justify-center flex-1 px-6 pt-safe pb-safe z-10">
        
        {/* Logo Section */}
        <div className="mb-8 p-8 bg-white/80 backdrop-blur-sm rounded-full shadow-xl shadow-blue-100/50">
             <Logo />
        </div>

        {/* Text Section */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl font-bold text-gray-800 leading-tight">
            مركز نماء لتنمية
            <br />
            <span className="text-[#5CAAF8]">مهارات الطفل</span>
          </h2>
          <p className="text-gray-500 text-base max-w-xs mx-auto leading-relaxed">
            من حيث النمو اللغوي، والنمو المعرفي، وتعديل السلوك
          </p>
        </div>

        {/* Buttons Section */}
        <div className="w-full space-y-4 mb-8">
          <Button 
            onClick={() => onNavigate('signup')} 
            className="w-full shadow-lg shadow-blue-200/50"
          >
            إنشاء حساب جديد
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => onNavigate('login')}
            className="w-full border-[#5CAAF8] text-[#5CAAF8] hover:bg-blue-50"
          >
            تسجيل الدخول
          </Button>
        </div>

      </div>
    </div>
  );
};