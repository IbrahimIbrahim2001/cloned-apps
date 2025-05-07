import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Bookmark, Heart, Home, LibraryBig, Pin, Search } from "lucide-react"
import { Link, useLocation } from "react-router"
import { LinkItem } from "../types/linkItem"
import { cn } from "@/lib/utils"

// Menu items.
const items = [
    {
        title: "Home",
        url: "home",
        icon: Home,
    },
    {
        title: "Pin",
        url: "#",
        icon: Pin,
    },
    {
        title: "Saved",
        url: "#",
        icon: Bookmark,
    },
    {
        title: "Liked songs",
        url: "#",
        icon: Heart,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "your Library",
        url: "#",
        icon: LibraryBig,
    },
]

export default function AppSidebar() {
    return (
        <Sidebar className="hidden sm:block text-primary-foreground border-background">
            <SidebarContent className="px-5 py-3">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-2xl text-primary mb-3">Vibify</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <LinkElement key={item.title} item={item} />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}


function LinkElement({ item }: { item: LinkItem }) {
    const { pathname } = useLocation()
    const isActive = pathname.includes(item.url)
    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild className="text-md">
                <Link to={item.url} className={cn("text-md font-medium text-muted-foreground hover:text-primary focus:text-primary", isActive ? "text-primary" : "text-muted-foreground")}>
                    <item.icon />
                    <span>{item.title}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}