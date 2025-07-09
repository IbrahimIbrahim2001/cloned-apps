import { Skeleton } from "@/components/ui/skeleton";
import { Play } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

export default function SkeletonComponent() {
    return (
        <>
            {Array.from({ length: 5 }).map((_, index) => (
                <Fragment key={index}>
                    <div className="border-b flex justify-between items-center h-16 w-full p-3 last:border-0">
                        <div className="flex space-x-2 ">
                            <div className="h-10 w-10 md:h-12 md:w-12 rounded-md mb-2 flex-shrink-0">
                                <Skeleton className="h-[50px] w-[50px] rounded-xl" />
                            </div>
                            <div className="overflow-hidden space-y-1 mt-2 mx-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-10" />
                            </div>
                        </div>
                        <div className="bg-primary/60 text-primary-foreground/40  rounded-full m-2 p-2">
                            <Play />
                        </div>
                    </div>
                </Fragment>
            ))}
        </>
    )
}
