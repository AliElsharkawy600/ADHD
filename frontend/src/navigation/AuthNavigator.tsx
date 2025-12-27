import React, { useEffect, useState } from "react";
import { WelcomeScreen } from "../pages/auth/WelcomeScreen";
import { LoginScreen } from "../pages/auth/LoginScreen";
import { SignupScreen } from "../pages/auth/SignupScreen";
import { OTPScreen } from "../pages/auth/OTPScreen";
import {
  ForgotPasswordScreen,
  ResetPasswordScreen,
} from "../pages/auth/PasswordScreens";
import { ChildSetupScreen } from "../pages/auth/ChildSetupScreen";
import { SuccessScreen } from "../pages/common/SuccessScreen";
import { HomeScreen } from "../pages/home/HomeScreen";
import { VisualGamesScreen } from "../pages/home/VisualGamesScreen";
import { ParentGateScreen } from "../pages/auth/ParentGateScreen";
import { PremiumPlansScreen } from "../pages/auth/PremiumPlansScreen";
import { useAuth } from "../context/AuthContext";

interface ScreenState {
  name: string;
  params?: any;
}

export const AuthNavigator: React.FC = () => {
  // 1. استخراج حالة التوثيق من الـ Context
  const { isAuthenticated } = useAuth();

  // 2. التعديل هنا: تحديد الشاشة الابتدائية بناءً على حالة المستخدم
  // إذا كان مسجل دخول نذهب لـ "home"، وإذا لم يكن نذهب لـ "welcome"
  const [screen, setScreen] = useState<ScreenState>({
    name: isAuthenticated ? "home" : "welcome",
  });

  // --- الجزء الجديد: مراقبة حالة تسجيل الدخول ---
  useEffect(() => {
    if (isAuthenticated) {
      setScreen({ name: "home" });
    } else {
      setScreen({ name: "welcome" });
    }
  }, [isAuthenticated]); // كرر التنفيذ كلما تغيرت isAuthenticated

  const navigate = (to: string, params?: any) => {
    setScreen({ name: to, params });
  };
  const renderScreen = () => {
    switch (screen.name) {
      case "welcome":
        return <WelcomeScreen onNavigate={navigate} params={screen.params} />;
      case "login":
        return <LoginScreen onNavigate={navigate} params={screen.params} />;
      case "signup":
        return <SignupScreen onNavigate={navigate} params={screen.params} />;
      case "otp":
        return <OTPScreen onNavigate={navigate} params={screen.params} />;
      case "child-setup":
        return (
          <ChildSetupScreen onNavigate={navigate} params={screen.params} />
        );
      case "forgot-password":
        return (
          <ForgotPasswordScreen onNavigate={navigate} params={screen.params} />
        );
      case "reset-password":
        return (
          <ResetPasswordScreen onNavigate={navigate} params={screen.params} />
        );
      case "success-signup":
        return (
          <SuccessScreen
            onNavigate={navigate}
            title="مرحباً!"
            subtitle="تم إنشاء حسابك وتفعيله بنجاح"
          />
        );
      case "success-reset":
        return (
          <SuccessScreen
            onNavigate={navigate}
            title="تهانينا!"
            subtitle="تم تغيير كلمة المرور بنجاح"
          />
        );
      case "home":
        return <HomeScreen onNavigate={navigate} />;
      // أضف هذه الحالات داخل renderScreen
      case "visual-games":
        return <VisualGamesScreen onNavigate={navigate} />;
      case "parent-gate":
        return (
          <ParentGateScreen
            onNavigate={navigate}
            targetScreen={screen.params?.target}
          />
        );
      case "premium-plans":
        return <PremiumPlansScreen onNavigate={navigate} />;
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
