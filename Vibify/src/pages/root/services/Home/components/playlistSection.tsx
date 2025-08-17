import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { PlaylistType } from "@/pages/root/types/track";
import { useMemo } from "react";
import { SectionText, useGetTracks } from "../../hooks/useGetTracks";
import { usePlaylistStore } from "../../playlists-store";
import CreatePlaylistCard from "./createPlaylistCard";
import LikedTracksCard from "./likedTracksCard";
import Playlist from "./playlist";
import SkeletonComponent from "./SkeletonComponent";
import { useTranslation } from "react-i18next";

export default function PlaylistSection({ sectionText }: { sectionText: SectionText }) {
    const { data: playlists, isLoading, error } = useGetTracks(sectionText);
    const optimisticPlaylists = usePlaylistStore((state) => state.optimisticPlaylists)
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';
    const allPlaylists = useMemo(() => {
        if (!playlists) return optimisticPlaylists
        return [...playlists, ...optimisticPlaylists]
    }, [playlists, optimisticPlaylists])
    if (error) {
        return (
            <div dir={isArabic ? "rtl" : "ltr"} className="p-4">
                <p className="text-destructive">Error loading {t(sectionText)}</p>
            </div>
        )
    }

    if (isLoading) {
        return (
            <>
                <p dir={isArabic ? "rtl" : "ltr"} className="text-xl px-3">{t(sectionText)}</p>
                <SkeletonComponent />
            </>
        )
    }

    return (
        <>
            <div dir={isArabic ? "rtl" : "ltr"} className="flex items-center justify-between px-3">
                <p className="text-xl font-semibold">{t(sectionText)}</p>
            </div>
            <MobileOnlySection playlists={allPlaylists} isArabic={isArabic} />
            <DesktopSection playlists={allPlaylists} isArabic={isArabic} />
        </>
    )
}

// Mobile screen only
function MobileOnlySection({
    playlists,
    isArabic

}: {
    playlists: PlaylistType[],
    isArabic: boolean
}) {
    return (
        <>
            <div dir={isArabic ? "rtl" : "ltr"} className={`grid grid-flow-col ${isArabic ? "[direction:ltr]" : null} auto-cols-[minmax(170px,1fr)] gap-x-3 w-screen sm:hidden overflow-x-scroll no-scrollbar -mx-3 px-6`}>
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
    isArabic
}: {
    playlists: PlaylistType[],
    isArabic: boolean
}) {
    return (
        <div dir={isArabic ? "rtl" : "ltr"} className="mb-5 hidden sm:block">
            <Carousel
                opts={{
                    align: "start",
                    slidesToScroll: 3,
                    direction: isArabic ? "rtl" : "ltr"
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

