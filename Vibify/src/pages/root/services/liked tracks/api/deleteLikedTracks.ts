import supabase from "@/lib/supabase-client"

export const deleteLikedTracks = async (selectedTracks: string[]) => {
  const { data: userData, error: authError } = await supabase.auth.getUser()
  if (authError || !userData.user) {
    console.error("Authentication error:", authError?.message || "No user found")
    return { error: authError || new Error("Not authenticated") }
  }

  const userId = userData.user.id
  const { error } = await supabase
    .from("liked_songs")
    .delete()
    .match({ user_id: userId })
    .in('track_id', selectedTracks)

  if (error) {
    console.error("Delete error:", error.message)
    return { error }
  }

  return { success: true }
}