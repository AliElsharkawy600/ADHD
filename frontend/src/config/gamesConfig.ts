
export const BALLOON_GAME_LEVELS = {
  1: { totalSteps: 10, balloonDuration: 3000, timeLimit: 0 },
  2: { totalSteps: 15, balloonDuration: 2000, timeLimit: 45 },
  3: { totalSteps: 20, balloonDuration: 1500, timeLimit: 60 },
};

export const BALLOON_POSITIONS = [
  { id: "centered", css: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" },
  { id: "top-left", css: "top-24 left-10" },
  { id: "top-right", css: "top-24 right-10" },
  { id: "bottom-left", css: "bottom-40 left-10" },
  { id: "bottom-right", css: "bottom-40 right-10" },
];

// --- Drag & Drop (Stacking) Game Config ---

export const DRAG_DROP_CONFIG = {
    // عدد المراحل (بناءً على عدد الحلقات)
    // 0: فارغ
    // 1: القاعدة فقط
    // 2: القاعدة + الثانية
    // 3: القاعدة + الثانية + الثالثة
    // 4: مكتمل
    totalStages: 4, 
    
    // // تعريف الحلقات (للسحب فقط)
    // // IDs must match the stage order (1, 2, 3, 4)
    // draggableRings: [
    //     { id: 1, name: "Blue Base", width: 180 },   // تظهر عندما يكون الـ Stage = 0
    //     { id: 2, name: "Yellow", width: 150 },      // تظهر عندما يكون الـ Stage = 1
    //     { id: 3, name: "Red", width: 120 },         // تظهر عندما يكون الـ Stage = 2
    //     { id: 4, name: "Green Top", width: 90 },    // تظهر عندما يكون الـ Stage = 3
    // ]
};
