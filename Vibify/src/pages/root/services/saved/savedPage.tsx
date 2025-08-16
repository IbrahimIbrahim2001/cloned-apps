import { Card, CardContent } from "@/components/ui/card";
import Skeleton from "../history/components/skeleton";
import { useGetSavedTracks } from "./hooks/useGetSavedTracks";
import { TrackItem } from "../history/components/trackItem";
import { getTrackId } from "../../utils/getTrackId";
import { useEffect } from "react";
import { useOptimisticSavedTracksStore } from "./store";
import { useTranslation } from "react-i18next";

export default function SavedPage() {
    const { data: savedTracks, isLoading } = useGetSavedTracks();
    const { optimisticSavedTracks, setOptimisticSavedTracks } = useOptimisticSavedTracksStore();
    const { t } = useTranslation();
    useEffect(() => {
        if (savedTracks) {
            setOptimisticSavedTracks([...savedTracks].reverse())
        }
    }, [savedTracks, setOptimisticSavedTracks])
    if (isLoading) return <Skeleton text={t("Saved Tracks")} />
    return (
        <>
            <div className="flex flex-col sm:items-center p-2 bg-background">
                <h1 className="text-lg font-bold sm:p-6 sm:text-3xl">{t("Saved tracks")}</h1>
                <Card className="w-full sm:max-w-md sm:mx-auto bg-background text-muted border-0 sm:bg-card sm:text-card-foreground sm:border-2">
                    <CardContent className="p-0 max-h-[80vh] sm:max-h-[70vh] overflow-y-auto no-scrollbar">
                        {optimisticSavedTracks && optimisticSavedTracks.length > 0 ? (
                            optimisticSavedTracks.map((track) => <TrackItem key={getTrackId(track)} track={track} />)
                        ) : (
                            <div className="p-6 text-center text-muted-foreground">
                                No saved tracks found. Start playing some music!
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
