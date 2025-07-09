import { create } from "zustand"
import type { DatabaseTrack } from "@/pages/root/types/track"

interface OptimisticTracksState {
    optimisticTracks: DatabaseTrack[]
    setOptimisticTracks: (tracks: DatabaseTrack[]) => void
}

export const useOptimisticTracksStore = create<OptimisticTracksState>((set) => ({
    optimisticTracks: [],
    setOptimisticTracks: (tracks) => set({ optimisticTracks: tracks }),
}))
