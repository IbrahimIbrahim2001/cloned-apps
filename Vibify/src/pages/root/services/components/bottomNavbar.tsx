import { cn } from "@/lib/utils";
import { Home, LibraryBig, Search } from "lucide-react";
import { Link, useLocation } from "react-router";
import { LinkItem } from "../../types/linkItem";




const items = [
    {
        title: "Home",
        url: "home",
        icon: Home,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    // {
    //     title: "Discover",
    //     url: "#",
    //     icon: Sparkles
    // },
    {
        title: "your Library",
        url: "#",
        icon: LibraryBig,
    },
]


export default function BottomNavbar() {
    return (
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 flex h-14 w-full items-center justify-around bg-background shadow-[0_-2px_4px_rgba(0,0,0,0.1)] md:h-16">
            {items.map((item) => (
                <LinkElement key={item.title} item={item} />
            ))}
        </nav>
    )
}


function LinkElement({ item }: { item: LinkItem }) {
    const { pathname } = useLocation()
    const isActive = pathname.includes(item.url)
    return (
        <Link
            to={item.url}
            className={cn("flex flex-col items-center justify-center gap-1 text-sm font-medium hover:text-primary focus:text-primary", isActive ? "text-primary" : "text-muted-foreground")}
        >
            <item.icon className="h-6 w-6" />
            {item.title}
        </Link>
    )
}
