import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getTrack } from "../api/fetchTrack"
import { AlbumArt } from "../components/albumArt"
import { PlayerHeader } from "../components/albumHeader"
import { PlayerControls } from "../components/playerControls"
import { ProgressBar } from "../components/progressBar"
import { TrackInfo } from "../components/trackInfo"
import { useAudioPlayer } from "../hooks/useAudioPlayer"
import { usePlayerControls } from "../hooks/usePlayerControls"
import { useMusic } from "../store"
import { Track } from "../types/track"
import { getImageUrl } from "../utils/getTrackImage"
import { getTrackTitle } from "../utils/getTrackTitle"

export default function TrackDetailsPage() {
    const { track, isMuted, isPlaying, isShuffled, setMusic,
        isRepeating, togglePlay, playNext, playPrevious, toggleShuffle,
        toggleRepeat, playlist } = useMusic()

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()
    const params = useParams();
    const trackTitleFromUrl = Array.isArray(params.name) ? params.name : params.name;

    useEffect(() => {
        const fetchTrack = async () => {
            if (trackTitleFromUrl) {
                setIsLoading(true);
                const decodedTitle = decodeURIComponent(trackTitleFromUrl);
                const fetchedTrack = await getTrack(decodedTitle);
                if (fetchedTrack) {
                    const mappedTrack: Track = {
                        id: fetchedTrack.id,
                        title: fetchedTrack.title,
                        user: {
                            name: fetchedTrack.user.name,
                        },
                        artwork: fetchedTrack.artwork
                    };
                    setMusic(mappedTrack);
                    setIsLoading(false);
                } else {
                    console.warn(`Track with title "${decodedTitle}" not found on Audius.`);
                    setIsLoading(false);
                }
            }
        };

        fetchTrack();
    }, [trackTitleFromUrl, setMusic]);
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


    if (isLoading && !track) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!track) {
        return (
            <div className="h-screen -my-[32px] pt-10 w-full bg-gradient-to-b from-primary via-accent to-primary-foreground ">
                <div className="sm:hidden">
                    <PlayerHeader onClose={handleClose} />
                </div>
                <div className="flex items-center justify-center">
                    <div className="text-white text-center">
                        <h2 className="text-2xl font-bold mb-2">No Track Selected</h2>
                        <p className="text-gray-300">Select a track to start playing</p>
                    </div>
                </div>
            </div>
        )
    }

    const canGoNext = playlist.length > 1
    const canGoPrevious = playlist.length > 1


    const trackTitle = getTrackTitle(track);
    const trackImage = getImageUrl(track)
    return (
        <>
            <div className="fixed inset-0 z-40 bg-gradient-to-b from-purple-900 via-purple-800 to-gray-900 h-screen flex flex-col text-white">
                <PlayerHeader onClose={handleClose} />

                <AlbumArt artwork={trackImage} title={trackTitle} />

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
                    isShuffled={isShuffled}
                    isRepeating={isRepeating}
                    canGoNext={canGoNext}
                    canGoPrevious={canGoPrevious}
                    onTogglePlay={handleTogglePlay}
                    onNext={playNext}
                    onPrevious={playPrevious}
                    onToggleShuffle={toggleShuffle}
                    onToggleRepeat={toggleRepeat}
                />
            </div>
        </>
    )
}