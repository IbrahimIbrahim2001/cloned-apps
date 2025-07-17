import { useQuery } from "@tanstack/react-query"
import { getPlaylistTracks } from "../api/getPlaylistTracks"

export const useGetPlaylistTracks = (playlistsTitle: string | undefined) => {
    return useQuery({
        queryKey: ["playlist-title", playlistsTitle],
        queryFn: () => getPlaylistTracks(playlistsTitle)
    })
} 