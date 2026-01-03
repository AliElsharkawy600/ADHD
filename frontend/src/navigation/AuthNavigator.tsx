import React, { useEffect, useState } from "react";
import { App as CapacitorApp } from "@capacitor/app"; // استيراد كباستور للتحكم في زر الموبايل
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
import { BalloonGameScreen } from "../pages/games/balloon/BalloonGameScreen";
import { AnimalMatchGameScreen } from "../pages/games/animal-match/AnimalMatchGameScreen";
import { DragDropGameScreen } from "../pages/games/dragdrop/DragDropGameScreen";
import MatchingGameScreen from "../pages/games/matching-game/MatchingGameScreen";

interface ScreenState {
  name: string;
  params?: any;
}

export const AuthNavigator: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // الحالة الابتدائية للشاشة
  const [screen, setScreen] = useState<ScreenState>({
    name: isAuthenticated ? "home" : "welcome",
  });

  // 1. معالجة التنقل (Navigation) وتسجيله في الـ History
  const navigate = (
    to: string,
    params?: any,
    options?: { replace?: boolean; isBack?: boolean }
  ) => {
    if (options?.isBack) {
      window.history.back();
      return;
    }

    const nextScreen = { name: to, params };
    // تسجيل الشاشة الجديدة في تاريخ المتصفح (Web History)
    window.history.pushState(nextScreen, "");
    setScreen(nextScreen);
  };

  // 2. الاستماع لحدث الرجوع (popstate) سواء من المتصفح أو زر الرجوع
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state) {
        // إذا رجع المستخدم، نأخذ البيانات المخزنة مسبقاً ونعرضها
        setScreen(event.state);
      }
    };

    window.addEventListener("popstate", handlePopState);

    // تسجيل الحالة الأولى في التاريخ عند تشغيل التطبيق لأول مرة
    if (!window.history.state) {
      window.history.replaceState(
        { name: isAuthenticated ? "home" : "welcome" },
        ""
      );
    }

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // // 3. ربط زر الرجوع الفعلي في أجهزة الأندرويد (Capacitor)
  // useEffect(() => {
  //   const setupBackButton = async () => {
  //     await CapacitorApp.addListener('backButton', () => {
  //       // إذا كان هناك تاريخ للرجوع، ارجع للخلف (هذا سيحفز popstate تلقائياً)
  //       if (window.history.length > 1) {
  //         window.history.back();
  //       } else {
  //         // إذا كنت في أول شاشة، أغلق التطبيق
  //         CapacitorApp.exitApp();
  //       }
  //     });
  //   };

  //   setupBackButton();

  //   return () => {
  //     CapacitorApp.removeAllListeners();
  //   };
  // }, []);

  // 3. ربط زر الرجوع الفعلي في أجهزة الأندرويد (Capacitor)
  useEffect(() => {
    const setupBackButton = async () => {
      await CapacitorApp.addListener("backButton", () => {
        // نحدد هنا الشاشات التي نعتبرها "جذور" للتطبيق ويجب الخروج عندها
        const isRootScreen =
          screen.name === "home" || screen.name === "welcome";

        if (isRootScreen) {
          // إذا كان في المنزل أو الترحيب، أغلق التطبيق مباشرة
          CapacitorApp.exitApp();
        } else {
          // في أي شاشة أخرى، ارجع للخلف في التاريخ
          window.history.back();
        }
      });
    };

    setupBackButton();

    return () => {
      // تنظيف المستمع عند مسح الكومبوننت
      CapacitorApp.removeAllListeners();
    };
  }, [screen.name]); // ضروري إضافة screen.name هنا ليتحدث المستمع بأحدث شاشة

  // // // 3. ربط زر الرجوع الفعلي في أجهزة الأندرويد (Capacitor)
  // useEffect(() => {
  //   CapacitorApp.addListener('backButton', () => {
  //     if (screen.name === "home" || screen.name === "welcome") {
  //       CapacitorApp.exitApp();
  //     } else {
  //       window.history.back(); // اترك المتصفح يتصرف في باقي الحالات
  //     }
  //   });
  //   return () => { CapacitorApp.removeAllListeners(); };
  // }, [screen.name]);

  // مراقبة حالة تسجيل الدخول وتصفير التاريخ عند التغيير
  useEffect(() => {
    const initialScreen = { name: isAuthenticated ? "home" : "welcome" };
    setScreen(initialScreen);
    // عند تسجيل الدخول أو الخروج، نريد تصفير التاريخ القديم
    window.history.replaceState(initialScreen, "");
  }, [isAuthenticated]);

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
      case "balloon":
        return <BalloonGameScreen onNavigate={navigate} />;
      case "matching":
        return <AnimalMatchGameScreen onNavigate={navigate} />;
      case "matching-game":
        return <MatchingGameScreen />;
      case "drag-drop":
        return <DragDropGameScreen onNavigate={navigate} />;

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
