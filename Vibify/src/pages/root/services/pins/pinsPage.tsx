import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";
import { getTrackId } from "../../utils/getTrackId";
import Skeleton from "../history/components/skeleton";
import { TrackItem } from "../history/components/trackItem";
import { useOptimisticPinsStore } from "./store";
import { useGetPins } from "./hooks/useGetPins";

export default function PinsPage() {
    const { data: pins, isLoading } = useGetPins();
    const { optimisticPins, setOptimisticPins } = useOptimisticPinsStore();

    useEffect(() => {
        if (pins) {
            setOptimisticPins([...pins].reverse())
        }
    }, [pins, setOptimisticPins])

    if (isLoading) return <Skeleton text="Your Pins" />
    return (
        <>
            <div className="flex flex-col sm:items-center p-2 bg-background">
                <h1 className="text-lg font-bold sm:p-6 sm:text-3xl">Your Pins</h1>
                <Card className="w-full sm:max-w-md sm:mx-auto bg-background text-muted border-0 sm:bg-card sm:text-card-foreground sm:border-2">
                    <CardContent className="p-0 max-h-[80vh] sm:max-h-[70vh] overflow-y-auto no-scrollbar">
                        {optimisticPins && optimisticPins.length > 0 ? (
                            optimisticPins.map((track) => <TrackItem key={getTrackId(track)} track={track} />)
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