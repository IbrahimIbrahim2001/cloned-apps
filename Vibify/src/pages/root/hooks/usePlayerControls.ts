import supabase from "@/lib/supabase-client"
import { useEffect, useState } from "react"
import { DatabaseTrack, Track } from "../types/track"
import { getTrackId } from "../utils/getTrackId"
import { MusicTrack } from "../store"

interface UsePlayerControlsProps {
    track: MusicTrack | null
}

export function usePlayerControls({ track }: UsePlayerControlsProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [isShuffled, setIsShuffled] = useState(false)
    const [isRepeating, setIsRepeating] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const checkLikedState = async (currentTrack: Track | DatabaseTrack) => {
        try {
            setIsLoading(true)

            const {
                data: { user },
            } = await supabase.auth.getUser()

            if (!user) {
                return
            }

            const trackId = getTrackId(currentTrack)
            const { data, error } = await supabase
                .from("liked_songs")
                .select("*")
                .eq("user_id", user.id)
                .eq("track_id", trackId)

            if (error) {
                console.error("Error checking liked state:", error)
                setIsLiked(false)
                return
            }

            // If we found any records, the track is liked
            setIsLiked(data && data.length > 0)
        } catch (error) {
            console.error("Error in checkLikedState:", error)
            setIsLiked(false)
        } finally {
            setIsLoading(false)
        }
    }

    // Check liked state whenever track changes
    useEffect(() => {
        if (track) {
            checkLikedState(track)
        } else {
            setIsLiked(false)
        }
    }, [track])

    const toggleLike = () => setIsLiked(!isLiked)
    const toggleShuffle = () => setIsShuffled(!isShuffled)
    const toggleRepeat = () => setIsRepeating(!isRepeating)

    return {
        isLiked,
        isShuffled,
        isRepeating,
        isLoading,
        toggleLike,
        toggleShuffle,
        toggleRepeat,
    }
}
