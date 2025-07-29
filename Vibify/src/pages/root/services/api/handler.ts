import { getPlaylists } from "./getPlaylists";
import { getTrendingTracks } from "./getTrendingTracks";
import { getUndergroundTrendingTracks } from "./getUndergroundTrendingTracks";

export const handler = (section: string) => {
    switch (section) {
        case "New Releases":
            return getTrendingTracks();
        case "Your Playlists":
            return getPlaylists();
        case "Trending on Audius":
            return getUndergroundTrendingTracks();
    }
}