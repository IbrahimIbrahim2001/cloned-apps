import supabase from "@/lib/supabase-client"

export const updatePassword = async (email: string, password: string) => {
    try {
        const { data, error } = await supabase.auth.updateUser({
            email,
            password,
        })

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true, data }
    } catch (error) {
        return { success: false, error, }
    }
}
