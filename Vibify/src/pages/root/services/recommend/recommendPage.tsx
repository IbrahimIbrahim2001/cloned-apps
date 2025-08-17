import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RecommendedTrack from "./components/recommendedTrack";
import useGetRecommendedTracks from "./hooks/useGetRecommendedTracks";
import { Loader2 } from 'lucide-react';
export default function RecommendPage() {
    const { data, isLoading, isFetching, error, isError,
        refetch } = useGetRecommendedTracks();

    const recommendedTracks = data?.tracks || []

    return (
        <>
            <Card className="w-full shadow-lg bg-background border-0">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-muted">Music Recommender</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col sm:items-center">
                    <Button
                        onClick={() => refetch()}
                        disabled={isLoading || isFetching && !isError}
                        className="px-8 py-3 text-lg"
                    >
                        {(isLoading || isFetching) ? <>'Generating' < Loader2 className="animate-spin" /> </> : 'Get 10 Recommended Tracks'}
                    </Button>

                    {error && (
                        <div className="text-red-600 text-center p-4 border border-red-300 bg-red-50 rounded-md w-full">
                            Error: {error.message}
                        </div>
                    )}

                    {recommendedTracks?.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 w-full">
                            {recommendedTracks?.map((track) => (
                                <RecommendedTrack key={track.id} track={track} />
                            ))}
                        </div>
                    )}

                    {!isLoading && !isFetching && recommendedTracks?.length === 0 && !error && (
                        <p className="text-gray-500">Click the button to get track recommendations!</p>
                    )}
                </CardContent>
            </Card>
        </>
    )
}
