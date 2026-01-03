import { Target } from "../types/game";
import clsx from "clsx";

interface TargetsRowProps {
    targets: Target[];
    currentTargetId: string;
    gameState: string;
}

export function TargetsRow({
    targets,
    currentTargetId,
    gameState,
}: TargetsRowProps) {
    return (
        <div className="flex justify-center gap-10 mt-10">
            {targets.map((target) => {
                const Icon = target.icon;
                const isActive = target.id === currentTargetId;

                return (
                    <div
                        key={target.id}
                        className={clsx(
                            "flex flex-col items-center p-4 rounded-xl transition",
                            isActive && "bg-yellow-100 scale-110",
                            gameState === "success" && isActive && "bg-green-200",
                            gameState === "failure" && isActive && "bg-red-200"
                        )}
                    >
                        <Icon className={`w-14 h-14 ${target.color}`} />
                        <span className="mt-2 font-bold">{target.label}</span>
                    </div>
                );
            })}
        </div>
    );
}
