import { useParams } from "react-router"
import { useGetPlaylistTracks } from "./hooks/useGetPlaylistTracks";
import SkeletonComponent from "../../liked tracks/components/skeletonComponent";
import { LikedTrack as PlaylistTracks } from "../../liked tracks/components/likedTrack"

export const PlaylistPage = () => {
    const params = useParams();
    const playlistName = params.name;
    const { data: tracks, isLoading } = useGetPlaylistTracks(playlistName);
    if (isLoading) return <SkeletonComponent />

    return (
        <>
            <div>
                playlist {playlistName}
            </div>
            {tracks?.map((track) => (
                <PlaylistTracks key={track.track_id} track={track} />
            )) || <p className="">No tracks found</p>}
        </>
    )
}
