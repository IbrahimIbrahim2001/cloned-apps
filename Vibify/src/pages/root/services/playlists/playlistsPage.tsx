import { useMemo } from "react";
import { PlaylistType } from "../../types/track";
import CreatePlaylistCard from "../Home/components/createPlaylistCard";
import LikedTracksCard from "../Home/components/likedTracksCard";
import Playlist from "../Home/components/playlist";
import { useGetTracks } from "../hooks/useGetTracks"
import { usePlaylistStore } from "../playlists-store";

export default function PlaylistsPage() {
    const { data: playlists, isLoading } = useGetTracks("Your Playlists");
    const optimisticPlaylists = usePlaylistStore((state) => state.optimisticPlaylists)
    const allPlaylists = useMemo(() => {
        if (!playlists) return optimisticPlaylists
        return [...playlists, ...optimisticPlaylists]
    }, [playlists, optimisticPlaylists])
    if (isLoading) return <>  <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div></>
    return (
        <div className="p-2 md:p-6 lg:p-8">
            <h1 className="text-lg font-bold">Your Playlists</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4">
                <LikedTracksCard />
                {allPlaylists.map((playlist: PlaylistType) => (
                    <Playlist key={playlist.id} playlist={playlist} />
                ))}
                <CreatePlaylistCard />
            </div>
        </div>
    )
}
