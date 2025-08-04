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
    isShuffled: boolean
    isRepeating: boolean

    // Playlist management
    playlist: MusicTrack[]
    currentIndex: number
    originalPlaylist: MusicTrack[]

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

    // Shuffle and Repeat controls
    toggleShuffle: () => void
    toggleRepeat: () => void

    // Playlist management
    addToPlaylist: (track: MusicTrack) => void
    removeFromPlaylist: (trackId: string) => void


    // Utility functions (exposed for components to use)
    getTrackId: (track: MusicTrack) => string
    getTrackTitle: (track: MusicTrack) => string
    getTrackArtist: (track: MusicTrack) => string
    getTrackImage: (track: MusicTrack) => string
}

// Helper to shuffle an array
const shuffleArray = <T>(array: T[]): T[] => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
}
export const useMusic = create<MusicState>()(
    persist(
        (set, get) => ({
            // Initial state
            track: null,
            isPlaying: false,
            isMuted: false,
            isPlayerOpen: false,
            isShuffled: false,
            isRepeating: false,
            playlist: [],
            originalPlaylist: [],
            currentIndex: -1,

            // Player visibility controls
            openPlayer: () => set({ isPlayerOpen: true }),
            closePlayer: () => set({ isPlayerOpen: false, track: null, isPlaying: false }),
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
                const { playlist, currentIndex, isRepeating } = get()
                if (playlist.length === 0) return

                if (isRepeating) {
                    // If repeating, stay on the current track
                    set({ isPlaying: true })
                    return
                }

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
                const { playlist, currentIndex, isRepeating } = get()
                if (playlist.length === 0) return

                if (isRepeating) {
                    // If repeating, stay on the current track
                    set({ isPlaying: true })
                    return
                }

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
            playTrack: (track: MusicTrack, newPlaylist?: MusicTrack[]) => {
                const { isShuffled } = get()
                let targetPlaylist = newPlaylist || get().originalPlaylist // Use newPlaylist if provided, else current original

                // If a new playlist is provided, and shuffle is active, shuffle the new playlist
                if (newPlaylist && isShuffled) {
                    targetPlaylist = shuffleArray(newPlaylist)
                }

                const trackIndex = targetPlaylist.findIndex((t) => isSameTrack(t, track))
                set({
                    track,
                    playlist: targetPlaylist,
                    originalPlaylist: newPlaylist || get().originalPlaylist, // Store the new original if provided
                    currentIndex: trackIndex >= 0 ? trackIndex : 0,
                    isPlaying: true,
                })
            },

            // Set playlist
            setPlaylist: (tracks: MusicTrack[], startIndex = 0) => {

                const { isShuffled } = get()
                let currentPlaylist = [...tracks]
                if (isShuffled) {
                    currentPlaylist = shuffleArray(tracks)
                }

                const currentTrack = tracks[startIndex] || null
                const newCurrentIndex = currentPlaylist.findIndex((t) => isSameTrack(t, currentTrack!))

                set({
                    playlist: currentPlaylist,
                    originalPlaylist: tracks, // Store the original order
                    currentIndex: newCurrentIndex >= 0 ? newCurrentIndex : 0,
                    track: currentTrack,
                })
            },

            // Add track to playlist
            addToPlaylist: (track: MusicTrack) => {
                const { playlist, originalPlaylist, isShuffled } = get()
                // Check if track already exists in original playlist
                if (!originalPlaylist.find((t) => isSameTrack(t, track))) {
                    const newOriginalPlaylist = [...originalPlaylist, track]
                    let newPlaylist = [...playlist]

                    if (isShuffled) {
                        // If shuffled, add to the end of the current shuffled list
                        newPlaylist = [...playlist, track]
                    } else {
                        newPlaylist = newOriginalPlaylist
                    }

                    set({
                        playlist: newPlaylist,
                        originalPlaylist: newOriginalPlaylist,
                    })
                }
            },
            // Remove track from playlist
            removeFromPlaylist: (trackId: string) => {
                const { playlist, currentIndex, track, originalPlaylist } = get()

                const newOriginalPlaylist = originalPlaylist.filter((t) => getTrackId(t) !== trackId)
                const newPlaylist = playlist.filter((t) => getTrackId(t) !== trackId)

                const removedIndex = playlist.findIndex((t) => getTrackId(t) === trackId)
                let newCurrentIndex = currentIndex
                let newTrack = track

                if (removedIndex === currentIndex) {
                    // If we're removing the current track\
                    if (newPlaylist.length === 0) {
                        newCurrentIndex = -1
                        newTrack = null
                    } else if (currentIndex >= newPlaylist.length) {
                        newCurrentIndex = 0 // Go to the first track if current was last\
                        newTrack = newPlaylist[0]
                    } else {
                        newTrack = newPlaylist[currentIndex] // Stay on the track at the same index
                    }
                } else if (removedIndex < currentIndex) {
                    newCurrentIndex = currentIndex - 1 // Adjust index if a track before current was removed
                }

                set({
                    playlist: newPlaylist,
                    originalPlaylist: newOriginalPlaylist,
                    currentIndex: newCurrentIndex,
                    track: newTrack,
                })
            },

            // Toggle Shuffle
            toggleShuffle: () => {
                set((state) => {
                    const newIsShuffled = !state.isShuffled
                    let newPlaylist = [...state.playlist]
                    let newCurrentIndex = state.currentIndex

                    if (newIsShuffled) {
                        // Turn shuffle ON
                        newPlaylist = shuffleArray(state.originalPlaylist)
                        if (state.track) {
                            // Find the current track in the new shuffled playlist
                            const currentTrackId = getTrackId(state.track)
                            const foundIndex = newPlaylist.findIndex((t) => getTrackId(t) === currentTrackId)
                            if (foundIndex !== -1) {
                                newCurrentIndex = foundIndex
                            } else {
                                // If current track not found (e.g., playlist was empty), default to 0
                                newCurrentIndex = newPlaylist.length > 0 ? 0 : -1
                            }
                        } else {
                            newCurrentIndex = newPlaylist.length > 0 ? 0 : -1
                        }
                    } else {
                        // Turn shuffle OFF
                        newPlaylist = [...state.originalPlaylist]
                        if (state.track) {
                            // Find the current track in the original playlist
                            const currentTrackId = getTrackId(state.track)
                            const foundIndex = newPlaylist.findIndex((t) => getTrackId(t) === currentTrackId)
                            if (foundIndex !== -1) {
                                newCurrentIndex = foundIndex
                            } else {
                                newCurrentIndex = newPlaylist.length > 0 ? 0 : -1
                            }
                        } else {
                            newCurrentIndex = newPlaylist.length > 0 ? 0 : -1
                        }
                    }

                    return {
                        isShuffled: newIsShuffled,
                        playlist: newPlaylist,
                        currentIndex: newCurrentIndex,
                        // Ensure track is updated if currentIndex changed and playlist is not empty
                        track: newPlaylist[newCurrentIndex] || null,
                    }
                })
            },

            // Toggle Repeat
            toggleRepeat: () => set((state) => ({ isRepeating: !state.isRepeating })),

            // Expose utility functions for components
            getTrackId,
            getTrackTitle,
            getTrackArtist,
            getTrackImage,
        }),
        {
            name: 'music-player-storage', // unique name for localStorage key
            storage: createJSONStorage(() => localStorage), // Use localStorage
            partialize: (state) => ({ // Select which parts of the state to persist
                track: state.track,
                isPlaying: state.isPlaying,
                isMuted: state.isMuted,
                isShuffled: state.isShuffled,
                isRepeating: state.isRepeating,
                playlist: state.playlist,
                originalPlaylist: state.originalPlaylist,
                currentIndex: state.currentIndex,
            }),
        }
    )
)
