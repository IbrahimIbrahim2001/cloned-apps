import axios from "axios";
const AUDIUS_API_BASE_URL = import.meta.env.VITE_AUDIUS_API_BASE_URL
export const getUndergroundTrendingTracks = async () => {
    try {
        const response = await axios.get(`${AUDIUS_API_BASE_URL}/tracks/trending/underground`, {
        });
        return response.data.data;

    } catch (error) {
        console.error('Error fetching new releases:', error);
        throw error;
    }
}