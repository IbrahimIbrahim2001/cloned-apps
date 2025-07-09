import { useParams } from "react-router"

export const PlaylistPage = () => {
    const params = useParams();
    const playlistName = params.name;
    return (
        <div>playlist {playlistName}</div>
    )
}
