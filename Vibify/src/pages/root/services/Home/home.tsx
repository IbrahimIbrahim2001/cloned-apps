import PlaylistSection from "./components/playlistSection";
import Section from "./components/section";

export default function HomePage() {
    return (
        <div>
            <PlaylistSection sectionText="Your Playlists" />
            <Section sectionText="New Releases" />
            <Section sectionText="Trending on Audius" />
        </div>
    )
}
