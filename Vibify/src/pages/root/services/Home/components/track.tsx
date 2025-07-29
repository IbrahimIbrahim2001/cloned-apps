import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMusic } from "@/pages/root/store";
import { Track } from "@/pages/root/types/track";
import { Play } from "lucide-react";
import { useOptimisticHistoryStore } from "../../history/store";
import { addToHistory } from "../../api/addToHistory";
interface ClickableTrackProps {
    track: Track
    onClick?: () => void
}

export default function TrackComponent({ track, onClick }: ClickableTrackProps) {
    return (
        <>
            <Card onClick={onClick} className="text-primary-foreground bg-background w-[170px] border-none relative">
                <div className="relative aspect-square w-full overflow-hidden rounded-md  transition-all duration-300 ease-in-out transform group delay-1000  group-hover/card:scale-[1.02]">
                    <img
                        className="h-full w-full object-cover "
                        src={track.artwork["150x150"]}
                        alt={`${track?.id} album cover`}
                    />
                    <PlayButton track={track} />
                </div>
                <div className="flex flex-col flex-1">
                    <CardHeader className="p-0 pb-1 space-y-0">
                        <CardTitle className="text-sm font-medium line-clamp-1">{track.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <CardDescription className="text-xs line-clamp-1">{track.user.name}</CardDescription>
                    </CardContent>
                </div>
            </Card>
        </>
    )
}


function PlayButton({ track }: { track: Track }) {
    const { openPlayer, setMusic } = useMusic();
    const { optimisticHistory, setOptimisticHistory } = useOptimisticHistoryStore();
    const playTrack = () => {
        setOptimisticHistory([track, ...optimisticHistory])
        setMusic(track);
        openPlayer();
        addToHistory(track);
    };
    return (
        <>
            <div className="bg-primary/90  text-primary-foreground rounded-full absolute right-0 bottom-0 m-2 p-2 hover:bg-primary/100 hover:scale-105 sm:hidden group-hover:block"
                onClick={playTrack}>
                <Play />
            </div>
        </>
    )
}