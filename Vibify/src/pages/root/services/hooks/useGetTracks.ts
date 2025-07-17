import { useQuery } from "@tanstack/react-query";
import { handler } from "../api/handler";

export type SectionText = "New Releases" | "Your Playlists" | "Trending on Audius";

export const useGetTracks = (section: SectionText) => {
    return useQuery({
        queryKey: ["albums", section],
        queryFn: () => handler(section),
        retry: 2,
        retryDelay: 1000,
        staleTime: 5 * 60 * 1000,
    });
};