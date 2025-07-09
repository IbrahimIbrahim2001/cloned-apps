import React from "react";
import PlaylistSection from "./components/playlistSection";
import Section from "./components/section";


const LazyCreatePlaylistDialog = React.lazy(() => import("../components/createPlaylistDialog"))

export default function HomePage() {
    return (
        <div>
            <LazyCreatePlaylistDialog />
            <PlaylistSection sectionText="Your Playlists" />
            <Section sectionText="New Releases" />
            <Section sectionText="Trending on Audius" />
        </div>
    )
}
