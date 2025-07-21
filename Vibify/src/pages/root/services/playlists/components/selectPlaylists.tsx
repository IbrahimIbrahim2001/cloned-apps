import { PlaylistType } from "@/pages/root/types/track";
import Playlist from "../../Home/components/playlist";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePlaylistStore } from "../../playlists-store";
import { Trash } from "lucide-react";
import { deletePlaylists } from "../api/deletePlaylists";

export default function SelectPlaylists({ playlists }: { playlists: PlaylistType[] }) {
    const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);
    const { setOptimisticPlaylists } = usePlaylistStore()
    const handleSelectPlaylist = (playlistId: PlaylistType["id"]) => {
        setSelectedPlaylists(
            prev =>
                prev.includes(playlistId)
                    ? prev.filter((id) => id !== playlistId)
                    : [...prev, playlistId]
        );
    }
    const handleDelete = (selectedPlaylists: string[]) => {
        const filtered = playlists?.filter((playlist) => !selectedPlaylists.includes(playlist.id))
        setOptimisticPlaylists(filtered || [])
        deletePlaylists(selectedPlaylists)
        setSelectedPlaylists([]);
    }

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 md:px-3 lg:px-4">
                {playlists.map((playlist: PlaylistType) => (
                    <div
                        key={playlist.id}
                        className="relative group rounded-lg overflow-hidden transition-all duration-200"
                    >
                        <Playlist playlist={playlist} />
                        <div className="absolute top-3 right-3 z-10">
                            <Checkbox
                                checked={selectedPlaylists.includes(playlist.id)}
                                onCheckedChange={() => handleSelectPlaylist(playlist.id)}
                                className="w-5 h-5 border-white data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                        </div>
                    </div>
                ))}
            </div>
            <DeleteSelectedTracks selectedTracks={selectedPlaylists} handleDelete={() => handleDelete(selectedPlaylists)} />
        </>
    )
}


function DeleteSelectedTracks({ selectedTracks, handleDelete }: { selectedTracks: string[], handleDelete: () => void }) {
    return (
        <>
            {selectedTracks && selectedTracks.length > 0 &&
                <Button onClick={handleDelete} variant="outline" className="border-red-400/80 bg-red-400/80 rounded-full fixed bottom-20 left-1/2 -translate-x-1/2 backdrop-blur-2xl"><Trash />Delete</Button>
            }
        </>
    )
}