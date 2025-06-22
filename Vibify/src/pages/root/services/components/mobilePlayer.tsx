import { Button } from "@/components/ui/button"
import { SkipBack, SkipForward } from "lucide-react"
import { Link } from "react-router"
import { PlayButton } from "./playButton"
import { Track } from "../../types/track"

interface MobilePlayerProps {
    track: Track
    isPlaying: boolean
    isLoading: boolean
    onTogglePlay: () => void
    onNext: () => void
    onPrevious: () => void
    canGoNext: boolean
    canGoPrevious: boolean
}

export function MobilePlayer({
    track,
    isPlaying,
    isLoading,
    onTogglePlay,
    onNext,
    onPrevious,
    canGoNext,
    canGoPrevious,
}: MobilePlayerProps) {
    return (
        <div className="md:hidden w-full bg-background/80 backdrop-blur-sm shadow-[0_-2px_4px_rgba(0,0,0,0.1)] text-primary-foreground border-t border-border px-4 flex items-center justify-between h-14">
            <Link to={`track/${track.title}`}>
                <div className="flex items-center gap-2 overflow-hidden">
                    <div className="h-8 w-8 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <img
                            src={track.artwork["150x150"] || "/placeholder.svg"}
                            alt={`${track.title} album cover`}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="overflow-hidden">
                        <p className="font-medium text-xs truncate">{track.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{track.user.name}</p>
                    </div>
                </div>
            </Link>
            <div className="flex items-center gap-1">
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={onPrevious} disabled={!canGoPrevious}>
                    <SkipBack className="h-4 w-4" />
                </Button>
                <PlayButton isPlaying={isPlaying} isLoading={isLoading} onTogglePlay={onTogglePlay} size="sm" />
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={onNext} disabled={!canGoNext}>
                    <SkipForward className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
