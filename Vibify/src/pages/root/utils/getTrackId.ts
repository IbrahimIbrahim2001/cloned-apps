import { DatabaseTrack, Track } from "../types/track"

export const getTrackId = (track: Track | DatabaseTrack | null) => {
    if (track) {
        if ("artwork" in track) {
            return track.id
        }
        return track.track_id
    }
}
