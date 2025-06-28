import { useMusic } from "../../store"
import { formatTime } from "../../utils/timeFormatter"
import { useHowlerAudio } from "../hooks/useHowlerAudio"
import { usePlayerState } from "../hooks/usePlayerState"

import { DesktopPlayer } from "../components/desktopPlayer"
import { MobilePlayer } from "../components/mobilePlayer"

export default function MusicPlayerHowler() {
    const { track, isMuted, toggleMute, isPlaying, togglePlay, playNext, playPrevious, playlist } = useMusic()
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

    if (!track) return null

    return (
        <div className="w-full fixed bottom-12 sm:bottom-0 z-10">
            <MobilePlayer
                track={track}
                isPlaying={isPlaying}
                isLoading={audioPlayer.isLoading}
                onTogglePlay={handleTogglePlay}
                onNext={playNext}
                onPrevious={playPrevious}
                canGoNext={playerState.canGoNext}
                canGoPrevious={playerState.canGoPrevious}
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
                onNext={playNext}
                onPrevious={playPrevious}
                canGoNext={playerState.canGoNext}
                canGoPrevious={playerState.canGoPrevious}
                formatTime={formatTime}
            />
        </div>
    )
}

