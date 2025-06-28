import { useQuery } from "@tanstack/react-query";
import { getLikedTracks } from "../api/getLikedTracks";

export const useGetLikedTracks = () => {
    return useQuery({
        queryKey: ["get liked songs"],
        queryFn: getLikedTracks,
    })
}
