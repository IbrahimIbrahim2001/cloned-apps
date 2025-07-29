import axios from "axios"

const AUDIUS_API_BASE_URL = import.meta.env.VITE_AUDIUS_API_BASE_URL

export const searchTracks = async (query: string) => {
    if (!query) {
        return []
    }
    try {
        const response = await axios.get(
            `${AUDIUS_API_BASE_URL}/tracks/search?query=${encodeURIComponent(query)}`,
        )
        return response.data.data || []
    } catch (error) {
        console.error("Error searching Audius tracks:", error)
        throw error
    }
}