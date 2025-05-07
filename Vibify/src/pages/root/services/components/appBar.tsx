import { BellRing, History, Settings } from "lucide-react"
import { Link, useLocation } from "react-router"
import { LinkItem } from "../../types/linkItem"
import ProfileImage from "../../components/profileImage"

const items = [
    {
        title: "History",
        url: "#",
        icon: History,
    },
    {
        title: "Notifications",
        url: "#",
        icon: BellRing,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
]

export default function AppBar() {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-1 bg-background text-muted-foreground flex items-center justify-end px-3 sm:px-5 h-16  dark:bg-gray-950 dark:border-gray-800">
            <nav className="flex items-center space-x-1 sm:space-x-2">
                {items.map((item) =>
                (
                    <LinkElement key={item.title} item={item} />
                )
                )}
            </nav>
            <ProfileImage />
        </div>
    )
}

function LinkElement({ item }: { item: LinkItem }) {
    const { pathname } = useLocation()
    const isActive = pathname.includes(item.url)
    return (
        <Link
            key={item.title}
            to={item.url}
            className="flex items-center justify-center rounded-md p-2 text-sm font-medium transition-colors relative group text-gray-500 hover:text-gray-900 hover:bg-gray-100   focus:text-primary"
        >
            <item.icon className="size-5" />
            <span className="sr-only sm:not-sr-only sm:ml-2 sm:text-sm">{item.title}</span>
            {isActive && <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary"></span>}
        </Link>
    )
}
