import { DatabaseTrack } from "../../types/track";
import LikedTrack from "./components/likedTrack"
import { useGetLikedTracks } from "./hooks/useGetLikedTracks"

export const LikedTracksPage = () => {

    const { data: tracks, isLoading, error } = useGetLikedTracks();
    if (error) {
        return (
            <div className="p-4">
                <p className="text-destructive">Error loading liked tracks</p>
            </div>
        )
    }

    if (isLoading) {
        return (
            <>
                <p className="text-xl px-3">Loading...</p>
            </>
        )
    }
    return (
        <>
            {(tracks as DatabaseTrack[])?.map((track) => (
                <LikedTrack key={track.track_id} track={track} />
            )) || <p className="">No tracks found</p>}
        </>
    )
}

