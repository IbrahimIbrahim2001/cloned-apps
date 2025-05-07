import Section from "./components/section";
const cards = [
    {
        id: 1,
        image: "image1",
        text: "text1"
    },
    {
        id: 2,
        image: "image1",
        text: "text1"
    }, {
        id: 3,
        image: "image1",
        text: "text1"
    }, {
        id: 4,
        image: "image1",
        text: "text1"
    }, {
        id: 5,
        image: "image1",
        text: "text1"
    }, {
        id: 6,
        image: "image1",
        text: "text1"
    },
    {
        id: 7,
        image: "image1",
        text: "text1"
    },
    {
        id: 8,
        image: "image1",
        text: "text1"
    },
    {
        id: 9,
        image: "image1",
        text: "text1"
    },
    {
        id: 10,
        image: "image1",
        text: "text1"
    },
    {
        id: 11,
        image: "image1",
        text: "text1"
    },
    {
        id: 12,
        image: "image1",
        text: "text1"
    },
    {
        id: 13,
        image: "image1",
        text: "text1"
    },
    {
        id: 14,
        image: "image1",
        text: "text1"
    },

]

export default function HomePage() {
    return (
        <div className="mt-6">
            <Section cards={cards} sectionText="Playlist" />
            <Section cards={cards} sectionText="For you" />
            <Section cards={cards} sectionText="New to you" />
        </div>
    )
}
