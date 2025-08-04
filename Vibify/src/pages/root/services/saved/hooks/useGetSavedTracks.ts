import { useQuery } from "@tanstack/react-query";
import { getSavedTracks } from "../api/getSavedTracks";
export const useGetSavedTracks = () => {
    return useQuery({
        queryKey: ["Saved-tracks"],
        queryFn: getSavedTracks,
    });
};