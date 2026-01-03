// hooks/useMatchingGame.ts
import { useState, useRef, useEffect } from "react";
import { GAME_LEVELS } from "../data/levels"; // افترضنا أنك نقلت البيانات لملف منفصل
// أو يمكنك ترك البيانات هنا إذا لم تفصلها بعد

export const useMatchingGame = () => {
  // --- State ---
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentTrialIndex, setCurrentTrialIndex] = useState(0);
  const [gameState, setGameState] = useState<
    | "idle"
    | "dragging"
    | "success"
    | "failure"
    | "completed"
    | "timeout"
    | "levelComplete"
  >("idle");
  const [score, setScore] = useState(0);
  const [levelTimeLeft, setLevelTimeLeft] = useState(90);
  const [trialTimeLeft, setTrialTimeLeft] = useState(8);
  const [lineEnd, setLineEnd] = useState<{ x: number; y: number } | null>(null);
  const [feedback, setFeedback] = useState<{
    targetId: string;
    type: "success" | "error";
  } | null>(null);
  const [trialPlan, setTrialPlan] = useState<
    Array<{ targetId: string; shuffledTargets: typeof GAME_LEVELS[number]["targets"] }>
  >([]);

  // --- Refs ---
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const levelScoreRef = useRef(0);

  // --- Derived Data ---
  const currentLevel = GAME_LEVELS[currentLevelIndex];
  const currentTrial = trialPlan[currentTrialIndex];
  const currentTargetId = currentTrial?.targetId;
  const currentShuffledTargets = currentTrial?.shuffledTargets ?? [];

  const totalTrials = GAME_LEVELS.reduce(
    (acc, lvl) => acc + lvl.trials.length,
    0
  );
  const currentGlobalTrial =
    GAME_LEVELS.slice(0, currentLevelIndex).reduce(
      (acc, lvl) => acc + lvl.trials.length,
      0
    ) + currentTrialIndex;
  const progress = (currentGlobalTrial / totalTrials) * 100;

  // --- Helpers ---

  const shuffleArray = <T,>(items: T[]): T[] => {
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const buildTrialPlan = () => {
    if (!currentLevel) return [];

    const totalTrials = currentLevel.trials.length;
    const bagTargets = currentLevel.targets.map((t) => t.id);
    const targetOrder: string[] = [];
    let remaining = totalTrials;

    while (remaining > 0) {
      const shuffledBag = shuffleArray(bagTargets);
      for (const id of shuffledBag) {
        if (remaining <= 0) break;
        targetOrder.push(id);
        remaining -= 1;
      }
    }

    return targetOrder.map((targetId) => ({
      targetId,
      shuffledTargets: shuffleArray(currentLevel.targets),
    }));
  };

  const getHandPosition = () => {
    const index = currentShuffledTargets.findIndex((t) => t.id === currentTargetId);
    if (index === 0) return "right" as const;
    if (index === 1) return "center" as const;
    if (index === 2) return "left" as const;
    return "center" as const;
  };

  const getHandRotation = () => {
    if (!currentTrial) return 0;
    const pos = getHandPosition();
    switch (pos) {
      case "right":
        return 45;
      case "left":
        return -45;
      default:
        return 0;
    }
  };

  const getLineStartPosition = () => {
    if (!currentTrial) return { x: "50%", y: "87%" };
    const pos = getHandPosition();
    switch (pos) {
      case "left":
        return { x: "46%", y: "88%" };
      case "right":
        return { x: "53%", y: "87%" };
      default:
        return { x: "50%", y: "87%" };
    }
  };

  // --- Game Flow Actions ---
  const nextTrialOrLevel = () => {
    setFeedback(null);

    if (currentTrialIndex < trialPlan.length - 1) {
      setCurrentTrialIndex((prev) => prev + 1);
      setGameState("idle");
      setTrialTimeLeft(8);
    } else {
      const totalLevelTrials = trialPlan.length || currentLevel.trials.length;
      const percentage = (levelScoreRef.current / totalLevelTrials) * 100;

      if (percentage < 80) {
        setGameState("failure");
        return;
      }

      levelScoreRef.current = 0;

      if (currentLevelIndex < GAME_LEVELS.length - 1) {
        setGameState("levelComplete");
      } else {
        setGameState("completed");
      }
    }
  };

  const handleSuccess = () => {
    setGameState("success");
    if (!currentTargetId) return;
    setFeedback({ targetId: currentTargetId, type: "success" });
    levelScoreRef.current += 1;
    setScore((prev) => prev + 1);
    setTimeout(() => nextTrialOrLevel(), 1000);
  };

  const handleFailure = (targetId?: string) => {
    setGameState("idle");
    if (targetId) {
      setFeedback({ targetId, type: "error" });
      setTimeout(() => setFeedback(null), 800);
    }
  };

  const handleLevelFailure = () => setGameState("failure");
  const handleTrialTimeout = () => nextTrialOrLevel();

  // --- Reset Actions ---
  const handleReset = () => {
    setCurrentLevelIndex(0);
    setCurrentTrialIndex(0);
    setGameState("idle");
    setLevelTimeLeft(90);
    setTrialTimeLeft(8);
    setScore(0);
    levelScoreRef.current = 0;
    setFeedback(null);
  };

  const handleRetryLevel = () => {
    setCurrentTrialIndex(0);
    setGameState("idle");
    setLevelTimeLeft(90);
    setTrialTimeLeft(8);
    levelScoreRef.current = 0;
    setFeedback(null);
    setTrialPlan(buildTrialPlan());
  };

  const handleNextLevel = () => {
    if (currentLevelIndex < GAME_LEVELS.length - 1) {
      setCurrentLevelIndex((prev) => prev + 1);
      setCurrentTrialIndex(0);
      setGameState("idle");
      setLevelTimeLeft(90);
      setTrialTimeLeft(8);
      levelScoreRef.current = 0;
      setFeedback(null);
    } else {
      setGameState("completed");
    }
  };

  // --- Drag Logic ---
  const handleDragStart = () => {
    if (gameState === "idle") setGameState("dragging");
  };

  const handleDrag = (event: any, info: any) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setLineEnd({
      x: info.point.x - rect.left,
      y: info.point.y - rect.top,
    });
  };

  const handleDragEnd = (event: any, info: any) => {
    setLineEnd(null);
    const dropPoint = { x: info.point.x, y: info.point.y };

    // Check Correct Target
    const correctTargetElement = currentTargetId
      ? targetRefs.current[currentTargetId]
      : null;
    if (correctTargetElement) {
      const rect = correctTargetElement.getBoundingClientRect();
      if (
        dropPoint.x >= rect.left &&
        dropPoint.x <= rect.right &&
        dropPoint.y >= rect.top &&
        dropPoint.y <= rect.bottom
      ) {
        handleSuccess();
        return;
      }
    }

    // Check Wrong Targets
    let hitWrong = false;
    let wrongTargetId: string | null = null;
    for (const target of currentLevel.targets) {
      if (target.id === currentTargetId) continue;
      const wrongEl = targetRefs.current[target.id];
      if (wrongEl) {
        const rect = wrongEl.getBoundingClientRect();
        if (
          dropPoint.x >= rect.left &&
          dropPoint.x <= rect.right &&
          dropPoint.y >= rect.top &&
          dropPoint.y <= rect.bottom
        ) {
          hitWrong = true;
          wrongTargetId = target.id;
          break;
        }
      }
    }

    if (hitWrong) handleFailure(wrongTargetId ?? undefined);
    else setGameState("idle");
  };

  // --- Effects ---
  useEffect(() => {
    if (!currentLevel || ["completed", "levelComplete"].includes(gameState))
      return;
    const timer = setInterval(() => {
      setLevelTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleLevelFailure();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentLevelIndex, gameState]);

  useEffect(() => {
    if (
      !currentTrial ||
      ["success", "failure", "timeout", "completed", "levelComplete"].includes(
        gameState
      )
    )
      return;
    setTrialTimeLeft(8);
    const timer = setInterval(() => {
      setTrialTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTrialTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentLevelIndex, currentTrialIndex, gameState]);

  useEffect(() => {
    setTrialPlan(buildTrialPlan());
    setCurrentTrialIndex(0);
    setFeedback(null);
  }, [currentLevelIndex]);

  // Return everything the UI needs
  return {
    state: {
      currentLevelIndex,
      currentTrialIndex,
      gameState,
      score,
      levelTimeLeft,
      trialTimeLeft,
      lineEnd,
      progress,
      feedback,
    },
    data: {
      currentLevel,
      currentTrial,
      currentShuffledTargets,
      currentTargetId,
      handPosition: getHandPosition(),
      totalTrials,
      handRotation: getHandRotation(),
      lineStartPosition: getLineStartPosition(),
    },
    refs: {
      containerRef,
      targetRefs,
    },
    actions: {
      handleDragStart,
      handleDrag,
      handleDragEnd,
      handleReset,
      handleRetryLevel,
      handleNextLevel,
      setGameState, // In case UI needs to force state
    },
  };
};
