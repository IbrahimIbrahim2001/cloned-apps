import { Slider } from "@/components/ui/slider"
import { formatTime } from "../utils/timeFormatter"


interface ProgressBarProps {
    currentTime: number
    duration: number
    progressPercentage: number
    isLoading: boolean
    onProgressChange: (value: number[]) => void
}

export function ProgressBar({
    currentTime,
    duration,
    progressPercentage,
    isLoading,
    onProgressChange,
}: ProgressBarProps) {
    return (
        <div className="px-8 py-2">
            <Slider
                value={[progressPercentage]}
                onValueChange={onProgressChange}
                max={100}
                step={0.1}
                className="w-full"
                disabled={isLoading || duration === 0}
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
            </div>
        </div>
    )
}
