import { useEffect, useRef, useState } from "react"
import { Howl, Howler } from "howler"
import { DatabaseTrack, Track } from "../types/track"
import { getTrackId } from "../utils/getTrackId"

interface UseAudioPlayerProps {
    track: Track | DatabaseTrack | null
    isPlaying: boolean
    isMuted: boolean
    volume?: number
    onTrackEnd: () => void
}

export function useAudioPlayer({ track, isPlaying, isMuted, volume = 0.7, onTrackEnd }: UseAudioPlayerProps) {
    const howlRef = useRef<Howl | null>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    // Initialize Howler volume
    useEffect(() => {
        Howler.volume(volume)
        return () => {
            if (howlRef.current) {
                howlRef.current.unload()
            }
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [volume])

    // Handle track changes
    useEffect(() => {
        if (!track) return

        // Clean up previous track
        if (howlRef.current) {
            howlRef.current.unload()
        }
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }

        setIsLoading(true)
        setCurrentTime(0)
        setDuration(0)

        const streamUrl =
            `https://discoveryprovider.audius.co/v1/tracks/${getTrackId(track)}/stream?app_name=Vibify`

        howlRef.current = new Howl({
            src: [streamUrl],
            html5: true,
            preload: true,
            volume: volume,
            mute: isMuted,
            onload: () => {
                setIsLoading(false)
                if (howlRef.current) {
                    setDuration(howlRef.current.duration())
                }
            },
            onplay: () => {
                if (intervalRef.current) clearInterval(intervalRef.current)
                intervalRef.current = setInterval(() => {
                    if (howlRef.current && howlRef.current.playing()) {
                        setCurrentTime(howlRef.current.seek() as number)
                    }
                }, 100)
            },
            onpause: () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current)
                }
            },
            onstop: () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current)
                }
                setCurrentTime(0)
            },
            onend: () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current)
                }
                onTrackEnd()
            },
            onloaderror: (_id, error) => {
                console.error("Load error:", error)
                setIsLoading(false)
            },
            onplayerror: (_id, error) => {
                console.error("Play error:", error)
                setIsLoading(false)
            },
        })

        if (isPlaying) {
            howlRef.current.play()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [track, volume, isMuted, onTrackEnd])

    // Handle volume changes
    useEffect(() => {
        if (howlRef.current) {
            howlRef.current.volume(volume)
        }
        Howler.volume(volume)
    }, [volume])

    // Handle mute changes
    useEffect(() => {
        if (howlRef.current) {
            howlRef.current.mute(isMuted)
        }
        Howler.mute(isMuted)
    }, [isMuted])

    // Handle play/pause changes
    useEffect(() => {
        if (!howlRef.current) return

        if (isPlaying && !howlRef.current.playing()) {
            howlRef.current.play()
        } else if (!isPlaying && howlRef.current.playing()) {
            howlRef.current.pause()
        }
    }, [isPlaying])

    const seekTo = (percentage: number) => {
        if (!howlRef.current || duration === 0) return

        const newTime = (percentage / 100) * duration
        howlRef.current.seek(newTime)
        setCurrentTime(newTime)
    }

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

    return {
        currentTime,
        duration,
        isLoading,
        progressPercentage,
        seekTo,
    }
}
