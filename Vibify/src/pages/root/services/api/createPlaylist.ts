import supabase from "@/lib/supabase-client";

export const createPlaylist = async (title: string) => {
    const { data } = await supabase.auth.getUser();
    const user_id = data?.user?.id;
    try {
        const { data, error } = await supabase.from("playlists").insert({ title, user_id });
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error: ', error);
        return []
    }
}