import React, { useState } from 'react';
import { WelcomeScreen } from '../pages/auth/WelcomeScreen';
import { LoginScreen } from '../pages/auth/LoginScreen';
import { SignupScreen } from '../pages/auth/SignupScreen';
import { OTPScreen } from '../pages/auth/OTPScreen';
import { ForgotPasswordScreen, ResetPasswordScreen } from '../pages/auth/PasswordScreens';
import { SuccessScreen } from '../pages/common/SuccessScreen';
import { HomeScreen } from '../pages/home/HomeScreen';

interface ScreenState {
  name: string;
  params?: any;
}

export const AuthNavigator: React.FC = () => {
  // Changed initial state from 'login' to 'welcome'
  const [screen, setScreen] = useState<ScreenState>({ name: 'welcome' });

  const navigate = (to: string, params?: any) => {
      setScreen({ name: to, params });
  };

  const renderScreen = () => {
      switch(screen.name) {
          case 'welcome':
            return <WelcomeScreen onNavigate={navigate} params={screen.params} />;
          case 'login': 
            return <LoginScreen onNavigate={navigate} params={screen.params} />;
          case 'signup': 
            return <SignupScreen onNavigate={navigate} params={screen.params} />;
          case 'otp': 
            return <OTPScreen onNavigate={navigate} params={screen.params} />;
          case 'forgot-password': 
            return <ForgotPasswordScreen onNavigate={navigate} params={screen.params} />;
          case 'reset-password': 
            return <ResetPasswordScreen onNavigate={navigate} params={screen.params} />;
          case 'success-signup': 
             return <SuccessScreen 
                        onNavigate={navigate} 
                        title="مرحباً!" 
                        subtitle="تم إنشاء حسابك وتفعيله بنجاح" 
                    />;
          case 'success-reset': 
             return <SuccessScreen 
                        onNavigate={navigate} 
                        title="تهانينا!" 
                        subtitle="تم تغيير كلمة المرور بنجاح" 
                    />;
          case 'home':
             return <HomeScreen />;
          default: 
            return <WelcomeScreen onNavigate={navigate} />;
      }
  };

  return (
    <div className="w-full h-full bg-white animate-in fade-in duration-300">
        {renderScreen()}
    </div>
  );
};