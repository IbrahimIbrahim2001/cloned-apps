import supabase from "@/lib/supabase-client"
import { DatabaseTrack, Track } from "../../types/track"
import { getTrackId } from "../../utils/getTrackId"
import { getTrackTitle } from "../../utils/getTrackTitle"
import { getArtistName } from "../../utils/getTrackArtistName"
import { getImageUrl } from "../../utils/getTrackImage"

export const addToHistory = async (track: DatabaseTrack | Track) => {
    try {
        const {
            data: { user },
        } = await supabase.auth.getUser()
        if (!user) return

        const trackId = getTrackId(track)

        const { error } = await supabase.from("history").upsert(
            {
                user_id: user.id,
                track_id: trackId,
                track_title: getTrackTitle(track),
                track_artist: getArtistName(track),
                track_image: getImageUrl(track),
            },
            {
                onConflict: "user_id,track_id",
                ignoreDuplicates: false,
            },
        )

        if (error) throw error
    } catch (error) {
        console.error("Error adding/updating history:", error)
    }
}
