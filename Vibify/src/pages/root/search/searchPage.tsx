import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";



import { usePostSearch } from "./hooks/usePostSearch";

import PageHeader from "../components/pageHeader";
import Skeleton from "../services/history/components/skeleton";
import { TrackItem } from "../services/history/components/trackItem";
import { getTrackId } from "../utils/getTrackId";
import { Track } from "../types/track";

interface SearchFormInputs {
    search: string
}

export default function SearchPage() {
    const { register, watch } = useForm<SearchFormInputs>({
        defaultValues: {
            search: "",
        },
    })

    const currentSearchQuery = watch("search")

    const { data: searchResults, isLoading, isError, error } = usePostSearch(currentSearchQuery)

    return (
        <>
            <PageHeader text={"Search"} />
            <div className="flex flex-col sm:items-center p-2 bg-background">
                {/* <h1 className="text-lg font-bold sm:p-6 sm:text-3xl">Search Tracks</h1> */}
                <div className="w-full sm:max-w-md sm:mx-auto mb-4">
                    <Input
                        placeholder="Search for tracks on Audius..."
                        {...register("search")}
                        className="w-full"
                    />
                </div>
                <Card className="w-full sm:max-w-md sm:mx-auto bg-background text-muted border-0 sm:bg-card sm:text-card-foreground sm:border-2">
                    <CardContent className="p-0 max-h-[80vh] sm:max-h-[70vh] overflow-y-auto no-scrollbar">
                        {isLoading && currentSearchQuery ? (
                            <Skeleton />
                        ) : isError ? (
                            <div className="p-6 text-center text-destructive">
                                Error: {error?.message || "Failed to fetch tracks."}
                            </div>
                        ) : searchResults && searchResults.length > 0 ? (
                            <div className="grid gap-2 p-2">
                                {searchResults.map((track: Track) => (
                                    <TrackItem key={getTrackId(track)} track={track} />
                                ))}
                            </div>
                        ) : currentSearchQuery && !isLoading ? (
                            <div className="p-6 text-center text-muted-foreground">No tracks found for "{currentSearchQuery}".</div>
                        ) : (
                            <div className="p-6 text-center text-muted-foreground">Start typing to search for tracks on Audius.</div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
