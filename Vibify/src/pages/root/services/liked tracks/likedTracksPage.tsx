import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import LikedTrack from "./components/likedTrack";
import { useGetLikedTracks } from "./hooks/useGetLikedTracks";

import { SelectTracks } from "./components/selectTracks";
import SkeletonComponent from "./components/skeletonComponent";
import LikedTracksLayout from "./layout";
import { useOptimisticTracksStore } from "./store";

export const LikedTracksPage = () => {

    const [isSelected, setIsSelected] = useState(false);
    const { data: tracks, isLoading, error } = useGetLikedTracks();
    const { optimisticTracks, setOptimisticTracks } = useOptimisticTracksStore();

    useEffect(() => {
        setOptimisticTracks(tracks || []);
    }, [tracks, setOptimisticTracks])

    const handleClick = () => {
        setIsSelected(!isSelected);
    }
    if (error) {
        return (
            <LikedTracksLayout>
                <p className="text-destructive">Error loading liked tracks</p>
            </LikedTracksLayout>
        )
    }

    if (isLoading) {
        return (
            <>
                <LikedTracksLayout />
                <SkeletonComponent />
            </>
        )
    }
    if (isSelected) return (
        <>
            <LikedTracksLayout>
                <Button onClick={handleClick} variant="outline">unselect</Button>
            </LikedTracksLayout>
            <SelectTracks tracks={tracks} />
        </>
    )


    return (
        <>
            <LikedTracksLayout>
                {tracks && tracks?.length > 0 ? <Button onClick={handleClick} variant="outline">select</Button> : null}
            </LikedTracksLayout>
            {optimisticTracks?.map((track) => (
                <LikedTrack key={track.track_id} track={track} />
            )) || <p className="">No tracks found</p>}
        </>
    )
}


