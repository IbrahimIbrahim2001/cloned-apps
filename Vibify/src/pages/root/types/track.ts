export interface Track {
    id: string
    title: string,
    artwork: {
        "150x150": string,
    },
    user: {
        name: string
    }
}


export interface DatabaseTrack {
    track_id: string,
    track_title: string,
    track_artist: string,
    track_image: string
}


export interface PlaylistType {
    id: string,
    title: string,
    playlist_tracks: DatabaseTrack[]
}