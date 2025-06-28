import { getTrendingTracks } from "./getTrendingTracks";
import { getUndergroundTrendingTracks } from "./getUndergroundTrendingTracks";

export const handler = (section: string) => {
    switch (section) {
        case "New Releases":
            return getTrendingTracks();
        case "Your Playlist":
            //this will fetch data from the supabase database (playlist table)
            return getTrendingTracks();
        case "Trending on Audius":
            //this will change soon
            return getUndergroundTrendingTracks();
    }
}