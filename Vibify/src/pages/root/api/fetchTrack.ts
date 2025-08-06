import axios from "axios";
import { Track } from "../types/track";


const AUDIUS_BASE_URL = import.meta.env.VITE_AUDIUS_API_BASE_URL;

export const getTrack = async (trackTitle: string): Promise<Track | null> => {
    try {
        const response = await axios.get(`${AUDIUS_BASE_URL}/tracks/search`, {
            params: {
                query: trackTitle,
                app_name: 'vibify',
            },
        });
        console.log(response.data.data)
        const tracks: Track[] = response.data.data;

        if (tracks && tracks.length > 0) {
            const foundTrack = tracks.find(track => track.title.toLowerCase() === trackTitle.toLowerCase());
            return foundTrack || tracks[0];
        }
        return null;
    } catch (error) {
        console.error('Error fetching track from Audius API:', error);
        return null;
    }
};
