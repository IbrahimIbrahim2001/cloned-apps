import { DatabaseTrack, Track } from "../types/track"

export const getTrackId = (track: Track | DatabaseTrack) => {
    if ("artwork" in track) {
        return track.id
    }
    return track.track_id
}
