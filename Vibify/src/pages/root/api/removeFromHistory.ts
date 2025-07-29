import supabase from "@/lib/supabase-client";
import { DatabaseTrack, Track } from "../types/track";
import { getTrackId } from "../utils/getTrackId";

export const removeFromHistory = async (track: Track | DatabaseTrack | null) => {
    const { data: userData, error: authError } = await supabase.auth.getUser()
    if (authError || !userData.user) {
        console.error("Authentication error:", authError?.message || "No user found")
        return { error: authError || new Error("Not authenticated") }
    }
    const userId = userData.user.id
    const TrackId = getTrackId(track);
    try {
        const { error } = await supabase.from("history").delete().eq("user_id", userId).eq("track_id", TrackId)
        if (error) throw error
    } catch (error) {
        console.log("error", error)
    }
}