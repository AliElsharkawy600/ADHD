import { Cat, Car, Dog, Bird, Train, Cloud } from "lucide-react";
import { Level } from "../types/game";

export const GAME_LEVELS: Level[] = [
    {
        id: 1,
        targets: [
            { id: "cat", icon: Cat, label: "القطة", color: "text-orange-500" },
            { id: "car", icon: Car, label: "العربية", color: "text-red-500" },
            { id: "dog", icon: Dog, label: "الكلب", color: "text-brown-500" },
        ],
        trials: [
            { targetId: "cat", handPosition: "left" },
            { targetId: "car", handPosition: "center" },
            { targetId: "dog", handPosition: "right" },
        ],
    },
    {
        id: 2,
        targets: [
            { id: "bird", icon: Bird, label: "العصفور", color: "text-sky-500" },
            { id: "train", icon: Train, label: "القطار", color: "text-green-600" },
            { id: "cloud", icon: Cloud, label: "السحابة", color: "text-indigo-500" },
        ],
        trials: [
            { targetId: "bird", handPosition: "right" },
            { targetId: "train", handPosition: "left" },
            { targetId: "cloud", handPosition: "center" },
        ],
    },
    {
        id: 3,
        targets: [
            { id: "car", icon: Car, label: "العربية", color: "text-red-500" },
            { id: "cloud", icon: Cloud, label: "السحابة", color: "text-indigo-500" },
            { id: "cat", icon: Cat, label: "القطة", color: "text-orange-500" },
        ],
        trials: [
            { targetId: "cloud", handPosition: "center" },
            { targetId: "cat", handPosition: "left" },
            { targetId: "car", handPosition: "right" },
        ],
    },
];
