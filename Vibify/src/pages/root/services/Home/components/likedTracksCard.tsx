import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Link } from "react-router";

export default function LikedTracksCard() {
    return (
        <Card className="text-primary-foreground bg-background w-[170px] border-none relative">
            <div className="relative aspect-square w-full overflow-hidden rounded-md bg-gradient-to-bl from-primary via-accent to-primary-foreground ">
                <Link to="../liked-songs">
                    <div className="flex justify-center items-center h-full">
                        <Heart className="size-12 hover:scale-1.5" />
                    </div>
                </Link>
            </div>
            <div className="flex flex-col flex-1">
                <CardHeader className="p-0 pb-1 space-y-0">
                    <CardTitle className="text-sm font-medium line-clamp-1">Liked Tracks</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <CardDescription className="text-xs line-clamp-1">1 song</CardDescription>
                </CardContent>
            </div>
        </Card>
    )
}

