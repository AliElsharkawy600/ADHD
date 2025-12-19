import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { ScreenProps } from '../../types';

interface SuccessProps extends ScreenProps {
  title: string;
  subtitle: string;
  buttonText?: string;
}

export const SuccessScreen: React.FC<SuccessProps> = ({ onNavigate, title, subtitle, buttonText = "المتابعة" }) => {
  return (
    <div className="flex flex-col h-full items-center justify-center px-6 pt-10 pb-safe relative overflow-hidden">
       {/* Confetti Background Effect */}
       <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 text-yellow-400 animate-bounce">★</div>
          <div className="absolute top-20 right-20 text-blue-400 animate-pulse">●</div>
          <div className="absolute bottom-40 left-1/4 text-red-400 animate-spin">■</div>
          <div className="absolute top-1/3 right-10 text-green-400 text-xl">✦</div>
       </div>

       <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mb-6 relative">
           <div className="absolute -top-2 -right-2 text-4xl animate-bounce">🎉</div>
           <CheckCircle size={60} className="text-[#5CAAF8]" />
       </div>

       <h2 className="text-2xl font-bold text-[#5CAAF8] mb-2">{title}</h2>
       <p className="text-gray-500 mb-12 text-center max-w-xs">{subtitle}</p>

       <Button onClick={() => onNavigate('login')} className="w-full max-w-xs">
         {buttonText}
       </Button>
    </div>
  );
};
