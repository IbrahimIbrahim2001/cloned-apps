import { DatabaseTrack, Track } from "../types/track"

export const getTrackTitle = (track: Track | DatabaseTrack) => {
    if ("user" in track) {
        return track.user.name
    }
    return track.track_title
}