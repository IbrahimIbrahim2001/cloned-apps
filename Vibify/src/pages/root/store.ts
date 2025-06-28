import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { DatabaseTrack, Track } from "./types/track";


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
export type MusicTrack = Track | DatabaseTrack

// Utility functions to normalize access to track properties
const getTrackId = (track: MusicTrack): string => {
    return 'id' in track ? track.id : track.track_id
}

const getTrackTitle = (track: MusicTrack): string => {
    return 'title' in track ? track.title : track.track_title
}

const getTrackArtist = (track: MusicTrack): string => {
    return 'user' in track ? track.user.name : track.track_artist
}

const getTrackImage = (track: MusicTrack): string => {
    return 'artwork' in track ? track.artwork["150x150"] : track.track_image
}

// Helper function to check if two tracks are the same
const isSameTrack = (track1: MusicTrack, track2: MusicTrack): boolean => {
    return getTrackId(track1) === getTrackId(track2)
}

interface MusicState {
    // Current track and playback state
    track: MusicTrack | null
    isPlaying: boolean
    isMuted: boolean
    isPlayerOpen: boolean

    // Playlist management
    playlist: MusicTrack[]
    currentIndex: number

    // Player controls
    openPlayer: () => void
    closePlayer: () => void
    togglePlayer: () => void

    // Playback controls
    togglePlay: () => void
    toggleMute: () => void
    setMusic: (track: MusicTrack) => void

    // Navigation controls
    playNext: () => void
    playPrevious: () => void
    playTrack: (track: MusicTrack, playlist?: MusicTrack[]) => void
    setPlaylist: (tracks: MusicTrack[], startIndex?: number) => void

    // Playlist management
    addToPlaylist: (track: MusicTrack) => void
    removeFromPlaylist: (trackId: string) => void

    // Utility functions (exposed for components to use)
    getTrackId: (track: MusicTrack) => string
    getTrackTitle: (track: MusicTrack) => string
    getTrackArtist: (track: MusicTrack) => string
    getTrackImage: (track: MusicTrack) => string
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
    setMusic: (track: MusicTrack) => {
        const { playlist } = get()
        const trackIndex = playlist.findIndex((t) => isSameTrack(t, track))

        // If track is in playlist, update currentIndex
        if (trackIndex >= 0) {
            set({
                track,
                currentIndex: trackIndex,
            })
        } else {
            set({
                track,
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
    playTrack: (track: MusicTrack, playlist?: MusicTrack[]) => {
        const currentPlaylist = playlist || get().playlist
        const trackIndex = currentPlaylist.findIndex((t) => isSameTrack(t, track))

        set({
            track,
            playlist: currentPlaylist,
            currentIndex: trackIndex >= 0 ? trackIndex : 0,
            isPlaying: true,
        })
    },

    // Set playlist
    setPlaylist: (tracks: MusicTrack[], startIndex = 0) => {
        set({
            playlist: tracks,
            currentIndex: startIndex,
            track: tracks[startIndex] || null,
        })
    },

    // Add track to playlist
    addToPlaylist: (track: MusicTrack) => {
        const { playlist } = get()
        // Check if track already exists
        if (!playlist.find((t) => isSameTrack(t, track))) {
            set({ playlist: [...playlist, track] })
        }
    },

    // Remove track from playlist
    removeFromPlaylist: (trackId: string) => {
        const { playlist, currentIndex, track } = get()
        const newPlaylist = playlist.filter((t) => getTrackId(t) !== trackId)
        const removedIndex = playlist.findIndex((t) => getTrackId(t) === trackId)

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

    // Expose utility functions for components
    getTrackId,
    getTrackTitle,
    getTrackArtist,
    getTrackImage,
}))
