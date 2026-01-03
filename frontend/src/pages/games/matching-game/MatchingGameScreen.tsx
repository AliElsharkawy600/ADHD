// ---------------------------------------------------------------------------
// اسم الملف: MatchingGame.tsx
// الدور: مكون اللعبة الرئيسي (لعبة التوصيل/المطابقة)
// الوظيفة:
// - إدارة منطق اللعبة بالكامل (المستويات، المحاولات، التوقيت، السحب والإفلات).
// - عرض واجهة المستخدم المتفاعلة (اليد، الأهداف، شريط التقدم).
// - تقديم التغذية الراجعة البصرية (تمت إزالة الأصوات بناءً على الطلب).
// الستايل: مطابق لتصميم BalloonGameScreen (شاشة كاملة، ألوان سماوية).
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

// React & hooks
import React, { useState, useRef, useEffect } from "react";

// Animation libraries
import { motion, AnimatePresence } from "framer-motion";

// Internal components
import { GameResultScreen } from "../../../components/games/common/GameResultScreen";
import { TopBar } from "./components/TopBar";
import { TargetCard } from "./components/TargetCard";
import { DragLine } from "./components/DragLine";
import { HandCursor } from "./components/HandCursor";

import { useMatchingGame } from "./hooks/useMatchingGame"; // استدعاء الهوك


// ---------------------------------------------------------------------------
// Types & Interfaces
// ---------------------------------------------------------------------------
// (تعريف واجهات البيانات - Target, Trial, Level - موجودة في ./types/game)

// ---------------------------------------------------------------------------
// Constants & Configuration
// ---------------------------------------------------------------------------
// (GAME_LEVELS مستورد من ./data/levels)

// ---------------------------------------------------------------------------
export default function MatchingGame() {
  // 1. استدعاء الهوك لجلب كل المنطق والحالة
  const { state, data, refs, actions } = useMatchingGame();

  // 2. شرط الحماية (Guard Clause)
  if (!data.currentLevel || !data.currentTrial) return null;

  return (
    <div className="relative w-full h-screen bg-sky-100 overflow-hidden flex flex-col font-sans select-none touch-none dir-rtl">
      {/* الشريط العلوي */}
      <TopBar
        progress={state.progress}
        onNavigate={(route) => console.log("Navigate to:", route)}
      />

      {/* منطقة المؤقتات - تركتها فارغة كما في الكود المرسل، لكن يمكنك استخدام state.levelTimeLeft هنا */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 flex gap-3 z-30 w-full justify-center px-4"></div>

      {/* منطقة اللعب */}
      <div
        ref={refs.containerRef}
        className="flex-1 relative w-full h-full z-10">
        {/* الأهداف Grid */}
        <div className="absolute top-[20%] left-0 right-0 flex justify-around px-4 w-full max-w-4xl mx-auto">
          {data.currentShuffledTargets.map((target) => {
            const isCurrentTarget = target.id === data.currentTargetId;
            return (
              <TargetCard
                key={target.id}
                target={target}
                isCurrentTarget={isCurrentTarget}
                feedback={state.feedback}
                setRef={(el) => (refs.targetRefs.current[target.id] = el)}
              />
            );
          })}
        </div>

        {/* اليد (Hand Cursor) */}
        {![
          "success",
          "failure",
          "completed",
          "timeout",
          "levelComplete",
        ].includes(
          state.gameState
        ) && (
          <HandCursor
            rotation={data.handRotation}
            isDragging={state.gameState === "dragging"}
            isIdle={state.gameState === "idle"}
            containerRef={refs.containerRef}
            onDragStart={(e, i) => {
              actions.handleDragStart();
              actions.handleDrag(e, i);
            }}
            onDrag={actions.handleDrag}
            onDragEnd={actions.handleDragEnd}
          />
        )}

        {/* خط التوصيل */}
        {state.gameState === "dragging" && state.lineEnd && (
          <DragLine
            startPosition={data.lineStartPosition}
            endPosition={state.lineEnd}
          />
        )}

        {/* شاشات التغذية الراجعة */}
        <AnimatePresence>
          {/* شاشة الفشل (إعادة المحاولة) */}
          {state.gameState === "failure" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50">
              <GameResultScreen
                type="failure"
                score={0} // يمكنك تعديل الهوك لتمرير نقاط المستوى إذا أردت، أو تركها 0
                total={data.currentLevel.trials.length}
                percentage={0}
                onNext={() => {}}
                onRetry={actions.handleRetryLevel}
                currentLevel={state.currentLevelIndex + 1}
                onHome={() => console.log("Navigate to home")}
              />
            </motion.div>
          )}

          {/* شاشة النجاح (اكتمال اللعبة) */}
          {state.gameState === "completed" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50">
              <GameResultScreen
                type="success"
                score={state.score}
                total={data.totalTrials}
                percentage={(state.score / data.totalTrials) * 100}
                onNext={actions.handleReset} // عند الانتهاء يعيد اللعبة (أو ينتقل لصفحة أخرى)
                onRetry={actions.handleReset}
                currentLevel={state.currentLevelIndex + 1}
                onHome={() => console.log("Navigate to home")}
              />
            </motion.div>
          )}

          {/* شاشة إكمال المستوى (أحسنت) */}
          {state.gameState === "levelComplete" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50">
              <GameResultScreen
                type="success"
                score={state.score}
                total={data.totalTrials}
                percentage={(state.score / data.totalTrials) * 100}
                onNext={actions.handleNextLevel}
                onRetry={actions.handleRetryLevel}
                currentLevel={state.currentLevelIndex + 1}
                onHome={actions.handleReset}
              />
            </motion.div>
          )}

          {/* شاشة انتهاء الوقت */}
          {state.gameState === "timeout" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-center p-8">
              <div className="text-8xl mb-6">⏰</div>
              <h2 className="text-5xl font-bold text-gray-500 mb-4 font-arabic">
                انتهى الوقت
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
