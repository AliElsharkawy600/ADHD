import { useState } from "react";

interface HandProps {
    position: "left" | "center" | "right";
    onSuccess: () => void;
    onFail: () => void;
    disabled?: boolean;
}

const positionMap = {
    left: "left-10",
    center: "left-1/2 -translate-x-1/2",
    right: "right-10",
};

export function Hand({
    position,
    onSuccess,
    onFail,
    disabled,
}: HandProps) {
    const [dragging, setDragging] = useState(false);

    const handleDrop = () => {
        setDragging(false);

        // منطق بسيط — يمكن ربطه لاحقًا بحسابات حقيقية
        const success = Math.random() > 0.3;
        success ? onSuccess() : onFail();
    };

    return (
        <div
            className={`absolute bottom-10 ${positionMap[position]}`}
            draggable={!disabled}
            onDragStart={() => setDragging(true)}
            onDragEnd={handleDrop}
        >
            <div
                className={`w-20 h-20 rounded-full bg-blue-300 flex items-center justify-center
        ${dragging ? "scale-110" : ""}`}
            >
                ✋
            </div>
        </div>
    );
}
