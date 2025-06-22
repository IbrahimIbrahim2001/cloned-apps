export function usePlayerState(playlistLength: number) {
    const canGoNext = playlistLength > 1
    const canGoPrevious = playlistLength > 1

    return {
        canGoNext,
        canGoPrevious,
    }
}
