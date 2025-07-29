import type { DatabaseTrack, Track } from "@/pages/root/types/track"
import { create } from "zustand"
import { getTrackId } from "../../utils/getTrackId"


const deduplicateTracks = (tracks: (DatabaseTrack | Track)[]): (DatabaseTrack | Track)[] => {
    const seen = new Set<string | undefined>()
    return tracks.filter((track) => {
        const id = getTrackId(track)
        if (seen.has(id)) {
            return false
        }
        seen.add(id)
        return true
    })
}

interface OptimisticSavedTracksState {
    optimisticSavedTracks: (DatabaseTrack | Track)[]
    setOptimisticSavedTracks: (tracks: (DatabaseTrack | Track)[]) => void
}

export const useOptimisticSavedTracksStore = create<OptimisticSavedTracksState>((set) => ({
    optimisticSavedTracks: [],
    setOptimisticSavedTracks: (tracks) => {
        const uniqueTracks = deduplicateTracks(tracks)
        set({ optimisticSavedTracks: uniqueTracks })
    },
}))
