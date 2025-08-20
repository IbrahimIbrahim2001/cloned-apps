import supabase from "@/lib/supabase-client"

export async function uploadProfileImage(file: File): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser()

        if (authError || !user) {
            return { success: false, error: "User not authenticated" }
        }
        if (!file.type.startsWith("image/")) {
            return { success: false, error: "File must be an image" }
        }
        if (file.size > 5 * 1024 * 1024) {
            return { success: false, error: "File size must be less than 5MB" }
        }

        const { data: existingFiles } = await supabase.storage.from("profile picture").list(`pics/${user.id}`, {
            limit: 100,
            search: "profile",
        })

        if (existingFiles && existingFiles.length > 0) {
            const filesToDelete = existingFiles.map((file) => `pics/${user.id}/${file.name}`)
            await supabase.storage.from("profile picture").remove(filesToDelete)
        }

        const fileExt = file.name.split(".").pop()
        const fileName = `${user.id}/profile.${fileExt}`
        const filePath = `pics/${fileName}`

        const { error } = await supabase.storage.from("profile picture").upload(filePath, file)

        if (error) throw new Error;

        const {
            data: { publicUrl },
        } = supabase.storage.from("profile picture").getPublicUrl(filePath)

        return { success: true, url: publicUrl }
    } catch (error) {
        console.error(error)
        return { success: false, error: "Upload failed" }
    }
}
