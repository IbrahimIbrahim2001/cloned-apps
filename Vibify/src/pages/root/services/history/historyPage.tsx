import { Card, CardContent } from "@/components/ui/card";
import { TrackItem } from "./components/TrackItem";
import { useGetHistory } from "./hooks/useGetHistory";
import Skeleton from "./components/skeleton";

export default function HistoryPage() {
    const { data: historyTracks, isLoading } = useGetHistory();
    if (isLoading) return <Skeleton />
    return (
        <>
            <div className="flex flex-col sm:items-center p-2 bg-background">
                <h1 className="text-lg font-bold sm:p-6 sm:text-3xl">Listening History</h1>
                <Card className="w-full sm:max-w-md sm:mx-auto bg-background text-muted border-0 sm:bg-card sm:text-card-foreground sm:border-2">
                    <CardContent className="p-0">
                        {historyTracks && historyTracks.length > 0 ? (
                            historyTracks.map((track) => <TrackItem key={track.track_id} track={track} />)
                        ) : (
                            <div className="p-6 text-center text-muted-foreground">
                                No listening history found. Start playing some music!
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    )
}