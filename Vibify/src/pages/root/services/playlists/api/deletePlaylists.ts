import supabase from "@/lib/supabase-client"

export const deletePlaylists = async (selectedPlaylists: string[]) => {
    try {
        const { data: userData, error: userDataError } = await supabase.auth.getUser();
        const userId = userData.user?.id;
        if (userDataError) throw userDataError;
        const { error } = await supabase
            .from("playlists")
            .delete()
            .match({ user_id: userId })
            .in('id', selectedPlaylists)

        if (error) throw error
    } catch (error) {
        console.log("error message: ", error)
    }
}