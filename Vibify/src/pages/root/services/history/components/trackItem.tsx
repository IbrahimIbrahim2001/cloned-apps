import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DatabaseTrack } from "@/pages/root/types/track";
import { MoreHorizontal, PlayIcon } from "lucide-react";

export function TrackItem({ track }: { track: DatabaseTrack }) {
    return (
        <div className="border-b last:border-0 relative group">
            <div className="flex items-center h-16 w-full sm:p-3 gap-4 transition-colors duration-200 hover:bg-accent/50">
                <div className="h-14 w-14 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <img
                        src={track.track_image}
                        alt={`${track.track_title} album cover`}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="flex-1 overflow-hidden">
                    <p className="font-semibold text-base truncate">{track.track_title}</p>
                    <p className="text-sm text-muted-foreground truncate">{track.track_artist}</p>
                </div>
                <div className="flex items-center gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                    <Button variant="ghost" size="icon" className="size-8">
                        <PlayIcon className="size-5 fill-primary text-primary" />
                        <span className="sr-only">Play track</span>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-8">
                                <MoreHorizontal className="size-5" />
                                <span className="sr-only">More options</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="text-muted">
                            <DropdownMenuItem>Add to Playlist</DropdownMenuItem>
                            <DropdownMenuItem disabled>Share</DropdownMenuItem>
                            <DropdownMenuItem>remove from history</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}