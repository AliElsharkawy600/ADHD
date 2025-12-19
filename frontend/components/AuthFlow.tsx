import React, { useState } from 'react';
import { 
    LoginScreen, 
    SignupScreen, 
    OTPScreen, 
    ForgotPasswordScreen, 
    ResetPasswordScreen, 
    SuccessScreen 
} from './AuthScreens';
import { HomeScreen } from './HomeScreen';

export const AuthFlow: React.FC = () => {
  const [screen, setScreen] = useState('login');

  const navigate = (to: string) => {
      setScreen(to);
  };

  const renderScreen = () => {
      switch(screen) {
          case 'login': return <LoginScreen onNavigate={navigate} />;
          case 'signup': return <SignupScreen onNavigate={navigate} />;
          case 'otp': return <OTPScreen onNavigate={navigate} />;
          case 'forgot-password': return <ForgotPasswordScreen onNavigate={navigate} />;
          case 'reset-password': return <ResetPasswordScreen onNavigate={navigate} />;
          case 'success-signup': 
             return <SuccessScreen 
                        onNavigate={navigate} 
                        title="مرحباً Ola !" 
                        subtitle="تم إنشاء حسابك بنجاح" 
                    />;
          case 'success-reset': 
             return <SuccessScreen 
                        onNavigate={navigate} 
                        title="تهانينا !" 
                        subtitle="تم تغيير كلمة المرور بنجاح" 
                    />;
          case 'home':
             return <HomeScreen />;
          default: return <LoginScreen onNavigate={navigate} />;
      }
  };

  return (
    <div className="w-full h-full bg-white animate-in fade-in duration-300">
        {renderScreen()}
    </div>
  );
};
