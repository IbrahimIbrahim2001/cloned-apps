import { useQuery } from "@tanstack/react-query"
import { searchTracks } from "../api/searchTracks"

export const usePostSearch = (query: string) => {
    return useQuery({

        queryKey: ["audiusTracks", query],
        queryFn: () => searchTracks(query),
        staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
    })
}