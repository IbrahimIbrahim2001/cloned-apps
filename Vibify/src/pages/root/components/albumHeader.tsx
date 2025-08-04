import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { lazy, Suspense } from "react";
interface PlayerHeaderProps {
    onClose: () => void
}



const LazyOptionMenu = lazy(() => import("@/pages/root/components/optionsMenu"))

export function PlayerHeader({ onClose }: PlayerHeaderProps) {
    return (
        <div className="flex items-center justify-between px-6 pb-4 pt-12">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={onClose}>
                <ChevronDown className="h-6 w-6" />
            </Button>
            <div className="text-center">
                <p className="text-sm text-gray-300">PLAYING FROM PLAYLIST</p>
                <p className="font-medium">Current Playlist</p>
            </div>
            <Suspense>
                <LazyOptionMenu />
            </Suspense>
        </div>
    )
}
