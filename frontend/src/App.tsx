import React, { useState, useEffect } from 'react';
import { OnboardingNavigator } from './navigation/OnboardingNavigator';
import { AuthNavigator } from './navigation/AuthNavigator';
import { AuthProvider, useAuth } from './context/AuthContext';
// لم نعد بحاجة لاستيراد HomeScreen هنا لأن Navigator هو من سيعرضها
// import { HomeScreen } from './pages/home/HomeScreen'; 

const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [hasFinishedOnboarding, setHasFinishedOnboarding] = useState(false);

  // --- جزء لم يعدل (منطق التحقق من الـ Onboarding) ---
  useEffect(() => {
    const onboardingStatus = localStorage.getItem('onboarding_completed');
    if (onboardingStatus) {
      setHasFinishedOnboarding(true);
    }
  }, []);

  const handleOnboardingFinish = () => {
    localStorage.setItem('onboarding_completed', 'true');
    setHasFinishedOnboarding(true);
  };
  // ------------------------------------------------

  if (isLoading) return <div className="w-full h-screen bg-white" />; 

  /* الجزء الذي تم تعديله:
     تم حذف شرط (if isAuthenticated) الذي كان يعيد <HomeScreen /> مباشرة.
     الآن نترك التحكم بالكامل لـ AuthNavigator.
  */

  return (
    <div className="w-full h-screen overflow-hidden bg-white">
      {!hasFinishedOnboarding ? (
        <OnboardingNavigator onFinish={handleOnboardingFinish} />
      ) : (
        /* سواء كان المستخدم مسجل دخول أم لا، سيتوجه لـ AuthNavigator.
           الـ Navigator سيفحص isAuthenticated داخلياً ويعرض الشاشة المناسبة
           (Home أو Welcome) ويمرر دالة onNavigate بنجاح.
        */
        <AuthNavigator />
      )}
    </div>
  );
};

// --- جزء لم يعدل (المغلف الرئيسي) ---
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}