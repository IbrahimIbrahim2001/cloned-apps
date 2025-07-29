import { useMusic } from "@/pages/root/store";
import { DatabaseTrack, DatabaseTrack as Track } from "@/pages/root/types/track";
import { getArtistName } from "@/pages/root/utils/getTrackArtistName";
import { getImageUrl } from "@/pages/root/utils/getTrackImage";
import { getTrackTitle } from "@/pages/root/utils/getTrackTitle";
import { Play } from "lucide-react";
import { addToHistory } from "../../api/addToHistory";
import { useOptimisticHistoryStore } from "../../history/store";

interface LikedTrackProps {
    track: Track
}

export const LikedTrack = ({ track }: LikedTrackProps) => {
    const trackTitle = getTrackTitle(track);
    const trackImage = getImageUrl(track);
    const trackArtist = getArtistName(track);
    return (
        <div className="border-b flex justify-between items-center h-16 w-full p-3 last:border-0">
            <div className="flex space-x-2 ">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <img
                        src={trackImage}
                        alt={`${trackTitle} album cover`}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="overflow-hidden">
                    <p className="font-medium text-sm truncate">{trackTitle}</p>
                    <p className="text-xs text-muted-foreground truncate">{trackArtist}</p>
                </div>
            </div>
            <PlayButton track={track} />
        </div>
    )
}


function PlayButton({ track }: { track: DatabaseTrack }) {
    const { openPlayer, setMusic } = useMusic();
    const { optimisticHistory, setOptimisticHistory } = useOptimisticHistoryStore();
    const playTrack = () => {
        setMusic(track);
        setOptimisticHistory([track, ...optimisticHistory])
        openPlayer();
        addToHistory(track);
    };
    return (
        <>
            <div className="bg-primary/90  text-primary-foreground rounded-full m-2 p-2 hover:bg-primary/100 hover:scale-105"
                onClick={playTrack}>
                <Play />
            </div>
        </>
    )
}