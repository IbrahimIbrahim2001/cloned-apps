import { DatabaseTrack, Track } from "../types/track"

export const getArtistName = (track: Track | DatabaseTrack) => {
    if ("user" in track) {
        return track.user.name
    }
    return track.track_artist
}