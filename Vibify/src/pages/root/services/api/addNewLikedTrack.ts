import supabase from "@/lib/supabase-client";
import { getTrackId } from "../../utils/getTrackId";
import { getTrackTitle } from "../../utils/getTrackTitle";
import { getArtistName } from "../../utils/getTrackArtistName";
import { getImageUrl } from "../../utils/getTrackImage";
import { DatabaseTrack, Track } from "../../types/track";

export const addNewLikedTrack = async (isLiked: boolean, track: DatabaseTrack | Track) => {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        if (!isLiked) {
            const { error } = await supabase.from("liked_songs").insert({
                user_id: user.id,
                track_id: getTrackId(track),
                track_title: getTrackTitle(track),
                track_artist: getArtistName(track),
                track_image: getImageUrl(track)
            });

            if (error) throw error;
        } else {
            await supabase.from("liked_songs")
                .delete()
                .eq('user_id', user.id)
                .eq('track_id', getTrackId(track));
        }

    } catch (error) {
        console.error('Error toggling like:', error);
    }
}