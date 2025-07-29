import { Card, CardContent } from "@/components/ui/card";

export default function Skeleton({ text }: { text?: string }) {
    return (
        <>
            <div className="flex flex-col sm:items-center justify-center p-2 bg-background">
                <h1 className="text-lg font-bold sm:p-6 sm:text-3xl">{text}</h1>
                <Card className="w-full sm:max-w-md sm:mx-auto bg-background text-muted border-0 sm:bg-card sm:text-card-foreground sm:border-2">
                    <CardContent className="p-0">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="border-b last:border-0">
                                <div className="flex items-center h-16 w-full p-3 gap-4 animate-pulse">
                                    <div className="h-14 w-14 rounded-md bg-muted-foreground/20 flex-shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-muted-foreground/20 rounded w-3/4" />
                                        <div className="h-3 bg-muted-foreground/20 rounded w-1/2" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
