import { Button } from "@/components/ui/button"
import { Pause, Play } from "lucide-react"

interface PlayButtonProps {
    isPlaying: boolean
    isLoading: boolean
    onTogglePlay: () => void
    size?: "sm" | "md" | "lg"
}

export function PlayButton({ isPlaying, isLoading, onTogglePlay, size = "md" }: PlayButtonProps) {
    const sizeClasses = {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
    }

    const iconSizes = {
        sm: "h-4 w-4",
        md: "h-8 w-8",
        lg: "h-10 w-10",
    }

    return (
        <Button
            size="icon"
            variant="ghost"
            className={`${sizeClasses[size]} hover:bg-white`}
            onClick={onTogglePlay}
            disabled={isLoading}
        >
            {isLoading ? (
                <div className={`${iconSizes[size]} border-2 border-current border-t-transparent rounded-full animate-spin`} />
            ) : isPlaying ? (
                <Pause className={iconSizes[size]} />
            ) : (
                <Play className={iconSizes[size]} />
            )}
        </Button>
    )
}
