import supabase from "@/lib/supabase-client"
import { PlaylistType } from "../../types/track";

export const getPlaylists = async () => {
    const { data } = await supabase.auth.getUser();
    const user_id = data?.user?.id;
    try {
        const { data, error } = await supabase.from("playlists").select().eq("user_id", user_id);
        if (error) throw error;
        return data as PlaylistType[];
    } catch (error) {
        console.error('Error: ', error);
        return []
    }
}