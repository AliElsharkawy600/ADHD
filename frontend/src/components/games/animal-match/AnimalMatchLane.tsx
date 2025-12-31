import React, { useCallback, useEffect, useRef, useState } from "react";

interface AnimalMatchLaneProps {
  animalIcon: React.ReactNode;
  targetIcon: React.ReactNode;
  successIcon: React.ReactNode;
  disabled?: boolean;
  onActivate?: () => void;
  onSuccess: () => void;
  onFail: () => void;
}

// أبعاد المسار وعناصره لضبط التحريك بشكل مطابق للتصميم
const LINE_HEIGHT = 290;
const TILE_SIZE = 112;
const SUCCESS_THRESHOLD = 0.97;
const TARGET_GAP = 32; // matches Tailwind mt-8 spacing below the line
const START_GAP = 16; // matches Tailwind mt-4 spacing above the line
const START_CIRCLE_DIAMETER = 56; // Tailwind w-14 size for the start node
const START_OFFSET = START_GAP + START_CIRCLE_DIAMETER / 2 + TILE_SIZE / 2;
const DRAG_START_THRESHOLD = 0.15;
const TRACK_HEIGHT = LINE_HEIGHT + TARGET_GAP;
const TRACK_CONTAINER_HEIGHT = TRACK_HEIGHT + TILE_SIZE;
const TRACK_BASE_COLOR = "#E1E8FF";
const TRACK_FILL_GRADIENT = "linear-gradient(to bottom, #2BCB7C, #37D793)";
const TRACK_INACTIVE_COLOR = "#B0B0B0";

export const AnimalMatchLane: React.FC<AnimalMatchLaneProps> = ({
  animalIcon,
  targetIcon,
  successIcon,
  disabled = false,
  onActivate,
  onSuccess,
  onFail,
}) => {
  // مراجع داخلية لإدارة التحريك والحالة الحالية للمسار
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const progressAnimationRef = useRef<number | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const successRef = useRef(false);
  const isRetractingRef = useRef(false);
  const progressRef = useRef(0);

  // الحالة المرئية لنسبة التقدم والنجاح
  const [progress, setProgress] = useState(0);
  const [hasSuccess, setHasSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const setProgressValue = useCallback((value: number) => {
    const clamped = Math.min(1, Math.max(0, value));
    progressRef.current = clamped;
    setProgress(clamped);
    return clamped;
  }, []);

  // إيقاف عملية الرجوع للخلف إذا كانت تعمل
  const cancelRetraction = useCallback(() => {
    if (progressAnimationRef.current !== null) {
      cancelAnimationFrame(progressAnimationRef.current);
      progressAnimationRef.current = null;
    }
    isRetractingRef.current = false;
  }, []);

  const handlePointerRelease = useCallback((pointerId?: number) => {
    if (
      pointerId !== undefined &&
      pointerIdRef.current !== null &&
      pointerIdRef.current === pointerId &&
      containerRef.current
    ) {
      containerRef.current.releasePointerCapture(pointerId);
      pointerIdRef.current = null;
    }
  }, []);

  // عند الوصول للهدف بنجاح نثبت الحيوان ونبلغ المكون الأب
  const handleSuccess = useCallback(() => {
    if (successRef.current) return;
    successRef.current = true;
    setHasSuccess(true);
    setIsDragging(false);
    cancelRetraction();
    setProgressValue(1);
    pointerIdRef.current = null;
    onSuccess();
  }, [cancelRetraction, onSuccess, setProgressValue]);

  // بدء إعادة الحيوان لنقطة البداية عند ترك السحب
  const startRetraction = useCallback(() => {
    if (successRef.current || isRetractingRef.current) return;
    if (progressRef.current <= 0) {
      return;
    }

    isRetractingRef.current = true;
    setIsDragging(false);

    const animate = () => {
      const next = setProgressValue(progressRef.current - 0.015);
      if (next <= 0) {
        cancelRetraction();
        setProgressValue(0);
        return;
      }
      progressAnimationRef.current = requestAnimationFrame(animate);
    };

    progressAnimationRef.current = requestAnimationFrame(animate);
  }, [cancelRetraction, setProgressValue]);

  // تحديث موقع الحيوان بناءً على موضع الإصبع الحالي
  const updateProgressFromPointer = useCallback(
    (clientY: number) => {
      if (pointerIdRef.current === null) return;
      if (!lineRef.current || successRef.current) return;
      const rect = lineRef.current.getBoundingClientRect();
      const ratio = (clientY - rect.top) / rect.height;
      const next = setProgressValue(ratio);
      if (next >= SUCCESS_THRESHOLD) {
        handleSuccess();
      }
    },
    [handleSuccess, setProgressValue]
  );

  // بدء السحب من منطقة البداية فقط
  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled || successRef.current) return;
      if (lineRef.current) {
        const rect = lineRef.current.getBoundingClientRect();
        const ratio = (event.clientY - rect.top) / rect.height;
        const shouldRestrictToStart =
          !isRetractingRef.current && progressRef.current <= 0.001;
        if (shouldRestrictToStart && ratio > DRAG_START_THRESHOLD) {
          return;
        }
      }
      onActivate?.();
      pointerIdRef.current = event.pointerId;
      containerRef.current?.setPointerCapture(event.pointerId);
      cancelRetraction();
      setIsDragging(true);
      updateProgressFromPointer(event.clientY);
    },
    [cancelRetraction, disabled, onActivate, updateProgressFromPointer]
  );

  // متابعة السحب أثناء تحرك الإصبع
  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled || successRef.current) return;
      if (pointerIdRef.current !== event.pointerId) return;
      updateProgressFromPointer(event.clientY);
    },
    [disabled, updateProgressFromPointer]
  );

  // إنهاء السحب وبدء الرجوع إن لم ينجح الوصول
  const handlePointerEnd = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (pointerIdRef.current !== event.pointerId) return;
      handlePointerRelease(event.pointerId);
      setIsDragging(false);
      if (!successRef.current) {
        startRetraction();
      }
    },
    [handlePointerRelease, startRetraction]
  );

  // إذا تعطلت الحارة أو تم تعطيلها أثناء السحب نرجع للحالة الابتدائية
  useEffect(() => {
    if (disabled && pointerIdRef.current !== null) {
      handlePointerRelease(pointerIdRef.current);
      startRetraction();
    }
    if (disabled) {
      setIsDragging(false);
    }
  }, [disabled, handlePointerRelease, startRetraction]);

  // تنظيف أي حركة قيد التشغيل عند إزالة المكون
  useEffect(() => {
    return () => {
      cancelRetraction();
    };
  }, [cancelRetraction]);

  const travelDistance = LINE_HEIGHT + TARGET_GAP + START_OFFSET;
  const translateY = progress * travelDistance - START_OFFSET;
  const startNodeColor = hasSuccess || isDragging ? "#2BCB7C" : "#B0B0B0";
  const distanceFromStart = progress * travelDistance;
  const coverageWithinTrack = Math.max(
    0,
    distanceFromStart - START_OFFSET + TILE_SIZE / 2
  );
  const totalFillHeight = Math.min(TRACK_HEIGHT, coverageWithinTrack);
  const fillRatio = totalFillHeight / TRACK_HEIGHT;
  const activeTrackColor =
    hasSuccess || isDragging ? TRACK_FILL_GRADIENT : TRACK_INACTIVE_COLOR;

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center pt-3 pb-16 w-full max-w-65 mx-auto select-none"
      style={{ touchAction: "none" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
    >
      <div
        className="w-14 h-14 rounded-full shadow-[0_1px_2px_rgba(43,203,124,0.35)] border-4 border-white transition-colors"
        style={{ backgroundColor: startNodeColor }}
      />

      <div
        className="relative mt-4 flex justify-center"
        style={{ height: TRACK_CONTAINER_HEIGHT }}
      >
        <div
          ref={lineRef}
          className="absolute top-0 left-1/2 w-3 -translate-x-1/2 overflow-hidden rounded-full"
          style={{
            height: TRACK_HEIGHT+20,
            backgroundColor: TRACK_BASE_COLOR,
            top: -START_GAP-7,
          }}
        >
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "repeating-linear-gradient(180deg, transparent 0 14px, rgba(255,255,255,0.85) 14px 26px)",
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 rounded-full"
            style={{
              height: `${fillRatio * 100}%`,
              background: activeTrackColor,
            }}
          />
        </div>

        <div
          className="absolute left-1/2 top-0 transition-transform duration-100"
          style={{ transform: `translateX(-50%) translateY(${translateY}px)` }}
        >
          <div
            className={`w-28 h-28 pointer-events-none drop-shadow-[0_10px_30px_rgba(51,132,255,0.2)] rounded-3xl transition-all duration-150 ring-4 ${
              isDragging ? "ring-[#2BCB7C]" : "ring-transparent"
            }`}
          >
            {animalIcon}
          </div>
        </div>
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-28 h-28 drop-shadow-[0_12px_32px_rgba(70,163,255,0.15)]">
          {hasSuccess ? successIcon : targetIcon}
        </div>
      </div>
    </div>
  );
};
