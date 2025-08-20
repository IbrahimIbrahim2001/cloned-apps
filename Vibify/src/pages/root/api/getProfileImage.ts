import supabase from "@/lib/supabase-client";

export async function getProfileImage(): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser()

        if (authError || !user) {
            return { success: false, error: "User not authenticated" }
        }

        const { data: files, error: listError } = await supabase.storage.from("profile picture").list(`pics/${user.id}`, {
            limit: 10,
            offset: 0,
        })

        if (listError) {
            return { success: false, error: listError.message }
        }
        const profileFile = files?.find((file) => file.name.startsWith("profile."))

        if (!profileFile) {
            return { success: false, error: "No profile image found" }
        }
        const filePath = `pics/${user.id}/${profileFile.name}`
        const {
            data: { publicUrl },
        } = supabase.storage.from("profile picture").getPublicUrl(filePath)

        return { success: true, url: publicUrl }
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to fetch profile image" }
    }
}
