import supabase from "@/lib/supabase-client"

export const getPlaylistTracks = async (playlistTitle: string | undefined) => {
    try {
        const { data: playlist, error } = await supabase.from("playlists").select("id").eq("title", playlistTitle);
        const playlistId: string = playlist?.at(0)?.id;
        if (error) throw error
        const { data: tracks, error: tracksError } = await supabase.from("playlist_tracks").select().eq("playlist_id", playlistId)

        if (tracksError) throw error

        return tracks;

    } catch (error) {
        console.error('Error: ', error);
        return []
    }
}