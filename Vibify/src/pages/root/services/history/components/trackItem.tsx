import { Button } from "@/components/ui/button";
import { useMusic } from "@/pages/root/store";
import { DatabaseTrack, Track } from "@/pages/root/types/track";
import { getImageUrl } from "@/pages/root/utils/getTrackImage";
import { getTrackTitle } from "@/pages/root/utils/getTrackTitle";
import { PlayIcon } from "lucide-react";
import { addToHistory } from "../../api/addToHistory";
import { useOptimisticHistoryStore } from "../store";
import { lazy, Suspense } from "react";
import { useLocation, useNavigate } from "react-router";


const LazyOptionMenu = lazy(() => import("@/pages/root/components/optionsMenu"))

export function TrackItem({ track }: { track: DatabaseTrack | Track }) {
    const { openPlayer, setMusic } = useMusic();
    const { optimisticHistory, setOptimisticHistory } = useOptimisticHistoryStore()

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const trackImage = getImageUrl(track);
    const trackTitle = getTrackTitle(track);
    const trackArtist = getTrackTitle(track);
    const playTrack = () => {
        if (pathname.includes("search")) {
            navigate(`../track/${trackTitle}`)
        }
        setMusic(track);
        openPlayer();
        setOptimisticHistory([track, ...optimisticHistory])
        addToHistory(track)
    };

    return (
        <div className="border-b last:border-0 relative group">
            <div className="flex items-center h-16 w-full sm:p-3 gap-4 transition-colors duration-200 hover:bg-accent/50">
                <div className="h-14 w-14 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <img
                        src={trackImage}
                        alt={`${trackTitle} album cover`}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="flex-1 overflow-hidden">
                    <p className="font-semibold text-base truncate">{trackTitle}</p>
                    <p className="text-sm text-muted-foreground truncate">{trackArtist}</p>
                </div>
                <div className="flex items-center gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                    <Button variant="ghost" size="icon" className="size-8" onClick={playTrack}>
                        <PlayIcon className="size-5 fill-primary text-primary" />
                        <span className="sr-only">Play track</span>
                    </Button>
                    <Suspense>
                        <LazyOptionMenu trackFromHistory={track} />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

