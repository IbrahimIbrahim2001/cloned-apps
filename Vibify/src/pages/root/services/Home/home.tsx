import PlaylistSection from "./components/playlistSection";
import Section from "./components/section";

export default function HomePage() {
    return (
        <div dir="ltr">
            <PlaylistSection sectionText="Your Playlists" />
            <Section sectionText="New Releases" />
            <Section sectionText="Trending on Audius" />
        </div>
    )
}
