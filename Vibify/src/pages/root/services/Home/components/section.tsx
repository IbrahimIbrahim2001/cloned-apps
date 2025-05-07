import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import CardComponent from "./card";

export type Card = {
    id: number,
    text: string,
    image: string
}

export default function Section({ cards, sectionText }: { cards: Card[], sectionText: string }) {
    return (
        <>
            {/* visible for mobile screens only */}
            <p className="mb-3 text-xl px-3">{sectionText}</p>
            <div className="flex gap-x-3 w-screen sm:hidden overflow-x-scroll mb-5 no-scrollbar -mx-3 px-3">
                {cards.map((card) => (
                    <>
                        <CardComponent key={card.id} card={card} />
                    </>
                ))
                }
            </div>
            {/* visible from sm screens and above */}
            <div className="mb-5 hidden sm:block -mx-6 px-3">
                <Carousel
                    opts={{
                        align: "start",
                        slidesToScroll: 3,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="px-3 group-hover:opacity-100">
                        {cards.map((card) => (
                            <CarouselItem key={card.id} className="basis-auto">
                                <CardComponent key={card.id} card={card} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="ml-16 size-12 opacity-0 hover:opacity-100 transition-opacity not-hover:opacity-0" />
                    <CarouselNext className="mr-16 size-12 opacity-0 hover:opacity-100  transition-opacity not-hover:opacity-0" />
                </Carousel>
            </div>
        </>
    )
}
