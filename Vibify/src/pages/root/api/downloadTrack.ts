import axios from "axios";

const AUDIUS_API_BASE_URL = import.meta.env.VITE_AUDIUS_API_BASE_URL

export const downloadTrack = async (trackId: string | undefined) => {
    if (trackId)
        try {
            const response = await axios.get(`${AUDIUS_API_BASE_URL}/tracks/${trackId}/stream`, {
                responseType: 'blob',
                params: {
                    app_name: 'Vibify'
                }
            });
            return response.data;

        } catch (error) {
            console.error('Error fetching new releases:', error);
            throw error;
        }
    return null
}