import { useQuery } from "@tanstack/react-query";
import { recommendTracks } from "../api/mistral-ai-provider";

export default function useGetRecommendedTracks() {
    return useQuery({
        queryKey: ["recommend-tracks"],
        queryFn: recommendTracks,
        enabled: false,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    })
}
