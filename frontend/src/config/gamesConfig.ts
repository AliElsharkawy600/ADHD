
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
