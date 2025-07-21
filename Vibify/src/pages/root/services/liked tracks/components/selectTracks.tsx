import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DatabaseTrack } from "@/pages/root/types/track";
import { Trash } from "lucide-react";
import { useState } from "react";
import { deleteLikedTracks } from "../api/deleteLikedTracks";
import { LikedTrack } from "./likedTrack";
import { useOptimisticTracksStore } from "../store";

export const SelectTracks = ({ tracks }: { tracks?: DatabaseTrack[] }) => {
    const [selectedTracks, setSelectTracks] = useState<string[]>([]);
    const { optimisticTracks, setOptimisticTracks } = useOptimisticTracksStore();
    const handleSelectTrack = (trackId: DatabaseTrack["track_id"]) => {
        setSelectTracks(prev =>
            prev.includes(trackId)
                ? prev.filter(id => id !== trackId)
                : [...prev, trackId]
        );
    }

    const handleDelete = (selectedTracks: string[]) => {
        const filtered = tracks?.filter((track) => !selectedTracks.includes(track.track_id))
        setOptimisticTracks(filtered || [])
        deleteLikedTracks(selectedTracks);
        setSelectTracks([]);
    }

    return (
        <>
            {optimisticTracks?.map((track) => (
                <div key={track.track_id} className="flex items-center rounded-xl">
                    <Checkbox
                        checked={selectedTracks.includes(track.track_id)}
                        onCheckedChange={() => handleSelectTrack(track.track_id)}
                    />
                    <LikedTrack track={track} />
                </div>
            )) || <p className="">No tracks found</p>}
            <DeleteSelectedTracks selectedTracks={selectedTracks} handleDelete={() => handleDelete(selectedTracks)} />
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