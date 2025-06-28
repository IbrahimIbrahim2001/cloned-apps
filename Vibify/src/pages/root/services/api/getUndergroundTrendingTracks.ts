import axios from "axios";

export const getUndergroundTrendingTracks = async () => {
    try {
        const response = await axios.get("https://discoveryprovider.audius.co/v1/tracks/trending/underground", {
        });
        return response.data.data;

    } catch (error) {
        console.error('Error fetching new releases:', error);
        throw error;
    }
}