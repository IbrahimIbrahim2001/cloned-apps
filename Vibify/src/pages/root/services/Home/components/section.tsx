import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useMusic } from "@/pages/root/store"
import type { Track } from "@/pages/root/types/track"
import { PlayCircle } from "lucide-react"
import { toast } from "sonner"
import { addToHistory } from "../../api/addToHistory"
import { SectionText, useGetTracks } from "../../hooks/useGetTracks"
import SkeletonComponent from "./SkeletonComponent"
import TrackComponent from "./track"
import { useTranslation } from "react-i18next"

export default function Section({ sectionText }: { sectionText: SectionText }) {
    const { data: tracks, isLoading, error } = useGetTracks(sectionText)
    const { playTrack } = useMusic()
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';
    const handleTrackClick = (track: Track) => {
        if (!tracks) return
        playTrack(track, tracks)
        addToHistory(track);
    }

    const handlePlayAll = () => {
        if (!tracks?.length) return
        playTrack(tracks[0], tracks)
    }

    if (error) {
        toast.error("Please, use VPN if you are on Syria")
        return (
            <>
                <div dir={isArabic ? "rtl" : "ltr"} className="p-4">
                    <p className="text-destructive">Error loading {t(sectionText)}</p>
                </div>
            </>
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

    if (!tracks?.length) return null

    return (
        <>
            <div dir={isArabic ? "rtl" : "ltr"} className="flex items-center justify-between px-3">
                <p className="text-xl font-semibold">{t(sectionText)}</p>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handlePlayAll} className="gap-2">
                        <PlayCircle className="w-4 h-4" />
                        Play All
                    </Button>
                </div>
            </div>
            <MobileOnlySection tracks={tracks} onTrackClick={handleTrackClick} isArabic={isArabic} />
            <DesktopSection tracks={tracks} onTrackClick={handleTrackClick} isArabic={isArabic} />
        </>
    )
}

// Mobile screen only
function MobileOnlySection({
    tracks,
    onTrackClick,
    isArabic
}: {
    tracks: Track[]
    onTrackClick: (track: Track) => void,
    isArabic: boolean
}) {
    return (
        <div dir={isArabic ? "rtl" : "ltr"} className="grid grid-flow-col auto-cols-[minmax(170px,1fr)] gap-x-3 w-screen sm:hidden overflow-x-scroll no-scrollbar -mx-3 px-6">
            {tracks?.map((track, index) => (
                <TrackComponent key={track.id || index} track={track} onClick={() => onTrackClick(track)} />
            ))}
        </div>
    )
}

// SM screen and above
function DesktopSection({
    tracks,
    onTrackClick,
    isArabic
}: {
    tracks: Track[]
    onTrackClick: (track: Track) => void,
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
                    {tracks?.map((track, index) => (
                        <CarouselItem key={track.id || index} className="basis-auto">
                            <TrackComponent track={track} onClick={() => onTrackClick(track)} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext className="mr-16 size-12 opacity-0 hover:opacity-100 transition-opacity not-hover:opacity-0 hover:text-primary hover:bg-white" />
                <CarouselPrevious className="items-center ml-16 size-12 opacity-0 hover:opacity-100 transition-opacity not-hover:opacity-0 hover:text-primary hover:bg-white" />
            </Carousel>
        </div>
    )
}
