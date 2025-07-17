import { Heart, ListMusic, LucideProps } from "lucide-react";
import { Link } from "react-router";
import PageHeader from "../components/pageHeader";
import { useGetLikedTracks } from "../services/liked tracks/hooks/useGetLikedTracks";
import { useGetTracks } from "../services/hooks/useGetTracks";
export default function LibraryPage() {
    const { data: playlists } = useGetTracks("Your Playlists");
    const { data: tracks } = useGetLikedTracks();
    return (
        <>
            <PageHeader text="Your Library" />
            <div className="sm:pt-10 -my-3">
                <p className="text-xl font-bold mb-3 hidden sm:block">Your Library:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 space-x-3 sm:space-y-3">
                    <CardSection number={tracks?.length} href="/liked-songs" Icon={Heart} />
                    <CardSection number={playlists?.length} href="/playlists" Icon={ListMusic} />
                </div>
            </div>
        </>
    )
}

function CardSection({ number, href, Icon }: {
    number?: number, href: string, Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}) {
    const name = href.includes("liked-songs") ? "Liked songs" : "Playlists"
    const numberText = name === "Liked songs" ? "song" : "playlist"
    const pluralSuffix = number !== 1 ? "s" : ""
    return (
        <>
            <Link to={`${href}`}>
                <div className="flex gap-x-2 items-center md:px-2 sm:border rounded-sm w-full h-21 sm:h-16 group hover:border-primary">
                    <div className="h-full w-2/12 flex items-center justify-center">
                        <Icon className="group-hover:fill-primary group-hover:text-primary sm:size-7" />
                    </div>
                    <div className="flex flex-col justify-center gap-y-0 group-hover:text-primary  text-lg">
                        <p>{name}</p><p className="text-muted/40 text-xs">{number} {numberText} {pluralSuffix}</p>
                    </div>
                </div>
            </Link>
        </>
    )
}