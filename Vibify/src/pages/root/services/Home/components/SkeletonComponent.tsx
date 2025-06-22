import { Skeleton } from "@/components/ui/skeleton";
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function SkeletonComponent() {
    return (
        <>
            <div className="sm:hidden">
                <MobileSkeleton />
            </div>
            <div className="hidden sm:block">
                <DesktopSkeleton />
            </div>
        </>
    )
}

function MobileSkeleton() {
    return (
        <>
            <div className="grid grid-flow-col auto-cols-[minmax(170px,1fr)] gap-x-3 w-screen sm:hidden overflow-x-scroll no-scrollbar -mx-3 px-6 my-3">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className="flex flex-col space-y-2">
                        <Skeleton className="h-[170px] w-[170px] rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[120px]" />
                            <Skeleton className="h-2 w-[90px]" />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

function DesktopSkeleton() {
    return (
        <>
            <Carousel
                opts={{
                    align: "start",
                    slidesToScroll: 3,
                }}
                className="w-full"
            >
                <CarouselContent className="px-3 group-hover:opacity-100 gap-x-3 my-3">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className="flex flex-col space-y-2">
                            <Skeleton className="h-[170px] w-[170px] rounded-xl" />
                            <div className="space-y-2 px-2">
                                <Skeleton className="h-4 w-[120px]" />
                                <Skeleton className="h-2 w-[90px]" />
                            </div>
                        </div>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="ml-16 size-12 opacity-0 hover:opacity-100 transition-opacity not-hover:opacity-0" />
                <CarouselNext className="mr-16 size-12 opacity-0 hover:opacity-100  transition-opacity not-hover:opacity-0" />
            </Carousel>
        </>
    )
}
