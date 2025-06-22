import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { SkipBack, SkipForward, Volume2, Repeat, Shuffle, VibrateOffIcon as VolumeOff } from "lucide-react"
import { Link } from "react-router"
import { PlayButton } from "./playButton"
import { Track } from "../../types/track"

interface DesktopPlayerProps {
    track: Track
    isMuted: boolean
    onToggleMute: () => void
    isPlaying: boolean
    isLoading: boolean
    currentTime: number
    duration: number
    volume: number
    progressPercentage: number
    onTogglePlay: () => void
    onVolumeChange: (value: number[]) => void
    onProgressChange: (value: number[]) => void
    onNext: () => void
    onPrevious: () => void
    canGoNext: boolean
    canGoPrevious: boolean
    formatTime: (time: number) => string
}

export function DesktopPlayer({
    track,
    isMuted,
    onToggleMute,
    isPlaying,
    isLoading,
    currentTime,
    duration,
    volume,
    progressPercentage,
    onTogglePlay,
    onVolumeChange,
    onProgressChange,
    onNext,
    onPrevious,
    canGoNext,
    canGoPrevious,
    formatTime,
}: DesktopPlayerProps) {
    return (
        <div className="hidden md:flex h-20 bg-background/80 backdrop-blur-sm shadow-[0_-2px_4px_rgba(0,0,0,0.1)] text-primary-foreground border-t border-border px-4 items-center gap-4">
            {/* Track info - Left section */}
            <div className="w-1/4 min-w-[120px] md:min-w-[180px]">
                <Link to={`track/${track.title}`} className="flex items-center gap-3">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <img
                            src={track.artwork["150x150"] || "/placeholder.svg"}
                            alt={`${track.title} album cover`}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="overflow-hidden">
                        <p className="font-medium text-sm truncate">{track.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{track.user.name}</p>
                    </div>
                </Link>
            </div>

            {/* Player controls - Center section */}
            <div className="flex-1 flex flex-col items-center justify-center gap-2 max-w-md">
                <div className="flex items-center justify-center gap-1 md:gap-4">
                    <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-white">
                        <Shuffle className="h-4 w-4" />
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-9 w-9 hover:bg-white"
                        onClick={onPrevious}
                        disabled={!canGoPrevious}
                    >
                        <SkipBack className="h-5 w-5" />
                    </Button>
                    <PlayButton isPlaying={isPlaying} isLoading={isLoading} onTogglePlay={onTogglePlay} />
                    <Button size="icon" variant="ghost" className="h-9 w-9 hover:bg-white" onClick={onNext} disabled={!canGoNext}>
                        <SkipForward className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-white">
                        <Repeat className="h-4 w-4" />
                    </Button>
                </div>

                {/* Progress bar */}
                <div className="w-full flex items-center gap-2 px-0 md:px-2">
                    <span className="text-xs text-muted-foreground w-7 md:w-8 text-right">{formatTime(currentTime)}</span>
                    <Slider
                        value={[progressPercentage]}
                        max={100}
                        step={0.1}
                        className="w-full"
                        onValueChange={onProgressChange}
                        disabled={isLoading || duration === 0}
                    />
                    <span className="text-xs text-muted-foreground w-7 md:w-8">{formatTime(duration)}</span>
                </div>
            </div>

            {/* Volume control - Right section */}
            <div className="flex items-center gap-2 w-1/6 min-w-[100px] justify-end">
                <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-transparent" onClick={onToggleMute}>
                    {isMuted ? (
                        <VolumeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                        <Volume2 className="h-4 w-4 text-muted-foreground" />
                    )}
                </Button>
                <Slider value={[volume * 100]} max={100} step={1} className="w-24" onValueChange={onVolumeChange} />
            </div>
        </div>
    )
}
