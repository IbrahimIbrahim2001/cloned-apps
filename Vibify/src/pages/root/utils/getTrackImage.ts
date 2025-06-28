import { DatabaseTrack, Track } from "../types/track"

export const getImageUrl = (track: Track | DatabaseTrack) => {
    if ("artwork" in track) {
        return track.artwork["150x150"]
    }
    return track.track_image
}
