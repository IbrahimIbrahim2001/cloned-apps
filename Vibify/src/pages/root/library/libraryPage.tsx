import { Bookmark, Heart, ListMusic, Pin } from "lucide-react";
import { Link } from "react-router";
import PageHeader from "../components/pageHeader";
import { useGetTracks } from "../services/hooks/useGetTracks";
import { useGetLikedTracks } from "../services/liked tracks/hooks/useGetLikedTracks";
import { useGetPins } from "../services/pins/hooks/useGetPins";
import { useGetSavedTracks } from "../services/saved/hooks/useGetSavedTracks";
import { useTranslation } from "react-i18next";
export default function LibraryPage() {
    const { data: playlists } = useGetTracks("Your Playlists");
    const { data: tracks } = useGetLikedTracks();
    const { data: pins } = useGetPins();
    const { data: savedTracks } = useGetSavedTracks();
    const { t } = useTranslation();
    return (
        <>
            <PageHeader text={t("Your library")} />
            <div className="sm:pt-10 -my-3">
                <p className="text-xl font-bold mb-3 hidden sm:block">{t("Your library")}:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 space-x-3 sm:space-y-3">
                    <CardSection title={t("Liked songs")} number={tracks?.length} itemType="track" href="/liked-songs" Icon={Heart} />
                    <CardSection
                        title={t("Your Playlists")}
                        number={playlists?.length}
                        itemType="playlist"
                        href="/playlists"
                        Icon={ListMusic}
                    />
                    <CardSection
                        title={t("Saved tracks")}
                        number={savedTracks?.length}
                        itemType="track"
                        href="/saved-tracks"
                        Icon={Bookmark}
                    />
                    <CardSection
                        title={t("Pins")}
                        number={pins?.length}
                        itemType="pin"
                        href="/pins"
                        Icon={Pin}
                    />
                </div>
            </div>
        </>
    )
}

interface CardSectionProps {
    title: string
    number?: number
    href: string
    Icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & React.RefAttributes<SVGSVGElement>>
    itemType: string
}

function CardSection({ title, number, href, Icon, itemType }: CardSectionProps) {
    const pluralSuffix = number !== 1 ? "s" : ""
    return (
        <Link to={href} className="block">
            <div className="flex gap-x-2 items-center md:px-2 sm:border rounded-sm w-full h-21 sm:h-16 group hover:border-primary">
                <div className="h-full w-2/12 flex items-center justify-center">
                    <Icon className="group-hover:fill-primary group-hover:text-primary sm:size-7" />
                </div>
                <div className="flex flex-col justify-center gap-y-0 group-hover:text-primary text-lg">
                    <p>{title}</p>
                    {number && number > 0 ? <p className="text-muted-foreground text-xs">
                        {number} {itemType}
                        {pluralSuffix}
                    </p> : null}
                </div>
            </div>
        </Link>
    )
}
