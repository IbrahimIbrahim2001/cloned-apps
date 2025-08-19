import supabase from "@/lib/supabase-client"

export const resetPasswordWithEmail = async (email: string) => {
    try {

        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'http://localhost:5173/update-password',
        })
        if (error || !data) throw new Error
    } catch (error) {
        console.log({ status: 404, error })
    }
}