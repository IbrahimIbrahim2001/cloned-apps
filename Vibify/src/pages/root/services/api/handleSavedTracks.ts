import supabase from "@/lib/supabase-client"
import { getArtistName } from "../../utils/getTrackArtistName"
import { getImageUrl } from "../../utils/getTrackImage"
import { getTrackTitle } from "../../utils/getTrackTitle"
import { getTrackId } from "../../utils/getTrackId"
import { DatabaseTrack, Track } from "../../types/track"

export const addToSavedTracks = async (track: Track | DatabaseTrack) => {
    try {
        const {
            data: { user },
        } = await supabase.auth.getUser()
        if (!user) return

        const trackId = getTrackId(track)

        const { error } = await supabase.from("saved-tracks").insert(
            {
                user_id: user.id,
                track_id: trackId,
                track_title: getTrackTitle(track),
                track_artist: getArtistName(track),
                track_image: getImageUrl(track),
            },
        )

        if (error) throw error
    } catch (error) {
        console.error("Error adding/updating saved tracks:", error)
    }
}


export const removeFromSavedTracks = async (track: Track | DatabaseTrack) => {
    try {
        const {
            data: { user },
        } = await supabase.auth.getUser()
        if (!user) return

        const trackId = getTrackId(track)

        const { error } = await supabase.from("saved-tracks").delete().eq("user_id", user.id).eq("track_id", trackId)

        if (error) throw error
    } catch (error) {
        console.error("Error adding/updating saved tracks:", error)
    }

}