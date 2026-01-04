import React, { useEffect, useState } from "react";
import { App as CapacitorApp } from "@capacitor/app";
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
  const [screen, setScreen] = useState<ScreenState>({
    name: isAuthenticated ? "home" : "welcome",
  });

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
    window.history.pushState(nextScreen, "");
    setScreen(nextScreen);
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state) {
        setScreen(event.state);
      }
    };
    window.addEventListener("popstate", handlePopState);
    if (!window.history.state) {
      window.history.replaceState(
        { name: isAuthenticated ? "home" : "welcome" },
        ""
      );
    }
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isAuthenticated]);



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
          CapacitorApp.exitApp();
        } else {
          window.history.back();
        }
      });
    };
    setupBackButton();
    return () => {
      CapacitorApp.removeAllListeners();
    };
  }, [screen.name]);

  useEffect(() => {
    const initialScreen = { name: isAuthenticated ? "home" : "welcome" };
    setScreen(initialScreen);
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
            subtitle="تم إنشاء حسابك بنجاح"
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

      // الشاشات الرئيسية مع تمرير الـ Params
      case "home":
        return <HomeScreen onNavigate={navigate} />;
      case "visual-games":
        return (
          <VisualGamesScreen onNavigate={navigate} params={screen.params} />
        );

      // شاشات الألعاب (تم إضافة params هنا)
      case "balloon":
        return (
          <BalloonGameScreen onNavigate={navigate} params={screen.params} />
        );
      case "matching":
        return (
          <AnimalMatchGameScreen onNavigate={navigate} params={screen.params} />
        );
      case "drag-drop":
        return (
          <DragDropGameScreen onNavigate={navigate} params={screen.params} />
        );
       case "matching-game":
        return <MatchingGameScreen />;

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
