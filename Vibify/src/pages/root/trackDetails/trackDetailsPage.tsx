import { useNavigate } from "react-router"
import { AlbumArt } from "../components/albumArt"
import { PlayerHeader } from "../components/albumHeader"
import { PlayerControls } from "../components/playerControls"
import { ProgressBar } from "../components/progressBar"
import { TrackInfo } from "../components/trackInfo"
import { useAudioPlayer } from "../hooks/useAudioPlayer"
import { usePlayerControls } from "../hooks/usePlayerControls"
import { useMusic } from "../store"
import { getImageUrl } from "../utils/getTrackImage"
import { getTrackTitle } from "../utils/getTrackTitle"


export default function TrackDetailsPage() {
    const { track, isMuted, isPlaying, togglePlay, playNext, playPrevious, playlist } = useMusic()

    const navigate = useNavigate()

    const audioPlayer = useAudioPlayer({
        track,
        isPlaying,
        isMuted,
        volume: 0.7,
        onTrackEnd: playNext,
    })

    const playerControls = usePlayerControls({ track })

    const handleClose = () => {
        navigate(-1)
    }

    const handleTogglePlay = () => {
        if (!audioPlayer.isLoading) {
            togglePlay()
        }
    }

    const handleProgressChange = (value: number[]) => {
        audioPlayer.seekTo(value[0])
    }

    if (!track) {
        return (
            <div className="h-screen -my-[64px] bg-gradient-to-b from-primary via-accent to-primary-foreground flex items-center justify-center">
                <div className="text-white text-center">
                    <h2 className="text-2xl font-bold mb-2">No Track Selected</h2>
                    <p className="text-gray-300">Select a track to start playing</p>
                </div>
            </div>
        )
    }

    const canGoNext = playlist.length > 1
    const canGoPrevious = playlist.length > 1

    return (
        <>
            <div className="fixed inset-0 z-40 bg-gradient-to-b from-purple-900 via-purple-800 to-gray-900 h-screen flex flex-col text-white">
                <PlayerHeader onClose={handleClose} />

                <AlbumArt artwork={getImageUrl(track)} title={getTrackTitle(track)} />

                <TrackInfo
                    track={track}
                    isLikeLoading={playerControls.isLoading}
                    isLiked={playerControls.isLiked}
                    onToggleLike={playerControls.toggleLike}
                />

                <ProgressBar
                    currentTime={audioPlayer.currentTime}
                    duration={audioPlayer.duration}
                    progressPercentage={audioPlayer.progressPercentage}
                    isLoading={audioPlayer.isLoading}
                    onProgressChange={handleProgressChange}
                />

                <PlayerControls
                    isPlaying={isPlaying}
                    isLoading={audioPlayer.isLoading}
                    isShuffled={playerControls.isShuffled}
                    isRepeating={playerControls.isRepeating}
                    canGoNext={canGoNext}
                    canGoPrevious={canGoPrevious}
                    onTogglePlay={handleTogglePlay}
                    onNext={playNext}
                    onPrevious={playPrevious}
                    onToggleShuffle={playerControls.toggleShuffle}
                    onToggleRepeat={playerControls.toggleRepeat}
                />
            </div>
        </>
    )
}