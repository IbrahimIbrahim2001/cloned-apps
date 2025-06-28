import supabase from "@/lib/supabase-client"

export const getLikedTracks = async () => {
    try {

        const { data, error } = await supabase.from("liked_songs").select();
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error toggling like:', error);
        return error;
    }
}