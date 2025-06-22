import { Button } from "@/components/ui/button"
import { Pause, Play, Repeat, Shuffle, SkipBack, SkipForward } from "lucide-react"

interface PlayerControlsProps {
    isPlaying: boolean
    isLoading: boolean
    isShuffled: boolean
    isRepeating: boolean
    canGoNext: boolean
    canGoPrevious: boolean
    onTogglePlay: () => void
    onNext: () => void
    onPrevious: () => void
    onToggleShuffle: () => void
    onToggleRepeat: () => void
}

export function PlayerControls({
    isPlaying,
    isLoading,
    isShuffled,
    isRepeating,
    canGoNext,
    canGoPrevious,
    onTogglePlay,
    onNext,
    onPrevious,
    onToggleShuffle,
    onToggleRepeat,
}: PlayerControlsProps) {
    return (
        <div className="px-8 py-6">
            <div className="flex items-center justify-between mb-6">
                <Button
                    variant="ghost"
                    size="icon"
                    className={`text-white hover:bg-white/10 ${isShuffled ? "text-green-500" : ""}`}
                    onClick={onToggleShuffle}
                >
                    <Shuffle className="h-5 w-5" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                    onClick={onPrevious}
                    disabled={!canGoPrevious}
                >
                    <SkipBack className="h-6 w-6" />
                </Button>
                <Button
                    size="icon"
                    className="h-16 w-16 rounded-full bg-white text-black hover:bg-gray-200"
                    onClick={onTogglePlay}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : isPlaying ? (
                        <Pause className="h-8 w-8" />
                    ) : (
                        <Play className="h-8 w-8 ml-1" />
                    )}
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                    onClick={onNext}
                    disabled={!canGoNext}
                >
                    <SkipForward className="h-6 w-6" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className={`text-white hover:bg-white/10 ${isRepeating ? "text-green-500" : ""}`}
                    onClick={onToggleRepeat}
                >
                    <Repeat className="h-5 w-5" />
                </Button>
            </div>
        </div>
    )
}
