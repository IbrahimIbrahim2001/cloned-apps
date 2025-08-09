import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { PlaylistType } from "@/pages/root/types/track";
import { useMemo } from "react";
import { SectionText, useGetTracks } from "../../hooks/useGetTracks";
import { usePlaylistStore } from "../../playlists-store";
import CreatePlaylistCard from "./createPlaylistCard";
import LikedTracksCard from "./likedTracksCard";
import Playlist from "./playlist";
import SkeletonComponent from "./SkeletonComponent";

export default function PlaylistSection({ sectionText }: { sectionText: SectionText }) {
    const { data: playlists, isLoading, error } = useGetTracks(sectionText);
    const optimisticPlaylists = usePlaylistStore((state) => state.optimisticPlaylists)

    const allPlaylists = useMemo(() => {
        if (!playlists) return optimisticPlaylists
        return [...playlists, ...optimisticPlaylists]
    }, [playlists, optimisticPlaylists])
    if (error) {
        return (
            <div className="p-4">
                <p className="text-destructive">Error loading {sectionText}</p>
            </div>
        )
    }

    if (isLoading) {
        return (
            <>
                <p className="text-xl px-3">{sectionText}</p>
                <SkeletonComponent />
            </>
        )
    }

    return (
        <>
            <div className="flex items-center justify-between px-3">
                <p className="text-xl font-semibold">{sectionText}</p>
            </div>
            <MobileOnlySection playlists={allPlaylists} />
            <DesktopSection playlists={allPlaylists} />
        </>
    )
}

// Mobile screen only
function MobileOnlySection({
    playlists,

}: {
    playlists: PlaylistType[]
}) {
    return (
        <>
            <div className="grid grid-flow-col auto-cols-[minmax(170px,1fr)] gap-x-3 w-screen sm:hidden overflow-x-scroll no-scrollbar -mx-3 px-6">
                {playlists?.map((playlist) => (
                    <Playlist key={playlist.id} playlist={playlist} />
                ))}
                <LikedTracksCard />
                <CreatePlaylistCard />
            </div>
        </>
    )
}

// SM screen and above
function DesktopSection({
    playlists,
}: {
    playlists: PlaylistType[]
}) {
    return (
        <div className="mb-5 hidden sm:block">
            <Carousel
                opts={{
                    align: "start",
                    slidesToScroll: 3,
                }}
                className="w-full"
            >
                <CarouselContent className="px-3 group-hover:opacity-100">
                    <>
                        {playlists?.map((playlist, index) => (
                            <CarouselItem key={playlist.id || index} className="basis-auto">
                                <Playlist playlist={playlist} />
                            </CarouselItem>
                        ))}
                        <CarouselItem className="basis-auto">
                            <LikedTracksCard />
                        </CarouselItem>
                        <CarouselItem className="basis-auto">
                            <CreatePlaylistCard />
                        </CarouselItem>
                    </>
                </CarouselContent>
                <CarouselNext className="mr-16 size-12 opacity-0 hover:opacity-100 transition-opacity not-hover:opacity-0 hover:text-primary hover:bg-white" />
                <CarouselPrevious className="items-center ml-16 size-12 opacity-0 hover:opacity-100 transition-opacity not-hover:opacity-0 hover:text-primary hover:bg-white" />
            </Carousel>
        </div>
    )
}

