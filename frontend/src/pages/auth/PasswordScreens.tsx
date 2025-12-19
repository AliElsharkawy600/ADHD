import React from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { Logo } from '../../components/ui/Logo';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ScreenProps } from '../../types';

// Forgot Password Screen
export const ForgotPasswordScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col h-full px-6 pt-10 pb-safe">
       <div className="w-full flex justify-end mb-4">
         <button onClick={() => onNavigate('login')} className="p-2 text-gray-600">
           <ArrowLeft size={24} />
         </button>
       </div>
       
       <Logo className="mb-8" />

       <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#5CAAF8] mb-1">إعادة كلمة المرور!</h2>
        <p className="text-gray-500 text-sm">لا تقلق، سنرسل لك رمز التحقق لإعادة تعيين كلمة المرور</p>
      </div>

      <div className="flex-1">
        <Input 
          label="البريد الإلكتروني *"
          placeholder="أدخل البريد الإلكتروني"
          icon={<Mail size={20} />}
        />

        <Button onClick={() => onNavigate('reset-password')} className="mt-4">
            إرسال رمز التحقق
        </Button>
      </div>
    </div>
  );
};

// Reset Password Screen
export const ResetPasswordScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col h-full px-6 pt-10 pb-safe">
       <div className="w-full flex justify-end mb-4">
         <button onClick={() => onNavigate('login')} className="p-2 text-gray-600">
           <ArrowLeft size={24} />
         </button>
       </div>
       
       <Logo className="mb-8" />

       <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#5CAAF8] mb-1">إعادة كلمة المرور!</h2>
        <p className="text-gray-500 text-sm">لا تقلق، سنرسل لك رمز التحقق لإعادة تعيين كلمة المرور</p>
      </div>

      <div className="flex-1">
        <Input 
          label="أنشئ كلمة مرور جديدة *"
          placeholder="أدخل كلمة مرور جديدة"
          isPassword
        />
        <Input 
          label="تأكيد كلمة المرور الجديدة *"
          placeholder="تأكيد كلمة المرور"
          isPassword
        />

        <Button onClick={() => onNavigate('success-reset')} className="mt-4">
            تعيين كلمة المرور
        </Button>
      </div>
    </div>
  );
};
