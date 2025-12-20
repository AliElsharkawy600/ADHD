import React, { useState, useEffect } from 'react';
import { OnboardingNavigator } from './navigation/OnboardingNavigator';
import { AuthNavigator } from './navigation/AuthNavigator';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HomeScreen } from './pages/home/HomeScreen';

const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [hasFinishedOnboarding, setHasFinishedOnboarding] = useState(false);

  // Check if onboarding was previously completed
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

  if (isLoading) return <div className="w-full h-screen bg-white" />; // Or a loader

  if (isAuthenticated) {
    return <HomeScreen />;
  }

  return (
    <div className="w-full h-screen overflow-hidden bg-white">
      {hasFinishedOnboarding ? (
        <AuthNavigator />
      ) : (
        <OnboardingNavigator onFinish={handleOnboardingFinish} />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}