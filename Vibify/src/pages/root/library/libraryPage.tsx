import { Heart, ListMusic } from "lucide-react";
import { Link } from "react-router";
import PageHeader from "../components/pageHeader";
export default function LibraryPage() {
    return (
        <>
            <PageHeader text="Your Library" />
            <div className="sm:pt-10 -my-3">
                <p className="text-xl font-bold mb-3 hidden sm:block">Your Library:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 space-x-3 sm:space-y-3">
                    <Link to="/liked-songs">
                        <div className="flex gap-x-2 md:px-2 items-center sm:border rounded-sm w-full h-21 sm:h-16 group hover:border-primary">
                            <div className="h-full w-2/12 flex items-center justify-center">
                                <Heart className="group-hover:fill-primary group-hover:text-primary sm:size-7" />
                            </div>
                            <div className="flex flex-col justify-center gap-y-0 group-hover:text-primary  text-lg">
                                <p>Liked Songs</p>
                                <p className="text-muted/40 text-xs">1 song</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/playlists">
                        <div className="flex gap-x-2 items-center md:px-2 sm:border rounded-sm w-full h-21 sm:h-16 group hover:border-primary">
                            <div className="h-full w-2/12 flex items-center justify-center">
                                <ListMusic className="group-hover:fill-primary group-hover:text-primary sm:size-7" />
                            </div>
                            <div className="flex flex-col justify-center gap-y-0 group-hover:text-primary  text-lg">
                                <p>Playlists</p>
                                <p className="text-muted/40 text-xs">1 song</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}
