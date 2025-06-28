import { Button } from "@/components/ui/button"
import supabase from "@/lib/supabase-client"
import { Heart, LoaderCircle } from "lucide-react"
import { DatabaseTrack, Track } from "../types/track"
import { getArtistName } from "../utils/getTrackArtistName"
import { getTrackId } from "../utils/getTrackId"
import { getImageUrl } from "../utils/getTrackImage"
import { getTrackTitle } from "../utils/getTrackTitle"

interface TrackInfoProps {
    track: Track | DatabaseTrack
    isLiked: boolean
    isLikeLoading: boolean
    onToggleLike: () => void
}

export function TrackInfo({ track, isLiked, isLikeLoading, onToggleLike }: TrackInfoProps) {
    const trackTitle = getTrackTitle(track);
    const trackImage = getImageUrl(track);
    return (
        <div className="px-8 py-4">
            <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                    <h1 className="text-2xl font-bold truncate">{trackTitle}</h1>
                    <p className="text-lg text-gray-300 truncate">{trackImage}</p>
                </div>
                <LikeButton isLiked={isLiked} isLikeLoading={isLikeLoading} onToggleLike={onToggleLike} track={track} />
            </div>
        </div>
    )
}


function LikeButton({ track, isLiked, isLikeLoading, onToggleLike }: TrackInfoProps) {

    const handleLike = async () => {
        onToggleLike();
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
                // Handle unlike functionality
                await supabase.from("liked_songs")
                    .delete()
                    .eq('user_id', user.id)
                    .eq('track_id', getTrackId(track));
            }

        } catch (error) {
            console.error('Error toggling like:', error);
            // Show user-friendly error message
        }
    };
    return (
        <>
            {isLikeLoading ? <LoaderCircle className="animate-spin" /> :
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 ml-4" onClick={handleLike}>
                    <Heart className={`h-6 w-6 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
            }
        </>
    )
}