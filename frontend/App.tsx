import React, { useState } from 'react';
import { OnboardingFlow } from './components/OnboardingFlow';
import { AuthFlow } from './components/AuthFlow';

export default function App() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="w-full h-screen overflow-hidden bg-white">
      {showAuth ? (
        <AuthFlow />
      ) : (
        <OnboardingFlow onFinish={() => setShowAuth(true)} />
      )}
    </div>
  );
}
