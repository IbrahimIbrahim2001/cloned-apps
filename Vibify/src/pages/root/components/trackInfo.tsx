import { Button } from "@/components/ui/button"
import { Heart, LoaderCircle } from "lucide-react"
import { addNewLikedTrack } from "../services/api/addNewLikedTrack"
import { DatabaseTrack, Track } from "../types/track"
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
        addNewLikedTrack(isLiked, track);
    };
    return (
        <>
            {isLikeLoading ? <LoaderCircle className="animate-spin h-6 w-6" /> :
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 ml-4" onClick={handleLike}>
                    <Heart className={`h-6 w-6 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
            }
        </>
    )
}