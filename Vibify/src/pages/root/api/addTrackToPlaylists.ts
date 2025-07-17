import supabase from "@/lib/supabase-client"
import type { DatabaseTrack, Track } from "../types/track"
import { getTrackId } from "../utils/getTrackId"
import { getImageUrl } from "../utils/getTrackImage"
import { getArtistName } from "../utils/getTrackArtistName"
import { getTrackTitle } from "../utils/getTrackTitle"

export const addToPlaylist = async (track: DatabaseTrack | Track, playlists: string[]) => {
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError) {
        console.error("Error getting user:", userError)
        return { data: null, error: userError }
    }
    const user_id = userData?.user?.id

    const { data: userPlaylists, error: playlistsError } = await supabase
        .from("playlists")
        .select("id, title")
        .eq("user_id", user_id)
    if (playlistsError) {
        console.error("Error fetching user playlists:", playlistsError)
        return { data: null, error: playlistsError }
    }

    const playlistsToAddTo = userPlaylists?.filter((p) => playlists.includes(p.id))
    const playlistIds = playlistsToAddTo?.map((p) => p.id) || []

    if (playlistIds.length === 0) {
        return { data: null, error: new Error("No matching playlists found for the given titles or user.") }
    }

    const track_id = getTrackId(track)

    const { data: existingTracks, error: existingTracksError } = await supabase
        .from("playlist_tracks")
        .select("playlist_id, track_id")
        .in("playlist_id", playlistIds)
        .eq("track_id", track_id)

    if (existingTracksError) {
        console.error("Error checking for existing tracks:", existingTracksError)
        return { data: null, error: existingTracksError }
    }

    const existingPlaylistTrackPairs = new Set(existingTracks?.map((item) => `${item.playlist_id}-${item.track_id}`))

    const insertData = playlistIds
        .filter((playlist_id) => !existingPlaylistTrackPairs.has(`${playlist_id}-${track_id}`))
        .map((playlist_id) => ({
            playlist_id: playlist_id,
            track_id: track_id,
            track_image: getImageUrl(track),
            track_artist: getArtistName(track),
            track_title: getTrackTitle(track),
        }))

    if (insertData.length === 0) {
        return { data: null, error: new Error("Track already exists in all specified playlists.") }
    }

    const { data, error } = await supabase.from("playlist_tracks").insert(insertData)

    if (error) {
        console.error("Error adding track to playlists:", error)
        return { data: null, error }
    }

    return { data, error: null }
}
