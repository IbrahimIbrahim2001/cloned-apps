import axios from 'axios';
const AUDIUS_API_BASE_URL = import.meta.env.VITE_AUDIUS_API_BASE_URL

export const getTrendingTracks = async () => {
    try {
        const response = await axios.get(`${AUDIUS_API_BASE_URL}/tracks/trending`, {
        });
        return response.data.data;

    } catch (error) {
        console.error('Error fetching new releases:', error);
        throw error;
    }
};