import React, { useState } from 'react';
import { OnboardingNavigator } from './navigation/OnboardingNavigator';
import { AuthNavigator } from './navigation/AuthNavigator';

export default function App() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="w-full h-screen overflow-hidden bg-white">
      {showAuth ? (
        <AuthNavigator />
      ) : (
        <OnboardingNavigator onFinish={() => setShowAuth(true)} />
      )}
    </div>
  );
}
