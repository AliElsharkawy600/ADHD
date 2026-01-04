import React from "react";

export interface Target {
  id: string;
  icon: React.ElementType;
  label: string;
  color: string;
}

export interface Trial {
  targetId: string;
  handPosition: "left" | "center" | "right";
}

export interface Level {
  id: number;
  targets: Target[];
  trials: Trial[];
}

export type GameState =
  | "idle"
  | "dragging"
  | "success"
  | "failure"
  | "completed"
  | "timeout"
  | "levelComplete";
