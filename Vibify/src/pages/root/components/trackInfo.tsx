import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

interface TrackInfoProps {
    title: string
    artist: string
    isLiked: boolean
    onToggleLike: () => void
}

export function TrackInfo({ title, artist, isLiked, onToggleLike }: TrackInfoProps) {
    return (
        <div className="px-8 py-4">
            <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                    <h1 className="text-2xl font-bold truncate">{title}</h1>
                    <p className="text-lg text-gray-300 truncate">{artist}</p>
                </div>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 ml-4" onClick={onToggleLike}>
                    <Heart className={`h-6 w-6 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
            </div>
        </div>
    )
}
