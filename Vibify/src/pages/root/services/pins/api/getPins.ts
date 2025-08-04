import supabase from "@/lib/supabase-client"
import { DatabaseTrack } from "@/pages/root/types/track";

export const getPins = async () => {
    const { data } = await supabase.auth.getUser();
    const user_id = data?.user?.id;
    try {
        const { data, error } = await supabase.from("Pins").select().eq("user_id", user_id);
        if (error) throw error;
        return data as DatabaseTrack[];
    } catch (error) {
        console.error('Error: ', error);
        return []
    }
}