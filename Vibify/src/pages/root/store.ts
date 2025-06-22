import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Track } from "./types/track";


//user store
export type UserState = {
    user: {
        displayName: string;
        email: string;
        name: string;
        phone?: string;
    };
    setUserData: (data: Partial<UserState['user']>) => void;
};

export const useUserData = create(
    persist<UserState>(
        (set) => ({
            user: {
                displayName: '',
                email: '',
                name: '',
                phone: undefined,
            },
            setUserData: (data) => set((state) => ({
                user: { ...state.user, ...data }
            })),
        }),
        {
            name: "userData-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

//------------------------------------------------------------------------------------------------------------------------//
interface MusicState {
    // Current track and playback state
    track: Track | null
    isPlaying: boolean
    isMuted: boolean
    isPlayerOpen: boolean

    // Playlist management
    playlist: Track[]
    currentIndex: number

    // Player controls
    openPlayer: () => void
    closePlayer: () => void
    togglePlayer: () => void

    // Playback controls
    togglePlay: () => void
    toggleMute: () => void
    setMusic: (track: Track) => void

    // Navigation controls
    playNext: () => void
    playPrevious: () => void
    playTrack: (track: Track, playlist?: Track[]) => void
    setPlaylist: (tracks: Track[], startIndex?: number) => void

    // Playlist management
    addToPlaylist: (track: Track) => void
    removeFromPlaylist: (trackId: string) => void
}

export const useMusic = create<MusicState>((set, get) => ({
    // Initial state
    track: null,
    isPlaying: false,
    isMuted: false,
    isPlayerOpen: false,
    playlist: [],
    currentIndex: -1,

    // Player visibility controls
    openPlayer: () => set({ isPlayerOpen: true }),
    closePlayer: () => set({ isPlayerOpen: false }),
    togglePlayer: () => set((state) => ({ isPlayerOpen: !state.isPlayerOpen })),

    // Toggle play/pause
    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

    // Toggle mute
    toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

    // Set current track (compatible with existing code)
    setMusic: (track: Track) => {
        const { playlist } = get()
        const trackIndex = playlist.findIndex((t) => t.id === track.id)

        // If track is in playlist, update currentIndex
        if (trackIndex >= 0) {
            set({
                track,
                currentIndex: trackIndex,
                isPlaying: true,
            })
        } else {
            // If track is not in playlist, add it as a single track playlist
            set({
                track,
                playlist: [track],
                currentIndex: 0,
                isPlaying: true,
            })
        }
    },

    // Play next track
    playNext: () => {
        const { playlist, currentIndex } = get()
        if (playlist.length === 0) return

        const nextIndex = currentIndex + 1
        if (nextIndex < playlist.length) {
            set({
                currentIndex: nextIndex,
                track: playlist[nextIndex],
                isPlaying: true,
            })
        } else {
            // Loop back to first track
            set({
                currentIndex: 0,
                track: playlist[0],
                isPlaying: true,
            })
        }
    },

    // Play previous track
    playPrevious: () => {
        const { playlist, currentIndex } = get()
        if (playlist.length === 0) return

        const prevIndex = currentIndex - 1
        if (prevIndex >= 0) {
            set({
                currentIndex: prevIndex,
                track: playlist[prevIndex],
                isPlaying: true,
            })
        } else {
            // Loop to last track
            set({
                currentIndex: playlist.length - 1,
                track: playlist[playlist.length - 1],
                isPlaying: true,
            })
        }
    },

    // Play specific track
    playTrack: (track: Track, playlist?: Track[]) => {
        const currentPlaylist = playlist || get().playlist
        const trackIndex = currentPlaylist.findIndex((t) => t.id === track.id)

        set({
            track,
            playlist: currentPlaylist,
            currentIndex: trackIndex >= 0 ? trackIndex : 0,
            isPlaying: true,
        })
    },

    // Set playlist
    setPlaylist: (tracks: Track[], startIndex = 0) => {
        set({
            playlist: tracks,
            currentIndex: startIndex,
            track: tracks[startIndex] || null,
        })
    },

    // Add track to playlist
    addToPlaylist: (track: Track) => {
        const { playlist } = get()
        // Check if track already exists
        if (!playlist.find((t) => t.id === track.id)) {
            set({ playlist: [...playlist, track] })
        }
    },

    // Remove track from playlist
    removeFromPlaylist: (trackId: string) => {
        const { playlist, currentIndex, track } = get()
        const newPlaylist = playlist.filter((t) => t.id !== trackId)
        const removedIndex = playlist.findIndex((t) => t.id === trackId)

        let newCurrentIndex = currentIndex
        let newTrack = track

        if (removedIndex === currentIndex) {
            // If we're removing the current track
            if (newPlaylist.length === 0) {
                newCurrentIndex = -1
                newTrack = null
            } else if (currentIndex >= newPlaylist.length) {
                newCurrentIndex = 0
                newTrack = newPlaylist[0]
            } else {
                newTrack = newPlaylist[currentIndex]
            }
        } else if (removedIndex < currentIndex) {
            newCurrentIndex = currentIndex - 1
        }

        set({
            playlist: newPlaylist,
            currentIndex: newCurrentIndex,
            track: newTrack,
        })
    },
}))
