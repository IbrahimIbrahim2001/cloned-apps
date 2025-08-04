import { useMusic } from "../../store"
import { formatTime } from "../../utils/timeFormatter"
import { useHowlerAudio } from "../hooks/useHowlerAudio"
import { usePlayerState } from "../hooks/usePlayerState"

import { DesktopPlayer } from "../components/desktopPlayer"
import { MobilePlayer } from "../components/mobilePlayer"
import { addToHistory } from "../api/addToHistory"
import { useOptimisticHistoryStore } from "../history/store"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function MusicPlayerHowler() {
    const { track, isMuted, toggleMute, isPlaying, togglePlay, playNext, playPrevious, closePlayer, playlist, isShuffled,
        isRepeating,
        toggleShuffle,
        toggleRepeat, } = useMusic()
    const { optimisticHistory, setOptimisticHistory } = useOptimisticHistoryStore();
    const audioPlayer = useHowlerAudio({
        track,
        isPlaying,
        isMuted,
        onTrackEnd: playNext,
    })

    const playerState = usePlayerState(playlist.length)

    const handleTogglePlay = () => {
        if (!audioPlayer.isLoading) {
            togglePlay()
        }
    }

    const handleToggleMute = () => {
        toggleMute()
    }

    const handleVolumeChange = (value: number[]) => {
        const newVolume = value[0] / 100
        audioPlayer.changeVolume(newVolume)
    }

    const handleProgressChange = (value: number[]) => {
        audioPlayer.seekTo(value[0])
    }

    const handleNext = () => {
        playNext();
        if (track) {
            setOptimisticHistory([track, ...optimisticHistory])
            addToHistory(track)
        }
    }


    const handlePrevious = () => {
        playPrevious();
        if (track) {
            setOptimisticHistory([track, ...optimisticHistory])
            addToHistory(track)
        }
    }

    const handleClose = () => {
        closePlayer()
    }

    if (!track) return null

    return (
        <div className="w-full fixed bottom-12 sm:bottom-0 z-10">
            <div className="flex justify-end sm:justify-start px-4">
                <Button onClick={handleClose} className="rounded-full mb-2 bg-transparent" variant="outline" size="icon">
                    <X />
                </Button>
            </div>
            <MobilePlayer
                track={track}
                isPlaying={isPlaying}
                isLoading={audioPlayer.isLoading}
                onTogglePlay={handleTogglePlay}
                onNext={handleNext}
                onPrevious={handlePrevious}
                canGoNext={playerState.canGoNext}
                canGoPrevious={playerState.canGoPrevious}
                isShuffled={isShuffled}
                isRepeating={isRepeating}
                onToggleShuffle={toggleShuffle}
                onToggleRepeat={toggleRepeat}
            />
            <DesktopPlayer
                track={track}
                isMuted={isMuted}
                onToggleMute={handleToggleMute}
                isPlaying={isPlaying}
                isLoading={audioPlayer.isLoading}
                currentTime={audioPlayer.currentTime}
                duration={audioPlayer.duration}
                volume={audioPlayer.volume}
                progressPercentage={audioPlayer.progressPercentage}
                onTogglePlay={handleTogglePlay}
                onVolumeChange={handleVolumeChange}
                onProgressChange={handleProgressChange}
                onNext={handleNext}
                onPrevious={handlePrevious}
                canGoNext={playerState.canGoNext}
                canGoPrevious={playerState.canGoPrevious}
                formatTime={formatTime}
                isShuffled={isShuffled}
                isRepeating={isRepeating}
                onToggleShuffle={toggleShuffle}
                onToggleRepeat={toggleRepeat}
            />
        </div >
    )
}

