import { create } from "zustand"
import type { PlaylistType } from "../types/track"

interface PlaylistStore {
    optimisticPlaylists: PlaylistType[]

    // Actions
    addOptimisticPlaylist: (playlist: PlaylistType) => void
    removeOptimisticPlaylist: (id: string) => void
    clearOptimisticAdditions: () => void
}

export const usePlaylistStore = create<PlaylistStore>((set) => ({
    optimisticPlaylists: [],

    addOptimisticPlaylist: (playlist) =>
        set((state) => ({
            optimisticPlaylists: [...state.optimisticPlaylists, playlist],
        })),

    removeOptimisticPlaylist: (id) =>
        set((state) => ({
            optimisticPlaylists: state.optimisticPlaylists.filter((p) => p.id !== id),
        })),

    clearOptimisticAdditions: () => set({ optimisticPlaylists: [] }),
}))
