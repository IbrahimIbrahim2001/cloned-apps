import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaylistType } from "@/pages/root/types/track";
import { Music } from "lucide-react";
import { Link } from "react-router";
import { useGetPlaylistTracks } from "../../playlists/playlist/hooks/useGetPlaylistTracks";

export default function Playlist({ playlist }: { playlist: PlaylistType }) {
    const { data: tracks } = useGetPlaylistTracks(playlist.title);
    return (
        <Card className="text-primary-foreground bg-background w-[170px] border-none relative">
            <Link to={`../playlist/${playlist.title}`}>
                <div className="relative aspect-square w-full overflow-hidden rounded-md  transition-all duration-300 ease-in-out transform group delay-1000  group-hover/card:scale-[1.02]">
                    <PlaylistImage playlist={playlist} />
                </div>
            </Link>
            <div className="flex flex-col flex-1">
                <CardHeader className="p-0 pb-1 space-y-0">
                    <CardTitle className="text-sm font-medium line-clamp-1">{playlist.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {tracks && tracks?.length > 0 && <CardDescription className="text-xs line-clamp-1">{tracks?.length}{tracks?.length === 1 ? " song" : " songs"}</CardDescription>}
                </CardContent>
            </div>
        </Card>
    )
}

function PlaylistImage({ playlist }: { playlist: PlaylistType }) {
    const image = playlist.playlist_tracks?.at(0)?.track_image;
    if (image) return (
        <>
            <img
                className="h-full w-full object-cover "
                src={image}
                alt={`${playlist?.id} album cover`}
            />
        </>
    )
    return (
        <>
            <div className="relative aspect-square w-full overflow-hidden rounded-md bg-gradient-to-bl from-primary via-accent to-primary-foreground ">
                <div className="flex justify-center items-center h-full">
                    <Music className="size-12 hover:scale-1.5" />
                </div>
            </div>
        </>
    )
}