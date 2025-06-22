import { getTrendingTracks } from "./getTrendingTracks";

export const handler = (section: string) => {
    switch (section) {
        case "New Releases":
            return getTrendingTracks();
        case "Your Playlist":
            //this will fetch data from the supabase database (playlist table)
            return getTrendingTracks();
        case "New to you":
            //this will change soon
            return getTrendingTracks();
    }
}