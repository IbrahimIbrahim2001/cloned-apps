import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { PlaylistType } from "../../types/track";
import CreatePlaylistCard from "../Home/components/createPlaylistCard";
import LikedTracksCard from "../Home/components/likedTracksCard";
import Playlist from "../Home/components/playlist";
import { useGetTracks } from "../hooks/useGetTracks";
import { usePlaylistStore } from "../playlists-store";
import SelectPlaylists from "./components/selectPlaylists";

export default function PlaylistsPage() {
    const { data: playlists, isLoading } = useGetTracks("Your Playlists");
    const { optimisticPlaylists, setOptimisticPlaylists } = usePlaylistStore()
    const [selected, setSelected] = useState(false);
    const handleClick = () => {
        setSelected(!selected);
    }

    useEffect(() => {
        setOptimisticPlaylists(playlists || []);
    }, [playlists, setOptimisticPlaylists])
    if (isLoading) {
        return (
            <>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
                </div>
            </>
        )
    }
    if (selected) {
        return (
            <div className="px-2 md:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-lg font-bold">Your Playlists</h1>
                    <Button onClick={handleClick} variant="outline">unselect</Button>
                </div>
                <SelectPlaylists playlists={optimisticPlaylists} />
            </div>
        )
    }
    return (
        <div className="px-2 md:px-6 lg:px-8">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-bold">Your Playlists</h1>
                {playlists && playlists?.length > 0 ? <Button onClick={handleClick} variant="outline">select</Button> : null}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 md:px-3 lg:px-4">

                {optimisticPlaylists.map((playlist: PlaylistType) => (
                    <Playlist key={playlist.id} playlist={playlist} />
                ))}
                <LikedTracksCard />
                <CreatePlaylistCard />
            </div>
        </div>
    )
}
