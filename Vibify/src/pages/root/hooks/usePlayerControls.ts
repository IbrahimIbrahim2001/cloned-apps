import { useState } from "react"

export function usePlayerControls() {
    const [isLiked, setIsLiked] = useState(false)
    const [isShuffled, setIsShuffled] = useState(false)
    const [isRepeating, setIsRepeating] = useState(false)

    const toggleLike = () => setIsLiked(!isLiked)
    const toggleShuffle = () => setIsShuffled(!isShuffled)
    const toggleRepeat = () => setIsRepeating(!isRepeating)

    return {
        isLiked,
        isShuffled,
        isRepeating,
        toggleLike,
        toggleShuffle,
        toggleRepeat,
    }
}
