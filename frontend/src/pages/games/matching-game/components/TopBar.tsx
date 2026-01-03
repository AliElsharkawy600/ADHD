import React from "react";
import { X, Star } from "lucide-react";

interface TopBarProps {
    progress: number;
    onNavigate: (route: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ progress, onNavigate }) => (
    <div className="relative z-20 pt-safe px-4 mt-4 flex items-center justify-between gap-4">
        {/* Close Button */}
        <button
            onClick={() => onNavigate("home")}
            className="w-10 h-10 bg-[#A5D0FA] rounded-full flex items-center justify-center text-white hover:bg-blue-400 transition-colors">
            <X size={24} strokeWidth={3} />
        </button>

        {/* Progress Bar Container */}
        <div className="flex-1 h-5 bg-[#D6EAF8] rounded-full relative mx-2">
            <div
                className="h-full bg-[#80B9F7] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>

        {/* Star Icon (Goal) */}
        <div className="w-8 h-8 flex items-center justify-center">
            <Star size={32} fill="currentColor" className="text-yellow-400" />
        </div>
    </div>
);
