
import React, { useState, useRef, useEffect } from "react";
import { X, RotateCw } from "lucide-react";
import { ScreenProps } from "../../../types";
import { GameResultScreen } from "../../../components/games/common/GameResultScreen";
import { CloudShape} from "../../../components/games/common/GameAssets";
import { DRAG_DROP_CONFIG } from "../../../config/gamesConfig";
import { 
    // Draggable Rings
    Ring1_Blue, 
    Ring2_Yellow, 
    Ring3_Red, 
    Ring4_Green,
    // Pole States (Stages)
    PoleState0_Empty,
    PoleState1_Blue,
    PoleState2_Yellow,
    PoleState3_Red,
    PoleState4_Full
} from "../../../components/games/dragdrop/DragDropAssets";

export const DragDropGameScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  // Current State of the Pole (0 = Empty, 1 = 1 Ring, etc.)
  const [currentStage, setCurrentStage] = useState(0);
  const [gameStatus, setGameStatus] = useState<"playing" | "success">("playing");
  
  const [spawnSide, setSpawnSide] = useState<'left' | 'right'>('right');

  // Dragging State
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isOverColumn, setIsOverColumn] = useState(false);

  const columnRef = useRef<HTMLDivElement>(null);

  // Check Win Condition
  useEffect(() => {
    if (currentStage === DRAG_DROP_CONFIG.totalStages) {
      setTimeout(() => {
          setGameStatus("success");
      }, 800); // Wait a bit to see the full pyramid
    }
  }, [currentStage]);

  // When stage changes, randomize next spawn side
  useEffect(() => {
     setSpawnSide(Math.random() > 0.5 ? 'right' : 'left');
  }, [currentStage]);

  // --- Handlers ---

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (gameStatus === 'success') return;
    
    // // Prevent default to stop scrolling, but check if cancelable first
    // if (e.cancelable && e.type === 'touchmove') {
    //    e.preventDefault(); 
    // }

    setIsDragging(true);
    updatePosition(e);
  };

  const updatePosition = (e: React.TouchEvent | React.MouseEvent) => {
    let clientX, clientY;
    
    if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = (e as React.MouseEvent).clientX;
        clientY = (e as React.MouseEvent).clientY;
    }
    
    setDragPosition({ x: clientX, y: clientY });

    // Check collision with the Pole area
    if (columnRef.current) {
        const rect = columnRef.current.getBoundingClientRect();
        // 1. العرض: جعلناه 20 بكسل فقط لضمان أن الإصبع فوق العمود تماماً
        const horizontalTolerance = 20; 
        // 2. الارتفاع: جعلنا الاستجابة تبدأ من فوق قمة العمود بـ 40 بكسل وتنتهي عند القمة بـ 20 بكسل
        // هذا يضمن أن الإفلات يتم "فوق" الرأس مباشرة
        const verticalToleranceUpper = 40; 
        const verticalToleranceLower = 20;

        const isInsideHorizontal = clientX >= rect.left + (rect.width/2) - horizontalTolerance 
                                 && clientX <= rect.left + (rect.width/2) + horizontalTolerance;

        const isInsideVertical = clientY >= rect.top - verticalToleranceUpper 
                               && clientY <= rect.top + verticalToleranceLower;

        if (isInsideHorizontal && isInsideVertical) {
            setIsOverColumn(true);
        } else {
            setIsOverColumn(false);
        }
    }
  };

  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    // Important: Prevent scrolling on mobile while dragging
    // if (e.cancelable) e.preventDefault(); 
    updatePosition(e);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    if (isOverColumn) {
        // Successful drop: Advance stage
        setCurrentStage(prev => prev + 1);
    }

    setIsDragging(false);
    setIsOverColumn(false);
    setDragPosition({ x: 0, y: 0 });
  };

  const resetGame = () => {
    setCurrentStage(0);
    setGameStatus("playing");
    setSpawnSide('right');
    setIsDragging(false);
  };

  if (gameStatus === "success") {
    return (
      <GameResultScreen
        type="success"
        score={100}
        total={100}
        currentLevel={1}
        onNext={resetGame}
        onRetry={resetGame}
        // onHome={() => onNavigate('home')}
        // onHome={() => onNavigate("", {}, { isBack: true })}
        onHome={() => window.history.back()}
      />
    );
  }

  // --- Render Helpers ---
  const activeRingId = currentStage < DRAG_DROP_CONFIG.totalStages ? currentStage + 1 : null;

  const renderDraggableRing = (id: number | null) => {
      if (!id) return null;
      switch(id) {
          case 1: return <Ring1_Blue className="drop-shadow-xl" />;
          case 2: return <Ring2_Yellow className="drop-shadow-xl" />;
          case 3: return <Ring3_Red className="drop-shadow-xl" />;
          case 4: return <Ring4_Green className="drop-shadow-xl" />;
          default: return null;
      }
  };

  const renderPoleState = (stage: number) => {
      // تأثير بصري بسيط عند الاقبال من الرأس (تكبير العمود قليلاً)
      const commonClass = `w-full h-full drop-shadow-2xl transition-all duration-300 ${isOverColumn ? 'scale-105 brightness-110' : ''}`;
      
      switch(stage) {
          case 0: return <PoleState0_Empty className={commonClass} />;
          case 1: return <PoleState1_Blue className={commonClass} />;
          case 2: return <PoleState2_Yellow className={commonClass} />;
          case 3: return <PoleState3_Red className={commonClass} />;
          case 4: return <PoleState4_Full className={commonClass} />;
          default: return <PoleState0_Empty className={commonClass} />;
      }
  };

  return (
    <div 
        className="relative w-full h-full bg-[#E6F3FF] flex flex-col overflow-hidden select-none"
        // Move events to container to ensure tracking even if child changes
        onTouchMove={handleDragMove}
        onMouseMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseUp={handleDragEnd}
        // Disable browser touch actions (scrolling) within the game area
        style={{ touchAction: 'none' }}
    >
        {/* Background Elements */}
        <div className="absolute top-10 left-10 w-40 text-white/80 animate-pulse">
            <CloudShape />
        </div>
        <div className="absolute top-32 -right-5 w-32 text-white/60 animate-pulse delay-700">
            <CloudShape />
        </div>
        
        {/* Header HUD */}
        <div className="relative z-20 pt-safe px-4 mt-4 flex justify-between items-center">
            <button 
                // onClick={() => onNavigate('visual-games')}
                // onClick={() => onNavigate("", {}, { isBack: true })}
                onClick={() => window.history.back()}
                className="w-10 h-10 bg-white/50 rounded-full flex items-center justify-center text-blue-900 hover:bg-white transition-colors"
            >
                <X size={24} strokeWidth={3} />
            </button>
            <button 
                onClick={resetGame}
                className="w-10 h-10 bg-white/50 rounded-full flex items-center justify-center text-blue-900 hover:bg-white transition-colors"
            >
                <RotateCw size={20} />
            </button>
        </div>

        {/* --- Spawn Area (Draggable) --- */}
        <div className={`absolute top-32 z-30 flex flex-col items-center transition-all duration-500 ease-in-out ${spawnSide === 'right' ? 'right-10' : 'left-10'}`}>
            {/* 
               CRITICAL FIX: 
               We do NOT remove this element from DOM when isDragging is true.
               Instead, we set opacity to 0. This ensures the touch event stream 
               isn't broken by DOM removal, preventing the "double tap" issue.
            */}
            {activeRingId && (
                <div className={`animate-float ${isDragging ? 'opacity-0' : 'opacity-100'}`}>
                    <div
                        onTouchStart={handleDragStart}
                        onMouseDown={handleDragStart}
                        className="cursor-grab active:cursor-grabbing hover:scale-105 transition-transform"
                    >
                         {renderDraggableRing(activeRingId)}
                    </div>
                    {/* <div className="text-center mt-2 text-blue-400/80 font-bold text-sm animate-bounce">
                        اسحبني!
                    </div> */}
                </div>
            )}
        </div>

        {/* --- Central Game Area (The Pole State) --- */}
        <div className="flex-1 flex items-end justify-center z-10 w-full px-4 pb-12">
            <div 
                ref={columnRef}
                className="relative w-full max-w-sm h-87.5 flex items-end justify-center"
            >
                {/* Visual Hint for Drop Zone */}
                {/* {isDragging && (
                    <div className="absolute inset-0 bg-green-400/10 rounded-3xl border-4 border-green-400/30 border-dashed animate-pulse z-0" />
                )} */}

                {/* The main SVG component representing current state */}
                <div className="w-full h-full relative z-10">
                    {renderPoleState(currentStage)}
                </div>
            </div>
        </div>

        {/* --- Draggable Ring Overlay (Fixed position following finger) --- */}
        {/* This is the "Ghost" ring that follows the finger */}
        {isDragging && activeRingId && (
            <div
                className="fixed pointer-events-none z-50 flex items-center justify-center"
                style={{
                    left: dragPosition.x,
                    top: dragPosition.y,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <div className="opacity-90 scale-110 drop-shadow-2xl">
                    {renderDraggableRing(activeRingId)}
                </div>
            </div>
        )}

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
    </div>
  );
};
